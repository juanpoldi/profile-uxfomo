import JSZip from 'jszip'

// ─────────────────────────────────────────────────────────────────────────────
// Helpers internos
// ─────────────────────────────────────────────────────────────────────────────

/** Comprueba si una cadena es una data URL (imagen subida localmente). */
function isDataUrl(str) {
    return typeof str === 'string' && str.startsWith('data:')
}

/**
 * Extrae el tipo MIME y los bytes en base64 de una data URL.
 * @returns {{ mime: string, base64: string }}
 */
function parseDataUrl(dataUrl) {
    // "data:image/png;base64,iVBOR..."
    const [header, base64] = dataUrl.split(',')
    const mime = header.replace('data:', '').replace(';base64', '')
    return { mime, base64 }
}

/** Convierte un tipo MIME de imagen a extensión de archivo. */
function mimeToExtension(mime) {
    const map = {
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'image/gif': 'gif',
        'image/svg+xml': 'svg',
        'image/bmp': 'bmp',
    }
    return map[mime] || 'png'
}

/** Genera un string de fecha en formato YYYY-MM-DD. */
function todayString() {
    return new Date().toISOString().slice(0, 10)
}

/** Dispara la descarga de un Blob en el navegador y revoca la URL. */
function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

// ─────────────────────────────────────────────────────────────────────────────
// API pública
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Construye el objeto que se exportará.
 *
 * La estructura queda así, lista para crecer con más secciones:
 * {
 *   meta:    { exportDate, exportVersion },
 *   profile: { ...profileData },
 *   ...extraSections   // p. ej. { gdpr: {...} } en iteraciones futuras
 * }
 *
 * @param {object} profileData - Datos del perfil del usuario.
 * @param {{ extraSections?: object }} options
 */
export function buildExportPayload(profileData, options = {}) {
    const { extraSections = {} } = options
    return {
        meta: {
            exportDate: new Date().toISOString(),
            exportVersion: '1',
        },
        profile: profileData,
        // Secciones adicionales (GDPR, etc.) – null por defecto hasta que existan datos reales
        gdpr: null,
        ...extraSections,
    }
}

/**
 * Descarga el perfil como un único archivo .json.
 * Las imágenes subidas se incluyen en base64 dentro del JSON.
 *
 * @param {object} profileData
 * @param {{ extraSections?: object }} options
 */
export function downloadProfileJson(profileData, options = {}) {
    const payload = buildExportPayload(profileData, options)
    const json = JSON.stringify(payload, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    triggerDownload(blob, `perfil-uxfomo-${todayString()}.json`)
}

/**
 * Descarga el perfil como un archivo .zip que puede contener:
 * - data.json: el payload completo (con referencias a archivos si se incluyen imágenes)
 * - avatar.{ext}: el avatar como archivo de imagen real (solo si es data URL y se solicita)
 * - featured/{n}.{ext}: cada imagen destacada (solo si es data URL y se solicita)
 *
 * @param {object} profileData
 * @param {{
 *   extraSections?: object,
 *   includeAvatarFile?: boolean,
 *   includeFeaturedImages?: boolean,
 * }} options
 */
export async function downloadProfileZip(profileData, options = {}) {
    const {
        extraSections = {},
        includeAvatarFile = true,
        includeFeaturedImages = true,
    } = options

    const zip = new JSZip()

    // Construimos una copia mutable del profile para sustituir data URLs por rutas relativas
    const profileCopy = {
        ...profileData,
        featuredContent: (profileData.featuredContent || []).map(item => ({ ...item })),
    }

    // ── Avatar ────────────────────────────────────────────────────────────────
    if (includeAvatarFile && isDataUrl(profileCopy.avatar)) {
        const { mime, base64 } = parseDataUrl(profileCopy.avatar)
        const ext = mimeToExtension(mime)
        const filename = `avatar.${ext}`
        zip.file(filename, base64, { base64: true })
        profileCopy.avatar = filename  // sustituir data URL por ruta relativa en el JSON
    }

    // ── Imágenes destacadas ───────────────────────────────────────────────────
    if (includeFeaturedImages) {
        const featuredFolder = zip.folder('featured')
        profileCopy.featuredContent = profileCopy.featuredContent.map((item, index) => {
            if (isDataUrl(item.url)) {
                const { mime, base64 } = parseDataUrl(item.url)
                const ext = mimeToExtension(mime)
                const filename = `${index}.${ext}`
                featuredFolder.file(filename, base64, { base64: true })
                return { ...item, url: `featured/${filename}` }
            }
            return item
        })
    }

    // ── data.json ─────────────────────────────────────────────────────────────
    const payload = buildExportPayload(profileCopy, { extraSections })
    zip.file('data.json', JSON.stringify(payload, null, 2))

    // ── Generar y descargar ───────────────────────────────────────────────────
    const blob = await zip.generateAsync({ type: 'blob' })
    triggerDownload(blob, `perfil-uxfomo-${todayString()}.zip`)
}

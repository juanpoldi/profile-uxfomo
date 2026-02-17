import { useState, useEffect, useCallback } from 'react'

/**
 * Detecta si un string es una data URL (imagen subida localmente).
 */
function isDataUrl(str) {
    return typeof str === 'string' && str.startsWith('data:')
}

/**
 * Modal de configuración de descarga de datos del perfil.
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - profileData: object
 * - onConfirm: (config) => void
 *   config = { format: 'json'|'zip', includeProfileData, includeAvatarFile, includeFeaturedImages }
 */
const ExportDataModal = ({ isOpen, onClose, profileData, onConfirm }) => {
    const hasLocalAvatar = isDataUrl(profileData?.avatar)
    const hasFeaturedImages = (profileData?.featuredContent || []).some(item => isDataUrl(item.url))

    const [format, setFormat] = useState('zip')
    const [includeProfileData, setIncludeProfileData] = useState(true)
    const [includeAvatarFile, setIncludeAvatarFile] = useState(true)
    const [includeFeaturedImages, setIncludeFeaturedImages] = useState(true)

    // Resetear estado al abrir el modal
    useEffect(() => {
        if (isOpen) {
            setFormat(hasLocalAvatar || hasFeaturedImages ? 'zip' : 'json')
            setIncludeProfileData(true)
            setIncludeAvatarFile(true)
            setIncludeFeaturedImages(true)
        }
    }, [isOpen, hasLocalAvatar, hasFeaturedImages])

    // Cerrar con Escape
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') onClose()
    }, [onClose])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            return () => document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, handleKeyDown])

    if (!isOpen) return null

    const handleConfirm = () => {
        onConfirm({
            format,
            includeProfileData,
            includeAvatarFile: format === 'zip' ? includeAvatarFile : false,
            includeFeaturedImages: format === 'zip' ? includeFeaturedImages : false,
        })
    }

    // Determina si el botón descargar debería estar activo
    const canDownload = includeProfileData || (format === 'zip' && (includeAvatarFile || includeFeaturedImages))

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-modal-title"
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
                {/* Cabecera */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 id="export-modal-title" className="text-lg font-bold text-gray-900">
                            Descargar mis datos
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Elige qué información quieres incluir en la descarga.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Cerrar"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Sección: ¿Qué incluir? */}
                <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">¿Qué incluir?</p>

                    <CheckboxRow
                        id="include-profile"
                        checked={includeProfileData}
                        onChange={setIncludeProfileData}
                        label="Datos del perfil"
                        description="Nombre, bio, enlaces y contenido destacado en formato JSON."
                    />

                    {hasLocalAvatar && (
                        <CheckboxRow
                            id="include-avatar"
                            checked={includeAvatarFile}
                            onChange={setIncludeAvatarFile}
                            label="Avatar como archivo de imagen"
                            description="Tu foto de perfil descargada como JPG, PNG, etc."
                            disabled={format === 'json'}
                            disabledHint='Solo disponible en formato ZIP.'
                        />
                    )}

                    {hasFeaturedImages && (
                        <CheckboxRow
                            id="include-featured"
                            checked={includeFeaturedImages}
                            onChange={setIncludeFeaturedImages}
                            label="Imágenes destacadas como archivos"
                            description="Tus imágenes del contenido destacado en formato original."
                            disabled={format === 'json'}
                            disabledHint='Solo disponible en formato ZIP.'
                        />
                    )}
                </div>

                {/* Separador */}
                <div className="border-t border-gray-100" />

                {/* Sección: Formato */}
                <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Formato de descarga</p>
                    <div className="grid grid-cols-2 gap-3">
                        <FormatOption
                            id="format-zip"
                            value="zip"
                            current={format}
                            onChange={setFormat}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                            }
                            label="ZIP"
                            description="Carpeta comprimida con JSON e imágenes como archivos."
                        />
                        <FormatOption
                            id="format-json"
                            value="json"
                            current={format}
                            onChange={setFormat}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                            label="Solo JSON"
                            description="Un único archivo de texto con todos los datos."
                        />
                    </div>
                </div>

                {/* Aviso GDPR futuro */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex gap-3 items-start">
                    <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-600 leading-relaxed">
                        Próximamente incluiremos también datos de privacidad y actividad (GDPR): permisos, inicios de sesión, intereses, dispositivo y newsletter.
                    </p>
                </div>

                {/* Acciones */}
                <div className="flex gap-3 pt-1">
                    <button
                        onClick={handleConfirm}
                        disabled={!canDownload}
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Descargar
                    </button>
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-gray-200 text-gray-500 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Sub-componentes ──────────────────────────────────────────────────────────

const CheckboxRow = ({ id, checked, onChange, label, description, disabled = false, disabledHint }) => (
    <label
        htmlFor={id}
        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
            disabled
                ? 'opacity-40 cursor-not-allowed border-transparent'
                : checked
                ? 'border-gray-200 bg-gray-50'
                : 'border-transparent hover:bg-gray-50'
        }`}
    >
        <div className="flex-shrink-0 mt-0.5">
            <input
                type="checkbox"
                id={id}
                checked={checked && !disabled}
                onChange={e => !disabled && onChange(e.target.checked)}
                disabled={disabled}
                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 focus:ring-offset-0 cursor-pointer disabled:cursor-not-allowed"
            />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{disabled && disabledHint ? disabledHint : description}</p>
        </div>
    </label>
)

const FormatOption = ({ id, value, current, onChange, icon, label, description }) => {
    const isSelected = current === value
    return (
        <button
            type="button"
            id={id}
            onClick={() => onChange(value)}
            className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 transition-all text-left w-full ${
                isSelected
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
            }`}
        >
            <div className={`${isSelected ? 'text-gray-900' : 'text-gray-400'} transition-colors`}>
                {icon}
            </div>
            <div>
                <p className={`text-sm font-bold ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{description}</p>
            </div>
        </button>
    )
}

export default ExportDataModal

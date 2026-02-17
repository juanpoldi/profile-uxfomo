# UX fomo - Perfil de Usuario 🚀

Aplicación de perfil de usuario personalizada para la comunidad **UX fomo**, construida con React, Vite y Tailwind CSS.

## 🛠️ Funcionalidades Implementadas

### 👤 Perfil Público vs. Propietario
- **Vista Diferenciada:** Lógica de `isOwner` para mostrar/ocultar elementos privados.
- **Privacidad:** Estadísticas (seguidores, seguidos, likes) ocultas en la vista pública.
- **Pestaña Recursos:** Renombrada desde "UX hub" a "Recursos".
- **Estética Limpia:** Eliminación de iconos de redes sociales en todas las vistas para un diseño minimalista basado en tipografía.

### 📝 Edición de Perfil
- **Información Básica:** Edición de nombre, nick, bio (máx 100 caracteres) y presentación larga.
- **Gestión de Enlaces:**
    - Reordenamiento mediante **Drag & Drop** (arrastrar y soltar) desde icono dedicado.
    - Personalización de nombres de enlaces y URLs.
    - Placeholders genéricos para mayor flexibilidad.
- **Contenido Destacado:**
    - Hasta 4 elementos con imagen y pie de foto.
    - Soporte para **Drag & Drop** para reordenar recursos.
    - Eliminación de bloques duplicados en la interfaz.

### 🖼️ Gestión de Imágenes
- **Subida Local:** Soporte para subir imágenes desde el dispositivo (Avatar y Destacados).
- **Persistencia Base64:** Las imágenes se convierten a Base64 para guardarse correctamente en `localStorage`.
- **Validación de Tamaño:** Límite estricto de **1MB** por imagen para asegurar el rendimiento y el guardado.
- **UI Inteligente:** Ocultación automática del campo URL al subir archivos locales.

### 📤 Exportación de Datos del Perfil
- **Modal de Descarga:** Interfaz dedicada (`ExportDataModal`) para configurar qué datos incluir antes de descargar.
- **Formato ZIP:** Descarga una carpeta comprimida con `data.json` + imágenes como archivos reales (avatar y destacados), usando **JSZip**.
- **Formato JSON:** Descarga un único `.json` con todos los datos (imágenes en Base64 incluidas).
- **Detección inteligente:** Si el perfil no tiene imágenes locales, el formato por defecto pasa a JSON automáticamente.
- **Selección granular:** El usuario puede elegir si incluir los datos del perfil, el avatar y/o las imágenes destacadas de forma independiente.
- **Accesibilidad y UX:** El modal se cierra con `Escape`, tiene overlay con blur, foco gestionado y aviso de próxima funcionalidad GDPR.
- **Utilidades reutilizables:** Toda la lógica de exportación está encapsulada en `src/utils/exportProfile.js` con funciones `buildExportPayload`, `downloadProfileJson` y `downloadProfileZip`.

### 💾 Almacenamiento y UX
- **LocalStorage:** Persistencia automática de todos los datos del perfil.
- **Mezcla de Datos:** Sistema robusto en `App.jsx` que previene la pérdida de datos al añadir nuevas funcionalidades.
- **Modo Prueba:** Botones temporales en la esquina superior izquierda para alternar entre vista de "Propietario" y "Público".

## 🌟 Proyectos Derivados (Spinoffs)

- **Mini Portfolio:** Está planificado crear una versión simplificada de este proyecto enfocada al 100% en un "Mini Portfolio" personal. La idea es reutilizar toda la lógica de gestión de imágenes Base64, el sistema de Drag & Drop y la persistencia local para ofrecer una herramienta de portafolio ultra-rápida y ligera.

## 📋 Tareas Pendientes (Backlog)

### 🚀 Futuras Mejoras
- [ ] **Optimización de Imágenes:** Implementar compresión automática en el cliente antes de convertir a Base64.
- [x] **Exportación de Datos:** Modal completo para descargar el perfil en formato JSON o ZIP con imágenes. ✅
- [ ] **Exportación GDPR:** Incluir datos de privacidad, actividad, permisos, inicios de sesión, dispositivo y newsletter.
- [ ] **Temas Visuales:** Soporte para modo oscuro (Dark Mode).
- [ ] **Validación de URLs:** Añadir comprobación de formato `https://` en los campos de enlaces.
- [ ] **Pestañas Reales:** Implementar la lógica para que las pestañas de "Hilos" y "Respuestas" carguen contenido dinámico.

## 📦 Stack y Dependencias Clave

| Paquete | Uso |
|---|---|
| React + Vite | Framework y bundler |
| Tailwind CSS | Estilos utilitarios |
| JSZip | Generación de archivos `.zip` en el cliente para la exportación de datos |
| @dnd-kit | Drag & Drop para reordenar enlaces y contenido destacado |

## ⚙️ Instalación y Uso

1. Clonar el proyecto.
2. Ejecutar `npm install` para instalar dependencias.
3. Ejecutar `npm run dev` para iniciar el servidor de desarrollo.
4. Pulsa el botón **"Editar perfil"** para empezar a personalizar tus datos.
5. **IMPORTANTE:** No olvides pulsar **"Guardar cambios"** al finalizar la edición para persistir los datos.
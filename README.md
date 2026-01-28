# UX fomo | Perfil de Usuario

Este proyecto es la implementación del perfil de usuario para la comunidad **UX fomo**. El diseño prioriza la legibilidad, la jerarquía visual y una experiencia de usuario premium, centrada en el contenido y la conversación.

## Stack Tecnológico

- **Framework**: React 19 + Vite
- **Estilos**: Tailwind CSS (v3)
- **Persistencia**: LocalStorage (con sistema de mezcla profunda para mayor robustez)
- **Tipografía**: Inter (Google Fonts)

## Funcionalidades Implementadas

- **Vista Pública**:
  - Cabecera con jerarquía optimizada (Avatar, Nick, Bio).
  - Bloque social (Seguidores, Siguiendo, Likes).
  - Galería de hasta 4 recursos destacados con captions.
  - Sistema de navegación interna por pestañas (Hilos, Respuestas, Seguidores, etc.).
- **Edición de Perfil**:
  - Cambio de avatar (subida local o enlace externo).
  - Edición de información básica y presentación larga.
  - Gestión de enlaces sociales (Website, LinkedIn, GitHub, Behance, Instagram).
  - Botones de limpieza rápida en inputs de redes sociales.
  - Editor de galería destacada (añadir, reordenar y eliminar recursos con previsualización).
- **Persistencia**:
  - Los datos se guardan automáticamente en el navegador.

## Tareas Pendientes

- [ ] **Lógica de Visibilidad**: Definir las pantallas de perfil según qué usuario es:
  - Si es el dueño del perfil: solo debe aparecer el botón "Editar Perfil".
  - Si es otro usuario: debe aparecer solo el botón "Seguir".
  - Si es anónimo: no debe aparecer ninguno de los dos botones.
- [ ] **Reordenación de Redes**: El usuario debe poder reordenar las redes sociales en la vista de edición.
- [ ] **Integración Backend**: Preparar la conexión con Supabase para almacenamiento global.

## Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

---
Creado por Juanpol para la Comunidad UX fomo.
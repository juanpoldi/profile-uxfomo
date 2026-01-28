Este archivo define las reglas generales de diseño, estructura y criterio UX para el sitio web de la Comunidad UX fomo y todos sus apartados.

Estas reglas aplican tanto al estado actual con datos simulados y localStorage como a una futura integración con Supabase y el sistema global del sitio web de la comunidad UX fomo.

---

## 1. Enfoque general

UX fomo es un producto digital orientado a:
- Lectura
- Contenido
- Conversación
- Comunidad

El diseño debe priorizar:
- Claridad
- Legibilidad
- Ritmo
- Jerarquía

Antes que:
- Ornamentación
- Complejidad visual
- Microinteracciones innecesarias

El diseño acompaña al contenido, no compite con él.

---

## 2. Uso de Tailwind CSS

Tailwind se usa **exclusivamente como lenguaje de representación visual**, no como implementación final.

Se permite usar clases de Tailwind solo para:
- Layout
- Grid y columnas
- Espaciados
- Jerarquía tipográfica
- Ritmo vertical
- Estados visuales básicos

No se usa Tailwind para:
- Lógica
- Comportamiento
- Estados internos complejos
- Arquitectura técnica

---

## 3. Sistema visual

### Color
- Base en colores **neutrales** (grises).
- Un único color de acento.
- El color de acento se usa con moderación para:
  - Acciones primarias
  - Estados activos
  - Elementos interactivos relevantes

### Tipografía
- Priorizar legibilidad en lectura media y larga.
- Jerarquía clara entre:
  - Títulos
  - Texto de contenido
  - Metadatos
  - Acciones secundarias

### Componentes
- Usar **Catalyst** como referencia conceptual de componentes.
- No crear componentes nuevos si un patrón ya existe.
- La consistencia prima sobre la originalidad.

---

## 4. Responsive como regla base

Todo diseño debe ser:
- Mobile-first
- Totalmente responsive

El layout debe:
- Reordenarse, no duplicarse.
- Mantener jerarquía y ritmo en todos los tamaños.
- Evitar soluciones específicas solo para desktop.

---

## 5. Contenido y estructura

### Bloques claros
Cada pantalla debe estar compuesta por bloques claramente diferenciados.

Evitar:
- Bloques ambiguos
- Contenedores sin función clara
- Información duplicada

### Ritmo vertical
- Usar el espaciado como herramienta de jerarquía.
- Separar ideas, no solo elementos.

---

## 6. Estados

Todas las pantallas deben contemplar visualmente:
- Estados vacíos
- Estados con poco contenido
- Estados con contenido completo
- Estados activos
- Estados de interacción básicos (hover, activo, foco)

Los estados vacíos deben:
- Explicar qué falta
- No culpar al usuario
- No romper el layout

---

## 7. Datos y persistencia

En esta fase:
- Los datos son simulados.
- Se guardan en localStorage.

El diseño debe:
- Asumir que los datos pueden crecer.
- No depender de valores hardcodeados.
- Estar preparado para una futura conexión con Supabase sin rediseñar la UI.

---

## 8. Qué NO se hace

Queda fuera de alcance:
- Autenticación
- Registro
- Backend
- Permisos complejos
- Validaciones avanzadas
- Optimización técnica

El foco es:
Diseño UX + estructura visual + criterio de producto.

---

## 9. Principio rector

Si hay duda entre:
- “Que se vea más bonito”
- “Que se entienda mejor”

Siempre gana:
**Que se entienda mejor.**
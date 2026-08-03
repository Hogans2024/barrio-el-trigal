# Versión 0.2.18 - Estandarización de Orientación en Imágenes de Mascotas

## Cambios realizados desde la versión 0.2.17
- **Corrección de Datos Mock (`src/data.ts`):** Se estandarizaron los parámetros de la URL de Unsplash para la mascota `lp9` (Canela). Anteriormente, la imagen se solicitaba con `w=600&auto=format&fit=crop`, lo que provocaba que el servidor la recortara horizontalmente, interfiriendo con la lógica de detección global de orientación del sistema.
- Ahora, la tarjeta `lp9` utiliza los mismos parámetros que `fp1` (`w=360&h=640&fit=crop&q=80`) para solicitar la imagen original en su orientación vertical auténtica.
- Esto garantiza que el mecanismo global del código (`naturalWidth / naturalHeight`) evalúe correctamente la orientación real de la imagen sin ser engañado por recortes forzados desde el servidor externo.
- Se auditó todo el set de datos de `LOST_PETS_DATA` y se verificó que todas las demás imágenes mantienen consistencia en sus parámetros de carga, asegurando un diseño uniforme en las galerías, modales y slideshows.

## Notas Adicionales
- No fue necesario modificar la lógica del código fuente de los componentes (`MascotasView.tsx`), demostrando que el sistema de detección ya estaba configurado correctamente de forma global. El problema visual era producto de una inconsistencia en los datos de prueba.

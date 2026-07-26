# Versiones v0.2.15 → v0.2.70

## v0.2.15 — Contador regresivo 90s y overlay en ActiveAlarmModal
- Contador regresivo de 90 segundos con auto-desactivación al llegar a 0
- Overlay traslúcido `bg-black/5 backdrop-blur-[6px]` con botón verde "DESACTIVAR ALARMA MANUAL"
- Al presionar el botón verde se revela el teclado numérico
- Botón rojo "DESACTIVAR ALARMA VECINAL 🔴" oculto mientras el overlay verde está activo
- Reorden del panel izquierdo: tarjeta de sirena arriba, textos de alerta debajo

## v0.2.16 — Ajustes header: Volver Atrás, escudo y textos
- Header con `grid grid-cols-3` y luego revertido a `flex justify-between`
- "VOLVER ATRÁS" en una sola línea (`whitespace-nowrap`)
- "DESACTIVAR ALARMA" en una sola línea
- Punto pulsante movido de junto al título a junto a "ID TERM: #0912"
- Múltiples ajustes de posicionamiento sub-pixel (0.2px, 0.3px, 0.5px) para alinear "Volver Atrás", escudo y textos

## v0.2.52 — Eliminación sección "Encontradas" en Mascotas
- Eliminados los botones "Perdidas" / "Encontradas"
- Eliminada toda la data `FOUND_PETS_DATA` de `data.ts`
- Eliminado el estado `showFound` y lógica asociada
- Buscador "Buscar mascotas" centrado

## v0.2.53 — Tercera opción "Añadir Mascota en Adopción"
- Botón azul en el picker de formulario
- Tipo `formMode` actualizado a `'lost' | 'found' | 'adoption'`
- Etiquetas condicionales en el formulario (título, label de lugar, placeholder, notificación)

## v0.2.54 — Tipo de mascota junto al nombre con color por estado
- Tipo (Perro, Gato, Ave, etc.) junto al nombre en formato "Perro Max"
- Color rojo para extraviado, verde para encontrado, azul para adopción
- Badges duplicados de tipo eliminados

## v0.2.55 — Color extraviado de rojo a amarillo
- `text-red-400` → `text-yellow-400` en las 5 vistas de tarjetas
- Botón "Añadir Mascota Extraviada" del picker cambió a amarillo

## v0.2.56 — Badge verde de estado en imagen
- Badge en esquina superior derecha de cada imagen mostrando "Perdido", "Encontrado" o "Adopción" en verde

## v0.2.57 — Número secuencial en tarjetas
- Número secuencial en blanco al inicio de cada tarjeta: `1. Perro Max`

## v0.2.58 — 30 tarjetas: 10 perdidas, 10 encontradas, 10 adopción
- `LOST_PETS_DATA` expandido de 20 a 30 entradas
- 10 con `status: 'lost'`, 10 con `status: 'found'`, 10 con `status: 'adoption'`
- Modal "Ver Detalles" adaptado: título y label de ubicación según estado

## v0.2.59 — Color verde para encontradas + shuffle aleatorio
- `text-emerald-400` para tipo de mascota encontrada
- Shuffle aleatorio de tarjetas con `.sort(() => Math.random() - 0.5)`

## v0.2.60 — Categorías: Conejos → Conejo, Otros animales → Otra mascota
- Normalización de nombres de categorías y tipos en toda la interfaz

## v0.2.61 — Intercalado fijo sin sort aleatorio
- Eliminado el `.sort()` aleatorio
- Datos reordenados manualmente en patrón fijo: perdida/encontrada/adopción intercalados

## v0.2.62 — Reorden fijo más disperso
- Nuevo patrón de intercalado: L, A, F, A, L, F, L, A, F, A, L, F, L, A, F, L, A, F, A, L, F, L, A, F, L, A, F, L, A, F

## v0.2.63 — Badge de estado movido al lado del nombre
- Badge verde quitado de la esquina de la imagen
- Ahora aparece junto al nombre en la misma línea

## v0.2.64 — Estado alineado a la derecha del nombre
- "Perdido"/"Encontrado"/"Adopción" en verde alineado a la derecha usando `justify-between`

## v0.2.65 — Tipo de mascota centrado entre nombre y estado
- Estructura de tres columnas: `1. Nombre: Max  │  Perro  │  Perdido`

## v0.2.66 — Texto "Nombre:" antes del nombre
- `1. Nombre: Max` en lugar de `1. Max`

## v0.2.67 — Tipo en botón amarillo entre Contactar y Ver Detalles
- Tipo de mascota en botón amarillo en la fila inferior de acciones
- Icono según tipo: 🐶 Perro, 🐱 Gato, 🐦 Ave, 🐰 Conejo, 🐢 Tortuga, ❓ Otra mascota

## v0.2.68 — Iconos de categorías heredan color del texto
- Todos los iconos de categorías cambiados a `text-current`
- El icono de "Todas" ahora coincide con el color del texto en cada contexto

## v0.2.69 — `rounded-lg` uniforme en todos los botones
- Categorías, Todas, Vista y opciones de modal cambiados de `rounded-full`/`rounded-xl` a `rounded-lg`

## v0.2.70 — Imágenes únicas para las 30 tarjetas
- Eliminadas 11 imágenes duplicadas
- Cada tarjeta tiene su propia imagen única de Unsplash
- Descripciones extendidas a ~3 líneas con `line-clamp-3`
- Términos "perro/perra" normalizados a "perrito/perrita" en descripciones

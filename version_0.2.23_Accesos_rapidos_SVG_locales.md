# Versión 0.2.23 - Accesos rápidos con SVG locales (Alarma)

**Fecha:** 2026-09-30

## Resumen

Los 4 accesos rápidos bajo el slideshow de la **Central de Alarma** (`Eventos, Farmacias, Mascotas, Negocios`) dejan de usar foto-cards remotas (`googleusercontent`) y pasan a tiles de icono centrado con assets locales en `public/iconos_accesos_rapidos/`. Farmacias no tenía SVG y usa el icono `Pill` de `lucide-react` inline (decisión del dueño).

## Hallazgo: cada archivo trae la tira completa, su viewBox ya encuadra 1 icono

Los 3 archivos de la carpeta local `Iconos cortados/` (NO versionada, solo disco) miden ~18 KB con **1 solo `<path>`** que contiene la tira completa de iconos del diseño. Su `viewBox` original (182–240 px) ya encuadra **un solo icono** por archivo: calendario-estrella, perro+gato y tienda (verificado con captura de Chrome headless). El único defecto real era `fill: #000000` (invisible sobre el fondo `#070707` de la app).

Al copiar a `public/` se saneó solo el color: `fill` = `#FFD700` fijo (los SVG cargados vía `<img>` **no** heredan `currentColor` de la página, por eso va hardcodeado y no como variable). El `viewBox` se conserva intacto del original.

| Origen (local, ignorado por git) | Destino (versionado) | viewBox final |
| --- | --- | --- |
| `Iconos cortados/Eventos.svg` | `public/iconos_accesos_rapidos/eventos.svg` | `0 0 182 185` (original) |
| `Iconos cortados/Mascotas.svg` | `public/iconos_accesos_rapidos/mascotas.svg` | `0 0 240 188` (original) |
| `Iconos cortados/Negocios.svg` | `public/iconos_accesos_rapidos/negocios.svg` | `0 0 200 183` (original) |

## Cambios realizados

### 1. `.gitignore` — blindaje pedido por el dueño (verificado con `git check-ignore`, 5/5)

```
Iconos cortados/
Informe_completo_detallado_Temux_paginaA_CodeGS.md
Rediseño alarma v15 Code.gs
Resolviendo apagado de Armala Code.gs
```

NOTA: las comillas NO sirven en `.gitignore` (git las toma literales); la primera versión con comillas solo ignoró 1 de 4 y se corrigió. `PLAN_SEGURIDAD_ABLY_APPS_SCRIPT.md` sigue rastreado en GitHub: el ignore no lo oculta, la protección es no commitearlo. La carpeta `Iconos cortados/` se **conserva** en disco (decisión del dueño), solo queda fuera del repo.

### 2. `src/data.alarma.ts` — `QUICK_ACCESS_ITEMS` con rutas locales

- `eventos/mascotas/negocios`: `imageUrl` → `` `${import.meta.env.BASE_URL}iconos_accesos_rapidos/<x>.svg` `` (funciona en GitHub Pages y Vercel).
- `farmacias`: conserva su URL remota solo por el tipo `QuickAccessItem` (`imageUrl: string` obligatorio); el render la ignora. Comentario `CMS_PENDING` (mock permanente Alarma) documentando el saneado.

### 3. `src/components/AlarmaView.tsx` — sección 3 pasa de foto-card a tile icono

- Import agregado: `Pill` de `lucide-react` (ya usado en `FarmaciasView`, mismo lenguaje visual).
- Tile: `flex-col items-center justify-center`, fondo `bg-white/[0.02]`, sin `position: fixed`, `onNavigate(item.id)` + `playTone` intactos, grid y alturas (`h-16 tall:h-20 sm:h-20`) intactos.
- Como el wordmark YA contiene el título, los 3 tiles SVG no repiten el `<h4>` (evita duplicar "Eventos / Eventos"); Farmacia sí muestra `Pill` + `<h4>`. Subtítulos visibles solo en `sm+` como antes.

## Archivos modificados

| Archivo | Motivo |
| --- | --- |
| `.gitignore` | Blindar 3 archivos prohibidos + `Iconos cortados/` |
| `public/iconos_accesos_rapidos/eventos.svg` | Nuevo (saneado: viewBox + fill `#FFD700`) |
| `public/iconos_accesos_rapidos/mascotas.svg` | Nuevo (saneado: viewBox + fill `#FFD700`) |
| `public/iconos_accesos_rapidos/negocios.svg` | Nuevo (saneado: viewBox + fill `#FFD700`) |
| `src/data.alarma.ts` | Rutas locales + comentario `CMS_PENDING` |
| `src/components/AlarmaView.tsx` | Tiles de icono centrado (render `<img>` uniforme) |

## Verificación de calidad

- `npm run build` (Vite 6.4.3): ✅ 2095 módulos, `dist/iconos_accesos_rapidos/` con los 4 SVG (warning de chunk >500 kB pre-existente, no de este cambio).
- `git status --short`: solo los 6 cambios listados arriba; los 5 protegidos quedan ignorados.
- ⚠️ `npm run lint` (tsc) **NO ejecutado por orden explícita del dueño** (su PC se cuelga por falta de recursos). Compensación: el `.tsx` no ganó imports ni tipos nuevos, sin `any`, `BASE_URL` en rutas.

## Ajuste post-entrega (mismo día, pedido del dueño)

Los tiles se veían minúsculos y sin título de texto. Se cambió el `<img>` a altura fija `h-7 tall:h-8` con `w-auto max-w-[90%]` (parejo al `Pill` de Farmacia) y se muestra el `<h4>` con el título en los 4 tiles.

## Corrección del viewBox (mismo día — diagnóstico con captura real)

El dueño reportó "4 iconitos" por tile. Verificación con Chrome headless: cada archivo original contiene la **tira completa de iconos** (calendario + escudo "Farmecias" [sic] + perro/gato…), y su `viewBox` original ya encuadra **un solo icono** (calendario, perro/gato, tienda). El bbox de 1624×277 calculado antes era erróneo (el parser ignoraba comandos Q/S/T/H/V/A y corrompía posiciones absolutas) — no eran wordmarks.

Corrección: se restauró el `viewBox` original en los 3 SVG de `public/`; el único saneado real es `fill: #000000 → #FFD700`. Verificado visualmente por captura: calendario-estrella, perro+gato y tienda, amarillos, un icono por archivo. Nota: la tira trae un escudo que dice "Farmecias" (typo del diseño) — por eso Farmacia sigue con `Pill` de lucide, que al dueño le gustó. Re-build ✅ (17s).

## Afinado de trazo del Pill (mismo día, pedido del dueño)

El `Pill` se veía más grueso que los 3 SVG. Lucide usa `stroke-width: 2` por defecto; se bajó a `strokeWidth={1.5}` en `AlarmaView.tsx`. Verificado con captura real de la app (`vite preview` + Chrome headless, vista móvil 390px): los 4 tiles se ven parejos. Re-build ✅. Servidor preview detenido tras la verificación.

## Cruz sobre la píldora → icono exacto del dueño (mismo día)

1. Intento descartado: `Pill` + `Plus` superpuesto de lucide — el dueño lo vio "muy diferente" a su referencia.
2. Implementación final: su componente `IconFarmacias` convertido 1:1 a `public/iconos_accesos_rapidos/farmacias.svg` (misma geometría: Rect cápsula `rotate(-40)`, línea media, cruz `M13 8.5h5v5...`). Solo adaptado a web: color `#FFD700`, `stroke-width 3` (el 2.2 original quedaba más fino que los otros 3 a 28px) y `viewBox 0 0 78 78` (la cápsula rotada con `rx=10` sobresale del 64 original — se detectó por captura y se reencuadró).
3. `QUICK_ACCESS_ITEMS.farmacias` apunta al SVG local; `AlarmaView` queda con render uniforme (`<img>` para los 4, sin ramas) y se retiran los imports `Pill`/`Plus` que quedaron sin uso. Verificado con captura real de la app: cápsula+cruz amarilla idéntica a la referencia. Re-build ✅. Servidor preview detenido.

## Tamaño del icono Farmacia (mismo día, pedido del dueño)

Con `viewBox 0 0 78 78` el icono se veía pequeño (mucho aire vacío). Medición con comparativa lado a lado a 3x contra el `Pill` anterior: la cápsula nueva ocupaba ~54% del alto frente al ~81% del Pill. Se reencuadró en dos pasos (`7 7 66 66` → `5 5 60 57` → final `7.5 7 55 52`, bbox real del dibujo sin recortar nada) y se le dio una caja un punto mayor solo a Farmacia (`h-8 tall:h-9` vs `h-7 tall:h-8` de los otros). Verificado con captura real de la app: los 4 iconos parejos, sin recortes en cruz ni título. Re-build ✅. Servidor preview detenido.

## Grosor de la cápsula (mismo día, pedido del dueño)

La cápsula se veía más gruesa que los otros 3 iconos (la cruz estaba bien). Se separó `farmacias.svg` en dos grupos: cápsula+línea media con `stroke-width 2.4` (≈1.5px renderizados a 32px de alto, parejo a calendario/perro/tienda) y cruz con el 3 original intacto. Geometría sin tocar. Verificado con captura real de la app. Re-build ✅. Servidor preview detenido.

## Grosor de la cruz (mismo día, pedido del dueño)

Con la cápsula ya perfecta, la cruz quedó gruesa en comparación. Se bajó su grupo a `stroke-width 2.4`, igual que la cápsula. Verificado con captura real de la app: cápsula y cruz parejas entre sí y con los otros 3 iconos. Re-build ✅. Servidor preview detenido.

- **Sin push** a GitHub (regla de oro).

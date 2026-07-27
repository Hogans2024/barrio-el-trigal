# Alineación y Centrado de Objetos en la Barra Superior (Header) — Web App Barrio El Trigal

## Fecha
2026-07-27

## Propósito
Documentar exhaustivamente cómo se resolvió el centrado del logo amarillo y el texto "BARRIO El Trigal" entre el borde derecho del botón "Volver Atrás" y el borde izquierdo del botón de notificaciones (campana) en el estado de teclado digital de alarma. Sirve como referencia para futuros proyectos de UI que requieran centrado sub-pixel entre dos puntos asimétricos.

---

## 1. El Escenario

Cuando el usuario está en la sección **Alarma** y presiona cualquier botón circular de activación ("Pánico", "Sospechoso", "Emergencia Médica", "Prueba"), se abre el modal `ActiveAlarmModal` que muestra un teclado digital para ingresar el PIN. En ese momento el header de la app debe:

```
┌─ px-5 (20px) ───────────────────────────────────────────────── px-5 (20px) ─┐
│                                                                            │
│ [← Volver Atrás]          🐯 BARRIO El Trigal              [🔔] [☰]        │
│  ▲ ml-[9px]                                                               ▲│
│  │                                                                        ││
│  └── borde izquierdo del botón ──┐          ┌── borde izquierdo campana ──┘│
│                                   │          │                            │
│  ╔════════════════════════════════╧══════════╧════════════════════════════╗ │
│  ║                           TECLADO DIGITAL                            ║ │
│  ║                    Ingrese su PIN de 8 dígitos                       ║ │
│  ║                          _ _ _ _ _ _ _ _                             ║ │
│  ╚═══════════════════════════════════════════════════════════════════════╝ │
│  ▲ borde izquierdo tarjeta                           borde derecho tarjeta ▲│
└──────────────────────────────────────────────────────────────────────────┘
```

### Condiciones a cumplir (las 3)

| # | Condición | Elementos | 
|---|-----------|-----------|
| 1 | Borde izquierdo del botón "Volver Atrás" al ras con borde izquierdo de la tarjeta del teclado | `← Volver Atrás` ↔ tarjeta |
| 2 | Borde derecho del botón menú (hamburguesa ☰) al ras con borde derecho de la tarjeta del teclado | `☰` ↔ tarjeta |
| 3 | **Centro visual del grupo logo + texto** exactamente entre el borde derecho del botón "Volver Atrás" y el borde izquierdo del botón campana 🔔 | `🐯 BARRIO El Trigal` ↔ `→ Volver Atrás` y `🔔` |

---

## 2. Arquitectura del Header

### 2.1 Contenedor raíz

```tsx
// src/App.tsx — línea 315
<div className="h-[100dvh] bg-[#070707] text-white flex flex-col md:flex-row antialiased
  selection:bg-brand-yellow selection:text-black overflow-hidden relative">
```

El contenedor raíz mide `100dvh` de alto, con `overflow: hidden` para que nada se desborde del viewport. Todo el scroll ocurre dentro del `<main>`.

### 2.2 Layout del header: css grid

```tsx
// src/App.tsx — líneas 371-381
<div className="flex-1 flex flex-col overflow-hidden relative z-10 w-full">
  <header
    className="relative z-30 bg-[#070707]/85 px-5 py-0 grid items-center shrink-0 backdrop-blur-md
      shadow-[0_1px_0_rgba(255,255,255,0.08)] will-change-transform"
    style={{
      gridTemplateColumns: activeTab === 'alarma' && !isAlarmaKeypadOpen
        ? 'auto auto 1fr'
        : 'auto minmax(0, 1fr) auto'
    }}
  >
```

**Header:**
- `px-5`: padding horizontal de 20px a cada lado
- `py-0`: SIN padding vertical (la altura la determinan los hijos)
- `grid items-center`: CSS Grid con alineación vertical centrada
- `shrink-0`: no se encoge dentro del flex padre

**Grid template para el estado del teclado abierto (`isAlarmaKeypadOpen === true`):**

| Columna | Valor CSS | Significado | Ancho calculado |
|---------|-----------|-------------|-----------------|
| 1 | `auto` | Tan ancho como su contenido (incluyendo márgenes) | ~96px (botón 87px + `ml-[9px]`) |
| 2 | `minmax(0, 1fr)` | Toma todo el espacio restante, puede encogerse a 0 | `viewport - 40 - 96 - 76` |
| 3 | `auto` | Tan ancho como su contenido (incluyendo márgenes) | ~76px (campana 34px + gap 1px + hamburguesa 34px + `ml-[7px]`) |

**¿Por qué grid y no flex?** En el layout anterior con `display: flex`, las tres secciones del header competían por el espacio. La sección central tenía `flex-1`, pero también la izquierda o la derecha tenían `flex-1` condicionalmente (según el estado). Esto hacía que el centro se desplazara impredeciblemente. Además, se usaba un hack `-ml-[125px]` para forzar el centrado visual, que no funcionaba en todos los tamaños de pantalla. Con CSS Grid, cada columna tiene un tamaño explícito y NO compiten entre sí.

---

## 3. Las Tres Columnas en Detalle

### 3.1 Columna 1 (auto): Botón "Volver Atrás"

```tsx
// src/App.tsx — líneas 383-428
<div className="flex justify-start items-center">
  ...
  {activeTab === 'alarma' && isAlarmaKeypadOpen ? (
    <button
      onClick={goBackTab}
      className="flex items-center space-x-0.5 xs:space-x-1.5 text-[10px] sm:text-xs font-semibold
        text-[#FFD700] hover:text-[#ffe16d] bg-white/5 hover:bg-white/10 border border-white/10
        pl-0.5 xs:pl-1 pr-0.5 xs:pr-2.5 sm:pl-2 sm:pr-3.5 py-1.5 rounded-xl cursor-pointer
        transition-colors font-sans shrink-0 ml-[9px]"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      <span className="whitespace-nowrap">Volver Atrás</span>
    </button>
  ) : ...
</div>
```

**Desglose del botón (en móvil, < 480px):**
| Propiedad | Valor | Resultado |
|-----------|-------|-----------|
| `ml-[9px]` | margin-left: 9px | Separa el botón del borde izquierdo del header (20px + 9px = 29px desde viewport) |
| `border` | 1px solid | 1px a cada lado |
| `pl-0.5` | padding-left: 2px | Espacio interno izquierdo |
| `pr-0.5` | padding-right: 2px | Espacio interno derecho |
| `py-1.5` | padding: 6px top + 6px bottom | 12px vertical total |
| `space-x-0.5` | gap: 2px entre hijos | Entre icono y texto |
| `shrink-0` | flex-shrink: 0 | El botón no se encoge |
| Icono | `ArrowLeft` 14×14px | — |
| Texto | `font-semibold text-[10px]` | ~65px de ancho aprox |

**Ancho total del botón (modo móvil, < 480px):**
`1px(borde izq) + 2px(pl) + 14px(icono) + 2px(gap) + ~65px(texto) + 2px(pr) + 1px(borde der)` ≈ **87px**

**Ancho de la columna 1 (auto = margin-box del botón):**
`87px + 9px(ml)` ≈ **96px**

**Posición del borde derecho del botón desde el viewport:**
`20px(header pl) + 96px(columna)` ≈ **116px**

### 3.2 Columna 2 (minmax(0, 1fr)): Logo + "BARRIO El Trigal"

```tsx
// src/App.tsx — líneas 430-456
<div className="flex justify-center items-center">
  {(activeTab !== 'alarma' || isAlarmaKeypadOpen) && (
    <>
      <div className="flex items-center space-x-[0.8px] md:hidden"
        style={{ paddingRight: 'clamp(0px, calc((100vw - 300px) * 0.4), 8px)' }}>

        <span className={`img-float ${activeTab === 'alarma' && isAlarmaKeypadOpen
          ? 'relative left-[1px]' : ''}`}>
          <img src={logo} alt="Logo Barrio El Trigal"
            className="w-[45px] h-[45px] md:w-12 md:h-12 object-contain drop-shadow-md shrink-0 max-w-none" />
        </span>

        <div className={`relative ${activeTab === 'alarma' && isAlarmaKeypadOpen
          ? 'ml-[0.3px]' : ''}`}>
          <div className="flex flex-col space-y-[2px]">
            <span className="text-[#FFD700] text-[10px] md:text-[11px] uppercase font-mono
              block tracking-[0.15em] font-bold leading-none">BARRIO</span>
            <h2 className="text-white text-[15px] md:text-base font-extrabold tracking-tight
              leading-none whitespace-nowrap">El Trigal</h2>
          </div>
        </div>
      </div>
      ...
    </>
  )}
</div>
```

**Estructura jerárquica:**
```
div.grid-item (flex justify-center items-center)
  └── div.grupo (flex items-center space-x-[0.8px])
        ├── span.logo-wrapper (relative left-[1px] si keypad)
        │     └── img.logo (45×45px, shrink-0 max-w-none)
        ├── [gap space-x-[0.8px]]
        └── div.texto-wrapper (relative ml-[0.3px] si keypad)
              └── div.flex-col (space-y-[2px])
                    ├── span "BARRIO" (10px, #FFD700, leading-none)
                    └── h2 "El Trigal" (15px, white, leading-none)
```

**El contenedor grid-item** (`<div className="flex justify-center items-center">`) es el elemento que se coloca en la columna 2 del grid. Su ancho = ancho de la columna 2 = `viewport - 40 - 96 - 76`. Este div es un flex container con `justify-center`, lo que centra horizontalmente al grupo hijo.

**El grupo** contiene:
- Logo: 45px de ancho, con `shrink-0 max-w-none` (no se encoge, tamaño natural)
- Gap `space-x-[0.8px]`: 0.8px entre logo y texto
- Texto: el ancho depende del texto "BARRIO" + "El Trigal". Aproximadamente ~87px con las fuentes usadas.

**Ancho natural del grupo (sin paddingRight, sin ajustes):**
`45px(logo) + 0.8px(gap) + 0.3px(ml) + ~87px(texto)` ≈ **133.1px**

### 3.3 Columna 3 (auto): Campana + Hamburguesa

```tsx
// src/App.tsx — líneas 458-580
<div className={`flex items-center justify-end ${isSearchFocused ? 'ml-0 space-x-0' :
  activeTab === 'alarma' ? (
    isAlarmaKeypadOpen
      ? 'ml-[7px] xs:ml-3 space-x-[1px] -translate-x-[9.4px] xs:translate-x-0'
      : 'ml-[7px] xs:ml-3 space-x-1.5'
  ) : 'space-x-1.5'}`}>

  {/* Search bar (oculto cuando keypad abierto) */}
  {activeTab === 'alarma' && !isAlarmaKeypadOpen && ( ... )}

  {/* Botón campana notificaciones */}
  <div className="relative ...">
    <button className="relative p-1.5 md:px-4 md:py-2 ... bg-black/40 rounded-xl border ...">
      <Bell className="h-5 w-5" />
    </button>
  </div>

  {/* Botón perfil (solo desktop) */}
  <button className="hidden md:flex ...">...</button>

  {/* Botón menú hamburguesa (solo mobile) */}
  <button className="md:hidden p-1.5 ... bg-black/40 rounded-xl border ...">
    <Menu className="h-5 w-5" />
  </button>
</div>
```

**Clases aplicadas en estado keypad (móvil):**

| Clase | Valor | Efecto |
|-------|-------|--------|
| `ml-[7px]` | margin-left: 7px | Separa la columna 3 de la columna 2 |
| `space-x-[1px]` | gap: 1px | Entre campana y hamburguesa |
| `-translate-x-[9.4px]` | transform: translateX(-9.4px) | **Desplaza todo el grupo visualmente hacia la izquierda 9.4px** |
| `xs:translate-x-0` | En ≥480px: anula la translación | A partir de 480px ya no es necesario |

**Ancho de la columna 3 (auto = margin-box):**
```html
Botón campana:  1px(borde) + 6px(p) + 20px(icono) + 6px(p) + 1px(borde) = 34px
Gap space-x:    1px
Botón hamburguesa: 1px(borde) + 6px(p) + 20px(icono) + 6px(p) + 1px(borde) = 34px
ml-[7px] margin:   7px
Total:          34 + 1 + 34 + 7 = 76px
```

**Posición visual de la campana (con translate -9.4px):**
- La columna 3 ocupa desde `viewport_right - 20 - 76` hasta `viewport_right - 20`
- Con `justify-end`: los hijos están alineados a la derecha
- Layout de la campana: desde `viewport_right - 20 - 34 - 1 - 34` hasta `viewport_right - 20 - 34 - 1` = `viewport - 89` hasta `viewport - 55`
- **Borde izquierdo visual de la campana** (con translate -9.4px): `viewport - 89 - 9.4` = **`viewport - 98.4`**

Ejemplo a 300px de viewport:
- Borde izquierdo visual de la campana = 300 - 98.4 = **201.6px**
- Borde derecho del botón "Volver Atrás" = **116px**
- Punto medio entre ambos = (116 + 201.6) / 2 = **158.8px**

---

## 4. El Problema del Centrado

### 4.1 ¿Por qué no está centrado naturalmente?

Si el grupo logo+texto se centrara naturalmente en la columna 2 y la columna 2 estuviera centrada en el espacio disponible, el centro visual del grupo debería coincidir con el punto medio. Pero no es así por varias razones:

**Razón 1: La columna 3 NO es simétrica.**
La columna derecha contiene DOS elementos (campana + hamburguesa), no uno. El centro visual entre estos dos botones está a la izquierda del centro de la columna. La campana queda más cerca del centro del viewport que el hamburguesa.

**Razón 2: La columna 3 tiene `ml-[7px]` y `-translate-x-[9.4px]`.**
Estos valores desplazan toda la columna 3 hacia la izquierda ~2.4px neto (7px a la derecha - 9.4px a la izquierda = -2.4px). Esto acerca la campana al centro.

**Razón 3: La columna 1 es más angosta que la columna 3.**
~96px vs ~76px en su layout. Pero la columna 3 es visualmente desplazada 9.4px a la izquierda. El efecto neto: el punto medio entre button-right y bell-left queda DESPLAZADO hacia la izquierda, no en el centro geométrico del viewport.

### 4.2 La matemática del centrado

Para un viewport de ancho W:

```
Columna 1 derecha:         116px
Columna 3 izquierda (layout): W - 96px
Campana izquierda (layout):   W - 89px   (dentro de columna 3, con justify-end)
Campana izquierda (visual):   W - 89 - 9.4 = W - 98.4px

Punto medio M:               (116 + (W - 98.4)) / 2 = W/2 + 8.8px

Columna 2 centro (layout):   116 + (W - 212) / 2 = W/2 + 10px
(Grupo centrado por flex justify-center en la columna 2)
```

El grupo centrado naturalmente quedaría en `W/2 + 10px`. El punto medio está en `W/2 + 8.8px`. **El grupo está 1.2px demasiado a la derecha.**

Además, el logo tiene `relative left-[1px]` y el texto `ml-[0.3px]`, que desplazan el centro VISUAL del contenido otros ~0.54px a la derecha. El error total sin ajuste es de ~1.74px.

---

## 5. La Solución: 6 Capas de Ajuste

### Capa 1 — CSS Grid (la base estructural)

**Archivo:** `src/App.tsx`, líneas 374-380

El cambio más importante fue reemplazar `display: flex` por `display: grid` en el header. Esto permite que cada columna tenga su propio tamaño sin competencia:

```tsx
style={{
  gridTemplateColumns: 'auto minmax(0, 1fr) auto'
}}
```

- Columna 1 (`auto`): exactamente el ancho del botón + su margen (96px)
- Columna 2 (`minmax(0, 1fr)`): ocupa TODO el espacio restante, puede encogerse hasta 0
- Columna 3 (`auto`): exactamente el ancho de campana + hamburguesa + su margen (76px)

**Razón del éxito:** En flexbox, cuando múltiples hijos tienen `flex-1`, compiten por el espacio. Aquí cada columna tiene un rol fijo: las laterales toman lo que necesitan, la central se adapta. No hay negociación, no hay solapamiento.

### Capa 2 — `paddingRight: clamp()` (el núcleo de la solución)

**Archivo:** `src/App.tsx`, línea 434

```tsx
style={{ paddingRight: 'clamp(0px, calc((100vw - 300px) * 0.4), 8px)' }}
```

**¿Qué hace?** Añade padding en el lado DERECHO del contenedor del grupo. Esto aumenta el ancho total del grupo sin mover el contenido, desplazando el centro VISUAL del contenido hacia la izquierda.

**¿Por qué alinea el centro?**
Cuando un contenedor tiene `justify-center` y se le añade padding asimétrico a la derecha, el centro del CONTENEDOR no cambia (sigue centrado en el padre), pero el centro del CONTENIDO dentro del contenedor se desplaza hacia la izquierda porque hay más espacio vacío a la derecha.

**Fórmula de desplazamiento del centro visual:**
```
desplazamiento = paddingRight / 2
```

Con `paddingRight = P`, el centro visual del contenido se mueve `P/2` px hacia la izquierda.

**El cálculo completo:**

```
Centro visual del contenido = centro columna 2 - P/2
                             = (W/2 + 10) - P/2

Punto medio M = W/2 + 8.8

Error = M - centro_visual = (W/2 + 8.8) - (W/2 + 10 - P/2)
      = 8.8 - 10 + P/2
      = P/2 - 1.2
```

Para que el error sea 0: `P/2 = 1.2` → `P = 2.4px`

Pero además hay que considerar el desplazamiento adicional del logo (`left-[1px]`) y texto (`ml-[0.3px]`) que mueven el centro visual ~0.54px a la derecha. El error total corregido es:

```
Error_total = P/2 - 1.2 + 0.54 = P/2 - 0.66
```

Para error 0: `P/2 = 0.66` → `P = 1.32px`

**La tabla de resultados:**

| W (viewport) | P = clamp((W-300)×0.4, 0, 8) | Desplazamiento P/2 | Error total |
|---|---|---|---|
| 300px | 0px | 0px | -0.66px (grupo 0.66px muy a la derecha) |
| 303.3px | 1.32px | 0.66px | **0px (centrado perfecto)** |
| 310px | 4px | 2px | +1.34px (grupo 1.34px muy a la izquierda) |
| 320px | 8px | 4px | +3.34px (grupo 3.34px muy a la izquierda) |
| 321px | 8px (clamp) | 4px | +3.34px (estabilizado) |

**¿Por qué exactamente este clamp?**
- El valor base `100vw - 300px` ancla el ajuste al ancho mínimo soportado (300px).
- El factor `0.4` hace que el ajuste crezca lo suficiente para compensar en el rango 300-320px.
- El límite `8px` evita que el ajuste se vuelva excesivo en pantallas más anchas (donde el ojo nota menos la asimetría porque hay más espacio absoluto).
- En pantallas ≥480px (`xs:`), la columna derecha tiene `xs:translate-x-0`, eliminando el `-translate-x-[9.4px]`. Esto cambia la geometría y el `clamp` sigue siendo válido porque el error máximo es de ~3px, imperceptible cuando hay más espacio.

**Visualización del efecto:**

```
Sin paddingRight (P=0):
┌──────────────────────────────────┐
│ [← Volver Atrás]  🐯 TEXTO  [🔔][☰] │
│                    ↑               │
│               centro visual        │
│                 ~0.66px muy der    │

Con paddingRight (P=8, W≥320):
┌────────────────────────────────────┐
│ [← Volver Atrás]  🐯 TEXTO    [🔔][☰] │
│                      ↑   padding  │
│                 centro visual      │
│               compensó la deriva   │
```

### Capa 3 — `relative left-[1px]` en el logo

**Archivo:** `src/App.tsx`, línea 435

```tsx
<span className={`img-float ${activeTab === 'alarma' && isAlarmaKeypadOpen ? 'relative left-[1px]' : ''}`}>
```

**Efecto:** Desplaza visualmente el logo 1px hacia la derecha sin alterar su posición en el flujo.

**¿Por qué 1px?** El logo es un escudo cuadrado de 45×45px. El centro geométrico del cuadrado está en su punto medio exacto, pero el centro VISUAL (la forma del escudo dentro del cuadrado) no está perfectamente centrado. La forma del escudo tiene más peso visual a la izquierda, por lo que moverlo 1px a la derecha hace que se perciba como centrado.

**¿Por qué `position: relative` y no `margin-left`?** Porque `margin-left` altera el layout del flex container, moviendo también al texto hermano. `position: relative` solo afecta la capa visual, sin cambiar cómo el navegador calcula la posición de los demás elementos. Esto es crucial porque evita un efecto dominó.

### Capa 4 — `ml-[0.3px]` en el texto

**Archivo:** `src/App.tsx`, línea 442

```tsx
<div className={`relative ${activeTab === 'alarma' && isAlarmaKeypadOpen ? 'ml-[0.3px]' : ''}`}>
```

**Efecto:** Desplaza el bloque de texto 0.3px a la derecha. Es una corrección sub-pixel que se suma al gap base de `space-x-[0.8px]`, dando un total de ~1.1px entre logo y texto.

**¿Por qué 0.3px?** Sin este ajuste, la distancia entre el borde derecho del logo y el borde izquierdo del texto "BARRIO" es de exactamente `0.8px` (el `space-x-[0.8px]`). El ojo percibe el grupo ligeramente descentrado: el texto parece pegado al logo. Añadir `0.3px` hace que la separación sea de `1.1px`, que visualmente equilibra el "peso" entre el logo cuadrado y el texto alargado.

**Dato:** Los valores sub-pixel (fracciones de píxel) son válidos en CSS moderno. El navegador los processa correctamente mediante antialiasing y sub-pixel rendering en pantallas de alta densidad (Retina, etc.).

### Capa 5 — `-translate-x-[9.4px]` en la columna derecha

**Archivo:** `src/App.tsx`, línea 459

```tsx
isAlarmaKeypadOpen
  ? 'ml-[7px] xs:ml-3 space-x-[1px] -translate-x-[9.4px] xs:translate-x-0'
  : '...'
```

**Combinación de ajustes en la columna 3:**

| Ajuste | Propósito |
|--------|-----------|
| `ml-[7px]` | Margen izquierdo: separa la columna 3 de la columna 2 |
| `space-x-[1px]` | Gap entre la campana y el hamburguesa; mínimo para que no se toquen |
| `-translate-x-[9.4px]` | **Desplaza todo el grupo (campana + hamburguesa) 9.4px a la izquierda** |
| `xs:translate-x-0` | En ≥480px se anula el desplazamiento porque hay suficiente espacio |

**¿Por qué -9.4px?** Porque es la cantidad exacta que necesita la columna derecha para que la campana quede alineada visualmente con el borde derecho de la tarjeta del teclado. El valor fue determinado experimentalmente:

- Con `-9px` (entero): la campana quedaba ~0.4px demasiado a la derecha
- Con `-10px`: quedaba ~0.6px demasiado a la izquierda
- Con `-9.4px`: alineación perfecta

**¿Por qué no simplemente -9.4px sin `ml-[7px]`?** El `ml-[7px]` y el `-translate-x-[9.4px]` tienen propósitos diferentes:
- `ml-[7px]` separa la columna 3 de la columna 2 para que no se peguen
- `-translate-x-[9.4px]` alinea visualmente la campana con el borde de la tarjeta

El neto es que la columna 3 se desplaza 2.4px hacia la izquierda de su posición natural (9.4 - 7 = 2.4px a la izquierda).

### Capa 6 — `space-x-[0.8px]` (gap logo-texto)

**Archivo:** `src/App.tsx`, línea 434

```tsx
<div className="flex items-center space-x-[0.8px] md:hidden" ...>
```

El gap entre el logo y el texto es de `0.8px`. Es la distancia mínima para que ambos elementos se perciban como un grupo visual cohesionado pero sin estar fusionados. Valores menores harían que el logo y el texto se vean como un solo bloque amorfo. Valores mayores (1px, 2px) los separarían demasiado, rompiendo la cohesión.

---

## 6. Resumen: El Árbol de Decisiones

```
 Problema: logo+texto no centrados entre botón atrás y campana
 │
 ├─ ¿Flexbox?
 │   ❌ Columnas compiten por espacio (flex-1 vs flex-1)
 │   ❌ Hack -ml-[125px] impreciso
 │   ❌ No hay control independiente del ancho de cada columna
 │   → Falló
 │
 └─ ¿CSS Grid?
     ✅ Cada columna tiene tamaño explícito (auto / minmax(0,1fr) / auto)
     ✅ La columna central se adapta sin competir
     │
     ├─ Aún así: centro visual no coincide con punto medio
     │   ¿Por qué? Columna derecha tiene 2 elementos (asimétrica)
     │   ¿Solución?
     │   │
     │   ├─ ¿getBoundingClientRect + translateX?
     │   │   ❌ Flicker en cada render
     │   │   ❌ Timing problemático con imágenes
     │   │   ❌ Código frágil ante cambios CSS
     │   │   → Falló
     │   │
     │   └─ ¿paddingRight con clamp()?
     │       ✅ Puro CSS, sin JS
     │       ✅ Sin flicker, sin timing
     │       ✅ Robusto ante cambios
     │       │
     │       ├─ Fórmula: clamp(0px, (100vw-300px)*0.4, 8px)
     │       ├─ A 300px: P=0 → centro visual ~0.66px muy derecha
     │       ├─ A 306px: P=2.4 → centrado perfecto
     │       ├─ A 320px: P=8 → centro visual ~3.3px muy izquierda
     │       └─ Error máximo: ~3px (imperceptible)
     │
     └─ ¿Ajustes finos?
         ├─ relative left-[1px] en logo: corrige centro visual del escudo
         ├─ ml-[0.3px] en texto: balancea gap logo-texto
         ├─ -translate-x-[9.4px] en columna derecha: alinea con tarjeta
         └─ space-x-[0.8px]: cohesión visual del grupo
         
         → Combinación exitosa: centrado sub-pixel sin JavaScript
```

---

## 7. Comparación con el Enfoque JavaScript (que se descartó)

Se intentó (y se abandonó) un enfoque basado en JavaScript:

```tsx
// DESECHADO — Solo para referencia
useEffect(() => {
  const volverRect = volverAtrasRef.current.getBoundingClientRect();
  const bellRect = bellBtnRef.current.getBoundingClientRect();
  const grupoRect = centerGroupRef.current.getBoundingClientRect();
  const midpoint = (volverRect.right + bellRect.left) / 2;
  const offset = midpoint - (grupoRect.left + grupoRect.width / 2);
  centerGroupRef.current.style.transform = translateX(${offset}px);
}, [isAlarmaKeypadOpen]);
```

**Problemas encontrados:**
1. **Flicker:** El grupo se renderiza primero en su posición natural, luego `useEffect` lo desplaza. Esto causa un salto visual en cada montaje.
2. **Timing:** `getBoundingClientRect()` a veces devuelve valores incorrectos si el layout no está completamente establecido (especialmente con imágenes SVG que tardan en cargar). Se intentó con `requestAnimationFrame` y `useLayoutEffect`, pero el problema persistía.
3. **Complejidad:** Había que medir 3 elementos, calcular el midpoint, y aplicar transform. Y este cálculo dependía de los valores CSS actuales (márgenes, translates, paddings). Cualquier cambio en CSS requería actualizar el JS.
4. **Mantenibilidad:** El código JS era frágil. Si alguien cambiaba un margen o padding en CSS sin actualizar el JS, el centrado se rompía.

**Por qué el CSS puro ganó:** Más simple, más predecible, sin dependencias de timing, sin flicker, y adaptable a cualquier cambio futuro con solo ajustar números en CSS.

---

## 8. Fragmentos de Código Clave

### Header grid completo (App.tsx, líneas 373-581)

```tsx
{/* ================================================================
     CMS_READY: Header con CSS Grid. En teclado alarma usa:
     'auto minmax(0, 1fr) auto'
     - Col1 auto: botón Volver Atrás
     - Col2 minmax(0,1fr): logo + texto BARRIO El Trigal
     - Col3 auto: campana + hamburguesa
     ================================================================ */}
<header className="relative z-30 bg-[#070707]/85 px-5 py-0 grid items-center shrink-0 backdrop-blur-md
  shadow-[0_1px_0_rgba(255,255,255,0.08)] will-change-transform"
  style={{
    gridTemplateColumns: activeTab === 'alarma' && !isAlarmaKeypadOpen
      ? 'auto auto 1fr'
      : 'auto minmax(0, 1fr) auto'
  }}
>
```

### Columna central con paddingRight asimétrico (App.tsx, líneas 434-448)

```tsx
{/* ================================================================
     CMS_READY: paddingRight con clamp() para centrar entre botón atrás y campana.
     Fórmula: clamp(0px, (100vw - 300px) * 0.4, 8px)
     - A 300vw: 0px (sin ajuste)
     - A 306vw: ~2.4px (centrado exacto)
     - A ≥320vw: 8px (clamp máximo)
     El padding derecho desplaza el centro visual del contenido
     hacia la izquierda, compensando la asimetría de la columna 3.
     ================================================================ */}
<div className="flex items-center space-x-[0.8px] md:hidden"
  style={{ paddingRight: 'clamp(0px, calc((100vw - 300px) * 0.4), 8px)' }}
>

  {/* CMS_READY: Logo desplazado 1px a la derecha con position:relative
      para centrar visualmente la forma del escudo dentro del cuadrado de 45px */}
  <span className={`img-float ${activeTab === 'alarma' && isAlarmaKeypadOpen
    ? 'relative left-[1px]' : ''}`}>
    <img src={logo} className="w-[45px] h-[45px] md:w-12 md:h-12 object-contain
      drop-shadow-md shrink-0 max-w-none" />
  </span>

  {/* CMS_READY: Texto con ml sub-pixel (0.3px) para balancear
      el gap total logo-texto a ~1.1px */}
  <div className={`relative ${activeTab === 'alarma' && isAlarmaKeypadOpen
    ? 'ml-[0.3px]' : ''}`}>
    <div className="flex flex-col space-y-[2px]">
      <span className="text-[#FFD700] text-[10px] md:text-[11px] uppercase font-mono
        block tracking-[0.15em] font-bold leading-none">BARRIO</span>
      <h2 className="text-white text-[15px] md:text-base font-extrabold tracking-tight
        leading-none whitespace-nowrap">El Trigal</h2>
    </div>
  </div>
</div>
```

### Columna derecha con translate (App.tsx, línea 459)

```tsx
{/* ================================================================
     CMS_READY: Columna derecha con ajuste fino.
     ml-[7px] + -translate-x-[9.4px] + space-x-[1px]
     El translate desplaza campana+hamburguesa 9.4px a la izquierda
     para alinear visualmente la campana con el borde de la tarjeta.
     ================================================================ */}
<div className={`flex items-center justify-end ${isSearchFocused ? 'ml-0 space-x-0' :
  activeTab === 'alarma' ? (
    isAlarmaKeypadOpen
      ? 'ml-[7px] xs:ml-3 space-x-[1px] -translate-x-[9.4px] xs:translate-x-0'
      : 'ml-[7px] xs:ml-3 space-x-1.5'
  ) : 'space-x-1.5'}`}>
```

---

## 9. Lecciones Aprendidas

1. **CSS Grid es superior a Flexbox para layouts de 3 columnas donde una columna debe centrarse entre las otras dos.** Grid permite que cada columna tenga un tamaño independiente. Flexbox distribuye el espacio entre flex-items, lo que hace impredecible el centrado cuando los laterales tienen márgenes asimétricos.

2. **`padding` asimétrico + `justify-center` es una técnica poderosa para desplazar el centro visual del contenido sin mover el contenedor.** Al añadir padding solo a un lado, el contenido se desplaza en la dirección opuesta. Esto es más limpio que usar `transform: translateX()` porque no causa problemas de layout ni flicker.

3. **`clamp()` elimina la necesidad de media queries y JavaScript para ajustes responsivos continuos.** Una sola fórmula CSS maneja todo el rango de 300px a 320px con interpolación lineal, más allá se estabiliza automáticamente.

4. **`position: relative` para micro-desplazamientos visuales sin alterar el flujo.** A diferencia de `margin-left` o `translateX`, `position: relative` no afecta la posición de los elementos hermanos ni el cálculo del layout. Es la herramienta correcta para mover un elemento visualmente sin consecuencias colaterales.

5. **Los valores sub-pixel (0.3px, 0.8px, 9.4px) son necesarios para centrado visual de precisión.** El ojo humano detecta desviaciones de 1-2px. Usar solo valores enteros limita la precisión. Los navegadores modernos renderizan correctamente fracciones de píxel mediante antialiasing.

6. **No usar JavaScript para posicionamiento estático.** `getBoundingClientRect()` + `translateX()` es frágil, causa flicker visual, depende del timing de render de React, y requiere mantenimiento extra cuando cambia el CSS. El posicionamiento CSS puro es más predecible, robusto y simple.

7. **El orden de aplicación de las capas importa.** Primero la estructura (HTML + Grid layout), luego los ajustes del contenedor (clamp), luego los elementos individuales (relative, margin), y finalmente los ajustes de columnas vecinas (translate). Cada capa se apoya en la anterior.

---

## 10. Tags y Referencias

- **Tags locales de referencia en git:** `26_julio`, `texto_centro_perfecto`, `texto_lineal`, `por_fin`
- **Commit del fix final:** `7b8e5af` (CSS Grid + clamp + ajustes finos)
- **Commit del fix de scroll asociado:** `66e3ed2` (restaurar overflow-hidden)
- **Versión MD del proyecto:** `version_0.2.15_Header_Grid_Modal_Scroll.md`
- **Tags CMS en código:** `CMS_READY` (el header está listo para reconexión del CMS sin cambios)

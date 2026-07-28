# Plan de Prioridades para el Frontend - Barrio El Trigal

> Documento de planificación. El CMS (Google Sheets + Apps Script) permanece
> bloqueado hasta nuevo aviso. Todo el trabajo aquí descrito es exclusivamente
> del frontend (React/TypeScript/Tailwind).

---

## FASE 1 — Corrección de Bugs (4 issues)

### 1.1 Clase CSS `roundeduppercase` pegada
- **Archivo:** `src/components/MascotasView.tsx` (~línea 140)
- **Problema:** `roundeduppercase` está pegado, falta espacio: debe ser `rounded uppercase`.
- **Impacto:** El badge de tipo de mascota pierde bordes redondeados y mayúsculas.
- **Solución:** Agregar espacio entre las dos clases CSS.

### 1.2 Texto "Safe" residual
- **Archivo:** `src/components/AfiliacionView.tsx` (~línea 282)
- **Problema:** Aparece la palabra "Safe" al final de la celda de dirección en la tabla de afiliados.
- **Impacto:** Visual, parece un residuo de debug.
- **Solución:** Eliminar el string "Safe" o la variable que lo genera.

### 1.3 Referencia `form.tipoAdherente` inexistente
- **Archivo:** `src/components/AfiliacionView.tsx` (~línea 522)
- **Problema:** El código referencia `form.tipoAdherente`, pero ese campo no existe en `AffiliateForm` (solo existe `tipoAfiliado`).
- **Impacto:** El valor siempre es `undefined`. TypeScript no lo atrapa porque `form` es `Partial<AffiliateForm>`.
- **Solución:** Cambiar `form.tipoAdherente` por `form.tipoAfiliado`.

### 1.4 Fechas hardcodeadas
- **Archivos:** `src/components/FarmaciasView.tsx` y `src/components/EventosView.tsx`
- **Problema:** Texto como "Hoy 24 de mayo 2026" y "Sábado, 24 de Mayo de 2026" están escritos fijos, sin usar `new Date()`.
- **Impacto:** La fecha no se actualiza automáticamente.
- **Solución:** Reemplazar por formato dinámico con `Intl.DateTimeFormat`.

---

## FASE 2 — Refactorización de Componentes Monstruo

### 2.1 `AfiliacionView.tsx` (1700+ líneas)
- **Problema:** Un solo archivo maneja: carrusel, login Google, formulario real, búsqueda mock, consulta de estado, toma de lista, requisitos de 4 servicios públicos.
- **Propuesta de división:**
  ```
  components/afiliacion/
  ├── AfiliacionView.tsx              ← orquestador (~70 líneas)
  ├── AfiliacionCarousel.tsx          ← carrusel hero
  ├── AfiliacionGrid.tsx              ← grid de 8 botones
  ├── AfiliacionRegister.tsx          ← acción 1 (Google Auth + formulario real)
  ├── AfiliacionSearch.tsx            ← acción 2 (búsqueda de vecinos)
  ├── AfiliacionStatus.tsx            ← acción 3 (consulta de estado)
  ├── AfiliacionAttendance.tsx        ← acción 4 (toma de lista)
  └── AfiliacionRequirements.tsx      ← acciones 5-8 (requisitos)
  ```

### 2.2 `NegociosView.tsx` (1727 líneas)
- **Problema:** Maneja listado, búsqueda, filtros, modal detalle, galería, formulario de registro, mapa de transporte, 5 modos de vista.
- **Propuesta de división:**
  ```
  components/negocios/
  ├── NegociosView.tsx                ← orquestador
  ├── NegociosList.tsx                ← listado con modos de vista
  ├── NegociosCard.tsx                ← tarjeta individual
  ├── NegociosDetail.tsx              ← modal de detalle
  ├── NegociosTransport.tsx           ← mapa de transporte
  ├── NegociosRegister.tsx            ← formulario de registro
  └── NegociosGallery.tsx             ← galería de imágenes
  ```

### 2.3 `MascotasView.tsx` (1608 líneas)
- **Problema:** Maneja mascotas perdidas + encontradas, búsqueda, filtros, 5 modos de vista, formulario de reporte.
- **Propuesta de división:**
  ```
  components/mascotas/
  ├── MascotasView.tsx                ← orquestador
  ├── MascotasList.tsx                ← listado con modos de vista
  ├── MascotasCard.tsx                ← tarjeta individual
  ├── MascotasDetail.tsx              ← modal de detalle
  ├── MascotasReportForm.tsx          ← formulario de reporte
  └── FoundPetsList.tsx               ← mascotas encontradas
  ```

### 2.4 Patrón común a extraer (DRY)
Los 6 componentes principales (Proyectos, Eventos, Farmacias, Negocios, Mascotas, Noticias) comparten ~60% de código duplicado:
- Barra de búsqueda + categorías + modal de categorías + modal de vistas
- Efecto shimmer con beam-sweep
- Botones flotantes laterales con IntersectionObserver
- Lógica de sticky bar con ResizeObserver

**Propuesta:** Crear hook personalizado `useSearchFilter()` y componentes compartidos:
```
components/shared/
├── SearchFilterBar.tsx               ← barra de búsqueda + categorías
├── CategoryModal.tsx                 ← selector de categorías
├── ViewSelectorModal.tsx             ← selector de modo de vista
├── FloatingActionButtons.tsx         ← botones flotantes
├── ShimmerEffect.tsx                 ← efecto de brillo
└── hooks/useSearchFilter.ts          ← lógica compartida de filtros
```

---

## FASE 3 — Optimización y Limpieza

### 3.1 Lazy Loading + Code Splitting
- **Estado actual:** `App.tsx` importa los 13 componentes de forma estática. Todos se cargan al inicio.
- **Solución:** Usar `React.lazy()` + `Suspense` para cargar cada vista bajo demanda:
  ```tsx
  const AlarmaView = React.lazy(() => import('./components/AlarmaView'));
  const ProyectosView = React.lazy(() => import('./components/ProyectosView'));
  // ... etc
  ```
- **Impacto:** El bundle inicial se reduce drásticamente. Cada vista pesa ~30-50KB.

### 3.2 Limpieza de dependencias muertas

| Paquete | Estado | Acción |
|---------|--------|--------|
| `@google/genai` | Instalado, nunca importado | Desinstalar |
| `express` | Instalado, app es 100% estática (Vite) | Desinstalar |
| `@types/express` | Instalado, app es 100% estática | Desinstalar |
| `dotenv` | Instalado, Vite maneja variables de entorno | Desinstalar |
| `motion` (framer-motion) | Solo usado en `AfiliacionView.tsx` | Evaluar si se reemplaza por CSS |

### 3.3 Faltan useMemo en filtros
- **Archivos:** `ProyectosView.tsx`, `EventosView.tsx`, `FarmaciasView.tsx`, `NegociosView.tsx`, `MascotasView.tsx`, `NoticiasView.tsx`
- **Problema:** `filteredProjects`, `filteredNews`, etc. se recalculan en cada render.
- **Solución:** Envolver en `useMemo` (ya hay patrón en `App.tsx` con `searchResults`).

### 3.4 El archivo `data.ts` es un monolito
- **Problema:** ~850 líneas con 25 farmacias, 15 eventos, 15+ negocios, 5+ mascotas, etc.
- **Propuesta:** Dividir en:
  ```
  src/data/
  ├── index.ts                       ← re-exporta todo
  ├── farmacias.ts
  ├── eventos.ts
  ├── negocios.ts
  ├── mascotas.ts
  ├── proyectos.ts
  └── noticias.ts
  ```

---

## FASE 4 — PWA y SEO

### 4.1 Service Worker + manifest.json
- **Archivos a crear:**
  - `public/manifest.json` — nombre, iconos 192x192 / 512x512, color temático
  - `public/sw.js` — service worker que cachea assets estáticos
- **Archivos a modificar:**
  - `index.html` — agregar `<link rel="manifest">` y script de registro SW
  - `vite.config.ts` — considerar `vite-plugin-pwa`

### 4.2 SEO en `index.html`
- **Estado actual:** Meta tags genéricos, sin Open Graph
- **Cambios necesarios:**
  - Meta description: `"Aplicación comunitaria y de seguridad vecinal para el Barrio El Trigal en Tarija"`
  - Open Graph: `og:title`, `og:description`, `og:image`, `og:url`
  - Twitter Card: `twitter:card`, `twitter:title`
  - Favicon real (reemplazar el favicon de Vite por defecto)

### 4.3 Corrección de `lang`
- **Archivo:** `index.html` línea 2
- **Cambio:** `lang="en"` → `lang="es"`

### 4.4 Título de página
- **Archivo:** `index.html` línea 6
- **Estado actual:** `<title>Barrio El Trigal</title>` (correcto, verificar)

---

## FASE 5 — Búsqueda Local en AlarmaView

### 5.1 Estado actual
- El input de búsqueda en `AlarmaView.tsx` captura `searchQuery` pero **nunca filtra nada**.
- La búsqueda global indexada en `App.tsx` sí funciona, pero es para navegar entre secciones.
- La búsqueda local de Alarma debería filtrar: contactos de emergencia, logs de bitácora, slides del carrusel.

### 5.2 Solución propuesta
- Conectar `searchQuery` a un `useMemo` que filtre los logs:
  ```tsx
  const filteredLogs = useMemo(() => {
    if (!searchQuery) return logs;
    return logs.filter(l =>
      l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, logs]);
  ```
- Extender a contactos de emergencia y slides del carrusel.
- Reemplazar el `searchQuery` en el JSX de resultados (líneas 207-241) para que muestre datos reales filtrados en vez de enlaces fijos a otras secciones.

---

## FASE 6 — Mejoras Adicionales

### 6.1 Notices desde datos mock
- **Archivo:** `src/data.alarma.ts` (líneas 250-264)
- Solo hay 2 avisos mock. Se podrían expandir a 5-7 para mejor demostración visual.

### 6.2 Perfil de usuario mock
- **Archivo:** `src/components/ProfileModal.tsx`
- Los datos del perfil ("Carlos Alvarado", etc.) están hardcodeados. Cuando haya backend, deberían venir del login de Google.

### 6.3 Sin React Router
- **Problema:** No hay URLs individuales para cada sección, no hay historial real de navegación (solo un array manual `navHistory`), no hay deep linking.
- **Fase futura:** Migrar a React Router DOM v7+.

### 6.4 Sin gestión de estado global
- **Problema:** Todo es prop drilling (`onShowNotification`, `onNavigate`, `highlightId`, etc.).
- **Fase futura:** Evaluar Zustand o Context API para estados globales.

### 6.5 Dependencia de imágenes externas
- **Problema:** Todas las imágenes son de Unsplash, Google CDN, o picsum.photos. Si esos servicios se caen, la app se ve rota.
- **Mitigación:** Agregar colores de fondo de respaldo y `alt` texts descriptivos (ya existen).

---

## Orden de Ejecución Recomendado

```
FASE 1: Bugs                       ← impacto inmediato, esfuerzo mínimo (~30 min)
    ↓
FASE 5: Búsqueda AlarmaView        ← funcionalidad concreta, esfuerzo bajo (~30 min)
    ↓
FASE 3: Optimización y limpieza    ← mejora rendimiento, riesgo medio (~2 h)
    ↓
FASE 4: PWA y SEO                  ← visibilidad y UX, esfuerzo medio (~3-4 h)
    ↓
FASE 2: Refactorización            ← mayor impacto, mayor esfuerzo (~8-12 h)
    ↓
FASE 6: Mejoras adicionales        ← según necesidad
```

### Estimación de esfuerzo total

| Fase | Archivos a crear | Archivos a modificar | Líneas estimadas | Tiempo |
|------|-----------------|---------------------|-----------------|--------|
| FASE 1 | 0 | 3-4 | ~10 edit | ~30 min |
| FASE 5 | 0 | 1 | ~30 edit | ~30 min |
| FASE 3 | ~8 | ~6 | ~200 new / ~100 edit | ~2 h |
| FASE 4 | 3 | 2 | ~150 new / ~20 edit | ~3-4 h |
| FASE 2 | ~20 | ~6 | ~2000 new / ~5000 remove | ~8-12 h |
| **TOTAL** | **~31** | **~19** | **~2350 new / ~5130 edit** | **~14-19 h** |

---

*Documento generado el 24 de julio de 2026.*
*Próxima actualización: al completar cada fase.*
# 📋 DOCUMENTACIÓN COMPLETA — Barrio El Trigal v1.0

> **Última actualización:** Junio 2026
> **Autor original:** Desarrollado con asistencia de Google AI Studio
> **Estado:** Versión 1 — Producción (desplegado en GitHub Pages)

---

## 📌 Tabla de Contenidos

1. [Resumen Ejecutivo](#-resumen-ejecutivo)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Estructura de Archivos](#-estructura-de-archivos)
4. [Arquitectura de la Aplicación](#-arquitectura-de-la-aplicación)
5. [Sistema de Diseño y Estilos](#-sistema-de-diseño-y-estilos)
6. [Módulos y Componentes](#-módulos-y-componentes)
7. [Sistema de Tipos (TypeScript)](#-sistema-de-tipos-typescript)
8. [Datos y Estado de la Aplicación](#-datos-y-estado-de-la-aplicación)
9. [Patrones de Diseño y Buenas Prácticas](#-patrones-de-diseño-y-buenas-prácticas)
10. [Problemas Encontrados y Soluciones](#-problemas-encontrados-y-soluciones)
11. [Despliegue (CI/CD)](#-despliegue-cicd)
12. [Limitaciones Conocidas](#-limitaciones-conocidas)
13. [Guía para Futuras Versiones](#-guía-para-futuras-versiones)

---

## 🎯 Resumen Ejecutivo

**Barrio El Trigal** es una aplicación web comunitaria para la gestión vecinal del **Barrio El Trigal** ubicado en la **Zona Sur de Tarija, Bolivia**. Funciona como un portal integral que permite a los vecinos:

- Activar una **alarma vecinal** con sonido de sirena real (Web Audio API)
- Consultar **proyectos de infraestructura** del barrio (empedrado, gas, seguridad)
- Ver **eventos programados** (limpiezas, asambleas, aniversarios, vacunación)
- Encontrar **farmacias de turno** en la ciudad
- Explorar un **directorio de negocios locales** con catálogos de productos
- Reportar y buscar **mascotas perdidas**
- Completar el **formulario oficial de afiliación vecinal** con credencial digital

La app está diseñada **mobile-first** con un tema oscuro premium, y es completamente **estática** (no requiere backend en producción). Se despliega automáticamente en **GitHub Pages** mediante GitHub Actions.

**URL de producción:** `https://<usuario>.github.io/barrio-el-trigal/`

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 19.0.1 | Framework UI principal (componentes funcionales + hooks) |
| **TypeScript** | ~5.8.2 | Tipado estático para toda la aplicación |
| **Vite** | 6.2.3 | Empaquetador y servidor de desarrollo (HMR ultra-rápido) |
| **Tailwind CSS** | 4.1.14 | Framework de estilos utility-first (integrado vía `@tailwindcss/vite`) |
| **Lucide React** | 0.546.0 | Librería de iconos SVG ligeros y consistentes |
| **Motion (Framer Motion)** | 12.23.24 | Librería de animaciones (instalada pero **no utilizada activamente** en v1) |
| **@google/genai** | 2.4.0 | SDK de Google Gemini AI (instalada, herencia de AI Studio, **no usada en v1**) |
| **Express** | 4.21.2 | Servidor Node.js (solo para desarrollo AI Studio, **no usado en producción**) |

### Dependencias NO Activas (Herencia de AI Studio)

Las siguientes dependencias existen en `package.json` porque el proyecto fue scaffoldeado desde **Google AI Studio**, pero **NO se usan** en el código actual:

- `@google/genai` — SDK de Gemini. No hay llamadas a la API de IA.
- `express` / `dotenv` / `@types/express` — Servidor backend. La app es 100% estática.
- `motion` (Framer Motion) — Instalada pero nunca importada en los componentes.

> ⚠️ **Para futuras versiones:** Estas dependencias pueden removerse con seguridad si no se planea integrar IA o un servidor backend. Alternativamente, `motion` puede activarse para animaciones más sofisticadas.

---

## 📁 Estructura de Archivos

```
barrio-el-trigal/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions para CI/CD a GitHub Pages
├── .gitignore                       # Exclusiones de Git
├── .env.example                     # Variables de entorno de ejemplo (herencia AI Studio)
├── assets/
│   └── .aistudio/                   # Configuración interna de AI Studio
├── public/
│   └── logo.png                     # Logo del Barrio El Trigal (13 KB)
├── src/
│   ├── main.tsx                     # Punto de entrada de React (render al DOM)
│   ├── App.tsx                      # Componente raíz: layout, navegación, notificaciones
│   ├── index.css                    # Estilos globales: fuentes, variables Tailwind, breakpoints
│   ├── types.ts                     # Definiciones de interfaces TypeScript
│   ├── data.ts                      # Datos mock estáticos (farmacias, eventos, negocios, etc.)
│   └── components/
│       ├── AlarmaView.tsx           # Central de Alarmas — pantalla principal
│       ├── ProyectosView.tsx        # Proyectos del Barrio con modal de detalle
│       ├── EventosView.tsx          # Eventos y limpiezas con suscripción
│       ├── FarmaciasView.tsx        # Farmacias de turno con llamada y GPS
│       ├── NegociosView.tsx         # Directorio comercial con registro y catálogos
│       ├── MascotasView.tsx         # Mascotas perdidas con reportes
│       └── AfiliacionView.tsx       # Formulario de afiliación y credencial digital
├── index.html                       # HTML base (punto de entrada Vite)
├── vite.config.ts                   # Configuración de Vite (base path, plugins, HMR)
├── tsconfig.json                    # Configuración de TypeScript
├── package.json                     # Dependencias y scripts
├── package-lock.json                # Lockfile de dependencias
├── metadata.json                    # Metadata de AI Studio
├── README.md                        # README original de AI Studio
├── GUIA_DESPLIEGUE_GITHUB_PAGES.md  # Guía paso a paso del despliegue
└── correfir diseño web.png          # Captura de referencia de diseño (199 KB)
```

---

## 🏗️ Arquitectura de la Aplicación

### Flujo General

```
index.html
  └─▶ src/main.tsx          (React.createRoot + StrictMode)
       └─▶ src/App.tsx       (Layout principal + navegación por estado)
            ├─▶ AlarmaView   (pestaña por defecto)
            ├─▶ ProyectosView
            ├─▶ EventosView
            ├─▶ FarmaciasView
            ├─▶ NegociosView
            ├─▶ MascotasView
            └─▶ AfiliacionView
```

### Patrón de Navegación

La aplicación **NO usa un router** (ni React Router ni similar). La navegación se gestiona mediante un **estado `activeTab`** en `App.tsx` que controla qué componente se renderiza condicionalmente:

```tsx
const [activeTab, setActiveTab] = useState<string>('alarma');

// En el render:
{activeTab === 'alarma' && <AlarmaView ... />}
{activeTab === 'proyectos' && <ProyectosView />}
// ... etc.
```

Las 7 pestañas disponibles y sus IDs internos son:

| ID del Tab | Componente | Descripción |
|---|---|---|
| `alarma` | `AlarmaView` | **Tab por defecto.** Central de alarma vecinal |
| `proyectos` | `ProyectosView` | Obras e infraestructura del barrio |
| `eventos` | `EventosView` | Eventos programados de la comunidad |
| `farmacias` | `FarmaciasView` | Farmacias que están de turno hoy |
| `negocios` | `NegociosView` | Directorio de emprendimientos locales |
| `mascotas` | `MascotasView` | Reportes de animales extraviados |
| `afiliacion` | `AfiliacionView` | Registro oficial de afiliados |

### Layout Responsive

La aplicación tiene **dos layouts** distintos:

| Pantalla | Layout |
|---|---|
| **Desktop (≥768px / `md:`)** | Sidebar lateral fijo (272px) + área de contenido principal |
| **Mobile (<768px)** | Header compacto + contenido full-width + Bottom Navigation Bar fija |

En **mobile**, la navegación se realiza a través de:
1. **Bottom Nav Bar** — 4 botones rápidos: Alarma, Proyectos, Eventos, Afiliación
2. **Menú Hamburguesa** (drawer lateral izquierdo) — Las 7 secciones completas

En **desktop**, todas las 7 secciones están siempre visibles en el sidebar lateral.

---

## 🎨 Sistema de Diseño y Estilos

### Fuentes Tipográficas

Se importan desde Google Fonts en `index.css`:

| Variable CSS | Fuente | Uso |
|---|---|---|
| `--font-sans` | **Hanken Grotesk** (300–800) | Texto principal de la UI |
| `--font-mono` | **Geist** (300–700) | Etiquetas, datos, timestamps, badges |

### Paleta de Colores (Tokens)

Definidos en `index.css` dentro del bloque `@theme` de Tailwind v4:

| Token | Valor | Uso |
|---|---|---|
| `--color-brand-yellow` | `#ffd700` | Color primario. Botones CTA, estados activos, alarma, badges |
| `--color-brand-green` | `#4ae183` | Color secundario. Estados de éxito, iconos de verificación, chips activos |
| `--color-brand-red` | `#e74c3c` | Color de alarma activa. Estados de emergencia |
| `--color-surface-charcoal` | `#1a1a1a` | Superficie de tarjetas sobre el fondo |
| `--color-bg-dark` | `#131313` | Fondo global de la aplicación |

Además, se usan estos colores directamente en las clases:
- Fondo principal del body: `#070707`
- Bordes de tarjetas: `gray-800` y `gray-900`
- Texto principal: `white`
- Texto secundario: `gray-400`
- Texto terciario: `gray-500`

### Breakpoints Personalizados

| Breakpoint | Definición | Uso |
|---|---|---|
| `xs` | `480px` (ancho) | Breakpoint extra-small (definido pero poco usado en v1) |
| `tall` | `min-height: 700px` | **Breakpoint vertical personalizado** — para celulares grandes |

El breakpoint `tall` es **clave** en la aplicación. Es una `@custom-variant` de Tailwind v4 que permite adaptar el layout según la **altura** del dispositivo:

```css
@custom-variant tall {
  @media (min-height: 700px) {
    @slot;
  }
}
```

**Estrategia de 3 niveles de responsive (en AlarmaView):**

| Nivel | Condición | Comportamiento |
|---|---|---|
| **Base** (sin prefijo) | Pantallas muy pequeñas (`<700px` alto) | Grid de 4 columnas compacto, sin descripciones, tamaños mínimos |
| **`tall:`** | Celulares grandes (≥700px alto) | Grid 2×2 clásico, descripciones visibles, tamaños normales |
| **`sm:` / `md:`** | Tablets / Desktop (≥640px ancho) | Layout con sidebar, más padding, tamaños generosos |

### Efectos Visuales

- **Luces ambientales:** Dos `div` circulares enormes con `blur-[150px]` posicionados en esquinas opuestas (amarillo y verde) para dar un efecto de iluminación ambiental sutil.
- **Glassmorphism:** `backdrop-blur-xl` y `backdrop-blur-md` en sidebar y header.
- **Animaciones:** `animate-pulse` para badges de notificaciones y estados activos. `animate-bounce` para la sirena activa. `animate-ping` para anillos de pulso de alarma.
- **Transiciones:** `transition` en todos los elementos interactivos para hover suave.
- **Selección de texto:** `selection:bg-brand-yellow selection:text-black` para una selección de texto coherente con la marca.

---

## 📦 Módulos y Componentes

### 1. `App.tsx` — Componente Raíz (381 líneas)

**Responsabilidades:**
- Gestión del estado global de navegación (`activeTab`)
- Layout principal (sidebar desktop + main content + bottom nav mobile)
- Sistema de notificaciones toast
- Drawer de notificaciones (panel lateral derecho)
- Drawer de menú hamburguesa (panel lateral izquierdo, solo mobile)
- Efectos de luces ambientales de fondo

**Props que pasa a los hijos:**
- `onNavigate` → `AlarmaView` (para que los quick-links naveguen a otras tabs)
- `onShowNotification(title, message)` → Todos los componentes que disparan toasts

**Sistema de Toasts:**
- Se almacenan en un array de `NotificationToast[]`
- Se auto-eliminan después de **6 segundos**
- Se muestran fijos en la esquina inferior derecha (desktop) o inferior izquierda (mobile, sobre la bottom nav)
- Animación de entrada: `slide-in-from-bottom-4 fade-in`

**Notificaciones Estáticas (Panel):**
- 3 avisos mock predefinidos con emojis, título, descripción y timestamp
- Incluye teléfonos de emergencia de Tarija: Bomberos (119), Radio Patrullas (110), Hospital Regional

---

### 2. `AlarmaView.tsx` — Central de Alarmas (280 líneas)

**Es la pantalla principal/home de la app.** Contiene:

- **Eslogan:** "Construyamos juntos un mejor barrio."
- **Buscador universal:** Input de búsqueda (visual, no conectado a lógica de búsqueda real)
- **4 tarjetas de navegación rápida:** Eventos, Farmacias, Mascotas, Negocios
- **Botón circular de alarma:** Elemento central de la UI
- **Botón de llamada a emergencias (110)**
- **Aviso legal**

**Sistema de Alarma con Audio:**
- Usa la **Web Audio API** nativa del navegador
- Genera un tono de sirena real con oscilador tipo `sawtooth`
- Frecuencias alternantes: 400Hz → 800Hz → 500Hz (cada 500ms)
- Volumen (gain): 0.3
- Countdown visual de **15 segundos** con auto-silencio al final
- Botón de mute/unmute independiente (`Volume2` / `VolumeX`)
- **Limpieza correcta:** El `useEffect` de cleanup detiene la sirena al desmontar el componente

**Compatibilidad:** Incluye fallback para `webkitAudioContext` (Safari antiguo)

---

### 3. `ProyectosView.tsx` — Proyectos del Barrio (247 líneas)

- Búsqueda y filtrado por categorías: Todos, Infraestructura, Servicios, Seguridad, Espacios
- Tarjetas horizontales con imagen a la izquierda y contenido a la derecha
- **Modal de detalle** al hacer click en un proyecto
- **Sistema de likes** por proyecto (estado local, no persistido)
- **Comentarios de "Participación Ciudadana":** Los usuarios pueden escribir comentarios mock. Hay comentarios pre-cargados. No persisten entre sesiones.
- Indicador de estado: "Completado" (verde) o "En Progreso" (naranja)

---

### 4. `EventosView.tsx` — Eventos Programados (238 líneas)

- Filtrado por categorías: Todos, Comunidad, Salud, Medio Ambiente
- Tarjetas verticales con imagen grande (aspect ratio ~16/9)
- Botón de **suscripción "Asistiré"** que cambia de estado y dispara un toast
- **Modal de detalle** con fecha y ubicación fijas (hardcoded: "Sábado, 24 de Mayo de 2026")
- Iconos dinámicos según el tipo de evento (Calendar, Users, HeartHandshake, Eye)
- Categoría "Medio" se muestra como "Medio Ambiente" en la UI

---

### 5. `FarmaciasView.tsx` — Farmacias de Turno (159 líneas)

- **Dos filtros:** "Farmacias cerca del barrio" (Centro + El Trigal) y "Farmacias en Tarija" (todas)
- Indicador de fecha: "Hoy 24 de mayo 2026" (hardcoded)
- Badge "DE TURNO" animado con `animate-pulse`
- **Acciones interactivas:** Click en dirección simula navegación GPS, click en teléfono simula llamada
- Gradiente inferior en la imagen para transición suave al contenido
- Banner informativo: "Los turnos cambian diariamente a las 08:00 AM"

---

### 6. `NegociosView.tsx` — Negocios Locales (433 líneas)

**El componente más complejo en interactividad.**

- Filtrado por categorías: Todos, Comida, Ropa, Plantas
- **Persistencia con `localStorage`** bajo la key `barrio_negocios`
- **Formulario de registro de nuevo negocio** (modal)
- **Sistema de favoritos/bookmarks** por negocio (sin persistencia)
- **Modal de catálogo:** Cada negocio tiene un menú/catálogo con precios en Bolivianos (Bs.)
  - "La Parrilla del Trigal" → Cortes de carne y asados
  - "Boutique Estilo Real" → Ropa y moda
  - "Mercado El Campo" → Frutas, verduras y víveres
  - "Vivero Oasis Verde" → Plantas y sustratos
- Botón "Hacer Pedido por WhatsApp" (simulado, solo dispara toast)
- La categoría "Papa de comer" se agrupa visualmente bajo "Comida"
- Imágenes por defecto de Unsplash cuando el usuario no proporciona una URL

---

### 7. `MascotasView.tsx` — Mascotas Perdidas (349 líneas)

- Filtrado: Todos, Perros, Gatos
- **Persistencia con `localStorage`** bajo la key `barrio_mascotas`
- **Formulario para publicar avisos** de mascotas perdidas (modal)
- Cada tarjeta muestra: nombre, tipo, descripción, última ubicación, contacto, barrio, fecha
- Botón "Llamar Ahora" que simula una llamada (toast)
- Banner inferior CTA: "¿Encontraste un animal perdido?" con botón para publicar
- Imágenes por defecto de Unsplash según tipo de mascota (Perro, Gato, Loro)
- **Bug menor:** En el badge de tipo, la clase CSS `roundeduppercase` está pegada (debería ser `rounded uppercase`)

---

### 8. `AfiliacionView.tsx` — Registro de Afiliados (747 líneas)

**El componente más extenso del proyecto (34.5 KB).**

**3 estados/vistas dentro del mismo componente:**
1. **Formulario de registro** — 4 secciones organizadas:
   - Datos Personales (fecha, nombres, apellidos, CI, nacimiento, sexo, estado civil, profesión)
   - Contacto y Afiliación (teléfono, correo, fecha, estado, número, tipo, recibo, monto)
   - Ubicación y Vivienda (dirección, número casa, manzano, tiempo residencia, zona referencia)
   - Participación Vecinal (toggles de reuniones/comisiones, selector de interés en seguridad, observaciones)
2. **Credencial digital** — Mostrada tras el registro exitoso, con diseño tipo tarjeta de identificación, QR simulado, y datos del afiliado
3. **Lista de afiliados registrados** — Tabla con nombre, CI, dirección y tipo. Incluye botones "Cargar Demo" y "Vaciar"

**Persistencia:** `localStorage` con key `barrio_afiliados`

**Validación:** Solo requiere nombres, apellidos y CI. Los demás campos son opcionales.

**Bug menor:** En la línea 522, hay una referencia a `form.tipoAdherente` que **no existe** en el tipo `AffiliateForm`. TypeScript lo permite porque el `form` tiene tipo `Partial<AffiliateForm>`, pero el valor es siempre `undefined`. Se debería usar solo `form.tipoAfiliado`.

**Otro detalle:** En la tabla de afiliados (línea 282), hay un texto "Safe" hardcoded al final de la dirección que parece ser un residuo de desarrollo.

---

## 📐 Sistema de Tipos (TypeScript)

Todos los tipos están centralizados en `src/types.ts`:

| Interfaz | Campos principales | Usado en |
|---|---|---|
| `Pharmacy` | id, name, imageUrl, address, phone, neighborhood, description, isOnDuty | FarmaciasView |
| `NeighborhoodEvent` | id, title, imageUrl, category, description, icon | EventosView |
| `LocalBusiness` | id, name, imageUrl, category, description, rating?, openHours?, distanceInfo?, isFreeDelivery?, actionText | NegociosView |
| `LostPet` | id, name, type, imageUrl, description, lastSeen, contact, neighborhood, date | MascotasView |
| `Project` | id, title, imageUrl, category, description, location, status | ProyectosView |
| `AffiliateForm` | 20+ campos de datos personales, contacto, ubicación y participación vecinal | AfiliacionView |

**Categorías tipadas:**
- Proyectos: `'INFRAESTRUCTURA' | 'SERVICIOS' | 'SEGURIDAD'`
- Eventos: `'Comunidad' | 'Salud' | 'Medio' | 'Todos'`
- Negocios: `'Comunidad' | 'Comida' | 'Ropa' | 'Plantas' | 'Papa de comer' | 'Todos'`
- Mascotas: `'Perro' | 'Gato' | 'Loro' | 'Todos'`
- Estado proyecto: `'Completado' | 'En Progreso' | 'Planificado'`

---

## 💾 Datos y Estado de la Aplicación

### Datos Estáticos (Mock)

Centralizados en `src/data.ts`. **No hay backend ni API.** Todos los datos son hardcoded:

| Constante | Registros | Datos |
|---|---|---|
| `PHARMACIES_DATA` | 4 | Farmacias reales/ficticias de Tarija |
| `EVENTS_DATA` | 4 | Limpieza, asamblea, aniversario, vacunación |
| `BUSINESSES_DATA` | 4 | Parrilla, boutique, mercado, vivero |
| `LOST_PETS_DATA` | 3 | Max (perro), Luna (gato), Kiwi (loro) |
| `PROJECTS_DATA` | 3 | Empedrado, gas domiciliario, alarma vecinal |

**Imágenes:** Todas provienen de **Unsplash** mediante URLs directas con parámetros de optimización (`w=600&auto=format&fit=crop&q=80`).

### Persistencia con localStorage

3 módulos persisten datos del usuario en `localStorage`:

| Key | Módulo | Qué guarda |
|---|---|---|
| `barrio_negocios` | NegociosView | Array de negocios (incluye los nuevos registrados por el usuario) |
| `barrio_mascotas` | MascotasView | Array de mascotas (incluye nuevos reportes) |
| `barrio_afiliados` | AfiliacionView | Array de formularios de afiliación completados |

**Patrón de carga:**
```tsx
useEffect(() => {
  const stored = localStorage.getItem('barrio_negocios');
  if (stored) {
    try {
      setBusinesses(JSON.parse(stored));
    } catch (e) {
      setBusinesses(BUSINESSES_DATA); // fallback a datos mock
    }
  } else {
    setBusinesses(BUSINESSES_DATA);
  }
}, []);
```

---

## ✅ Patrones de Diseño y Buenas Prácticas

### Lo que se hace BIEN

1. **Separación de tipos:** Interfaces centralizadas en `types.ts`, datos en `data.ts`
2. **Componentes funcionales con hooks:** 100% funcional, sin clases
3. **Mobile-first responsive:** El CSS base aplica a móvil, los prefijos `tall:`, `sm:`, `md:` escalan progresivamente
4. **Breakpoint vertical custom (`tall`):** Innovador para adaptar la UI según la altura del dispositivo, muy útil para celulares con pantalla pequeña vs grande
5. **Props drilling controlado:** Solo se pasan `onShowNotification` y `onNavigate`, sin over-engineering
6. **Cleanup de efectos secundarios:** La sirena de audio se detiene correctamente en el `useEffect` de cleanup
7. **Fallback de datos:** Si `localStorage` tiene datos corruptos, se cae a los datos mock
8. **Tipado estricto:** Las categorías y estados usan union types de TypeScript
9. **UX consistente:** Todos los componentes siguen el mismo patrón visual (título → búsqueda/filtros → lista de tarjetas → modales de detalle)
10. **Accesibilidad básica:** `alt` en imágenes, `title` en botones, estructura semántica (`header`, `nav`, `main`, `aside`)
11. **`referrerPolicy="no-referrer"`** en imágenes externas para privacidad y para evitar bloqueos CORS

### Lo que se puede mejorar

1. **No hay React Router:** Sin URLs para cada sección, sin historial de navegación, sin deep linking
2. **No hay gestión de estado global:** Sin Context API, sin Zustand/Redux — todo es prop drilling y estado local
3. **Formularios sin validación robusta:** Solo validación básica HTML (`required`) y una comprobación mínima en JS
4. **Fechas hardcoded:** "Hoy 24 de mayo 2026" y "Sábado, 24 de Mayo de 2026" están hardcoded en la UI
5. **Búsqueda no funcional en AlarmaView:** El input de búsqueda captura el estado pero no filtra nada
6. **Imágenes externas (Unsplash):** Dependencia de URLs externas — si Unsplash cambia o se cae, las imágenes se rompen
7. **`index.html` no tiene SEO:** El título es "My Google AI Studio App", sin meta description ni favicon
8. **El `lang` del HTML es "en" pero la app está en español**
9. **No hay tests:** Ni unitarios, ni de integración, ni e2e
10. **No hay lazy loading:** Todos los componentes se cargan al inicio

---

## 🐛 Problemas Encontrados y Soluciones

### Problema 1: Git no instalado en Windows

**Síntoma:** Al intentar hacer `git push`, la terminal mostró: *"El término 'git' no se reconoce como nombre de un cmdlet"*

**Causa:** Git no estaba instalado en la máquina Windows.

**Solución:** Descargar e instalar Git desde https://git-scm.com/download/win con opciones por defecto.

---

### Problema 2: Assets y rutas rotas en GitHub Pages

**Síntoma:** La app se desplegaba pero CSS, JS e imágenes no cargaban (rutas 404).

**Causa:** Vite por defecto asume que la app está en la raíz (`/`), pero GitHub Pages la sirve desde un subdirectorio (`/barrio-el-trigal/`).

**Solución:** Configurar `base` en `vite.config.ts`:
```ts
base: '/barrio-el-trigal/',
```

Y usar `import.meta.env.BASE_URL` para las rutas de assets estáticos como el logo:
```tsx
<img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" />
```

---

### Problema 3: Node.js obsoleto en GitHub Actions

**Síntoma:** Warning de deprecación de Node.js 20 en el workflow de CI/CD.

**Solución:** Actualizar `node-version` a `24` en `.github/workflows/deploy.yml`.

---

### Problema 4: `npm ci` fallaba por falta de `package-lock.json`

**Síntoma:** Error *"Dependencies lock file is not found"* en GitHub Actions al usar `npm ci`.

**Causa:** El proyecto nuevo no tenía `package-lock.json` comiteado.

**Solución:** Se cambió temporalmente `npm ci` por `npm install` y se removió la caché de npm del workflow. Después de generar el lockfile localmente con `npm install` y comitearlo, se podría reactivar.

---

### Problema 5: Despliegue fallaba en GitHub Pages (permisos)

**Síntoma:** GitHub Actions compilaba bien pero fallaba al desplegar con error *"Status: Failed to deploy to github-pages"*.

**Causa:** Dos problemas de configuración en GitHub:
1. El repositorio era **privado** (las cuentas gratuitas no permiten Pages en repos privados)
2. La fuente de Pages no estaba configurada como "GitHub Actions"

**Solución:**
1. Cambiar el repositorio a **público** (Settings → Danger Zone → Change visibility)
2. En Settings → Pages → Source: seleccionar **"GitHub Actions"**

---

### Problema 6: CSS `roundeduppercase` pegado

**Síntoma:** En `MascotasView.tsx` (línea 140), la clase `roundeduppercase` no aplica ningún estilo.

**Causa:** Falta un espacio entre las clases Tailwind `rounded` y `uppercase`.

**Estado:** **No corregido** en v1. Impacto visual menor (el badge de tipo de mascota no tiene bordes redondeados ni texto en mayúsculas).

---

### Problema 7: Texto "Safe" residual en la tabla de afiliados

**Síntoma:** En `AfiliacionView.tsx` (línea 282), la celda de dirección muestra el texto "Safe" al final.

**Causa:** Residuo de desarrollo/debugging.

**Estado:** **No corregido** en v1.

---

## 🚀 Despliegue (CI/CD)

### GitHub Actions Workflow

Archivo: `.github/workflows/deploy.yml`

**Trigger:** Push a las ramas `main` o `master`, o ejecución manual (`workflow_dispatch`).

**Pipeline:**
1. Checkout del código
2. Setup Node.js 24
3. `npm install`
4. `npm run build` (Vite genera los archivos estáticos en `./dist`)
5. Configura GitHub Pages
6. Sube el artifact (`./dist`)
7. Despliega a GitHub Pages

**Permisos requeridos:**
- `contents: read`
- `pages: write`
- `id-token: write`

**Concurrencia:** Solo un despliegue a la vez. Los runs en cola se cancelan.

### Comandos de Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (puerto 3000, accesible en red local)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Limpieza
npm run clean

# Chequeo de tipos TypeScript
npm run lint
```

---

## ⚠️ Limitaciones Conocidas

| # | Limitación | Impacto | Solución sugerida |
|---|---|---|---|
| 1 | Sin backend ni base de datos | Los datos se pierden al limpiar el navegador | Integrar Firebase/Supabase |
| 2 | Sin autenticación de usuarios | Cualquiera puede registrar negocios/mascotas | Implementar auth (Firebase Auth, etc.) |
| 3 | Imágenes externas de Unsplash | Depende de servicios terceros | Migrar a assets locales u hosting propio |
| 4 | Sin notificaciones push reales | Solo toasts visuales en la app | Integrar Firebase Cloud Messaging (FCM) |
| 5 | Alarma sonora solo local | Solo suena en el dispositivo del usuario | Requiere backend para notificaciones masivas |
| 6 | Fechas hardcoded | No se actualizan dinámicamente | Usar `Date()` para fechas dinámicas |
| 7 | Sin PWA | No funciona offline ni se puede instalar | Agregar Service Worker + manifest.json |
| 8 | `title` del HTML genérico | SEO deficiente | Actualizar `<title>` y agregar meta tags |
| 9 | Sin internacionalización | Solo en español | No necesario para el caso de uso actual |
| 10 | Dependencias innecesarias | `@google/genai`, `express`, `motion` sin usar | Eliminar o activar según necesidad |

---

## 🔮 Guía para Futuras Versiones

### Reglas Críticas para Desarrolladores / IAs

1. **Mantener el tema oscuro.** El fondo principal es `#070707`, las tarjetas `#1a1a1a`, los bordes `gray-800`. NO cambiar a modo claro sin rediseñar toda la paleta.

2. **Respetar la variante `tall`.** No eliminar el `@custom-variant tall`. Es fundamental para que la app se vea bien en celulares con pantallas de 5" a 6.7"+.

3. **El `base` de Vite es `/barrio-el-trigal/`.** Si se cambia el nombre del repo, DEBE actualizarse este valor. Y el logo se carga con `${import.meta.env.BASE_URL}logo.png`.

4. **Los colores de marca son:**
   - Amarillo dorado `#ffd700` → Acciones principales, alarma inactiva
   - Verde esmeralda `#4ae183` → Estados de éxito, verificaciones
   - Rojo peligro `#e74c3c` → Alarma activa

5. **Las claves de localStorage son:**
   - `barrio_negocios`
   - `barrio_mascotas`
   - `barrio_afiliados`
   - Cualquier nueva funcionalidad con persistencia DEBE usar el prefijo `barrio_`

6. **La sirena de audio es sensible.** Si se modifica `AlarmaView.tsx`, asegurar que el `useEffect` de cleanup siga llamando a `stopSiren()` al desmontar. De lo contrario, la sirena seguirá sonando al cambiar de tab.

7. **Iconos:** Usar exclusivamente `lucide-react`. No mezclar con otras librerías de iconos.

8. **Imágenes:** Siempre incluir `referrerPolicy="no-referrer"` en `<img>` con URLs externas.

9. **Formularios:** Los inputs deben seguir el patrón visual existente: `bg-black text-white rounded-lg border border-gray-800 text-xs focus:outline-none focus:border-brand-yellow`.

10. **Modales:** Todos los modales siguen la misma estructura: `fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4`.

### Ideas para v2

- [ ] **React Router** para URLs navegables y deep linking
- [ ] **PWA** con Service Worker para funcionamiento offline
- [ ] **Firebase** para persistencia de datos real y autenticación
- [ ] **Notificaciones Push** con FCM
- [ ] **Mapa interactivo** del barrio (Leaflet/MapBox)
- [ ] **Galería de fotos** de eventos y proyectos
- [ ] **Chat vecinal** en tiempo real
- [ ] **Modo administrador** para la directiva del barrio
- [ ] **Activar Framer Motion** (ya instalado) para animaciones premium
- [ ] **Tests:** Jest + React Testing Library + Playwright para e2e
- [ ] **Corregir bugs conocidos:** `roundeduppercase`, texto "Safe", fechas hardcoded, `tipoAdherente`

---

> **Este documento debe actualizarse con cada versión mayor del proyecto.**
> Cualquier AI o desarrollador que trabaje en este proyecto DEBE leer este documento antes de hacer cambios.

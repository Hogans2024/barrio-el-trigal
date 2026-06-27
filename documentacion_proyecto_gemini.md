# Documentación de Análisis del Proyecto - Gemini

Este documento ha sido generado por Gemini para proporcionar un resumen claro de la estructura lógica del proyecto, centrándose en el flujo de trabajo del CMS, la integración entre las herramientas de Google, GitHub Pages y el Frontend.

## 1. Arquitectura General

La aplicación web "Barrio El Trigal" utiliza una arquitectura innovadora **Serverless** que aprovecha el ecosistema de Google y GitHub para operar a costo cero de infraestructura de servidores o bases de datos tradicionales.

Los pilares de la arquitectura son:
- **Frontend**: Una Single Page Application (SPA) desarrollada con React (Vite + TypeScript).
- **Backend / API**: Funciones en la nube a través de Google Apps Script.
- **Base de Datos**: Un documento de Google Sheets (`1eZCHP8x9ttXtIIvG6nA4v43NzqK11V7_Wkw375LzQ1U`).
- **Hosting y CI/CD**: Despliegue de los estáticos usando GitHub Pages apoyado por GitHub Actions.

Existen dos flujos de datos principales totalmente independientes:
1. **Flujo de Entrada (POST)**: Formularios enviados desde la App hacia Google Sheets.
2. **Flujo de Salida (CMS - PUT)**: Cambios en Google Sheets que se propagan hacia la App web.

---

## 2. El Flujo del CMS (Content Management System) Dinámico

El corazón del dinamismo de esta aplicación "estática" reside en la capacidad de modificar el contenido sin tocar el código.

### 2.1. Gestión de Datos (Google Sheets)
Las hojas dentro del documento (como `Proyectos`, `Eventos`, `Farmacias`, `Negocios`, `Mascotas`) funcionan como tablas de una base de datos relacional. La **primera fila** de estas hojas establece la estructura del objeto JSON (ej. `id`, `title`, `imageUrl`).

### 2.2. Evento Disparador (Google Apps Script)
Un script de Google Apps Script (`Code.gs`) tiene configurado un evento (trigger) llamado `onEdit`.
- Cuando un administrador modifica cualquier celda en las hojas designadas para el CMS, el script detecta el cambio.
- El script lee todos los datos de estas pestañas y los estructura en un objeto JSON unificado.

### 2.3. Sincronización con el Repositorio (GitHub API)
- El mismo `Code.gs` utiliza un Token de Acceso Personal (PAT) para conectarse a la API REST de GitHub.
- Toma el objeto JSON compilado y hace una petición `PUT` directamente sobre el archivo `public/data.json` en la rama `main` del repositorio de GitHub (`Hogans2024/barrio-el-trigal`).

### 2.4. Despliegue Automático (GitHub Pages y Actions)
- La sobreescritura del archivo `data.json` genera un nuevo commit en `main`.
- Este commit dispara un flujo de trabajo de GitHub Actions (`deploy.yml`).
- El workflow reconstruye el proyecto de Vite (`npm run build`) y despliega la nueva versión con el `data.json` actualizado hacia GitHub Pages.
- En aproximadamente 2 minutos, los cambios de Sheets se ven reflejados en la página web pública.

---

## 3. Flujo del Formulario de Afiliación (Entrada de Datos)

La aplicación web también sirve para recolectar datos de los vecinos (como la afiliación).
- La interfaz de React recopila la información, la formatea en un JSON y la envía mediante una petición `POST` (Fetch API) a la **Web App URL** proporcionada por Google Apps Script.
- La función `doPost(e)` en `Code.gs` intercepta la solicitud.
- Primero valida el token de seguridad y asegura que los campos obligatorios vengan en el cuerpo.
- Tras sanitizar la información para prevenir inyecciones, se utiliza `hoja.appendRow()` para insertar los datos exclusivamente en la pestaña oculta `Datos` en el Google Sheet, manteniendo un registro seguro y secuencial.

---

## 4. El Interfaz Frontend (React + Vite)

El frontend está estructurado para consumir y renderizar los datos proveídos por la arquitectura antes descrita.

### 4.1. Consumo de Datos Estáticos
- Cuando un usuario accede a la web, React invoca el Custom Hook `useSheetData.ts` o directamente realiza un `fetch('/data.json')` local.
- Como `data.json` está alojado en la carpeta `public/` y es actualizado por el flujo de GitHub, la app siempre lee la versión más reciente del momento de su compilación.

### 4.2. Estructura y Navegación
- **Sin Enrutador**: No utiliza librerías como React Router. La navegación se administra íntegramente en `App.tsx` usando un estado `activeTab` que renderiza condicionalmente diferentes componentes de "vistas" (`AlarmaView`, `EventosView`, `NegociosView`, etc.).
- **Datos en Cascada**: El estado raíz provee a las "vistas" la información necesaria pasándola a través de *Props*.

### 4.3. UI y Experiencia de Usuario
- Diseñado bajo la premisa "Mobile-First" utilizando Tailwind CSS.
- Se ha implementado un breakpoint personalizado (`tall:`) que ajusta la interfaz tomando en cuenta la altura del dispositivo.
- Componentes interactivos como la central de alarmas con **Web Audio API** y la persistencia de favoritos o de negocios creados localmente a través de `localStorage` (`barrio_negocios`, `barrio_mascotas`, `barrio_afiliados`).
- Usa íconos unificados con `Lucide React` y fuentes modernas (Hanken Grotesk y Geist).

---

## Conclusión

El proyecto "Barrio El Trigal" es un excelente ejemplo de una arquitectura serverless desacoplada. 
El frontend de React proporciona una experiencia premium sin incurrir en costos operativos, ya que la responsabilidad de almacenamiento y API recae en la dupla gratuita de Google Apps Script + Google Sheets, mientras que el hosting es soportado enteramente por la infraestructura estática de GitHub Pages.

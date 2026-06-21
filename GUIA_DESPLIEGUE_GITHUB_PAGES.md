# Guía Definitiva: Subir una App de Google AI Studio (React + Vite) a GitHub Pages

Esta guía detalla los pasos exactos y los obstáculos comunes (con sus soluciones) al intentar desplegar un proyecto generado por Google AI Studio hacia GitHub Pages.

## Prerrequisitos
Un proyecto creado en Google AI Studio normalmente utiliza **React**, **TypeScript (TSX)** y **Vite**. Esta combinación es perfecta para GitHub Pages porque genera un sitio web completamente estático.

---

## Pasos para el Despliegue

### Paso 1: Instalar Git en el sistema
**El Problema:** Al intentar ejecutar comandos en la terminal para subir el código a GitHub, apareció el error: `El término 'git' no se reconoce como nombre de un cmdlet...`. Esto significa que el "motor" para subir código no estaba en la computadora.
**La Solución:** 
1. Descargar Git para Windows desde la [página oficial](https://git-scm.com/download/win).
2. Instalarlo con las opciones por defecto.
3. Una vez instalado, la terminal (y Visual Studio Code) ya pueden enviar código a GitHub.

### Paso 2: Configurar la ruta base en `vite.config.ts`
Si el repositorio se va a llamar `mi-proyecto`, la URL final será `https://usuario.github.io/mi-proyecto/`. Para que Vite sepa encontrar los archivos (CSS, JS, imágenes), hay que configurar la ruta base.
**Solución:** Abrir el archivo `vite.config.ts` y añadir la propiedad `base`:
```typescript
export default defineConfig(() => {
  return {
    base: '/nombre-del-repositorio/', // <-- ESTO ES VITAL
    plugins: [react(), tailwindcss()],
    // ...
  };
});
```

### Paso 3: Crear la automatización con GitHub Actions
GitHub Pages no sabe cómo compilar React por sí solo. Necesita instrucciones.
**Solución:** Crear un archivo llamado `.github/workflows/deploy.yml` en el proyecto con las instrucciones para que un servidor de GitHub haga `npm run build` y publique la carpeta `dist`.

> **Problema que tuvimos aquí:** El código inicial del archivo `deploy.yml` generó dos errores en GitHub Actions:
> 1. *Advertencia de Node.js 20 obsoleto.* -> **Solución:** Se cambió la configuración a `node-version: 24`.
> 2. *Error "Dependencies lock file is not found" al usar el comando `npm ci`.* (Esto pasa porque los proyectos nuevos no tienen el archivo `package-lock.json` todavía).
>
> **La Solución Definitiva:** 
> Se eliminó la instrucción de caché (`cache: 'npm'`) del archivo `deploy.yml` temporalmente, y se cambió `npm ci` por `npm install`. Más tarde, al ejecutar `npm install` localmente, se generó y subió el archivo `package-lock.json`, lo que permitió volver a activar la caché.

### Paso 4: Configurar los permisos del repositorio en GitHub
**El Problema:** La Acción de GitHub corría perfectamente la compilación, pero fallaba en el último paso mostrando un error: `"Status: Failed to deploy to github-pages"`.
**La Solución:** Este es un bloqueo de permisos de la propia plataforma de GitHub. Se arregló haciendo dos cosas fundamentales en la página web del repositorio:
1. **Hacer el repositorio Público:** Las cuentas gratuitas de GitHub no permiten usar Pages en repositorios Privados. Hubo que ir a *Settings > Danger Zone > Change repository visibility* y pasarlo a **Public**.
2. **Cambiar la fuente de Pages:** Hubo que ir a *Settings > Pages* y en la sección *Source*, cambiar la opción por defecto a **"GitHub Actions"**.

### Paso 5: Forzar la actualización
Una vez configurado todo lo anterior, el último paso es hacer un *commit* (puede ser vacío) y subirlo a la rama `main` para que la acción se dispare.
**Solución ejecutada:**
```bash
git commit --allow-empty -m "Forzar despliegue después de cambiar configuración"
git push origin main
```

---

## Conclusión
Con la configuración correcta de Vite, el archivo de automatización corregido sin restricciones de caché iniciales, y asegurando que el repositorio tenga visibilidad pública con Pages apuntando a "GitHub Actions", el proyecto se compila y publica de manera 100% exitosa y automatizada.

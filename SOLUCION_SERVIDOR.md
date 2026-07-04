# Solución: Problema al iniciar el servidor Vite desde el Shell Tool

## ¿Qué pasaba?

El **Shell Tool** es una herramienta que ejecuta comandos (como `npx vite`) pero con un **tiempo límite (timeout)**. Cuando ese tiempo se cumple, la herramienta **mata el proceso** automáticamente.

Cada vez que ejecutábamos `npx vite --port 5173 --base /barrio-el-trigal/` desde el Shell Tool, el servidor de desarrollo arrancaba correctamente, pero al cabo de unos segundos el Shell Tool lo terminaba. El servidor nunca quedaba corriendo de fondo, por eso la página web daba "pantalla blanca" o "no se puede conectar".

## ¿Cómo se solucionó antes de crear el .bat?

Se usó `Start-Process` con `cmd.exe` en ventana oculta desde PowerShell. Este comando lanza Vite como un **proceso independiente** del Shell Tool, por lo que el timeout del Shell Tool ya no lo afecta.

```powershell
Start-Process -WorkingDirectory "ruta/del/proyecto" `
  -FilePath "cmd.exe" `
  -ArgumentList "/c npx vite --port 5173 --base /barrio-el-trigal/" `
  -WindowStyle Hidden
```

## Soluciones para evitar este problema a futuro

### 1. Usar el archivo .bat (recomendado)

Ejecutar `INICIAR_SERVIDOR_SIN_SHELL_TOOLS.bat` hace doble clic. No depende del Shell Tool.

### 2. Usar Start-Process desde PowerShell

Si se necesita iniciar desde terminal, usar `Start-Process` con `-WindowStyle Hidden`.

### 3. Usar tareas programadas o scripts de inicio

Configurar el servidor como tarea programada de Windows para que inicie automáticamente al encender el equipo.

### 4. Si se vuelve a usar el Shell Tool

Pedir que inicie el servidor con un timeout más largo o usando `Start-Process`.

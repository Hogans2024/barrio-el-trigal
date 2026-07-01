# Pasos para levantar el servidor del proyecto (versión actual)

---

## Paso 1: Verificar dependencias

```powershell
npm install
```

Si ya estaban instaladas, muestra `up to date`.

---

## Paso 2: Matar procesos Node anteriores (opcional, si hay conflictos de puerto)

```powershell
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
```

---

## Paso 3: Iniciar el servidor Vite

Ejecutar desde la raíz del proyecto:

```powershell
cmd /c "start /B npm run dev -- --port=5173 --host=0.0.0.0"
```

> `cmd /c` ejecuta en cmd.exe de Windows.  
> `start /B` lanza el proceso en segundo plano sin ventana nueva.  
> `--port=5173` sobreescribe el puerto 3000 que viene por defecto en `package.json`.

---

## Paso 4: Verificar que el servidor está activo

```powershell
Get-Process -Name "node" -ErrorAction SilentlyContinue | Select-Object Id, ProcessName
```

Si aparece un proceso `node`, el servidor está corriendo.

---

## Paso 5: Acceder desde el navegador

Una vez que la consola muestra:

```
VITE v6.4.3  ready in 1157 ms
➜  Local:   http://localhost:5173/barrio-el-trigal/
```

Abrir en el navegador:

```
http://localhost:5173/barrio-el-trigal/
```

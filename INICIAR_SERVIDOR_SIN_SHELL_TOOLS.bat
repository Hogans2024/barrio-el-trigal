@echo off
cd /d "%~dp0"
echo Iniciando servidor Vite en http://localhost:5173/barrio-el-trigal/
npx vite --port 5173 --base /barrio-el-trigal/
pause

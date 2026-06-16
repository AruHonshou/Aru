@echo off
setlocal

pushd "%~dp0"
if errorlevel 1 (
  echo Failed to open the project folder.
  pause
  exit /b 1
)

rem Verificar Node.js
node --version >nul 2>nul
if errorlevel 1 (
  echo No se encontro Node.js.
  echo Instala Node.js y vuelve a ejecutar este archivo.
  pause
  exit /b 1
)
node -e "const [M,m]=process.versions.node.split('.').map(Number);process.exit((M===20&&m>=19)||(M===22&&m>=12)||M>22?0:1)" >nul 2>nul
if errorlevel 1 (
  echo Vite 8 requiere Node.js 20.19+ o 22.12+.
  echo Actualiza Node.js y vuelve a ejecutar este archivo.
  pause
  exit /b 1
)

rem Instalar dependencias si hace falta
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo npm install fallo.
    pause
    exit /b 1
  )
)

echo Iniciando Aru...
echo Cierra la ventana del servidor para detener la app.

start "Aru" /D "%~dp0" cmd /k "npx vite"

popd
endlocal

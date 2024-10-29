@echo off
set downloading=false
set devServer=true

where /Q npm
IF ERRORLEVEL 1 (
    echo Please ensure npm is installed!
    exit /b 1
)

for %%x in (%*) do (
   if "%%~x" == "--downloading" set downloading=true
   if "%%~x" == "--prod" set devServer=false
)

if %downloading% == true (
    echo Downloading remix files...
    npm i @remix-run/node @remix-run/react @remix-run/serve isbot@4 react react-dom
    npm i -D @remix-run/dev vite
)

if %devServer% == true (
    echo Running dev server...
    npm run dev
) ELSE (
    echo Running prod server...
    npm run build
    npm start
)
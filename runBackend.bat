@echo off
set downloading=false
set exec=false

for %%x in (%*) do (
   if "%%~x" == "--downloadingDeps" set downloading=true
   if "%%~x" == "--exec" set exec=true
)

if %exec% == true (
    set downloading = false
) ELSE (
    where /Q go
    IF ERRORLEVEL 1  (
        echo go is not installed! Please either ensure it is installed or run `sh runBackend.sh --exec
        exit /b 1
    )
)


if %downloading% == true (
    echo Downloading go dependency files...
    go get
)

echo Running server...

if %exec% == true (
    backend\watchparty
) ELSE (
    go run backend\main.go
)


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
    go install
)

echo Running server...

CD backend
if %exec% == true (
    ./watchparty_windows.exe
) ELSE (
    go env -m CGO_ENABLED=1
    go run main.go
)


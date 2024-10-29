@echo off
setlocal
CD backend

set GOOS=linux
set GOARCH=amd64
go build -o watchparty_linuxamd64   

set GOOS=windows
go build -o watchparty_windows.exe    

set GOOS=darwin
go build -o watchparty_mac            

set GOARCH=arm64
go build -o watchparty_macARM        
endlocal
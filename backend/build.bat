@echo off
setlocal
GOOS=linux
GOARCH=amd64
go build -o watchparty_linuxamd64 # Modern linux

GOOS=windows
go build -o watchparty_windows    # Modern windows

GOOS=darwin
go build -o watchparty_mac        # Intel-Processor Macs

GOARCH=arm64
go build -o watchparty_macARM     # Silicon-Processor Macs

endlocal
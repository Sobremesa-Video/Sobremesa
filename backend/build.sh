env GOOS=linux GOARCH=amd64 go build -o watchparty_linuxamd64     # Modern linux
env GOOS=darwin GOARCH=amd64 go build -o watchparty_mac           # Intel-Processor Macs
env GOOS=darwin GOARCH=arm64 go build -o watchparty_macARM        # Silicon-Processor Macs
env GOOS=windows GOARCH=amd64 go build -o watchparty_windows.exe  # Modern windows




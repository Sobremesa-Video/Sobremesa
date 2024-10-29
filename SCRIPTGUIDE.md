# runFrontend
## Bash
    sh runFrontend.sh {--prod} {--downloading}

## Windows
    runFrontend.bat {--prod} {--downloading}

* prod: Dev server or production server, defaults to false
* downloading: pre-emptively download remix project files & dependencies, defaults to false

# runBackend
## Bash
    sh runBackend.sh {--downloadingDeps}

## Windows
    runBackend.bat {--downloadingDeps}

* downloadingDeps: download go modules, defaults to false

### If you do not have go installed, add the flag `--exec`




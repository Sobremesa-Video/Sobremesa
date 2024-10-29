#!/bin/bash

downloading=false;
exec=false;


for arg in "$@"
do
  if [ "$arg" == "--downloadingDeps" ]
    then downloading=true
  elif [ "$arg" == "--exec" ]
    then exec=true
   fi
done

if $exec
  then
    downloading=false
  else
    goVer="$(go version)"

    if [ "$goVer" == "" ]
      then
        echo "go is not installed! Please either ensure it is installed or run \`sh runBackend.sh --exec\`"
        exit 1
    fi
fi

cd backend || (echo "unable to access backend folder"; exit 1)

if $downloading
  then
    echo "Downloading go dependency files...";
    go get
fi

echo "Running server..."

if $exec
  then
    executable=""
    osName="$(uname)"
    processorType="$(uname -m)"
    if [ "$osName" == "Darwin" ]
      then
        if [ "$processorType" == "arm64" ]
          then executable="watchparty_macARM"
        else executable="watchparty_mac"
        fi
      else executable="watchparty_linuxamd64"
    fi

    ./$executable
else
  go run main.go
fi

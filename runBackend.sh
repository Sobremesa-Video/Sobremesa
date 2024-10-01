#!/bin/bash

downloading=false;

goVer="$(go version)"

if [ "$goVer" == "" ]
  then
    echo "Please ensure go is downloaded!"
    exit 1
fi

for arg in "$@"
do
  if [ "$arg" == "--downloadingDeps" ]
    then
      downloading=true
   fi
done

cd backend || (echo "unable to access backend folder"; exit 1)

if $downloading
  then
    echo "Downloading go dependencies files...";
    go get
fi

echo "Running server..."
go run main.go


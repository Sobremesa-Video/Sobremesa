#!/bin/bash

downloading=false;
devServer=true;

npmVer="$(npm -v)}"

if [ "$npmVer" == "" ]
  then
    echo "Please ensure npm is downloaded!"
    exit 1
fi

for arg in "$@"
do
  if [ "$arg" == "--prod" ]
    then
      devServer=false
  elif [ "$arg" == "--downloading" ]
    then
      downloading=true
   fi
done


if $downloading
  then
    echo "Downloading remix files...";
    npm i @remix-run/node @remix-run/react @remix-run/serve isbot@4 react react-dom
    npm i -D @remix-run/dev vite
fi

if $devServer
  then
    echo "Running dev server..."
    npm run dev
else
    echo "Running prod server..." #TODO add port stuff here later
      npm run build
      npm start
fi


#!/bin/bash

# get current directory
export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

#rm -rf ../src/css
compass compile -e production --force --sass-dir=$DIR/../src/scss --css-dir=$DIR/../src/css --images-dir=$DIR/../static/images --javascripts-dir=$DIR/../static/js
cp -r ../src/scss/*.map ../src/css
#cp -r ../src/scss/*.map /Users/jmoon/development/ftg-poc/target/classes/WEB-INF/src/css

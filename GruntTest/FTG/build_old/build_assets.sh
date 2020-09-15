#!/bin/bash

# Arnold Media Static Asset Build Script
# @author Jae Moon

# Note : for Js Plugin CSS, rename *.css to *.scss and copy to scss folder. Add those file to style.scss using import
#
#  https://nodejs.org/en/
#
#  sudo gem install sass
#  sudo gem install compass
#  sudo npm install uglify-js
#  sudo npm install -g onchange
#
#  which compass
#  export COMPASS=/usr/bin/compass;
#  export COMPASS=/usr/local/bin/compass;
#
#
#  sudo npm install -g onchange
#  onchange ../src -- ./build_assets.sh
#
#  onchange ../src/scss -- ./build_css_only.sh



# get current directory
export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

# find COMPASS
export COMPASS=/usr/local/bin/compass;
#  export COMPASS=/usr/local/bin/compass;


#find Emacs
# export EMACS=/usr/bin/emacs;

# find NodeJS
if [ -f /usr/local/bin/node ]
  then
    export NODE=/usr/local/bin/node;
elif [ -f /opt/local/bin/node ]
  then
    export NODE=/opt/local/bin/node;
fi



rm -rf ../static


# compress COMPASS if exists
if [ -f $COMPASS ]

then
  # Combine and compress SASS files
  echo "[INFO] ----------------------------------------------------";
  echo "[INFO]  Compressing SASS file(s):";
  echo "[INFO] ----------------------------------------------------";
#  $COMPASS compile -e production --force --sass-dir=$DIR/../src/scss --css-dir=$DIR/../static/css --images-dir=$DIR/../static/images --javascripts-dir=$DIR/../static/js
#  cp -r ../src/scss/*.map ../static/css

  compass compile -e production --force --sass-dir=$DIR/../src/scss --css-dir=$DIR/../src/css --images-dir=$DIR/../static/images --javascripts-dir=$DIR/../static/js
  cp -r ../src/scss/*.map ../src/css
  mkdir -p ../static/css
  cp -r ../src/css/* ../static/css


  echo "[INFO]";
  echo "[INFO] CSS compression complete.";
  echo "[INFO]";

else

  echo "[INFO] ----------------------------------------------------";
  echo "[INFO]  ERROR: Please install sass.";
  echo "[INFO]  http://sass-lang.com";
  echo "[INFO] ----------------------------------------------------";
  echo "[INFO]";

fi

# check for node, use it if exists
if [ -f $NODE ]

then

  echo "[INFO] ----------------------------------------------------";
  echo "[INFO]  Using NodeJS w/ UglifyJS (will create /target dir)";
  echo "[INFO] ----------------------------------------------------";

  # $NODE $DIR/build_js.js;
  # node ./build/build_js.js;
  $NODE ./build_js.js

  mkdir -p ../static/js/plugins
  cp -r ../src/js/plugins/* ../static/js/plugins

  echo "[INFO] ";
  echo "[INFO] JavaScript module combination complete.";
  echo "[INFO] ";

else

  echo "[INFO] ------------------------------------------------------";
  echo "[INFO]  ERROR: Can't find NodeJS ";
  echo "[INFO] ------------------------------------------------------";

fi



echo "[INFO] ----------------------------------------------------";
echo "[INFO]  Copying Fonts";
echo "[INFO] ----------------------------------------------------";
mkdir -p ../static/fonts
cp -r ../src/fonts/* ../static/fonts
echo "[INFO] ";
echo "[INFO]  Completed Copying Fonts";
echo "[INFO] ";


echo "[INFO] ----------------------------------------------------";
echo "[INFO]  Copying Images";
echo "[INFO] ----------------------------------------------------";
mkdir -p ../static/images
cp -r ../src/images/* ../static/images
echo "[INFO] ";
echo "[INFO]  Completed Copying Images";
echo "[INFO] ";


echo "[INFO] ----------------------------------------------------";
echo "[INFO]  Copying Extra";
echo "[INFO] ----------------------------------------------------";
mkdir -p ../static/extra
cp -r ../src/extra/* ../static/extra
echo "[INFO] ";
echo "[INFO]  Completed Copying Extra Files";
echo "[INFO] ";


echo "[INFO] ----------------------------------------------------";
echo "[INFO]  Finished All Package Build";
echo "[INFO] ****************************************************";

















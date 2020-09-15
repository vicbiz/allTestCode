
:: *** Install RubyInstaller
:: http://rubyinstaller.org/downloads/
:: Ruby 2.2.3 or latest
:: 
:: *** Install Compass for CSS
:: gem install compass
::
:: *** Install SASS
:: gem install sass
::
:: *** Install uglify-js inside build folder
:: npm install uglify-js
::
:: npm install -g onchange
:: onchange ../src -- ./build_assets.sh
::


@echo off

cls
echo ***********************************
echo Start Asset Building
echo ***********************************
rd /s/q ..\static


md ..\static
md ..\static\js
md ..\static\js\plugins

node .\build_js.js

xcopy /E ..\src\js\plugins ..\static\js\plugins > temp
echo --------------------------------
echo .......... Finished JS build

md ..\static\images
xcopy /E ..\src\images ..\static\images > temp
echo .......... Finished Copying Images

md ..\static\include
xcopy /E ..\src\include ..\static\include > temp
echo .......... Finished Copying Include Files

md ..\static\bootstrap
xcopy /E ..\src\bootstrap ..\static\bootstrap > temp
echo .......... Finished Copying Bootstrap

compass compile -e production --force -c build_sass_compass.rb > temp
echo .......... Finished CSS Build
echo --------------------------------

del temp

echo .
echo .
echo ***********************************
echo Finished All Asset Build
echo ***********************************
echo .
echo .


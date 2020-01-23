#!/bin/bash

if [ $1 ]
then
    onchange ../src/scss -- ./build_css_only.sh
else
    echo 'No Param, try to add theme as param';
    echo 'Example : ./onCssChange.sh';
fi
#!/bin/bash
# This is a comment!
echo Hello World        # This is a comment, too!

echo "Printing text"
echo -n "Printing text without newline"
echo -e "\nRemoving \t special \t characters\n"


BGRED=`echo -e "\033[41m"`
FGBLUE=`echo -e "\033[35m"`
BGGREEN=`echo -e "\033[42m"`

NORMAL=`echo -e "\033[m"`

echo "${FGBLUE} Text in blue ${NORMAL}"
echo "Text normal"
echo "${BGRED} Background in red"
echo "${BGGREEN} Background in Green and back to Normal ${NORMAL}"


BGRED1=`printf '\33[41m'`
NORMAL1=`printf '\33[m'`
printf '%s\n' "${BGRED1}Text on red background${NORMAL1}"


((sum = 123 + 345))

echo $sum

# cd ./Groovy
# ls -lsa
# pwd


mongod --dbpath ~/data/db


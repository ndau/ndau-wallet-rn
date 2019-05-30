#! /bin/bash

# This is a temporary work around to address the following issue
# https://github.com/zo0r/react-native-push-notification/issues/1043
if [ -d "node_modules/react-native-push-notification/.git" ]; 
  then rm -R "node_modules/react-native-push-notification/.git"; 
fi
#!/bin/bash
rm -rf node_modules/react-native-camera/ios/FaceDetector
cp node_modules/react-native-camera/postinstall_project/projectWithoutFaceDetection.pbxproj node_modules/react-native-camera/ios/RCTCamera.xcodeproj/project.pbxproj
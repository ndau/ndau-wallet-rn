#! /bin/bash

# Download an object from S3
download_from_s3() {
    bucket=$1
    name=$2
    prefix=$3

    echo "Making remote-content directory"
    mkdir remote-content

    echo "Pulling S3 resource: https://s3.amazonaws.com/${bucket}/${prefix}/${name}"
    curl -o remote-content/${name} "https://s3.amazonaws.com/${bucket}/${prefix}/${name}"
}

if [ "$1" ] && [ "$2" ]; then
    bucket=$1
    version=$2
    ndaufonts="ndau-fonts"
    ndautxmobile="ndau-txmobile"

    if [ $bucket == "$ndaufonts" ]; then
        echo "downloading ndau-fonts assets"
        rm -R remote-content
        rm -R assets/fonts
        rm -R android/app/src/main/assets/fonts

        download_from_s3 $bucket FontAwesome5_Pro_Light.ttf $version
        download_from_s3 $bucket OpenSans-Bold.ttf $version
        download_from_s3 $bucket OpenSans-Italic.ttf $version
        download_from_s3 $bucket OpenSans-Light.ttf $version
        download_from_s3 $bucket OpenSans-Regular.ttf $version
        download_from_s3 $bucket TitilliumWeb-Bold.ttf $version
        download_from_s3 $bucket TitilliumWeb-Italic.ttf $version
        download_from_s3 $bucket TitilliumWeb-Light.ttf $version
        download_from_s3 $bucket TitilliumWeb-Regular.ttf $version
        download_from_s3 $bucket MaterialIcons-Regular.ttf $version
        download_from_s3 $bucket untitled-font-1.ttf $version

        echo "copy all ndau-fonts content to assets folder"
        mkdir -p assets/fonts
        mkdir -p android/app/src/main/assets/fonts
        cp -Rf remote-content/* assets/fonts
        cp -Rf remote-content/* android/app/src/main/assets/fonts
    elif [ $bucket == "$ndautxmobile" ]; then
        echo "downloading ndau-txmobile assets"
    else
        echo "ndau-fonts and ndau-txmobile are only supported at present"
    fi
else
    echo "Bucket and version are required."
    echo "Usage: download_from_s3 ndau-fonts vX.Y.Z"
fi

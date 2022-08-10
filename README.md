# ndau-wallet-rn
React Native implementation of the ndau wallet application


<h2>Software Versions</h2>

These instructions are current as of the following releases:

node v16.15.1</br>
npm 8.11.0</br>
Cocoapods 1.11.2</br>
react: 17.0.2</br>
react-native: 0.68.2,
<h2>Build Instructions</h2>

The font assets used by the ndau wallet app are specified in the .npmrc file in the ndau-wallet-rn folder. As these are licensed fonts they are not included here. Contact a member of the core team to get the access token you will need.

     @fortawesome:registry=https://npm.fontawesome.com/</br>
     //npm.fontawesome.com/:_authToken=YOUR_TOKEN_HERE</br>
Replace YOUR_TOKEN_HERE with the FontAwesomePro token. The text above is correct - @fortawesome is not a typo. Now npm install:

     npm install
 <b>Note:Please try it on real Device,Due to some packages does not support in emulator.</b></br>
 
 <h2>Troubleshooting</h2>
<b>Error:</b> Unable to resolve module stream from D:\Project\node_modules\cipher-base\index.js: stream could not be found within the project or in these directories:
  node_modules</br>
  1 | var Buffer = require('safe-buffer').Buffer</br>
> 2 | var Transform = require('stream').Transform</br>
    |                          ^
  3 | var StringDecoder = require('string_decoder').StringDecoder</br>
  4 | var inherits = require('inherits')
</br>
     
     
     install npm i stream 


<b>A problem occurred evaluating project ':randombytes'.</b>
> Could not find method compile() for arguments [com.facebook.react:react-native:0.13.+] on object of type org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler.

 Cannot find module '@babel/plugin-transform-shorthand-properties'

   add package.json devdependency
   
     "@babel/preset-env":"7.18.0",




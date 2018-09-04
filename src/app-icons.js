// Define all your icons once,
// load them once,
// and use everywhere

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
const icoMoon = createIconSetFromIcoMoon(icoMoonConfig);

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'ndau-icon': [ 28, '#fff', icoMoon ],
  cog: [ 30, '#fff', FontAwesome ]
};

const defaultIconProvider = FontAwesome;

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
  new Promise.all(
    Object.keys(icons).map((iconName) => {
      const Provider = icons[iconName][2] || defaultIconProvider; // FontAwesome
      return Provider.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1]
      );
    })
  ).then((sources) => {
    Object.keys(icons).forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));

    // Call resolve (and we are done)
    resolve(true);
  });
});

export { iconsMap, iconsLoaded };

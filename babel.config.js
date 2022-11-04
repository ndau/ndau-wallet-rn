module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      {
        globals: ['__scanCodes'],
      },
      'react-native-reanimated/plugin',
    ],
  ],
};

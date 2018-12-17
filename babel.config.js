module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  ignore: ['**/keyaddr.js', './node_modules']
}

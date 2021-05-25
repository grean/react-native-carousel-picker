/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const pak = require('../package.json');
const path = require('path');

///Users/rgb/Projects/tests/react-native-carousel-picker
const root = path.resolve(__dirname, '..');

///Users/rgb/Projects/tests/react-native-carousel-picker/example
console.log(`process ${process.cwd()}`);
console.log(`dirname ${__dirname}`);

const extraNodeModules = {
  [pak.name]: root,

};

const watchFolders = [
  root,
];
module.exports = {
  projectRoot: __dirname,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    useWatchman: true,
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from pak.name to local node_modules
        name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`)
    }),
  },
  watchFolders,
};

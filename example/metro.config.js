/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

var list = [/\/__tests__\/.*/];

function escapeRegExp(pattern) {
  if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
    // the forward slash may or may not be escaped in regular expression depends
    // on if it's in brackets. See this post for details
    // https://github.com/nodejs/help/issues/3039. The or condition in string
    // replace regexp is to cover both use cases.
    // We should replace all forward slashes to proper OS specific separators.
    // The separator needs to be escaped in the regular expression source string,
    // hence the '\\' prefix.
    return pattern.source.replace(/\/|\\\//g, '\\' + path.sep);
  } else if (typeof pattern === 'string') {
    // Make sure all the special characters used by regular expression are properly
    // escaped. The string inputs are supposed to match as is.
    var escaped = pattern.replace(/[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    // convert the '/' into an escaped local file separator. The separator needs
    // to be escaped in the regular expression source string, hence the '\\' prefix.
    return escaped.replace(/\//g, '\\' + path.sep);
  } else {
    throw new Error('Unexpected exclusion pattern: ' + pattern);
  }
}

function exclusionList(additionalExclusions) {
  return new RegExp(
    '(' +
    (additionalExclusions || [])
      .concat(list)
      .map(escapeRegExp)
      .join('|') +
    ')$',
  );
}

const pak = require('../package.json');
const escape = require('escape-string-regexp');
const path = require('path');

///Users/rgb/Projects/tests/react-native-carousel-picker
const root = path.resolve(__dirname, '..');

///Users/rgb/Projects/tests/react-native-carousel-picker/example
console.log(`root ${root}`);
console.log(`process ${process.cwd()}`);
console.log(`dirname ${__dirname}`);

const extraNodeModules = {
  [pak.name]: root,
};

const modules = Object.keys({
  ...pak.peerDependencies,
});

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
    blacklistRE: exclusionList(modules.map((m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`))),
    extraNodeModules: modules.reduce((acc, name) => {
      const lol = path.join(__dirname, 'node_modules', name);
      console.log(`name ${lol}`)
      acc[name] = lol
      return acc;
    }, {}),
    // extraNodeModules: new Proxy(extraNodeModules, {
    //   get: (target, name) => {
    //     if (name in target) {
    //       console.log(`target[name] ${target[name]}`)
    //     } else {
    //       console.log(`path  ${path.join(process.cwd(), `node_modules/${name}`)}`)
    //     }
    //     return name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`)
    //     //redirects dependencies referenced from pak.name to local node_modules
    //   }
    // }),
  },
  watchFolders,
};

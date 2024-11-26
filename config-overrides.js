const { override, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackResolve({
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      url: require.resolve('url'),
      buffer: require.resolve('buffer/'), // Add this line for the buffer polyfill
      vm: require.resolve('vm-browserify'), // Add the vm polyfill here
    },
  })
);

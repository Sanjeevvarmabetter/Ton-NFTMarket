const webpack = require('webpack');

module.exports = {
  // Other Webpack configurations...
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/')
    }
  },
  plugins: [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
  ],
};

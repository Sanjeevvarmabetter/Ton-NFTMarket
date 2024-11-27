module.exports = {
    // other configurations
    resolve: {
      fallback: {
        fs: false,
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        stream: require.resolve("stream-browserify"),
        tty: require.resolve("tty-browserify"),
        zlib: require.resolve("browserify-zlib")
      }
    }
  };
  
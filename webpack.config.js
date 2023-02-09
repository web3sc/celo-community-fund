module.exports = {
    //...
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify") ,
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify") ,
        "os": require.resolve("os-browserify/browser"),
        "stream": false,
        "url": require.resolve("url/"),
        
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              cacheDirectory: true,
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    },
  };
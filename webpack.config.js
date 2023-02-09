module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
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
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              cacheDirectory: true,
              presets: ['react', 'es2015']
            }
          }
        ],
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
      }
    },
  };
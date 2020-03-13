module: {
    rules: [
    
      {
        test: /\.s?css$/,
        exclude: [resolvePath('../src/styles')],
        use: [
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCase',
              modules: true
            }
          },
          'sass-loader',
          'import-glob-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] 
      }
    ]
    }
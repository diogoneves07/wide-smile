const path = require('path'); // eslint-disable-line

const defaults = {
  watch: true,
  devtool: 'source-map',

  // bundling mode
  mode: 'development',

  // file resolutions
  resolve: {
    extensions: ['.ts', '.js'],
  },

  // entry files
  entry: './wide-smile.ts',

  // loaders
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = [
  {
    ...defaults,
    // output bundles (location)
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'wide-smile.js',
    },
  },

  {
    ...defaults,

    // output bundles (location)
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'wide-smile.min.js',
      library: {
        type: 'umd',
        name: 'wS',
        export: 'default',
      },
    },
  },
  {
    ...defaults,

    experiments: {
      outputModule: true,
    },

    // output bundles (location)
    output: {
      path: path.resolve(__dirname, './'),
      filename: 'wide-smile.es.js',
      library: {
        type: 'module',
      },
    },
  },
];

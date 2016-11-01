import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base';

const config = {
  ...baseConfig,

  entry: {
    main: [
      'babel-polyfill',
      './app/renderer/main/index',
    ],
    menubar: [
      'babel-polyfill',
      './app/renderer/menubar/index',
    ],
  },

  output: {
    ...baseConfig.output,

    path: path.join(__dirname, 'dist', 'renderer'),
    publicPath: '../dist/',
    filename: '[name]/index.js',
  },

  module: {
    ...baseConfig.module,

    loaders: [
      ...baseConfig.module.loaders,

      {
        test: /\.global\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader'
        ),
      },

      {
        test: /^((?!\.global).)*\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ),
      },
    ],
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new ExtractTextPlugin('[name]/style.css', { allChunks: true }),
  ],

  target: 'electron-renderer',
};

export default config;

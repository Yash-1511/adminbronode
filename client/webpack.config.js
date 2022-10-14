const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    bundle: './src/index.jsx',
    vendor: [
      'axios',
      'react-router-dom',
      '@material-ui/core',
      '@material-ui/icons',
      '@material-ui/lab',
      'bcryptjs',
      'firebase',
      'material-ui-popup-state',
      'react',
      'react-avatar-editor',
      'react-dom',
      'react-facebook-login',
      'react-google-login',
      'react-multi-carousel',
      'react-redux',
      'react-select',
      'redux',
      'redux-form',
      'redux-thunk',
      'video-react',
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|ttf|otf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new DuplicatePackageCheckerPlugin(),
    new ManifestPlugin({
      seed: {
        gcm_sender_id: '103953800507',
      },
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'public/firebase-messaging-sw.js'),
    }),
    new Dotenv(),
  ],
  devServer: {
    port: 3000,
    open: 'chrome',
    historyApiFallback: {
      disableDotRule: true,
    },
    overlay: true,
    stats: 'minimal',
    inline: true,
    compress: true,
    contentBase: path.join(__dirname, 'public'),
    // openPage: 'category'
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'performance-now': path.resolve(
        __dirname,
        'node_modules/performance-now'
      ),
      '@babel/runtime': path.resolve(__dirname, 'node_modules/@babel/runtime'),
      'react-is': path.resolve(__dirname, 'node_modules/react-is'),
      isarray: path.resolve(__dirname, 'node_modules/isarray'),
    },
  },
};

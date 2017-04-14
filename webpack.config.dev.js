const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { DefinePlugin, HotModuleReplacementPlugin, NamedModulesPlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    'app': [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './index.js'
    ],
    'admin/cms': './admin/index.js'
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  context: resolve(__dirname, 'src'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader', 
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: '/images/'
            }
          },
        ],
      },
      {
        test: /\.(pdf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'pdfs/',
            publicPath: '/pdfs/'
          }
        }
      },
      {
        test: /\.md$/, 
        use: 'markdown-with-front-matter-loader'
      },
      {
        test: /\.(yml)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'admin/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
        BROWSER: JSON.stringify(true)
      },
    }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['admin/cms'],
      template: './admin/index.html',
      filename: 'admin/index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: './index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin(
      [
        {
          from: './assets/static/',
          to: 'assets'
        }
      ], 
      {debug: 'info'}
    )
  ]
};

module.exports = config;
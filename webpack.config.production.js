const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ReactStaticPlugin = require('react-static-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const publicPath = 'https://www.mobilizehere.com/';

module.exports = {
  devtool: 'source-map',
  target: 'web',
  context: __dirname,
  entry: {
    'app': './src/index.js',
    'admin/cms': './src/admin/index.js',
    'autotracker': './src/autotracker.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: publicPath,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(true)
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
          screw_ie8: true,
          keep_fnames: true
      },
      compress: {
          screw_ie8: true,
          warnings: false,
          dead_code: true
      },
      comments: false,
      sourceMap: true
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      cache: {
        "short_name": "Mobilize",
        "name": "Mobilize Here",
        "start_url": "/"
      }
    }),
    new HtmlWebpackPlugin({
      chunks: ['admin/cms'],
      template: './src/admin/index.html',
      filename: 'admin/index.html'
    }),
    new ReactStaticPlugin({
      routes: './src/components/Routes.js',
      template: './src/Html.js',
      reduxStore: './src/reducers/store.js',
      publicPath: publicPath
    }),
    new CopyWebpackPlugin(
      [
        {
          from: './src/assets/static/',
          to: 'assets'
        }
      ], 
      {debug: 'warning'}
    )
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!autotrack|dom-utils)/,
        include: [
          path.join(__dirname, 'src'), 
          path.join(__dirname, 'node_modules', 'autotrack'), 
          path.join(__dirname, 'node_modules', 'dom-utils')
        ],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 2,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'stylus-loader' },
          ],
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 10000, mimetype: 'mimetype=application/font-woff' },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
      {
        test: /\.(pdf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'pdfs/',
            publicPath: `${publicPath}pdfs/`
          }
        }
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader', 
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: `${publicPath}images/`
            }
          },
        ],
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
    ],
  },
};
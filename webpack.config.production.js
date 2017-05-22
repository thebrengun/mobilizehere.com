const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ReactStaticPlugin = require('react-static-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RSSPlugin = require('./src/plugins/RSSPlugin/RSSPlugin');

const publicPath = 'https://www.mobilizehere.com/';
//const publicPath = 'http://127.0.0.1:8080/';

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
        "start_url": "/",
        "background_color": "#fafeff",
        "theme_color": "#fafeff",
        "icons": [
          {
            src: publicPath + 'images/apple-icon-57x57.png', 
            type: "image/png", 
            sizes: "57x57"
          },
          {
            src: publicPath + 'images/apple-icon-60x60.png', 
            type: "image/png", 
            sizes: "60x60"
          },
          {
            src: publicPath + 'images/apple-icon-72x72.png', 
            type: "image/png", 
            sizes: "72x72"
          },
          {
            src: publicPath + 'images/apple-icon-76x76.png', 
            type: "image/png", 
            sizes: "76x76"
          },
          {
            src: publicPath + 'images/apple-icon-114x114.png', 
            type: "image/png", 
            sizes: "114x114"
          },
          {
            src: publicPath + 'images/apple-icon-120x120.png', 
            type: "image/png", 
            sizes: "120x120"
          },
          {
            src: publicPath + 'images/apple-icon-144x144.png', 
            type: "image/png", 
            sizes: "144x144"
          },
          {
            src: publicPath + 'images/apple-icon-152x152.png', 
            type: "image/png", 
            sizes: "152x152"
          },
          {
            src: publicPath + 'images/apple-icon-180x180.png', 
            type: "image/png", 
            sizes: "180x180"
          },
          {
            src: publicPath + 'images/android-icon-192x192.png', 
            type: "image/png", 
            sizes: "192x192"
          },
          {
            src: publicPath + 'images/favicon-32x32.png', 
            type: "image/png", 
            sizes: "32x32"
          },
          {
            src: publicPath + 'images/favicon-96x96.png', 
            type: "image/png", 
            sizes: "96x96"
          },
          {
            src: publicPath + 'images/favicon-16x16.png', 
            type: "image/png", 
            sizes: "16x16"
          },
          {
            src: publicPath + 'images/ms-icon-144x144.png', 
            type: "image/png", 
            sizes: "144x144"
          },
          {
            src: publicPath + 'images/splash.png', 
            type: "image/png", 
            sizes: "512x512"
          },
        ]
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
      publicPath: publicPath,
      manifest: 'manifest.json'
    }),
    new CopyWebpackPlugin(
      [
        {
          from: './src/assets/static/',
          to: 'assets'
        }
      ], 
      {debug: 'warning'}
    ),
    new RSSPlugin({
      entry: './src/RSSFeed.js',
      output: 'podcast.rss'
    }),
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
            publicPath: `${publicPath}`
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
              publicPath: `${publicPath}`
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
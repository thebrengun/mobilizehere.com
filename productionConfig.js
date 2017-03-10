const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ReactStaticPlugin = require('react-static-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

//const publicPath = 'http://127.0.0.1:3000/';
const publicPath = 'https://mobilizehere.com/';

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: {
    app: [
      './src/index.js'
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: publicPath,
  },

  plugins: [
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      screw_ie8: true,
      sourceMap: true,
      compressor: { warnings: false },
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      cache: {
        "short_name": "Mobilize",
        "name": "Mobilize Here",
        "start_url": "/"
      }
    }),
    new ReactStaticPlugin({
      routes: './src/components/Routes.js',
      template: './src/Html.js',
      reduxStore: './src/reducers/store.js',
      publicPath: publicPath
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader',
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
    ],
  },
};
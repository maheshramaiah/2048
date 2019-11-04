const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const PwaManifestWebpackPlugin = require('pwa-manifest-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: __dirname + '/docs',
    publicPath: '/2048/',
    filename: 'bundle.js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /(\.scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.(png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: path.resolve(__dirname, 'src/assets')
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    port: 3000,
    open: true,
    openPage: '2048/'
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      precacheManifestFilename: 'precache.[manifestHash].js'
    }),
    new PwaManifestWebpackPlugin({
      name: '2048',
      short_name: '2048',
      icon: {
        src: path.resolve('src/assets/icon.png'),
        sizes: [512, 384, 192, 152, 144, 128, 96, 72]
      },
      start_url: '/2048/',
      theme_color: '#b1063f',
      background_color: '#e4e4e4'
    })
  ]
};

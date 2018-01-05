const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const SRC = path.resolve(__dirname, './src');
const DIST = path.resolve(__dirname, './dist');

const baseConfig = {
  entry: {
    vendors: ['react', 'react-dom', 'react-redux', 'react-router', 'redux'],
  },
  output: {
    publicPath: '/',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        exclude: ['node_modules', '__tests__'],
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 30000,
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(bmp|gif|png|jpg|jpeg|svg)?$/,
        loader: ['url-loader?limit=1024'],
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production'
            ? JSON.stringify('production')
            : JSON.stringify('development'),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new ProgressBarPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', SRC],
  },
};

const devConfig = merge.smart(baseConfig, {
  entry: {
    app: ['react-hot-loader/patch', 'webpack/hot/only-dev-server', './src/index.tsx'],
  },
  output: {
    filename: '[name].bundle.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    compress: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    inline: true,
    port: 3001,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});

const productionConfig = merge.smart(baseConfig, {
  entry: {
    app: `${SRC}/index.tsx`,
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: DIST,
  },
});

module.exports = isProduction ? productionConfig : devConfig;

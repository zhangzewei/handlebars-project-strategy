const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");


const IS_DEV = process.env.NODE_ENV === 'dev';
const dist = IS_DEV ? 'dist-dev' : 'dist';

const jsFiles = glob.sync('src/pages/**/js/*.js');
const entryObj = {};
jsFiles.forEach((path) => {
  const filename = path.split('/')[2];
  entryObj[filename] = ['./' + path, '@babel/polyfill'];
});

const config = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'eval' : 'source-map',
  entry: entryObj,
  output: {
    filename: '[name]/js/[name].js',
    path: path.resolve(__dirname, dist),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      },
      {
        test: /\.hbs$/, loader: "handlebars-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 0,
              name: '[name].[ext]',
              fallback: 'file-loader',
              outputPath: 'public/images',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'public/[name].[ext]',
          esModule: false,
        },
      }
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/css/[name].css',
      chunkFilename: '[name]/css/[name].css',
    }),
    new HandlebarsPlugin({
      entry: path.join(process.cwd(), "src", "pages", "*", "*.hbs"),
      output: path.join(process.cwd(), dist, "[name]", "index.html"),
      partials: [
        path.join(process.cwd(), "src", "components", "*", "*.hbs"),
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, dist),
    watchContentBase: true,
    hot: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;

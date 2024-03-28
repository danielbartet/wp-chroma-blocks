const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

const extractConfig = {
  use: [
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            autoprefixer({
              overrideBrowserslist: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9',
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: {
        additionalData: '@import "./src/common.scss";\n',
        sassOptions: {
          outputStyle: 'compressed',
        },
      },
    },
  ],
};

module.exports = {
  mode: 'production',
  entry: {
    'blocks.build': path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: shouldUseSourceMap ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader].concat(extractConfig.use),
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'blocks.style.build.css',
    }),
    new MiniCssExtractPlugin({
      filename: 'blocks.editor.build.css',
    }),
    new DependencyExtractionWebpackPlugin(), // Agrega esta línea
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    })],
  },
};

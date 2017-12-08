// tslint:disable: object-literal-sort-keys

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const TsCheckerWebpackPlugin = require('ts-checker-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

// Variables
const isProduction = process.argv.indexOf('-p') >= 0

// Paths
// Note: Follows Create React App config paths structure.
// See: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/paths.js

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const paths = {
  appBuild: resolveApp('dist'),
  appIndex: resolveApp('src/index.tsx'),
  appSrc: resolveApp('src'),
  dotenv: resolveApp('.env'),
  tsConfig: resolveApp('tsconfig.json'),
  tslintConfig: resolveApp('tslint.json'),
}

// Environment
const env = process.env.NODE_ENV || 'development'

// Uses env files per environment as React Create App.
// See https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#what-other-env-files-can-be-used
// Implementation from https://github.com/facebookincubator/create-react-app/pull/1344/files
const dotenvFiles = [
  `${paths.dotenv}.${env}.local`,
  `${paths.dotenv}.${env}`,
  `${paths.dotenv}.local`,
  `${paths.dotenv}`,
]

// Load environment variables from .env* files. Suppress warnings.
// If this file is missing. dotenv won't change any environment variables.
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      silent: true,
      path: dotenvFile,
    })
  }
})

// Configuration
module.exports = {
  context: paths.appSrc,
  entry: {
    main: './index.tsx',
    vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'redux'],
  },
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: isProduction ? '[hash].js' : 'bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // https://github.com/Microsoft/TypeScript/issues/11677
    mainFields: ['main'],
    alias: {
      // Workaround for failing relative import of woff font files from typeface-roboto css.
      files: resolveApp('node_modules/typeface-roboto/files'),
    },
  },
  module: {
    loaders: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'awesome-typescript-loader?module=es6'
          : ['react-hot-loader/webpack', 'awesome-typescript-loader'],
      },
      // .graphql, .gql
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      // css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-import')({ addDependencyTo: webpack }),
                  require('postcss-url')(),
                  require('postcss-cssnext')(),
                  require('postcss-reporter')(),
                  require('postcss-browser-reporter')({ disabled: isProduction }),
                ],
              },
            },
          ],
        }),
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png(\?[a-z0-9]+)?$/, use: 'url-loader?limit=10000' },
      { test: /\.(svg|woff|woff2|eot|ttf|otf)(\?[a-z0-9]+)?$/, use: 'url-loader?limit=10000' },
      {
        test: /\.(jpg|png|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            emitFile: true,
            name: '[name].[ext]?[hash]',
            outputPath: '/',
            useRelativePath: isProduction,
          },
        },
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new TsCheckerWebpackPlugin({
      tsconfig: paths.tsConfig,
      tslint: paths.tslintConfig,
    }),
    new StyleLintPlugin({
      files: '**/*.@(c|le|sa|sc)ss', // Relative to context inherited from webpack.
      failOnError: isProduction, // Let webpack dev server run even with style lint errors, but fail the build.
      quiet: false, // Report errors to console.
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
      minChunks: Infinity,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL),
        API_URL_LOCALHOST: JSON.stringify(process.env.API_URL_LOCALHOST),
        REPORTS_URL: JSON.stringify(process.env.REPORTS_URL),
      },
    }),
  ],
  devServer: {
    contentBase: paths.appSrc,
    hot: true,
    stats: {
      warnings: false,
    },
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
}

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const env = process.env.NODE_ENV

function css(options) {
  const plugins = [
    autoprefixer(options.autoprefixer)
  ]

  // add cssnano if minify config present
  if (options.minify) plugins.push(require('cssnano')(options.cssnano))

  return { plugins }
}

module.exports = {
  devtool: 'source-map',
  matchers: { css: '*(**/)*.scss' },
  ignore: ['**/layout.html', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: '$'
          }
        ]
      }, 
      {
        test: /\.scss/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              precision: 6
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    })
  ],
  reshape: htmlStandards({
    parser: false,
    locals: { foo: 'bar' },
    minify: env === 'production'
  }),
  postcss: css({
    autoprefixer: { cascade: false },
    minify: env === 'production'
  }),
  babel: jsStandards({ modules: false })
}

const prettyFormat = require("pretty-format")
const webpack = require("webpack")
// @ts-ignore
const pkg = require("./package.json")

/**
 * @type {import ("webpack").Configuration}
 */
const webpackConfig = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        APP_VERSION: JSON.stringify(pkg["version-next-release"]),
      },
    }),
  ],
}

const output = prettyFormat(webpackConfig, {
  highlight: true,
  maxDepth: Infinity,
})
// tslint:disable-next-line:no-console
console.debug(output)

module.exports = webpackConfig

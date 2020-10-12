/** @format */

const path = require("path")
const sveltePreprocess = require("svelte-preprocess")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const preprocess = sveltePreprocess({ typescript: true })
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')


const config = (mode, isProductionMode = mode === "production") => ({
  mode,
  devtool: isProductionMode ? false : "source-map",
  devServer: {
    contentBase: "./public",
    hot: !isProductionMode,
    historyApiFallback: {
      index: '/index.html'
    },
    index: 'index.html'
  },
  entry: {
    index: ["./src/main.ts"],
    "service-worker": "./src/service-worker.ts"
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte", ".ts"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader-hot",
          options: {
            dev: !isProductionMode,
            preprocess,
            // NOTE emitCss: true is currently not supported with HMR
            emitCss: isProductionMode,
            hotReload: !isProductionMode,
            hotOptions: {
              noPreserveState: false,
              optimistic: true,
            },
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: { hmr: !isProductionMode },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      { test: /.*(?<!service-worker)\.ts$/, use: [{ loader: "ts-loader", options: { configFile: "tsconfig.json" } }] },
      { test: /service-worker\.ts$/, use: [{ loader: "ts-loader", options: { configFile: "tsconfig.sw.json" } }] },
      // {
      //   // test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
      //   test: /.*/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[path][name].[ext]",
      //         context: "./src/static"
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    //https://github.com/jantimon/html-webpack-plugin
    new CleanWebpackPlugin({ verbose: true }),
    new ExtractCssChunks({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({ title: "Svelte Minimal", scriptLoading:"defer" }),
    new FaviconsWebpackPlugin({ logo:'./static/images/logo.png', inject:true, template: './static/index.html' }) // svg works too!

  ],
})

module.exports = (env, argv) => {
  // mode is "production" or "development" or "none" https://webpack.js.org/configuration/mode/
  const mode = argv.mode || "development"
  console.info(`Webpack compile mode is "${mode}"`)
  return config(mode);
};

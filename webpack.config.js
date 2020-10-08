/** @format */

const path = require("path")
// svelte-preprocess for in-line (i.e. inside .svelte files) TypeScript, SASS, &tc
const sveltePreprocess = require("svelte-preprocess")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const preprocess = sveltePreprocess({ typescript: true })


const config = (mode, isProductionMode = mode==="production") => ({
  mode,
  devtool: isProductionMode? false : "source-map", 
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
    style: ["./src/styles/style.scss"],
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
            dev:!isProductionMode,
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
      { test: /\.ts$/, use: "ts-loader" },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              context: "./src/static"
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractCssChunks({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
})

module.exports = (env, argv) => {
  // mode is "production" or "development" or "none" https://webpack.js.org/configuration/mode/
  const mode = argv.mode || "development"
  console.info(`Webpack compile mode is "${mode}"`)
  return config(mode);
};

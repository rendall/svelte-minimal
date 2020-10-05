/** @format */

const path = require("path")
// svelte-preprocess for in-line (i.e. inside .svelte files) TypeScript, SASS, &tc
const sveltePreprocess = require("svelte-preprocess")
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const preprocess = sveltePreprocess({ typescript: true })

const mode = "development" // or "production"
const isProductionMode = mode === "production"


module.exports = {
	mode,
	devtool: isProductionMode ? false : "source-map",
	devServer: {
		contentBase: "./public",
		hot: !isProductionMode,
	},
	entry: {
		index: ["./src/main.ts"],
		style: ["./src/static/style.scss"],
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
						preprocess,
						// NOTE emitCss: true is currently not supported with HMR
						emitCss: isProductionMode,
						hotReload: !isProductionMode,
						hotOptions: {
							noPreserveState: false,
							noPreserveStateKey: "@!hmr",
							noReload: false,
							optimistic: false,
							acceptAccessors: true,
							acceptNamedExports: true,
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
}

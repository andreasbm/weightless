import { copy, defaultExternals, defaultOutputConfig, defaultPlugins, defaultProdPlugins, defaultServePlugins, isLibrary, isProd, isServe, workbox } from "@appnest/web-config";
import { join, resolve } from "path";
import pkg from "./package.json";

const folders = {
	src: resolve(__dirname, "src/demo"),
	dist: resolve(__dirname, "dist"),
	assets: resolve(__dirname, "assets"),
	dist_assets: resolve(__dirname, "dist/assets")
};

const files = {
	main: join(folders.src, "main.ts"),
	src_index: join(folders.src, "index.html"),
	src_robots: join(folders.src, "robots.txt"),
	src_sw_extension: join(folders.src, "sw-extension.js"),
	dist_sw_extension: join(folders.dist, "sw-extension.js"),
	dist_index: join(folders.dist, "index.html"),
	dist_robots: join(folders.dist, "robots.txt"),
	dist_service_worker: join(folders.dist, "sw.js")
};

export default [
	{
		// Module build
		input: {
			main: files.main
		},
		output: [
			defaultOutputConfig({
				format: "system",
				dir: folders.dist
			})
		],
		plugins: [
			...defaultPlugins({
				cleanConfig: {
					targets: [
						folders.dist
					]
				},
				copyConfig: {
					resources: [
						[folders.assets, folders.dist_assets]
					]
				},
				htmlTemplateConfig: {
					template: files.src_index,
					scriptType: "text/javascript",
					target: files.dist_index,
					transformScript: (({filename}) => `<script>System.import("/${filename}");</script>`),
					include: /main(-.*)?\.js$/,
					polyfillConfig: {
						features: ["systemjs", "web-components"]
					}
				},
				importStylesConfig: {
					globals: ["main.scss"]
				}
			}),

			// Serve
			...(isServe ? [
				...defaultServePlugins({
					serveConfig: {
						port: 1340,
						contentBase: folders.dist
					},
					livereloadConfig: {
						watch: folders.dist,
						port: 35730
					}
				})
			] : []),

			// Production
			...(isProd ? [
				...defaultProdPlugins({
					dist: folders.dist,
					minifyLitHtmlConfig: {
						verbose: false,
						// Exclude all files since we need the original formatting for the demo code blocks
						exclude: /.*/
					},
					compressConfig: {
						// Exclude everything since firebase compresses the files for us
						exclude: /.*/
					}
				}),
				copy({
					resources: [
						[files.src_robots, files.dist_robots],
						[files.src_sw_extension, files.dist_sw_extension]
					]
				}),
				workbox({
					mode: "generateSW",
					workboxConfig: {
						globDirectory: folders.dist,
						swDest: files.dist_service_worker,
						globPatterns: [`**/*.{js,png,html,css}`],
						importScripts: [`sw-extension.js`],
						runtimeCaching: [{
							urlPattern: /.*/,
							handler: "NetworkFirst"
						}]
					}
				})
			] : [])
		],
		external: [
			...(isLibrary ? [
				...defaultExternals(pkg)
			] : [])
		],
		treeshake: isProd,
		context: "window"
	}
	// !isServe && isProd ? {
	// 	// CJS build
	// 	input: {
	// 		main: files.main
	// 	},
	// 	output: [
	// 		defaultOutputConfig({
	// 			format: "cjs",
	// 			dir: folders.dist,
	// 			entryFileNames: "[name]-legacy-[hash].js",
	// 			chunkFileNames: "[name]-legacy-[hash].js",
	// 		})
	// 	],
	// 	plugins: [
	// 		...defaultPlugins({
	// 			htmlTemplateConfig: {
	// 				template: files.dist_index,
	// 				target: files.dist_index,
	// 				scriptType: "text/javascript",
	// 				transformScript: ({filename, scriptType}) => `<script nomodule type="${scriptType}" src="${filename}"></script>`,
	// 				include: /main(-.*)?\.js$/
	// 			},
	// 			importStylesConfig: {
	// 				globals: ["main.scss"]
	// 			}
	// 		}),
	// 		...defaultProdPlugins({
	// 			dist: folders.dist,
	// 			minifyLitHtmlConfig: {
	// 				verbose: false,
	// 				// Exclude all files since we need the original formatting for the demo code blocks
	// 				exclude: /.*/
	// 			}
	// 		}),
	// 		copy({
	// 			resources: [
	// 				[files.src_robots, files.dist_robots],
	// 				[files.src_sw_extension, files.dist_sw_extension]
	// 			]
	// 		})
	// 	],
	// 	treeshake: isProd,
	// 	context: "window"
	// } : undefined
];


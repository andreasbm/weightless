const {defaultResolvePlugins, defaultKarmaConfig} = require("@appnest/web-config");
const path = require("path");

module.exports = (config) => {
	config.set({
		...defaultKarmaConfig({
			rollupPlugins: defaultResolvePlugins(),
			karmaPlugins: [
				"karma-iframes"
			]
		}),
		basePath: "src",
		logLevel: config.LOG_INFO,
		preprocessors: {
			"**/*.test.+(ts|js)": ["rollup", "iframes"]
		},
		frameworks: ["mocha", "chai", "iframes"],
		client: {
			captureConsole: true,
			mocha: {
				bail: true
			}
		},
		customLaunchers: {
			Chrome_with_debugging: {
				base: "Chrome",
				chromeDataDir: path.resolve(__dirname, '.chrome')
			}
		}
	});
};
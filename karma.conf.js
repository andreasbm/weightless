const {defaultResolvePlugins, defaultKarmaConfig} = require("@appnest/web-config");

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
		}
	});
};
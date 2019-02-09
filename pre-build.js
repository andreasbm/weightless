const rimraf = require("rimraf");
const path = require("path");
const fs = require("fs-extra");
const outLib = "dist";

// TODO: Run "tsc -p tsconfig.build.json" from this script and rename it to "build".

async function preBuild () {
	await cleanLib();
	copySync("./package.json", `./${outLib}/package.json`);
	copySync("./README.md", `./${outLib}/README.md`);
}

function cleanLib () {
	return new Promise(res => {
		rimraf(outLib, res);
	});
}

function copySync (src, dest) {
	fs.copySync(path.resolve(__dirname, src), path.resolve(__dirname, dest));
}

preBuild().then(_ => {
	console.log(">> Prebuild completed");
});

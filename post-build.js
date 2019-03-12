const glob = require("glob");
const path = require("path");
const {copySync, readFile, outputFileSync, remove} = require("fs-extra");
const replaceExt = require("replace-ext");

const outLib = "dist";

/**
 * Makes the dist folder ready.
 * @returns {Promise<void>}
 */
async function postBuild () {
	rewrite(outLib);
	copyFile("./package.json", `./${outLib}/package.json`);
	copyFile("./README.md", `./${outLib}/README.md`);
	copyFile("./src/lib/style", `./${outLib}/src/lib/style`);
}

/**
 * Copies a file from a src to a dest.
 * @param src
 * @param dest
 */
function copyFile (src, dest) {
	copySync(path.resolve(__dirname, src), path.resolve(__dirname, dest));
}

/**
 * Returns whether the path has a .d.ts extention.
 * @param path
 * @returns {boolean}
 */
function isDeclaration (path) {
	return path.endsWith(".d.ts");
}

/**
 * Returns whether the path has a scss extention.
 * @param path
 * @returns {boolean}
 */
function isSCSS (path) {
	return path.endsWith(".scss");
}

/**
 * Rewrites files ending with .ts or .scss to .js instead.
 * @param path
 */
function rewrite (path) {
	glob(`${path}/**/*.{ts,scss}`, {}, function (err, files) {

		// Check if an error occurred.
		if (err) {
			throw err;
		}

		// Rewrite each file
		for (const file of files) {

			// Don't rewrite declaration files
			if (isDeclaration(file)) {
				continue;
			}

			rewriteFile(file);
			replaceExt(file, ".js");
		}
	})
}

/**
 * Rewrites a file.
 * @param path
 */
function rewriteFile (path) {
	readFile(path, (err, buffer) => {

		// If the file could not be read, abort!
		if (err != null) {
			throw err;
		}

		// Convert the buffer into a string
		let content = buffer.toString("utf8");

		// Replace the imports
		content = content.replace(/\.ts';/gm, ".js';");
		content = content.replace(/\.scss';/gm, ".scss.js';");

		// Write new file and remove old
		const ext = isSCSS(path) ? `.scss.js` : `.js`;
		outputFileSync(replaceExt(path, ext), content);
		remove(path);
	});
}


postBuild().then(_ => {
	console.log(">> Postbuild completed");
});

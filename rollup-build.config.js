import {importStyles} from "@appnest/web-config";
import ts from '@wessberg/rollup-plugin-ts';
import autoprefixer from 'autoprefixer';
import {generate} from 'escodegen';
import {parse} from 'esprima';
import {minify} from 'html-minifier';
import {createServer} from 'livereload';
import cssnano from 'cssnano';
import path from 'path';
import precss from 'precss';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import pkg from "./package.json";

const folders = {
	src: path.resolve(__dirname, "src/lib"),
	dist: path.resolve(__dirname, "dist"),
};

const files = {
	src_index: path.join(folders.src, "index.ts"),
	dist_index: path.join(folders.dist, "index.js")
};

const defaultConfig = {
	plugins: [
		progress(),
		cleaner({
			targets: [
				folders.dist
			]
		}),
		resolve(),
		importStyles({
			plugins: [
				precss(),
				autoprefixer(),
				cssnano({preset: ["default", {
					calc: false
				}]})
			]
		}),
		// Teaches Rollup how to transpile Typescript
		// https://github.com/wessberg/rollup-plugin-ts
		ts({
			transpiler: "typescript",
			// If your tsconfig is already called 'tsconfig.json', this option can be left out
			tsconfig: "tsconfig.build.json",
			exclude: ["node_modules/**/*.*"],
			// If there is no .browserslistrc within your project, and if your package.json doesn't include a Browserslist property, this option can be left out
			browserslist: false
		}),

		// At the moment, the majority of packages on NPM are exposed as CommonJS modules
		commonjs({
			include: "**/node_modules/**",
		})
	],
	external: [
		...Object.keys(pkg.dependencies),
		...Object.keys(pkg.devDependencies),
		"@appnest/focus-trap/debounce",
		"lit-html/directives/if-defined",
		"tslib"
	],
	treeshake: false,
	preserveModules: true
};

const configs = [
	{
		input: files.src_index,
		output: [
			{
				format: "esm",
				dir: folders.dist
			}
		],
		...defaultConfig
	},
];

export default configs;


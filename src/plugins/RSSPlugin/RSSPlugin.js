/*

	Most of this plugin borrows very heavily from the 
	react-static-webpack-plugin which is used to render this site.
	I was having some trouble with the child compiler and only (barely) 
	found my way by following along with the source of the react-static plugin.
	https://github.com/iansinnott/react-static-webpack-plugin/blob/master/src/utils.js

*/

const vm = require('vm');
const { jsdom, evalVMScript } = require('jsdom');
const Promise = require('bluebird');
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

function RSSPlugin(options) {
	if(!options.entry) {
		throw new Error('A valid entry file must be specified');
	}
	// Define compilation name and output name
	this.childCompilerName = options.compilerName || 'rss-plugin-compiler';
	this.outputFileName = options.outputFileName || 'RSSFeedCompiled.js';
	// To make child compiler work, you have to have a entry in the file system
	this.compilationEntry = options.entry;
	this.RSSFileName = options.output || 'feed.rss';
}

RSSPlugin.prototype.apply = function(compiler) {

	let asset, rawAssets = {}, extraneousAssets = [];

	// Listen to `make` event
    compiler.plugin('make', (compilation, callback) => {
	    // Creating child compiler with params
	    const childCompiler = compilation.createChildCompiler(this.childCompilerName, {
	      filename: this.outputFileName
	    });

	    // Everyone plugin does this, I don't know why
	    childCompiler.context = compiler.context;

	    // Add SingleEntryPlugin to make all this work
	    childCompiler.apply(new SingleEntryPlugin(compiler.context, this.compilationEntry, this.outputFileName));

	    childCompiler.plugin('this-compilation', (compilation) => {
	    	compilation.plugin('optimize-chunk-assets', (chunks, cb) => {
				const files = [];

				// Collect all asset names
				chunks.forEach((chunk) => {
					chunk.files.forEach((file) => files.push(file));
				});

				compilation.additionalChunkAssets.forEach((file) => files.push(file));

				rawAssets = files.reduce((agg, file) => {
					agg[file] = compilation.assets[file];
					return agg;
				}, {});

				// Update the extraneous assets to remove
				// TODO: This does not actually collect all the apropriate assets. What we
				// want is EVERY file that was compiled during this compilation, since we
				// don't want to output any of them. So far this only gets the associated
				// js files, like routes.js (with prefix)
				extraneousAssets = extraneousAssets.slice().concat(files.slice());

				cb();
			});
	    });

	    // Needed for HMR. Even if your plugin don't support HMR,
	    // this code seems to be always needed just in case to prevent possible errors
	    // childCompiler.plugin('compilation', (compilation) => {
	    //   if (compilation.cache) {
	    //     if (!compilation.cache[name]) {
	    //       compilation.cache[name] = {};
	    //     }

	    //     compilation.cache = compilation.cache[name];
	    //   }
	    // });

		// Run child compilation
		childCompiler.runAsChild((err, entries, childCompilation) => {
			callback(err);
		});

    });

    compiler.plugin('emit', (compilation, callback) => {
		// Delete delete our asset from output
		delete compilation.assets[this.outputFileName];
		delete compilation.assets[this.outputFileName + '.map'];

		asset = rawAssets[this.outputFileName] || compilation.assets[this.outputFileName];

		return new Promise(
			(resolve, reject) => {

				// Instantiate browser sandbox
		    	const doc = jsdom('<html><body></body></html>');
		    	const win = doc.defaultView;

				const script = new vm.Script(asset.source(), {
					filename: 'RSSScriptRunner',
					displayErrors: true
				});

		    	// Run it in the jsdom context
			    const rss = evalVMScript(win, script);

			    if(!rss) {
			    	reject('Script evaluation failed');
			    }
			    resolve(rss);
			}
		).then(rss => {
			compilation.assets[this.RSSFileName] = {
				source: function() {
					return rss.default;
				},
				size: function() {
					return rss.default.length;
				}
			};
		}).catch(console.error).finally(callback);
	});
};

module.exports = RSSPlugin;
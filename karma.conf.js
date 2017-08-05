'use strict';

// Karma configuration
module.exports = function(config) {
	config.set({

	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: './',

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ['browserify', 'jasmine'],

	// list of files / patterns to load in the browser
	files: [
		'node_modules/traceur/bin/traceur-runtime.js',
		//'app/**/test/**/init.ts',
		//'app/**/*.test.ts'
		'src/**/*.spec.ts'
	],

	// list of files to exclude
	//exclude: ['app/**/e2e/**/*'],

	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: {
		//'app/**/*.scss': ['scss'],
		//'app/**/test/**/init.ts': ['browserify'],
		//'app/**/*.test.ts': ['browserify']
		'src/**/*.spec.ts': ['browserify']
	},

	typescriptPreprocessor: {
		// options passed to the typescript compiler
		options: {
		sourceMap: true, // (optional) Generates corresponding .map file.
		target: 'es5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
		module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
		noImplicitAny: false, // (optional) Warn on expressions and declarations with an implied 'any' type.
		noResolve: true, // (optional) Skip resolution and preprocessing.
		removeComments: true, // (optional) Do not emit comments to output.
		concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
	},
	// transforming the filenames
	transformPath: function(path) {
		return path.replace(/\.ts$/, '.js');
	}
	},

	scssPreprocessor: {
		options: {
			sourceMap: true
		}
	},

	browserify: {
		debug: true,
		transform: [
			["stringify"], 
			['browserify-istanbul', {instrumenter: require('isparta')}]
		],
		plugin: [["tsify"]]
	},

	plugins: [
		'karma-phantomjs-launcher',
		"karma-browserify",
		'karma-sourcemap-loader',
		'karma-mocha',
		'karma-mocha-reporter',
		'karma-chai',
		'karma-sinon',
		'karma-coverage',
		'karma-scss-preprocessor',
		'karma-spec-json-reporter',
		'karma-html-detailed-reporter',
		'karma-jasmine'
	],

	// web server port
	port: 9876,

	// enable / disable colors in the output (reporters and logs)
	colors: true,

	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	logLevel: config.LOG_INFO,

	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: true,

	// When Karma is watching the files for changes, it will delay a new run until the current run is finished. Enabling this setting will cancel the current run and start a new run immediately when a change is detected.
	restartOnFileChange: false,

	// start these browsers
	// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	browsers: ['PhantomJS'],

	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	singleRun: false,

	// Concurrency level
	// how many browser should be started simultaneous
	concurrency: Infinity
	});
}; // module exports




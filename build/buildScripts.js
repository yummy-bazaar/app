// load modules/plugins
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';
const $ 				= gulpLoadPlugins();

// load file paths
import paths 			from './paths';


// TODO: 
// - use $ to load plugins more elegantly
// - use watchify or browserify-incremental module to speed up build time
// 		see: http://gulpjs.org/recipes/fast-browserify-builds-with-watchify.html
//			 https://github.com/jsdf/browserify-incremental
// - output source maps for scripts
//		see: https://sethlakowske.com/articles/gulp-browserify-source-maps/
//			 http://gulpjs.org/recipes/browserify-uglify-sourcemap.html
//			 https://gist.github.com/michalochman/d64360541a484e16817c
const browserify 	= require("browserify");
const browserifyInc = require('browserify-incremental');
const source 		= require('vinyl-source-stream');
const tsify 		= require("tsify");
const tscConfig 	= require('../tsconfig.gulp.json');
const stringify 	= require('stringify');
export default function buildScripts () {
	return  browserify({
				basedir: '.',
				debug: true,
				// TODO: use path module from core & paths.src.root to make src generic
				entries: ['src/main.ts'],
				exclude: tscConfig.exclude,
				sourceMaps: true,
				cache: {},
				packageCache: {}
			})
			.plugin(tsify)
			.transform(
				stringify, {
					appliesTo: { includeExtensions: ['.html','.styl'] },
					minify: false
				}
			)
			.bundle()
			.pipe(source('angular.app.js'))
			// TODO: use path module from core & paths.deploy.root to make dest generic
			.pipe(gulp.dest('deploy/assets'))
	;
}







/*
// load TS options
// TODO: use es6 imports
const tscConfig 	= require('../../tsconfig.json');


// export task
export default function buildScripts () {
	return gulp
			.src(tscConfig.include)
			// TODO: use $ to import gulp-ignore more elegantly
			.pipe(require('gulp-ignore').exclude(tscConfig.exclude))
			.pipe($.sourcemaps.init())     
			.pipe($.typescript(tscConfig.compilerOptions))
			.pipe($.sourcemaps.write('.')) 
			.pipe(gulp.dest(paths.deploy.root));
}
*/





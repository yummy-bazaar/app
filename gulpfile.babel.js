'use strict';

// node core modules
import * as path		from 'path';

// load plugins
import gulp 			from 'gulp';
import del 				from 'del';
import gulpLoadPlugins 	from 'gulp-load-plugins';
const $ 				= gulpLoadPlugins();

// load build modules
import copyTheme 		from './build/copyTheme';
import copyLibs 		from './build/copyLibs';
import lintScripts 		from './build/lintScripts';
import buildScripts 	from './build/buildScripts';
import watchDirs 		from './build/watchDirs';
import paths 			from './build/paths';



// clean dist dir
gulp.task(
	'clean:dist', 
	del.bind(
			null,
			path.join(
				paths.dist.root,
				'**','*'
			)
	)
);



// copy Shopify theme to dist
gulp.task(
	'copy:theme',
	['clean:dist'],
	copyTheme
);



// copy angular dependencies
gulp.task(
	'copy:libs', 
	['clean:dist'], 
	copyLibs
);



// lint scripts
// TODO: impl lint task
gulp.task(
	'lint:scripts', 
	['clean:dist'],
	lintScripts
);



// build scripts
// TODO: impl build script task
gulp.task(
	'build:scripts', 
	[
		'clean:dist',
		//'lint:scripts',
	], 
	buildScripts
);



// init build
// TODO:
// - change build process flow
// - on script change), only delete angular.app & run build:script
// - on theme change, only delete | copy changed file
// - on 3rd party lib change, only delete | copy changed file
gulp.task(
	'build',
	[
		'copy:theme',
		'copy:libs', 
		'build:scripts',
	]
);



// default 
gulp.task(
	'default', 
	['build'], 
	watchDirs
);






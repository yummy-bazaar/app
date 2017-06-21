'use strict';

// load modules/plugins
import gulp 			from 'gulp';
import del 				from 'del';
import watch 			from 'gulp-watch';
import gulpLoadPlugins 	from 'gulp-load-plugins';
const $ 				= gulpLoadPlugins();


// load file paths
import paths 			from './build/paths';

// load tasks
import build 			from './build/build'










// deploy assets to Dev store
gulp.task(
			'deploy:dev', 
			build.deployDev
);



// init build
gulp.task(
			'build', 
			[ 
				'deploy:dev',
			]
);



// default 
gulp.task(
			'default', 
			['build'], 
			build.watch
);






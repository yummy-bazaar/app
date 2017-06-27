'use strict';

// node core modules
import * as path	from 'path';

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
			build.copyTheme
);



// copy angular dependencies
gulp.task(
			'copy:libs', 
			['clean:dist'], 
			build.libs
);



// lint scripts
// TODO: impl lint task
gulp.task(
			'lint:scripts', 
			['clean:dist'],
			build.lint
);



// build scripts
// TODO: impl build script task
gulp.task(
			'build:scripts', 
			[
				'clean:dist',
				//'lint:scripts',
			], 
			build.scripts
);



// deploy assets to Dev store
// TODO: impl this task
//			- it should just deploy assets once then let watch task handle CD
gulp.task(
			'deploy:dev', 
			[
				'copy:theme'
			],
			//build.deployDev
);



// init build
gulp.task(
			'build',
			[
				'copy:theme',
				'copy:libs', 
				'build:scripts',
				//'deploy:dev',
			]
);



// default 
gulp.task(
			'default', 
			['build'], 
			build.watch
);






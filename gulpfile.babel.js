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








// clean shopify theme dirs from dist
gulp.task(
			'clean:theme', 
			del.bind(
					null,
					paths.theme.map(
						(dir) => path.join(
										paths.dist.root,
										dir
						)
					)
			)
);



// copy Shopify theme to dist
// TODO: impl this task
gulp.task(
			'copy:theme',
			['clean:theme'],
			//build.copyTheme
);




// deploy assets to Dev store
// TODO: impl this task
//			- it should just deploy assets once then let watch task handle CD
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






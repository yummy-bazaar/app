'use strict';

// node core modules
import * as path	from 'path';

// load modules/plugins
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';
const $ 				= gulpLoadPlugins();

// load file paths
import paths 			from './paths';


export default function copyTheme () {
	return gulp
			.src(
				path.join(
							paths.src.root,
							paths.theme.root,
							'**',
							'*'
				)
			)
			.pipe(gulp.dest(paths.deploy.root));
}






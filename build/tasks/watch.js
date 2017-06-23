'use strict';

// node core modules
import * as path	from 'path';

// load modules/plugins
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';
const $ 				= gulpLoadPlugins();

// load file paths
import paths 			from '../paths';


// import API creds
import credentials		from '../_secrets/api.creds.dev'


// export task
export default function watchDirs () {

	// watch Theme changes in src
	// TODO: build watch functions dynamically
	//			- iterate through each theme subdir from src and copy content to respectiv dist dir
	//			- next I need to find a way to call each of the commands from newMap
	$.watch(
			'src/theme/assets/**/*',
			() => gulp.start('copy:theme')
	);
	$.watch(
			'src/theme/layout/**/*',
			() => gulp.start('copy:theme')
	);
	$.watch(
			'src/theme/config/**/*',
			() => gulp.start('copy:theme')
	);
	$.watch(
			'src/theme/snippets/**/*',
			() => gulp.start('copy:theme')
	);
	$.watch(
			'src/theme/templates/**/*',
			() => gulp.start('copy:theme')
	);
	$.watch(
			'src/theme/locales/**/*',
			() => gulp.start('copy:theme')
	);


	// watch Theme changes in dist
	// TODO: refactor the Dir sourcing for this task
	//			- use paths object
	$.watch(
		'./dist/+(assets|layout|config|snippets|templates|locales)/**'
	)
	.pipe(
		// TODO: use es6 imports with $ to handle this more elegantly
		require('gulp-shopify-upload')(
					credentials.apiKey, 
					credentials.password,
					credentials.endpoint,
					credentials.themeId
		)
	);
}




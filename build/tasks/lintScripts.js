// load modules/plugins
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';
const $ 				= gulpLoadPlugins();

// load file paths
import paths 			from '../paths';


// export task
// TODO: plugins are not loaded correctly
export default function lintScripts () {
	return gulp
			.src(paths.src.scripts)
			.pipe(tslint())
			.pipe(tslint.report('verbose'));
}


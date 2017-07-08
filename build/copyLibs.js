// load modules/plugins
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';
const $ 				= gulpLoadPlugins();

// load file paths
import paths 			from './paths';


// export task
export default function copyLibs () {
	return gulp
			.src(
				paths.src.libs
			)
			// TODO: use path module from core & paths.dist.root to make dest generic
			.pipe(gulp.dest('dist/assets'))
}


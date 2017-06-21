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


	// watch assets then push to Dev store
	return $.watch('./+(assets|layout|config|snippets|templates|locales)/**')
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


'use strict';

// node core modules
import * as path	from 'path';

// load modules/plugins
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';
const $ 				= gulpLoadPlugins();

// load file paths
import paths 			from '../paths';


// import Shopify API creds
//import credentials		from '../_secrets/api.creds.dev'


// config Shopify plugin opts
let opts = {
  "basePath": "./dist"
};


// Export task
export default function deployDev () {

	// Debug
	//console.log('dev creds are: ', credentials)

//	return gulp
//			.src(
//				'./dist/+(assets|layout|config|snippets|templates|locales)/**'
//				//path.join(
//				//	paths.dist.root,
//				//	'**','*'
//				//)
//			)
//			.pipe(
//				// TODO: use es6 imports with $ to handle this more elegantly
//				require('gulp-shopify-upload')(
//					credentials.apiKey, 
//					credentials.password,
//					credentials.endpoint,
//					credentials.themeId
//				)
//			);
}






// load tasks
import copyTheme	from './tasks/copyTheme';
import copyLibs		from './tasks/copyLibs';
import lintScripts 	from './tasks/lintScripts';
import buildScripts	from './tasks/buildScripts';
import deployDev 	from './tasks/deployDev';
import watchDirs	from './tasks/watch';


// create task bag
let build = {
	copyTheme: 	copyTheme,
	libs: 		copyLibs,
	// TODO: make linting generic. define func to also process styles & views
	lint: 		lintScripts,
	scripts: 	buildScripts,
	deployDev: 	deployDev,
	watch: 		watchDirs,
};


// export task bag
export default build;
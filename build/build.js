// load tasks
import copyTheme	from './tasks/copyTheme';
import copyLibs		from './tasks/copyLibs';
import deployDev 	from './tasks/deployDev';
import watchDirs	from './tasks/watch';


// create task bag
let build = {
	copyTheme: 	copyTheme,
	libs: 		copyLibs,
	deployDev: 	deployDev,
	watch: 		watchDirs,
};


// export task bag
export default build;
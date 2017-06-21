// load tasks
import deployDev 	from './tasks/deployDev';
import watchDirs	from './tasks/watch';


// create task bag
let build = {
	deployDev: 	deployDev,
	watch: 		watchDirs,
};


// export task bag
export default build;
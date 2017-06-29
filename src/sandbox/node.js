'use strict';

// node core modules
import * as path	from 'path';


// load file paths
import paths 			from '../../build/paths';


// run test

let ouput = 
path.join(
	paths.dist.root,
	'**','*'
)


// print result to stdOut
console.log(typeof ouput);
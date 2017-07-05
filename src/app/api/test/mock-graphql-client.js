/**
*
*	GraphQL client
*	--------------
*	this is a client module for querying a graphql backend
*
*	documentation: 
*	https://github.com/graphql/graphql-js/tree/master/src
*		
*	- usage:
*	https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsQuery-test.js
*
*/
'use strict';


// Debug
console.log('\n\nBEGIN PROCESS\n\n');
process.on('exit',()=>console.log('\n\nEND PROCESS\n\n'));




// import modules
import { graphql }		from 'graphql';








// define Schema
import {schema} 		from './schema/tutorial'





// define query
const query 	= `
query PostsForAuthor {
  author(id: 2) {
    firstName
    posts {
      title
      votes
    }
  }
}
`;






// Debug
graphql(
		schema, 
		query
	)
	.then(
		res => console.log(JSON.stringify(res,null,4))
	)
	.catch(console.error);













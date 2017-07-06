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
import { buildClientSchema } 	from 'graphql';
import * as introspectionResult from './schema.json';


// Debug
console.log('\nIntrospectionResult is:\n',JSON.stringify(introspectionResult.data,null,4),'\n');



// build Schema from introspection
const schema = buildClientSchema(introspectionResult.data);


// Debug
console.log('\nSchema is:\n',JSON.stringify(schema,null,4),'\n');







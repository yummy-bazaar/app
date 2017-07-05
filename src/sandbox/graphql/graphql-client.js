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
console.log('\n\nBEGIN PROCESS\n');


// import modules
import { 
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
}		 				from 'graphql';
import _				from 'lodash';
import fs 				from 'fs';
import Path				from 'path';








// Define Schema
import {schema} from './schema/schema'
//console.log(schema);
//process.exit();




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




/*
//	client interface
let fetchData = async (schema, query) => {
	return await graphql(schema, query);
}
*/



// Debug
graphql(
		schema, 
		query
	)
	.then(
		res => console.log(JSON.stringify(res,null,4))
	)
	.catch(console.error);













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


// import modules
import { 
	graphql,
	buildClientSchema 
}								from 'graphql';
import * as introspectionResult from './schema.json';





// Debug
console.log('\n\nBEGIN PROCESS\n\n');
process.on('exit',()=>console.log('\n\nEND PROCESS\n\n'));





// build mock server Schema
import schema 					from './schema/shopify/mock-graphql-server'


// build Shopify Schema from introspection data
//const schema = buildClientSchema(introspectionResult.data);



// Debug
//console.log('\nSchema is:\n',JSON.stringify(schema,null,4),'\n');
//process.exit();






// Mock server query
const queryMockServer = `
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



// YB product query
const queryShopifyServer = `
query{
	shop{
		products(
			first: 250
			after: "eyJsYXN0X2lkIjoxMTIxNjI5NDc4OCwibGFzdF92YWx1ZSI6IjExMjE2Mjk0Nzg4In0"
		){
			edges{
				node{
					id
					title
					vendor
					handle
				}
				cursor
			}
			pageInfo{
				hasPreviousPage
				hasNextPage
			}
		}
	}
}
`;








// send request to Backend
graphql(
		schema, 
		queryMockServer
	)
	.then(
		res => console.log(JSON.stringify(res,null,4))
	)
	.catch(console.error);













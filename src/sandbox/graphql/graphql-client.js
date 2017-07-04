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






/*
// Read file
//const schema = JSON.parse(fs.readFileSync(Path.join(__dirname,'schema.json'), 'utf8'));
const data 	 = fs.readFileSync(Path.join(__dirname,'schema.json'), 'utf8');
// Debug
console.log('read data from file');
*/



// import types
import typesBundle		from './types';
// debug
//console.log(JSON.stringify(typesBundle.types,null,4));
//process.exit();




// Define producst types
let NodeType = new GraphQLObjectType(
	{
	name: 'node',
	fields: () => (
		{
			id: 	GraphQLString,
			title: 	GraphQLString,
			vendor: GraphQLString,
			handle: GraphQLString
		}
	)
	}
);




// Define producst types
let EdgesType = new GraphQLObjectType(
	{
	name: 'edges',
	fields: () => (
		{
			node: 
			{ 
				type: new GraphQLList(NodeType) 
			}
		}
	)
	}
);




// Define producst types
let ProductsType = new GraphQLObjectType(
	{
	name: 'products',
	fields: () => (
		{
			edges: 
			{ 
				type: new GraphQLList(EdgesType) 
			}
		}
	)
	}
);




// Define Schema
const schema = new GraphQLSchema(
	{
		query: new GraphQLObjectType(
			{
				name: 'data',
				fields: {
					shop: {
						type: new GraphQLList(ProductsType),
						args: {
							//id: { type: GraphQLString }
						},
						resolve: (source, args, context, info) => {
							console.log(source, args, context, info)
							return Promise.resolve({"name": 'meow'})
						}
					}
				}
			}
		)
	}
);
// Debug
console.log(schema);
process.exit();




// define query
const query 	= `
query ProductsQuery
{
  shop{
    products(
		first: 20
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













/**
*
*	GraphQL client
*	--------------
*	this is a client module for querying a graphql backend
*
*	documentation: 
*	
*		
*	- usage:
*	
*
*/
'use strict';


// Debug
console.log('\n\nBEGIN PROCESS\n');


/*
* 	import modules
**/
import GraphQLClient 	from 'graphql-js-client';
import types 			from './types.js';
// TODO: remove this module cause it's not needed in browser
import fetch 			from 'node-fetch';
global.fetch = fetch;




// init client
const client = new GraphQLClient(types, {
	url: 'https://graphql.myshopify.com/api/graphql',
	fetcherOptions: {
		headers: `Authorization: Basic aGV5LXRoZXJlLWZyZWluZCA=`
	}
});


// define query
const query = client.query(
	(root) => {
		root.add('shop', (shop) => {
			shop.add('name');
			shop.addConnection('products', {args: {first: 10}}, (product) => {
				product.add('title');
			});
		});
	}
);
/*
`
query ProductsQuery
{
	shop
	{
		products
		{
			edges
			{
				node
				{
					id
					title
					vendor
					handle
				}
				cursor
			}
			pageInfo
			{
				hasPreviousPage
				hasNextPage
			}
		}
	}
}
`;
*/



// run query
client
	.send(query)
	.then(() => console.log('success'))
	.catch( err => {
		console.error('failure!\n',JSON.stringify(err,null,4))
	});








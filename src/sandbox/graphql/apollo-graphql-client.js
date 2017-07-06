import { 
	ApolloClient, 
	createNetworkInterface 
} 								from 'apollo-client';


// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const client = new ApolloClient({
	networkInterface: createNetworkInterface({
		uri: 'https://yummy-bazaar-dev.myshopify.com/api'
	}),
});



/*

https://yummy-bazaar-dev.myshopify.com/api/graphql
X-Shopify-Storefront-Access-Token	1003e582efbf560fb66ffb28ded011f8


https://graphql.myshopify.com/api/graphql
X-Shopify-Storefront-Access-Token	dd4d4dc146542ba7763305d71d1b3d38
*/
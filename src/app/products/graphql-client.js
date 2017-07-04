// TODO: switch to GraphQL client
// See: https://github.com/Shopify/storefront-api-examples/tree/master/node-graphql-client
//import fetch 			from 'node-fetch';
import Client, {Config} from 'shopify-buy';



//global.fetch = fetch;



const config = new Config({
	// YB Dev
	storefrontAccessToken: 	'1003e582efbf560fb66ffb28ded011f8',
	domain: 				'yummy-bazaar-dev.myshopify.com'
});



// TODO: encapsulate this in a constructor
const client = new Client(config);



// TODO: make repeated calls to backend client until pages.hasnext is false
fetchAllProducts() => 
{
	return null;
};



// TODO: attach actions to client
client.fetchAllProducts = fetchAllProducts;


export default client;


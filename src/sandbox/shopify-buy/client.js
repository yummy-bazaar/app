import fetch 			from 'node-fetch';
import Client, {Config} from 'shopify-buy';



global.fetch = fetch;

const config = new Config({
	// demo api
	storefrontAccessToken: 	'dd4d4dc146542ba7763305d71d1b3d38',
	domain: 				'graphql.myshopify.com'

	// YB Dev
	//storefrontAccessToken: 	'1003e582efbf560fb66ffb28ded011f8',
	//domain: 				'yummy-bazaar-dev.myshopify.com'
});




export default new Client(config);

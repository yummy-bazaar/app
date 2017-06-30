//import fetch 			from 'node-fetch';
import Client, {Config} from 'shopify-buy';



//global.fetch = fetch;

const config = new Config({
	// YB Dev
	storefrontAccessToken: 	'1003e582efbf560fb66ffb28ded011f8',
	domain: 				'yummy-bazaar-dev.myshopify.com'
});




export default new Client(config);

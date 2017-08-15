// TODO:
// - ask YB staff to create private app and provide me with the Access Token
const credentials = {
	uri: 'https://yummy-bazaar.myshopify.com/api/graphql',
	headers: [
		{
			key: 	'X-Shopify-Storefront-Access-Token',
			value:	'1003e582efbf560fb66ffb28ded011f8'
		}
	]
};


export function getProdUri(): string {
	return credentials.uri;
}


export function getProdHeaders(): Object[] {
	return credentials.headers;
}
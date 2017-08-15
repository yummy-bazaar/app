const credentials = {
	uri: 'https://yummy-bazaar-dev.myshopify.com/api/graphql',
	headers: [
		{
			key: 	'X-Shopify-Storefront-Access-Token',
			value:	'1003e582efbf560fb66ffb28ded011f8'
		}
	]
};


export function getDevUri(): string {
	return credentials.uri;
}


export function getDevHeaders(): Object[] {
	return credentials.headers;
}
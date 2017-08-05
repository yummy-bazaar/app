const api = require('shopify-api');



let opts = {
	host: 	'yummy-bazaar-dev.myshopify.com',
	auth: 	'c38bdcadbb527874664ea67307660f4c:55f43f247f91e9492019a5e28e1c482d',
};
let client = api(opts);




client.theme.list(
	(err, data) => {
		if (err) {
			console.error(JSON.stringify(err,null,4));
			process.exit();
		}
		
		console.log(JSON.stringify(data,null,4))
});

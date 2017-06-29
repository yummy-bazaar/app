import { Component } from '@angular/core';

@Component({
	selector: 'angular-test',
	template: `<h1>Hello {{backend}} from {{frontend}}</h1>`,
})
export class AppComponent  { 
	backend 	= 'Shopify'; 
	frontend 	= 'Angular';

	shopClient 	= require('shopify-buy').buildClient({
		accessToken: 	'9b5e591536c4538e6299c2981dec9486',
		domain: 		'yummy-bazaar-dev.myshopify.com',
		appId: 			'6'
	});


	/*
	shopClient
		.fetchAllProducts()
		.then(
			console.log
		)
		.catch( (e) => {
			console.log('Request failed',e);
		});
	*/
}

import { Injectable } 		from '@angular/core';

import { Brand } 			from './brand';
import client 				from './backend-client';	// TODO: replace this service with the shopify buy client
import { Logger } 			from './logger.service';

@Injectable()
export class BrandService {                              // TODO: change this to brand service then impl
	
	// properties
	private Brands: Brand[] = [];						// TODO: use this to cache Brands collection

	constructor(
		private client: client,				// TODO: replace this service with the shopify buy client
		private logger: Logger
	) { }

	getBrands() {
		this.client.getAll(Brand).then( (Brands: Brand[]) => {
		this.logger.log(`Fetched ${Brands.length} Brands.`);
		this.Brands.push(...Brands); 					// TODO: fill cache
	});

	return this.Brands;
  }
}


/*


// import client
import client 	from './shopify-buy-client';



// fetch shop metadata
const shopPromise 		= client.fetchShopInfo();
// fetch data for entire product catalog
const productsPromise 	= client.fetchAllProducts();


// consume promises
Promise
	.all(
		[
			shopPromise,
			productsPromise, 
		]
	)
	.then(
		([shop, products]) => {

   			// log shop data
   			console.log(
   							'shop is: ', 
   							JSON.stringify(shop,null,4)
   			);


			// log product data
   			console.log(
   							'products are: ', 
   							JSON.stringify(products,null,4)
   			);
    	}
    )
    .catch((err) => console.error(err));




*/
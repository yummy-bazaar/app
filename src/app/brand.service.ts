import { Injectable } 		from '@angular/core';

import { Brand } 			from './brand';
import { Product }			from './product';
import client 				from './backend-client';	// TODO: replace this service with the shopify buy client
import { Logger } 			from './logger.service';

@Injectable()
export class BrandService {                              // TODO: change this to brand service then impl
	
	// properties
	private Brands: Brand[] = [];						// TODO: use this to cache Brands collection

	constructor(
		private logger: Logger
	) { }

	getBrands() {
		client
			// TODO: can I use GraphQL to compose Brand collection from the server?
			.fetchAllProducts()
			.then( (products: Product[]) => {
				this.logger.log(`Fetched ${products.length} Products.`);

				// TODO: fill cache
				//			- transform products collection into brand collection
				//			- push new array into cache
				//this.Brands.push(...Brands); 					
			});

		return this.Brands;
	}
}



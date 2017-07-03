import { Injectable } 		from '@angular/core';

//import { Brand } 			from './brand';
//import { Product }			from './product';
import client 				from './backend-client';	// TODO: replace this service with the shopify buy client
import { Logger } 			from './logger.service';

@Injectable()
export class BrandService {                              // TODO: change this to brand service then impl
	
	// properties
	private Brands: any;								// TODO: use this to cache Brands collection
	//private Products: Product[] = [];

	constructor(
		private logger: Logger
	) { };



	// actions
	getBrands() {

		client
			// TODO: can I use GraphQL to compose Brand collection from the server?
			.fetchAllProducts()
			// consume payload
			.then(
				(catalog) => {


					// populate brands collection cache
					this.Brands = catalog
									.reduce(
										(brands,product) => {
											let brand = product.attrs.vendor.value;

											!!brands[brand]
											? brands[brand].push(product)
											: brands[brand] = [product];

											return brands;
										},
										{}
									)
					;
				}
			)
			// Debug
			.then(
				()=>{

					// print brands count
					this.logger.log(`There are ${Object.keys(this.Brands).length} brands in the catalog`);

					// print brands
					//this.logger.log(JSON.stringify(this.Brands,null,4));
				}
			)
			.catch(this.logger.error)
		;


		return this.Brands;
	}
}



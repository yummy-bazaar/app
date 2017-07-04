import { Injectable } 		from '@angular/core';
import * as _				from 'lodash';

//import { Brand } 			from './brand';
//import { Product }			from './product';
import client 				from './graphql-client';
import Logger 				from '../logger.service';


@Injectable()
export class ProductService {							// TODO: change this to brand service then impl
	

	// constructor
	constructor(
		private logger: 	Logger,
		private products: 	any,						// TODO: update type to Product[]
		private brands: 	any							// TODO: update type to Brand[]
	) { };



	// actions
	init() {

		client
			.fetchAllProducts()
			.then(
				(catalog: any) => {						// TODO: update type

					// populate products cache
					this.products = catalog;


					// populate brands cache
					this.brands = _.groupBy(
										catalog, 
										(product:any) => product.attrs.vendor.value
														// TODO: add vendor property to Product class
					);
				}
			)
			// Debug
			.then(
				()=>{

					// inspect products cache
					this.logger.log(`There are ${Object.keys(this.products).length} products in the catalog`);
					//this.logger.log(JSON.stringify(this.products,null,4));


					// inspect brands cache
					this.logger.log(`There are ${Object.keys(this.brands).length} brands in the catalog`);
					//this.logger.log(JSON.stringify(this.brands,null,4));
				}
			)
			.catch(this.logger.error)
		;
	}



	getProduct(id: string) {
		return 	_.find(
					this.products,
					(product: any) => product.id
				);
	}



	getBrand(vendor: string){
		return this.brands[vendor];
	}

}



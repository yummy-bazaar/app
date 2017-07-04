import { 
	Injectable,
	OnInit
}					 		from '@angular/core';
import * as _				from 'lodash';

//import { Brand } 			from './brand';
//import { Product }			from './product';
import client 				from './graphql-client';
import Logger 				from '../logger.service';


@Injectable()
export class ProductService implements OnInit {
	

	// constructor
	constructor(
		private logger: 	Logger,
		private products: 	any,						// TODO: update type to Product[]
		private brands: 	any							// TODO: update type to Brand[]
	) { };



	ngOnInit() {

		client
			.fetchAllProducts()
			.then(
				(catalog: any) => {						// TODO: update type

					// populate products cache
					this.products = catalog;


					// populate brands cache
					this.brands = _.groupBy(
										catalog, 
										(product:any) => product.vendor
														// TODO: update type
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
					(product: any) => product.id		// TODO: update type
				);
	}




	getBrand(vendor: string){
		return this.brands[vendor];
	}

}



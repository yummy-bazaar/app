import { 
	Injectable,
	OnInit
}					 		from '@angular/core';
import * as _				from 'lodash';
import { 
	Product
}				 			from '../models';
//import {APIClient} 			from '../api';
import { Logger	}				from '../utils';


@Injectable()
export class ProductService implements OnInit {
	

	// constructor
	constructor(
		private logger: 	Logger,
		private products: 	Product[],
		private brands: 	_.Dictionary<Product[]>,
		private client: 	any
	) { };



	ngOnInit() {
		this.init();
	}



	private init() {

		this.client = new APIClient;

		this.client
			.fetchAllProducts()
			.then(
				(catalog: Product[]) => {

					// populate products cache
					this.products = catalog;

					// populate brands cache
					this.brands = _.groupBy(catalog,(p)=>p.vendor);



					// Debug: inspect products cache
					this.logger.log(`Received ${this.products.length} products from Shopify backend`);
					//this.logger.log(JSON.stringify(this.products,null,4));

					// Debug: inspect brands cache
					this.logger.log(`Received ${Object.keys(this.brands).length} brands from Shopify backend`);
					//this.logger.log(JSON.stringify(this.brands,null,4));
				}
			)
			.catch(this.logger.error)
		;
	}




	public getProduct(id: string) {
		return 	_.find(this.products,(p)=>p.id);
	}




	public getBrand(vendor: string){
		return this.brands[vendor];
	}

}



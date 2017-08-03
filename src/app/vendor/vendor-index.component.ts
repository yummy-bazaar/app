import { 
	Component,
	OnInit
}					 		from '@angular/core';
import * as _				from 'lodash';
import { 
	Product
}				 			from '../models';
import { 
	Apollo,
	ApolloQueryObservable
} 							from 'apollo-angular';
import {
	CollectionsQuery
}  							from '../api/queries';
import { Subject } 			from 'rxjs/Subject';
import { Logger	}			from '../utils';
let slugify 				= require('slugify')






@Component({
	selector: 'vendor-index',
	template: require('./vendor-index.component.html')
})
export class VendorIndexComponent implements OnInit {
	

	// TODO: work out the visibility for these properties
	// - they should all be private , right?
	// - component should provide public accessors
	data: 		ApolloQueryObservable<any>;
	vendors: 	any;
	numVendors: number;
	loading: 	boolean;
	



	// constructor
	constructor(
		/*
		private data: 		ApolloQueryObservable<any>,
		private logger: 	Logger,
		private products: 	Array<any>,//Product[],
		private brands: 	_.Dictionary<Product[]>,
		*/
		private client: 	Apollo
	) { };



	ngOnInit() {
		this.init();
	}


	// TODO:
	// - Use RxJS so I only have to query the backend once
	// - will this give me the progressive SPA ux?
	// - see: http://dev.apollodata.com/angular2/queries.html#rxjs
	// - see: http://dev.apollodata.com/angular2/typescript.html
	// TODO:
	// - impl pagination | infinite scroll to reduce round-trip time
	// - this is prolly not as useful in the index view cause I need entire brand catalog
	// - this will be useful in the brand view
	// - see: http://dev.apollodata.com/angular2/pagination.html
	// TODO:
	// - impl logic to update client side cache whenever catalog is updated on backend
	// - see: http://dev.apollodata.com/angular2/receiving-updates.html
	private init() {

		this.data = this.client
			.watchQuery(
				{ 
					query: CollectionsQuery
				}
			)
		;


		this.client
			.watchQuery<any>(
				{
					query: CollectionsQuery
				}
			)
			.subscribe(
				({data}) => {
					this.loading 	= data.loading;
					this.vendors 	= data.shop.collections.edges.reduce(
						// TODO: solve issue with bringing lodash functions to browser
						(C:any,v:any) => {
							let key = slugify(v.node.handle,'-');
							!!C[key]
							? C[key].push(v)
							: C[key] = [v]

							return C;
						},
						{}
					);
					this.numVendors = Object.keys(this.vendors).length;
				},
				(err) => { 
					console.log('Fetch error: ' + err.message); 
				},
/*				
				() => { 
					this.vendors = _.groupBy(
						this.vendors,
						(p) => {
							slugify(p.node.vendor,'-');
						}
					);
					console.log('Fetch completed!'); 
				}
*/
			)
		;	

	}



/*
	public getProducts(){
		return this.products;
	}




	// TODO: solve issue with bringing lodash functions to browser
	public getProduct(id: string) {
		return 	_.find(this.products,(p)=>p.id);
	}




	public getBrands(){
		return this.brands;
	}




	public getBrand(vendor: string){
		return this.brands[vendor];
	}

*/
}









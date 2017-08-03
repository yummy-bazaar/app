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
	

	loading: 	  	 boolean;
	vendors: 	  	 any;
	numVendors:   	 number;
	vendorKeys:	  	 string[];
	selectedVendors: any[];
	

	
	constructor(
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

		this.client
			.watchQuery<any>(
				{
					query: CollectionsQuery
				}
			)
			.subscribe(
				({data}) => {

					// TODO:
					// - how should I use this loading property?
					this.loading = data.loading;


					// populate vendor cache
					this.vendors = data.shop.collections.edges
									.reduce(
										(C:any,v:any) => {
											let key = v.node.handle[0];
											!!C[key]
											? C[key].push(v)
											: C[key] = [v]
											return C;
										},
										{}
									)
					;


					// generate vendor keys array
					this.vendorKeys = Object
										.keys(this.vendors)
										.sort()
					;


					// select & render vendors with first key
					this.numVendors = this.vendorKeys.length;
					if (this.numVendors > 0) {
						this.selectedVendors = this.vendorsByKey(this.vendorKeys[0]);
					}
				},
				(err) => { 
					console.log('Fetch error: ' + err.message); 
				}
			)
		;	

	}


	public vendorsByKey(key: string): any[] {
		return this.vendors[key];
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









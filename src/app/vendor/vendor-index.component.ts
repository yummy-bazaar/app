import { 
	Component,
	OnInit
}					 		from '@angular/core';
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
import { 
	Logger,
	startsWithAlpha	
}							from '../utils';








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
											
											let handle = v.node.handle[0];

											// test if vendor key is alphabetic
											let key;
											startsWithAlpha(handle)
											? key = handle[0]
											: key = 123
											
											// add vendor to cache
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


					// select vendors with first key
					if (this.vendorKeys.length > 0) {
						this.selectedVendors = this.getVendorsByKey(this.vendorKeys[0]);
					}
				},
				(err) => { 
					console.log('Fetch error: ' + err.message); 
				}
			)
		;	

	}


	public getVendorsByKey(key: string): any[] {
		return this.vendors[key];
	}


}









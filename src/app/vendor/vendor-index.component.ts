import { 
	Component,
	OnInit,
	OnDestroy
}					 		from '@angular/core';
import {
	Subject
} 							from 'rxjs/Subject';
import {
	Subscription
}							from 'rxjs/Subscription';
import { 
	Apollo,
	ApolloQueryObservable
} 							from 'apollo-angular';
import {
	CollectionsQuery
}  							from '../api/queries';
import { 
	LoggerService,
	startsWithAlpha	
}							from '../utils';
import { 
	Product 
}							from '../product';








@Component({
	selector: 	'vendor-index',
	template: 	require('./vendor-index.component.html'),
})
export class VendorIndexComponent implements OnInit, OnDestroy {
	

	loading: 	  				boolean;
	vendors: 	  				any;
	numVendors:   				number;
	vendorKeys:	  				string[];
	selectedVendors:			any[];

	// used to destroy subscriptions
	private vendorSub:			Subscription;

	// private pagination properties
	private collectionStream: 	ApolloQueryObservable<any>;
	private hasNextPage: 	 	boolean;
	private cursor: 		 	string;
	

	
	constructor(
		private client: Apollo,
		private logger: LoggerService
	) { 
		this.loading = true;
		this.vendors = {};
		this.hasNextPage = true;
		this.cursor = null;
	};



	ngOnInit() {
		this.init();
	}


	ngOnDestroy() {
		this.vendorSub.unsubscribe();
	}



	// ToDo:
	// - use a Stream based design pattern to initialize these members
	// - find a way to subscribe to the WatchQuery method from the Apllo client
	// - can i use an async/await pattern here?
	private init() {

		// Debug
		this.logger.log('Starting VendorIndex.init()');


		this.collectionStream = this.client
			.watchQuery<any>(
				{
					query: CollectionsQuery,
					variables: {
						after: this.cursor
					}
				}
			)
		;



		this.vendorSub = this.collectionStream.subscribe(
			({data, loading}) => {

				// Debug
				this.logger.log('Starting to consume payload from API in VendorIndex.init()');


				// TODO:
				// - how should I use this loading property?
				this.loading = loading;


				// populate vendor cache
				this.vendors = this.processNewVendors(data.shop.collections.edges);


				// generate vendor keys array
				this.vendorKeys = Object.keys(this.vendors).sort();


				// select vendors with first key
				if (this.vendorKeys.length > 0) {
					this.selectedVendors = this.fetchVendorsByKey(this.vendorKeys[0]);
				}


				// config pagination properties
				this.hasNextPage = data.shop.collections.pageInfo.hasNextPage;
				this.cursor = data.shop.collections.edges.slice(-1)[0].cursor;


				// Debug
				this.logger.log('Finished consuming payload from API in VendorIndex.init()');
			},
			(err) => { 
				this.logger.error('Fetch error: ' + err.message); 
			}
		);	


		// Debug
		this.logger.log('Completed VendorIndex.init()');

	}



	// TODO:
	// - impl this
	// - test this manually
	// - impl unit tests
	fetchMore() {

		// Debug
		this.logger.log('Starting VendorIndex.fetchMore()');


		// test if there are more data to be fetched
		if (!this.hasNextPage){
			this.logger.warn('There is no more data to be fetched');
			return;
		}


		// fetch more data
		this.collectionStream.fetchMore(
			{
				variables: {
					after: this.cursor
				},
				updateQuery: (prev: any, { fetchMoreResult } :any) => 
				{

					// Debug
					this.logger.log('Starting to consume payload from API in VendorIndex.fetchMore()');


					// verify that we got new data
					if (!fetchMoreResult.shop)  {
						this.logger.warn('did not receive new data in VendorIndex.fetchMore()');
						this.logger.warn(`new result object is ${JSON.stringify(fetchMoreResult,null,4)}`);
						return prev; 
					}


					// get new vendors collection
					let newVendors = fetchMoreResult.shop.collections.edges;


					// add new vendors to cache
					let prevVendors = this.vendors;
					this.vendors = Object.assign(
						{},
						prevVendors,
						this.processNewVendors(newVendors)
					);


					// reset vendor keys
					this.vendorKeys = Object.keys(this.vendors).sort();


					// config pagination properties
					this.hasNextPage = fetchMoreResult.shop.collections.pageInfo.hasNextPage;
					this.cursor = fetchMoreResult.shop.collections.edges.slice(-1)[0].cursor;


					// Debug
					this.logger.log('Finished consuming payload from API in VendorIndex.fetchMore()');


					// register new results with Apollo client
					return  Object.assign(
								{}, 
								prev, 
								{
									feed: [
										...prev.shop.collections.edges, 
										...newVendors
									],
								}
							)
					;
				},
			}
		);

		// Debug
		this.logger.log('Completed VendorIndex.fetchMore()');
	}



	// TODO:
	// x test this manually
	// - impl unit tests
	private processNewVendors(newVendors: any[]): void {

		// Debug
		this.logger.log('Starting VendorIndex.processNewVendors()');

		let res = null;
		if (newVendors) {
			res = newVendors
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
							this.vendors
						)
			;
		}


		// Debug
		this.logger.log(`Processed ${newVendors.length} new vendors`);
		this.logger.log('Completed VendorIndex.processNewVendors()');

		return res;
	}



	// TODO:
	// - test this manually
	// - impl unit tests
	public fetchVendorsByKey(key: string): any[] {
		return this.vendors[key];
	}



}









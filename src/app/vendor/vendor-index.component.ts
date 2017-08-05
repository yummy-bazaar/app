import { 
	Component,
	OnInit,
	OnDestroy
}					 		from '@angular/core';
import {
	Observable
} 							from 'rxjs';
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
	vendors: 	  				Object;
	vendorKeys:	  				string[];
	selectedVendors:			Set<any>;
	private collectionStream: 	ApolloQueryObservable<any>;
	private collectionSub:		Subscription;
	private fetchMoreStream: 	Observable<boolean>;
	private fetchMoreSub: 		Subscription;
	private hasNextPage: 	 	boolean;
	private cursor: 		 	string;
	

	
	constructor(
		private client: Apollo,
		private logger: LoggerService
	) { 
		this.loading 	 = true;
		this.vendors 	 = {};
		this.hasNextPage = false;
		this.cursor 	 = null;
	};



	ngOnInit() {
		this.init();
	}


	ngOnDestroy() {
		this.collectionSub.unsubscribe();
		this.fetchMoreSub.unsubscribe();
	}



	// ToDo:
	// x impl this
	// x test this manually
	// - impl unit tests
	private init() {

		// Debug
		this.logger.log('Starting VendorIndex.init()');


		// initialize collection stream
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


		// parse vendors from collection stream
		this.collectionSub = this.collectionStream.subscribe(
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


		// init fetchMoreStream
		this.fetchMoreStream = Observable
			.interval(100)				// emmit every 100ms
			.map(()=>this.hasNextPage)	// poll state hasNextPage
			.distinctUntilChanged()		// only react when it is change
			.filter(flag=>!!flag)		// only emit this.hasNextPage goes from false to true
		;


		// trigger this.fetchMore() once when this.hasNextPage goes from false to true
		this.fetchMoreSub = this.fetchMoreStream.subscribe(
			() => this.fetchMore()
		);



		// Debug
		this.logger.log('Completed VendorIndex.init()');

	}



	// TODO:
	// x impl this
	// x test this manually
	// - impl unit tests
	fetchMore() {

		// Debug
		this.logger.log('Starting VendorIndex.fetchMore()');


		// halt if there is no more data to be fetched
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
					//this.logger.log(`res is: ${JSON.stringify(res,null,4)}`);

					// register new results with Apollo client
					return Object.assign(
								{}, 
								prev, 
								{
									shop: {
										collections: {
											edges: [
												...prev.shop.collections.edges, 
												...fetchMoreResult.shop.collections.edges,
											],
											pageInfo: fetchMoreResult.shop.collections.pageInfo,
											__typename: "CollectionConnection"
										},
									},
									__typename: "Shop"
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
	// x impl this
	// x test this manually
	// - impl unit tests
	private processNewVendors(newVendors: any[]): Object {

		// Debug
		this.logger.log('Starting VendorIndex.processNewVendors()');

		let newVendorCache = null;
		if (newVendors) {
			newVendorCache = newVendors
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
								? C[key].add(v)
								: C[key] = (new Set).add(v)	
								
								
								return C;
							},
							this.vendors
						)
			;
		}


		// Debug
		this.logger.log(`Processed ${newVendors.length} vendors`);
		this.logger.log('Completed VendorIndex.processNewVendors()');

		return newVendorCache;
	}



	// TODO:
	// x impl this
	// x test this manually
	// - impl unit tests
	public fetchVendorsByKey(key: string): Set<any> {
		return this.vendors[key];
	}



}









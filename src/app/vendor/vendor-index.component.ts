// NG core modules
import { 
	Component,
	OnInit,
	OnDestroy,
	Input,
	Output,
	EventEmitter
}					 		from '@angular/core';

// 3rd party modules
import {
	Apollo,
	ApolloQueryObservable
}							from 'apollo-angular'
import {
	Observable
} 							from 'rxjs';
import {
	Subscription
}							from 'rxjs/Subscription';

// project modules
import {
	CollectionsQuery,
	InitializationQuery,
	GraphQLComponent
}  							from '../graphql';
import { 
	deepFindObjectProp,
	LoggerService,
	startsWithAlpha,
	StorageService
}							from '../utils';




// TODO:
// - use StorageService to cache GraphQL client
// - see: http://diveraj.com/lets-make-tiny-gradebook-angular2-storage/
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
@Component({
	selector: 		'vendor-index',
	templateUrl: 	'./vendor-index.component.html',
})
export class VendorIndexComponent implements OnInit, OnDestroy {

	loading: 	  				boolean;
	//vendors: 	  				Object;
	vendors: 	  				Map<string,Set<any>>;
	vendorKeys:			  		Set<string>;
	selectedVendors:			Set<any>;			// update type to Vendor interface from vendor.model.ts
	private dataStream: 		ApolloQueryObservable<any>;
	private dataSub:			Subscription;
	private query:				any;
	private offset:				string;
	private limit:				string;
	private path2FetchMoreFlag: string;
	private path2Object:		string;
	private fetchMoreTrigger: 	Observable<boolean>;
	private fetchMoreSub: 		Subscription;
	private fetchMoreFlag: 	 	boolean;
	private cursor: 		 	string;
	
	

	
	constructor(
		private client: 	Apollo,
		private logger: 	LoggerService,
		private storage:	StorageService
	) { 

		// set initial state
		this.loading 	 		= false;
		this.query 				= CollectionsQuery;
		this.offset				= null;
		this.limit				= '250';
		this.path2FetchMoreFlag = 'data.shop.collections.pageInfo.hasNextPage';
		this.path2Object 		= 'data.shop.collections.edges';
		this.fetchMoreFlag 		= false;
		this.cursor 			= null;


		// fetch vendors cache from local storage if exists
		if (this.storage.saved('vendors')){
			this.vendors = this.storage.get('vendors');
		}
		else {
			//this.vendors = new Object();
			this.vendors = new Map<string,Set<any>>();

			// Debug
			this.logger.log(`Init this.vendors`);
			this.logger.log(this.vendors.get);
		}


		// fetch vendorKeys cache from local storage if exists
		if (this.storage.saved('vendorsKeys')){
			this.vendorKeys = this.storage.get('vendorKeys');
		}
		else{
			this.vendorKeys = new Set<string>();
		}


		// fetch selectedVendors cache from local storage if exists
		if (this.storage.saved('selectedVendors')){
			this.selectedVendors = this.storage.get('selectedVendors');
		}
		else{
			this.selectedVendors = null;
		}


		// schedule fetchMoreTrigger
		this.fetchMoreTrigger = Observable
			.interval(100)						// poll every 100ms
			.map(()=>this.fetchMoreFlag)		// watch this.fetchMoreFlag
			.distinctUntilChanged()				// only react when it is change
			.filter(flag=>!!flag)				// only emit when this.fetchMoreFlag goes from false to true
		;


		// trigger this.fetchMore() once when this.fetchMoreFlag goes from false to true
		this.fetchMoreSub = this.fetchMoreTrigger.subscribe(
			() => this.fetchMore()
		);
	}



	ngOnInit(): void {

		// Debug
		this.logger.log('Starting VendorIndexComponent.ngOnInit()');
		
		// run initialization logic
		this.init();

		// Debug
		this.logger.log('Completed VendorIndexComponent.ngOnInit()');
	}



	ngOnDestroy(): void {

		// Debug
		this.logger.log('Starting VendorIndexComponent.ngOnDestroy()');
		
		// run destruction logic
		this.destroy();

		// Debug
		this.logger.log('Completed VendorIndexComponent.ngOnDestroy()');
	}



	// ToDo:
	// x impl this
	// x test this manually
	// - impl unit tests
	init(): void {


		// Debug
		this.logger.log('Starting VendorIndexComponent.init()');


		// trigger initial fetch
		this.fetch(
			this.query,
			null,
			250
		)



		// Debug
		this.logger.log('Completed VendorIndexComponent.init()');

	}



	// run new query against GraphQL API
	// ToDo:
	// x impl this
	// - test this manually
	// - impl unit tests
	fetch(
			query: any, 
			offset: string	= null,
			limit: number	= 250
	): void {


		// Debug
		this.logger.log('Starting VendorIndexComponent.fetch()');



		// initialize collection stream
		this.dataStream = this.client.watchQuery<any>(
			{
				query: query,
				variables: {
					offset: offset,
					limit: limit
				}
			}
		);



		// subscribe this.fetchMoreFlag & this.cursor to dataStream
		this.dataSub = this.dataStream.subscribe(
			({data, loading}) => {

				// Debug
				this.logger.log('Starting to consume API payload in VendorIndexComponent.fetch()');


				// populate vendor cache
				try {
					//this.processNewVendors(deepFindObjectProp(data, this.path2Object));
					this.processNewVendors(data.shop.collections.edges);
				}
				catch (e) {
					this.logger.error('failed to process new vendors: ' + e.message);
				}


				// select vendors with first key
				if (
					!this.selectedVendors &&
					this.vendorKeys.size > 0
				) {
					this.selectVendor(null);
				}


				// update fetchMoreFlag 
				if (this.path2FetchMoreFlag){
					try {
						//this.fetchMoreFlag = deepFindObjectProp(data, this.path2FetchMoreFlag);
						this.fetchMoreFlag = data.shop.collections.pageInfo.hasNextPage;
					}
					catch (e){
						this.logger.error('failed to update fetchMoreFlag: ' + e.message);
					}	
				}


				// update cursor
				if (this.path2Object){
					try {
						//this.cursor = deepFindObjectProp(data, this.path2Object).slice(-1)[0].cursor;
						this.cursor = data.shop.collections.edges.slice(-1)[0].cursor;
					}
					catch (e){
						this.logger.error('failed to update cursor: ' + e.message);
					}
				}


				// Debug
				this.logger.log('Finished consuming API payload in VendorIndexComponent.fetch()');
			},
			(err) => { 
				this.logger.error('Fetch error: ' + err.message); 
			}
		);


		// Debug
		this.logger.log('Completed VendorIndexComponent.fetch()');

	}



	// fetch additional results from GraphQL api if available
	// TODO:
	// x impl this
	// - next steps:
	//		+ how do I pass a custom resolver from client?  
	//		+ it should be an updateQuery
	// - test this manually
	// - impl unit tests
	private fetchMore(): void {

		// Debug
		this.logger.log('Starting VendorIndexComponent.fetchMore()');


		// halt if there is no more data to be fetched
		if (!this.fetchMoreFlag){
			this.logger.warn('There is no more data to be fetched');
			return;
		}


		// fetch more data
		this.dataStream.fetchMore(
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
					);
				},
			}
		);

		// Debug
		this.logger.log('Completed VendorIndexComponent.fetchMore()');
	}



	// TODO:
	// x impl this
	// x test this manually
	// - impl unit tests
	private processNewVendors(newVendors: any[]): void {

		// Debug
		this.logger.log('Starting VendorIndexComponent.processNewVendors()');
		//this.logger.log(`typeof vendors cache is: ${typeof this.vendors}`);
		

		if (newVendors) {
			newVendors.map(
				(vendor:any) => {
					
					// test if vendor key is alphabetic
					let handle = vendor.node.handle;
					let key: string;
					startsWithAlpha(handle)
					? key = handle[0]
					: key = '123'

					
					// Debug
					//this.logger.log(`key is: ${key}`);
					//this.logger.log(`vendor handle is: ${vendor.node.handle}`);
					//this.logger.log(`vendor is: ${JSON.stringify(vendor,null,4)}`);
					//this.logger.log(`vendor cache is: ${JSON.stringify(this.vendors,null,4)}`);
					



					// add vendor to cache

					// Note
					// - this is the original impl
					//!!vendors[key]
					//? vendors[key].add(vendor)
					//: vendors[key] = (new Set<any>()).add(vendor)	



					// Note
					// - this impl uses a Map of Sets
					
					// init set if necessary
					let vendorSet: Set<any> = this.vendors.get(key)
					if (!vendorSet)
						vendorSet = new Set<any>()
					
					// add new vendor to set
					vendorSet.add(vendor);

					//sort the set
					let arr = Array.from(vendorSet).sort()
					vendorSet = new Set<any>(arr);

					// push set in vendors cache
					this.vendors.set(key,vendorSet);



					// Note
					// - this impl uses an Object with Sets as properties
					//if(!!this.vendors[key]){
					//	this.vendors[key].add(vendor);
					//}
					//else {
					//	this.vendors[key] = new Set<any>();
					//	this.logger.log(`init new set for key: ${key}`);
					//	this.vendors[key].add(vendor);
					//}




					// update vendorKeys cache
					this.vendorKeys.add(key)
				}
			);


			// saved updated caches in local storage
			//this.storage.save(
			//	'vendors',
			//	this.vendors
			//);
			//this.storage.save(
			//	'vendorKeys',
			//	this.vendorKeys
			//);


			// Debug
			this.logger.log(`Processed ${newVendors.length} vendors`);
		}
		else {
			this.logger.warn('added no new vendors');
		}




		// Debug
		this.logger.log('Completed VendorIndexComponent.processNewVendors()');
	}




	// TODO:
	// - impl this
	// - test this manually
	// - impl unit tests
	selectVendor(key: string): void {

		// Debug
		this.logger.log('Starting VendorIndexComponent.selectVendor()');

		
		// if key was supplied
		if (key){

			// update selectedVendors
			this.selectedVendors = this.vendors.get(key);
		}
		else if (!this.selectedVendors) {

			// select first vendor if exists
			let it = this.vendorKeys.values()
			let firstVendorKey = it.next().value;
			if (firstVendorKey)
				this.selectedVendors = this.vendors.get(firstVendorKey);
			else
				this.selectedVendors = null;
		}


		// Debug
		if (this.selectedVendors){
			this.logger.log(`selected vendors with key: ${JSON.stringify(key,null,4)}`);
		}
		else{
			this.logger.warn('cache has no vendors to select from');
		}


		// Debug
		this.logger.log('Completed VendorIndexComponent.selectVendor()');
	}


	destroy(): void {

		// Debug
		this.logger.log('Starting VendorIndexComponent.destroy()');

		// cancel subscriptions
		this.dataSub.unsubscribe();

		// Debug
		this.logger.log('Completed VendorIndexComponent.destroy()');
	}



}





import { 
	Component,
	OnInit,
	OnDestroy,
	Input,
	Output
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
	CollectionsQuery,
	InitializationQuery
}  							from '../graphql';
import { 
	deepFindObjectProp,
	LoggerService,
	startsWithAlpha	
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
	selector: 		'graphql',
	templateUrl: 	'./graphql.component.html',
})
export class GraphQLComponent implements OnInit, OnDestroy {

	@Output() dataStream: 			ApolloQueryObservable<any>;
	private dataSub:				Subscription;
	private fetchMoreTrigger: 		Observable<boolean>;
	private fetchMoreSub: 			Subscription;
	private fetchMoreFlag: 	 		boolean;
	private cursor: 		 		string;
	

	
	constructor(
		private client: Apollo,
		private logger: LoggerService
	) { 

		// run initialization logic
		this.init();
	};



	ngOnInit(): void {

		// Debug
		this.logger.log('Starting GraphQLComponent.ngOnInit()');
		

		// run initialization logic
		this.init();


		// Debug
		this.logger.log('Completed GraphQLComponent.ngOnInit()');
	}


	ngOnDestroy(): void {

		// Debug
		this.logger.log('Starting GraphQLComponent.ngOnDestroy()');
		
		// run destruction logic
		this.destroy();

		// Debug
		this.logger.log('Completed GraphQLComponent.ngOnDestroy()');
	}



	// init GraphQLComponent
	// ToDo:
	// x impl this
	// - test this manually
	// - impl unit tests
	init(): void {

		// Debug
		this.logger.log('Starting GraphQLComponent.init()');


		// set initial states for fetchMore listener
		this.fetchMoreFlag = false;
		this.cursor = null;


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


		// Debug
		this.logger.log('Completed GraphQLComponent.init()');
	}



	// run new query against GraphQL API
	// ToDo:
	// - impl this
	// - test this manually
	// - impl unit tests
	fetch(eventData: string): void {

		// parse config string
		let config = JSON.parse(eventData);

		// run fetch
		this.doFetch(
			config.query,
			config.offset,
			config.limit,
			config.path2FetchMoreFlag,
			config.path2Object
		);
	}



	// run new query against GraphQL API
	// ToDo:
	// x impl this
	// - test this manually
	// - impl unit tests
	private doFetch(
			query: any, 
			offset: string				= null,
			limit: number				= 250,
			path2FetchMoreFlag: string 	= null,
			path2Object: string			= null
	): void {


		// Debug
		this.logger.log('Starting GraphQLComponent.fetch()');



		// initialize collection stream
		this.dataStream = this.client
			.watchQuery<any>(
				{
					query: query,
					variables: {
						offset: offset,
						limit: limit
					}
				}
			)
		;



		// subscribe this.fetchMoreFlag & this.cursor to dataStream
		this.dataSub = this.dataStream.subscribe(
			({data, loading}) => {

				// Debug
				this.logger.log('Starting to consume API payload in GraphQLComponent.fetch()');


				// update fetchMoreFlag 
				if (path2FetchMoreFlag){
					try {
						this.fetchMoreFlag = deepFindObjectProp(data, path2FetchMoreFlag);
					}
					catch (e){
						this.logger.warn('failed to update fetchMoreFlag');
						this.logger.warn(e.message);
					}	
				}


				// update cursor
				if (path2Object){
					try {
						this.cursor = deepFindObjectProp(data, path2Object).slice(-1)[0].cursor;
					}
					catch (e){
						this.logger.warn('failed to update cursor');
						this.logger.warn(e.message);
					}
				}


				// Debug
				this.logger.log('Finished consuming API payload in GraphQLComponent.fetch()');
			},
			(err) => { 
				this.logger.error('Fetch error: ' + err.message); 
			}
		);


		// Debug
		this.logger.log('Completed GraphQLComponent.fetch()');

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
		this.logger.log('Starting GraphQLComponent.fetchMore()');


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
		this.logger.log('Completed GraphQLComponent.fetchMore()');
	}



	// destroy GraphQLComponent
	// ToDo:
	// x impl this
	// x test this manually
	// - impl unit tests
	destroy(): void {

		// cancel subscriptions
		this.dataSub.unsubscribe();
		this.fetchMoreSub.unsubscribe();
	}

}







	



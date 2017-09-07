// NG core modules
import { 
	Component,
	Input, 
	OnInit,
	ViewEncapsulation
} 							from '@angular/core';

// 3rd party modules
import {
	ApolloQueryObservable
}							from 'apollo-angular';

// Project Services
import {
	GraphQLService,
	ProductsQuery,
	ProductsUpdateQuery
}							from '../../graphql';
import{
	LoggerService
} 							from '../../utils';




@Component({
	selector: 		'vendor-preview',
	templateUrl: 	'./preview.component.html',
	styleUrls: 		['./preview.component.styl'],
	encapsulation: 	ViewEncapsulation.None
})
export class PreviewComponent implements OnInit {

	
	private dataStream: 	ApolloQueryObservable<any>;

	_vendorData:			any;
	@Input() 
	public set vendorData(data: any) {
		this._vendorData = data;
		this.fetch(this._vendorData.node.handle);
	}

	products:					any;
	private query:				any;
	private updateQuery:		any;
	private offset:				string;
	private limit:				number;
	private path2FetchMoreFlag: string;
	private path2Collection:	string;



	constructor(
		private service: 	GraphQLService,
		private logger:		LoggerService
	) { 

		this.query 				= ProductsQuery;
		this.updateQuery		= ProductsUpdateQuery;
		this.offset				= null;
		this.limit				= 3;
		this.path2FetchMoreFlag = 'shop.products.pageInfo.hasNextPage';
		this.path2Collection 	= 'shop.products.edges';
		this.products 			= [];
	}



	ngOnInit() {
	}



	fetch(vendorHandle: string) {
		// run query
		this.dataStream = this.service.fetch(
			this.query,
			this.offset,
			this.limit,
			`title=${vendorHandle}`,
			this.path2FetchMoreFlag,
			this.path2Collection,
			this.updateQuery
		);


		// subscribe to stream
		this.dataStream.subscribe(
			({data, loading}) => {

				// Debug
				this.logger.log('Starting to consume API payload in PreviewComponent.fetch()');
				//this.logger.warn(JSON.stringify(data,null,4));


				// parse product data
				try {

					this.products = data.shop.products.edges

					//this.logger.log(`** products are: ${JSON.stringify(this.products,null,4)}`);
					
				}
				catch(e) {
					this.logger.warn(`error parsing product data`);
					this.logger.warn(JSON.stringify(e,null,4));
				}


				// Debug
				this.logger.log('Finished consuming API payload in PreviewComponent.fetch()');
			},
			(err) => { 
				this.logger.error('Fetch error: ' + err.message); 
			}
		)
	}
}

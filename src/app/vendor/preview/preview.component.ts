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
	title:					string;
	image:					any;
	description:			string;

	_vendorData:			any;
	@Input() 
	public set vendorData(data: any) {
		
		this._vendorData = data;
		this.parseTitle(data);
		this.parseImage(data);
		this.parseDescription(data);
		this.fetchProductsByHandle(data.node.handle);
	}

	products:					any;
	shopUrl:					string;
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
		this.shopUrl			= null;
	}



	ngOnInit() {
	}



	fetchProductsByHandle(vendorHandle: string) {
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
					
				}
				catch(e) {
					this.logger.warn(`error parsing product data`);
					this.logger.warn(JSON.stringify(e,null,4));
				}


				// set shop url
				// TODO:
				// - move this out of the call back so it doesn't get set over & over
				this.shopUrl = data.shop.primaryDomain.url;


				// Debug
				this.logger.log('Finished consuming API payload in PreviewComponent.fetch()');
			},
			(err) => { 
				this.logger.error('Fetch error: ' + err.message); 
			}
		)
	}



	private parseTitle(data: any): void {

		let title = data.node.title;
		this.title = title.replace(/\*+/,'').trim()
	}



	private parseImage(data: any): void {

		if (data.node.image) {
			this.image = {
				src: data.node.image.src,
				altText: data.node.image.altText
			};
		}
	}



	private parseDescription(data: any): void {

		let html: string = data.node.descriptionHtml;
		(html.length >= 410) ?
			this.description = `${html.slice(0,435)}...`:
			this.description = html
		;
	}
}











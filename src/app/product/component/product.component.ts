// NG core modules
import { 
	Component,
	Input, 
	OnInit
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
	selector: 	 'product',
	templateUrl: './product.component.html',
	styleUrls: 	 ['./product.component.css']
})
export class ProductComponent implements OnInit {



	private dataStream: 		ApolloQueryObservable<any>;
	_productId:			string;

	@Input() 
	public set productId(id: string) {
		this._productId = id;
		this.fetch();
	}

	product:					any;
	private query:				any;
	private offset:				string;
	private limit:				number;
	private path2FetchMoreFlag: string;
	private path2Object:		string;



	constructor(
		private service: 	GraphQLService,
		private logger:		LoggerService
	) { 

		this.query 				= ProductsQuery;
		this.offset				= null;
		this.limit				= 1;
		this.path2FetchMoreFlag = 'data.shop.products.pageInfo.hasNextPage';
		this.path2Object 		= 'data.shop.products.edges';
		//this.product 			= {id:null,img:{src:null}};
	}



	ngOnInit(): void {

		// Debug
		this.logger.log('Starting ProductComponent.ngOnInit()');
		

		// run initialization logic
		this.init();


		// Debug
		this.logger.log('Completed ProductComponent.ngOnInit()');
	}



	private init(): void {
		// TODO
	}



	fetch() {

		// config query variables
		let vars: any = {
			"query": "title=Les Anis de Flavigny Licorice Mints Tin 1.7 oz. (50g)"
		}
/*
	fetch(
			query: any, 
			offset: string				= null,
			limit: number				= 250,
			filters: any				= null,
			path2FetchMoreFlag: string 	= null,
			path2Object: string			= null
	): ApolloQueryObservable<any> {
*/
		// run query
		this.dataStream = this.service.fetch(
			this.query,
			this.offset,
			this.limit,
			"title=Les Anis de Flavigny Licorice Mints Tin 1.7 oz. (50g)",
			this.path2FetchMoreFlag,
			this.path2Object,
			ProductsUpdateQuery
		);


		// subscribe to stream
		this.dataStream.subscribe(
			({data, loading}) => {

				// Debug
				this.logger.log('Starting to consume API payload in ProductComponent.fetch()');
				this.logger.warn(JSON.stringify(data,null,4));


				// parse product data
				try {
					this.product = {
						id: data.shop.products.edges[0].node.title,
						img: {
							src: data.shop.products.edges[0].node.images.edges[0].node.src,
						}
					}
				}
				catch(e) {
					this.logger.warn(`error parsing product data`);
					this.logger.warn(JSON.stringify(e,null,4));
				}


				// Debug
				this.logger.log('Finished consuming API payload in ProductComponent.fetch()');
			},
			(err) => { 
				this.logger.error('Fetch error: ' + err.message); 
			}
		)

	}

}






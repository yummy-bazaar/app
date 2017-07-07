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
import gql 					from 'graphql-tag';
import { Subject } 			from 'rxjs/Subject';
import { Logger	}			from '../utils';
let slugify 				= require('slugify')


// We use the gql tag to parse our query string into a query document
const ProductCatalog = gql`
query ProductCatalog {
	shop{
		products(
			first: 250
			#after: "eyJsYXN0X2lkIjo5ODk1MzIxMjgzLCJsYXN0X3ZhbHVlIjoiOTg5NTMyMTI4MyJ9"
		){
			edges{
				node{
					id
					title
					vendor
					handle
				}
				cursor
			}
			pageInfo{
				hasPreviousPage
				hasNextPage
			}
		}
	}
}
`;



@Component({
	selector: 'product',
/*	
	template: `
		<ul *ngFor="let product of products">
			Product: {{product.node.title}}
		</ul>
	`
*/	
	template: `
		<ul *ngFor="let product of data | async | select: 'shop' | select: 'products' | select: 'edges'">
			Product: {{product.node.title}}
		</ul>
	`
})
export class ProductComponent implements OnInit {
	
	data: 		ApolloQueryObservable<any>;
	loading: 	boolean;
	products: 	any[];
	brands: 	any;



	// constructor
	constructor(
		//
		//private data: 		ApolloQueryObservable<any>,
		//private logger: 	Logger,
		//private products: 	Array<any>,//Product[],
		//private brands: 	_.Dictionary<Product[]>,
		private client: 	Apollo
	) { };



	ngOnInit() {
		this.init();
	}



	private init() {

		this.data = this.client.watchQuery({ query: ProductCatalog });


		this.client
			.watchQuery<any>({
				query: ProductCatalog
			})
			.subscribe(
				({data}) => {
					this.loading 	= data.loading;
					this.products 	= data.shop.products.edges;
					this.brands 	= data.shop.products.edges.reduce(
						(b:any,p:any) => {
							let v = slugify(p.node.vendor,'-');
							!!b[v]
							? b[v].push(p)
							: b[v] = [p]

							return b;
						},
						{}
					);
				},
				(err) => { 
					console.log('Fetch error: ' + err.message); 
				},
				() => { 
					this.brands = _.groupBy(
						this.products,
						(p) => {
							slugify(p.node.vendor,'-');
						}
					);
					console.log('Fetch completed!'); 
				}
			)
		;	
	}




	public getProduct(id: string) {
		return 	_.find(this.products,(p)=>p.id);
	}




	public getBrand(vendor: string){
		return this.brands[vendor];
	}

}



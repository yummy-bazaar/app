// NG core modules
import { 
	Component, 
	OnInit 
} 							from '@angular/core';

// 3rd party modules
import {
	ApolloQueryObservable
}							from 'apollo-angular';

// Project Services
import {
	GraphQLService,
	ProductsByVendorQuery
}							from '../../graphql';
import{
	LoggerService
} 							from '../../utils';
		




@Component({
	selector: 	 'app-product',
	templateUrl: './product.component.html',
	styleUrls: 	 ['./product.component.css']
})
export class ProductComponent implements OnInit {

	dataStream: ApolloQueryObservable<any>;

	constructor(
		private service: 	GraphQLService,
		private logger:		LoggerService
	) { }



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



	private fetch() {

		// run query
		this.dataStream = this.service.fetch(
			'1880',
			'250',
			null
		);


		// subscribe to stream
		this.dataStream.subscribe(
			({data, loading}) => {

				// Debug
				this.logger.log('Starting to consume API payload in ProductComponent.fetch()');


				// Debug
				this.logger.warn(JSON.stringify(data,null,4));


				// Debug
				this.logger.log('Finished consuming API payload in ProductComponent.fetch()');
			},
			(err) => { 
				this.logger.error('Fetch error: ' + err.message); 
			}
		)

	}

}






// NG core modules
import { BrowserModule } 	from '@angular/platform-browser';
import { NgModule } 		from '@angular/core';

// 3rd party modules
import { 
	ApolloClient,
	createNetworkInterface
} 							from 'apollo-client';
import { ApolloModule } 	from 'apollo-angular';

// Components
import { 
	AppComponent 
} 							from './app.component';
import {
	VendorIndexComponent
}							from './vendor'
import {
	ProductComponent
} 							from './product';

// Utilities
import { Logger }			from './utils/logger.service';








// init & exportGraphQL client
// TODO: import GraphQL client from a Service class 
// - 
const client = new ApolloClient({
	networkInterface: createNetworkInterface({
		uri: 'https://yummy-bazaar-dev.myshopify.com/api/graphql',
		opts: {
			headers: {
				'X-Shopify-Storefront-Access-Token':'1003e582efbf560fb66ffb28ded011f8'
			}
		}
	})
});
export function provideClient(): ApolloClient {
	return client;
}


@NgModule({
	imports:      [ 
		BrowserModule,
		ApolloModule.forRoot(provideClient),
	],
	providers:    [ Logger ],
	declarations: [ 
		AppComponent,
		VendorIndexComponent,
		ProductComponent,
	],
	exports:      [ AppComponent ],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }







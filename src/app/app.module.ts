// NG core modules
import { 
	NgModule
} 							from '@angular/core';
import { 
	BrowserModule 
} 							from '@angular/platform-browser';

// 3rd party modules
import {
	ApolloClient,
	createNetworkInterface
} 							from 'apollo-client';
import { 
	ApolloModule 
} 							from 'apollo-angular';

// Project Components
import { 
	AppComponent 
} 							from './app.component';
import {
	ListComponent,
	VendorIndexComponent,
	SelectorComponent
}							from './vendor'
import {
	ProductIndexComponent
} 							from './product';

// Project Services
import {
	getApolloClient
}							from './graphql';
import { 
	LoggerService,
	StorageService 
}							from './utils';






@NgModule({
	imports:      [ 
		ApolloModule.withClient(getApolloClient),
		BrowserModule,
	],
	providers:    [ 
		LoggerService,
		StorageService,
	],
	declarations: [ 
		AppComponent,
		ProductIndexComponent,
		VendorIndexComponent,
		SelectorComponent,
		ListComponent,
	],
	exports:      [ 
		AppComponent,
	],
	bootstrap:    [ 
		AppComponent,
	]
})
export class AppModule {}







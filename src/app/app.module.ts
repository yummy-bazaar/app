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
	PreviewComponent,
	VendorIndexComponent,
	SelectorComponent
}							from './vendor'
import {
	ProductComponent,
	ProductIndexComponent
} 							from './product';

// Project Services
import {
	getApolloClient,
	GraphQLService
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
		GraphQLService,
		LoggerService,
		StorageService,
	],
	declarations: [ 
		AppComponent,
		ListComponent,
		PreviewComponent,
		ProductComponent,
		ProductIndexComponent,
		SelectorComponent,
		VendorIndexComponent,
	],
	exports:      [ 
		AppComponent,
	],
	bootstrap:    [ 
		AppComponent,
	]
})
export class AppModule {}







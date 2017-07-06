// NG core modules
import { BrowserModule } 	from '@angular/platform-browser';
import { NgModule } 		from '@angular/core';

// 3rd party modules
import { 
	ApolloClient,
	createNetworkInterface
} 							from 'apollo-client';
import { ApolloModule } 	from 'apollo-angular';

// Project modules
import { AppComponent } 	from './app.component';
import { 
	ProfileComponent,
	FeedComponent 
}							from './sandbox';

// Utilities
import { Logger }			from './utils/logger.service';




// init & exportGraphQL client
const client = new ApolloClient({
	networkInterface: createNetworkInterface({
		uri: 'http://localhost:3010/graphql'
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
		ProfileComponent, 
		FeedComponent,
	],
	exports:      [ AppComponent ],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }







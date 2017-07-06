// NG core modules
import { BrowserModule } 	from '@angular/platform-browser';
import { NgModule } 		from '@angular/core';

// 3rd party modules
import { ApolloClient } 	from 'apollo-client';
import { ApolloModule } 	from 'apollo-angular';

// Project modules
import { AppComponent } 	from './app.component';
import { ProfileComponent }	from './sandbox/profile.component';


// Utilities
import Logger 				from './utils/logger.service';



// init & exportGraphQL client
const client = new ApolloClient();
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
	],
	exports:      [ AppComponent ],
	bootstrap:    [ AppComponent ]
})
export class AppModule { }

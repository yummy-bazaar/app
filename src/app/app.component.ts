import { Component } 	from '@angular/core';
import { 
	ProfileComponent,
	FeedComponent 
}						from './sandbox';

@Component({
	selector: 'angular-test',
	template: `
		<h1>Hello {{backend}} from {{frontend}}</h1>
		<profile>
			Loading Profile from GraphQL backend ...
		</profile>
		<feed>
			Loading Feed from GraphQL backend ...
		</feed>
	`,
})
export class AppComponent  { 
	backend 	= 'Shopify'; 
	frontend 	= 'Angular';
}

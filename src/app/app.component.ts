import { Component } 	from '@angular/core';

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
		<product></product>
	`,
})
export class AppComponent  { 
	backend 	= 'Shopify'; 
	frontend 	= 'Angular';
}

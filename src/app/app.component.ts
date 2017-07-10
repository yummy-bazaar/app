import { Component } 	from '@angular/core';

@Component({
	selector: 'angular-test',
	template:``,
	/*
	template: `
		<h1>Hello {{backend}} from {{frontend}}</h1>
		<brands></brands>
	`,
	*/
})
export class AppComponent  { 
	backend 	= 'Shopify'; 
	frontend 	= 'Angular';
}

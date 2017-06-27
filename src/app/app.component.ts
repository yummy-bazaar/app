import { Component } from '@angular/core';

@Component({
	selector: 'angular-test',
	template: `<h1>Hello {{backend}} from {{frontend}}</h1>`,
})
export class AppComponent  { 
	backend = 'Shopify'; 
	frontend = 'Angular';
}

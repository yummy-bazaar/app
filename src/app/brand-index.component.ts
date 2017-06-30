// NG core modules
import { Component, OnInit }   from '@angular/core';

// Project modules
import { Logger }				from './logger.service';
import { Hero }                from './brand';				// TODO: change this to brand model then impl
import { BrandService }         from './brand.service';		// TODO: change this to brand service then impl

@Component({
	selector:    'brand-index',
	templateUrl: './brand-index.component.html',
	providers:   [ 
					BrandService,							// TODO: change this to brand service then impl
					Logger,
	]
})
export class BrandIndex implements OnInit {
	
	// properties
	heroes: Hero[];
	selectedHero: Hero;



	// constructor
	constructor(private service: BrandService) { }



	// event handlers
	ngOnInit() {
		this.heroes = this.service.getBrands();
	}



	// actions
	selectHero(hero: Hero) { 
		this.selectedHero = hero; 
	}
}









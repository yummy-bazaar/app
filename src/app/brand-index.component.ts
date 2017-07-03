// NG core modules
import { Component, OnInit }   from '@angular/core';

// Project modules
import { Logger }				from './logger.service';
import { Brand }                from './brand';				// TODO: change this to brand model then impl
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
	brands: Brand[];
	selectedBrand: Brand;



	// constructor
	constructor(private service: BrandService) { }



	// event handlers
	ngOnInit() {
		this.brands = this.service.getBrands();
	}



	// actions
	selectBrand(brand: Brand) { 
		this.selectedBrand = brand; 
	}
}









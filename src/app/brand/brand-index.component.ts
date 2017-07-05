// NG core modules
import { Component, OnInit }   from '@angular/core';

// Project modules
import Logger					from '../logger.service';
import {Product}				from '../models';
import {ProductService}			from '../product';

@Component({
	selector:	'brand-index',
	template: 	require('./brand-index.component.html'),	// TODO: can I use es6 imports instad?
	providers:	[ 
					ProductService,
					Logger,
	]
})
export class BrandIndex implements OnInit {




	// constructor
	constructor(
		private service: ProductService
	) { }



	// event handlers
	ngOnInit() {
		
	}



	// actions
	
}









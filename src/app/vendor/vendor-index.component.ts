import { 
	Component,
	OnInit,
	OnDestroy
}					 		from '@angular/core';
import {
	Observable
} 							from 'rxjs';
import {
	Subscription
}							from 'rxjs/Subscription';
import {
	CollectionsQuery
}  							from '../api/queries';
import { 
	LoggerService,
	startsWithAlpha	
}							from '../utils';
import { 
	Product 
}							from '../product';
import {
	VendorService
}							from './vendor.service';








@Component({
	selector: 	'vendor-index',
	template: 	require('./vendor-index.component.html'),
})
export class VendorIndexComponent implements OnInit, OnDestroy {
	

	
	vendorKeys:					Observable<string[]>;
	private vendorKeysSub:		Subscription;
	selectedVendors:			Observable<Set<any>>;
	private selectedVendorsSub:	Subscription;
	
	

	
	constructor(
		private service: 	VendorService
	) {}; 



	ngOnInit(): void {

		// init VendorService provider
		if (!this.service.completedInit)
			this.service.init();

		// subscribe to vendorKeysStream
		this.vendorKeysSub = this.service.vendorKeysStream.subscribe(
			(data) => this.vendorKeys = data
		);

		// subscribe to selectedVendorsStream
		this.selectedVendorsSub = this.service.selectedVendorsStream.subscribe(
			(data) => this.selectedVendors = data
		);
	};



	ngOnDestroy(): void {

		// cancel subscriptions
		this.vendorKeysSub.unsubscribe();
		this.selectedVendorsSub.unsubscribe();

		// destroy service if necessary
		if(!this.service.completedDestroy)
			this.service.destroy();
	}


	fetchVendorsByKey(key: string): Set<any> {
		return this.service.fetchVendorsByKey(key);
	}



}









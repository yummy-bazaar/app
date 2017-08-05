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
	providers:	[VendorService]
})
export class VendorIndexComponent implements OnInit, OnDestroy {
	

	
	vendorKeys:					Observable<string[]>;
	private vendorKeysSub:		Subscription;
	selectedVendors:			Observable<Set<any>>;
	private selectedVendorsSub:	Subscription;
	
	

	
	constructor(
		private service: 	VendorService
	) {}; 



	ngOnInit() {
		// init this.service
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



	ngOnDestroy() {
		this.vendorKeysSub.unsubscribe();
		this.selectedVendorsSub.unsubscribe();
		this.service.destroy();
	}






}









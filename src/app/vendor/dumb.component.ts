import { 
	Component,
	EventEmitter,
	Input,
	Output,
	OnInit,
	OnDestroy
}					 		from '@angular/core';
import { 
	LoggerService
}							from '../utils';








@Component({
	selector: 		'dumb-component',
	templateUrl: 	'./dumb.component.html',
})
export class DumbComponent implements OnInit, OnDestroy {
	

	//private newKey:				string;
	@Input() vendorKeys:		Set<string>;
	@Input() selectedVendors:	Set<any>;

	@Output('selectedKeyUpdated')
	private selectedKeyUpdated:	EventEmitter<string>;
	

	
	constructor(
		private logger: LoggerService
	) {
		// alert subscribers of update to this.key
		//this.newKey = null;
		this.selectedKeyUpdated = new EventEmitter<string>();
		//this.selectedKeyUpdated.emit(this.newKey);
	}; 



	ngOnInit(): void {

		// Debug
		this.logger.log('Starting DumbComponent.ngOnInit()');

		// Debug
		this.logger.log('Completed DumbComponent.ngOnInit()');
	};



	ngOnDestroy(): void {

		// Debug
		this.logger.log('Starting DumbComponent.ngOnDestroy()');

		// Debug
		this.logger.log('Completed DumbComponent.ngOnDestroy()');
	}



	selectVendor(key: string): void {
		this.selectedKeyUpdated.emit(key);
	}


}









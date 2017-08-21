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
}							from '../../utils';









@Component({
	selector: 	 'list',
	templateUrl: './list.component.html',
	styleUrls: 	 ['./list.component.styl']
})
export class ListComponent implements OnInit, OnDestroy {
	

	//private newKey:				string;
	@Input() selectedVendors:	Set<any>;
	

	
	constructor(
		private logger: LoggerService
	) {}; 



	ngOnInit(): void {

		// Debug
		this.logger.log('Starting ListComponent.ngOnInit()');

		// Debug
		this.logger.log('Completed ListComponent.ngOnInit()');
	};



	ngOnDestroy(): void {

		// Debug
		this.logger.log('Starting ListComponent.ngOnDestroy()');

		// Debug
		this.logger.log('Completed ListComponent.ngOnDestroy()');
	}

}

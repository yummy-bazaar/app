import { 
	Component,
	Input
}					 		from '@angular/core';




@Component({
	selector: 	 'list',
	templateUrl: './list.component.html',
	styleUrls: 	 ['./list.component.styl']
})
export class ListComponent {
	

	@Input() selectedVendors:	Set<any>;
	
	
	constructor() {}; 

}

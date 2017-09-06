// NG core modules
import { 
	Component,
	Input
} 							from '@angular/core';
		




@Component({
	selector: 	 'product',
	templateUrl: './product.component.html',
	styleUrls: 	 ['./product.component.styl']
})
export class ProductComponent {


	@Input() productData:	any;


	constructor() {}

}






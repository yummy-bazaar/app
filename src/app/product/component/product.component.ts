// NG core modules
import { 
	Component,
	Input
} 							from '@angular/core';

// Project Services
import{
	LoggerService
} 							from '../../utils';
		




@Component({
	selector: 	 'product',
	templateUrl: './product.component.html',
	styleUrls: 	 ['./product.component.styl']
})
export class ProductComponent {


	title:					string;
	handle:					string;
	imageSrc:				string;
	imageAltText:			string;

	_productData:		any;
	@Input() 
	public set productData(data: any){
		this._productData = data;
		this.title 		  = data.node.title;
		try {
			this.imageSrc 	  = data.node.variants.edges[0].node.image.src;
		}
		catch(e){
			this.logger.warn(`no variant image for ${this.title}! using main image instead`);
			this.imageSrc 	  = data.node.images.edges[0].node.src;
		}
		try {
			this.imageAltText = data.node.variants.edges[0].node.image.altText;
		}
		catch(e){
			this.logger.warn(`no variant image for ${this.title}! using main image instead`);
			this.imageAltText = data.node.images.edges[0].node.altText;
		}
	}


	constructor(
		private logger:		LoggerService
	) {}

}






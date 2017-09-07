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
		// cache product data
		this._productData = data;

		// store product title
		let title = data.node.title;
		(title.length > 25) ?
			this.title = `${title.slice(0,22)}...` :
			this.title = title
		;

		// store product image src
		try {
			this.imageSrc 	  = data.node.variants.edges[0].node.image.src;
		}
		catch(e){
			this.logger.warn(`no variant image for ${this.title}! using main image instead`);
			this.imageSrc 	  = data.node.images.edges[0].node.src;
		}

		// store product image altText
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






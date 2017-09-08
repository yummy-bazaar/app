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
	weightOz:				number;
	weightG:				number;

	_productData:		any;
	@Input() 
	public set productData(data: any){
		this._productData = data;
		this.parseTitle(data);
		this.parseImage(data);
		this.parseWeight(data);
	}



	constructor(
		private logger:		LoggerService
	) {}



	private parseTitle(data: any): void {

		let title: string = data.node.title;

		(title.length > 25) ?
			this.title = `${title.slice(0,22)}...` :
			this.title = title
		;
	}



	private parseImage(data: any): void {

		try {
			this.imageSrc 	  = data.node.variants.edges[0].node.image.src;
		}
		catch(e){
			this.logger.warn(`no variant image for ${this.title}! using main image instead`);
			this.imageSrc 	  = data.node.images.edges[0].node.src;
		}

		// parse product image altText
		try {
			this.imageAltText = data.node.variants.edges[0].node.image.altText;
		}
		catch(e){
			this.logger.warn(`no variant image for ${this.title}! using main image instead`);
			this.imageAltText = data.node.images.edges[0].node.altText;
		}
	}


	private parseWeight(data: any): void {
/*
		let unit = data.node.weightUnit;
		if (unit.trim() === "OUNCES") {
			this.weightOz = data.node.weight

		}
*/
/*
GRAMS

Metric system unit of mass

KILOGRAMS

1 equals 1000 grams

OUNCES

Imperial system unit of mass

POUNDS

1 equals 16 ounces
*/

	}

}






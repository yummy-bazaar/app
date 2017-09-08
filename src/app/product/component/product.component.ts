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
	impWeight:				number;
	metWeight:				number;
	metUnit:				string;

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

		// parse product image src
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
			this.logger.warn(`no variant altText for ${this.title}! using main altText instead`);
			this.imageAltText = data.node.images.edges[0].node.altText;
		}
	}


	private parseWeight(data: any): void {

		// fetch unit
		let unit = data.node.variants.edges[0].node.weightUnit;

		// handle unit conversions
		switch (unit) {
			case "OUNCES":
				this.impWeight	= +data.node.variants.edges[0].node.weight;
				this.metWeight 	= +(this.impWeight / 0.035274).toFixed(2);
				this.metUnit   	= 'g';
				break;
			
			
			case "GRAMS":
				this.metWeight 	= +data.node.variants.edges[0].node.weight;
				this.impWeight	= +(this.metWeight / 28.3495).toFixed(2);
				this.metUnit   	= 'g';
				break;
			
			
			case "KILOGRAMS":
				this.metWeight 	= +data.node.variants.edges[0].node.weight;
				this.impWeight	= null
				this.metUnit	= 'kg'
				break;
			
			
			case "POUNDS":
				this.impWeight	= (+data.node.variants.edges[0].node.weight / 16);
				this.metWeight 	= +(this.impWeight / 0.035274).toFixed(2);
				this.metUnit 	= 'g';
				break;
			
			default:
				this.impWeight	= null;
				this.metWeight	= null;
				break;
		}

		// switch to KG if necessary
		let magnitude = this.metWeight / 1000;
		if (
			this.metUnit === 'g' && 
			magnitude >= 1
		) {
			this.metWeight = +(this.metWeight / 1000).toFixed(2);
			this.metUnit   = 'kg';
		}

	}

}






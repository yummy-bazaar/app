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


	id:				string;
	title:			string;
	handle:			string;
	imageSrc:		string;
	imageAltText:	string;
	impWeight:		number;
	metWeight:		number;
	metUnit:		string;
	type:			string;
	price:			number;
	productUrl:		string;
	toCartUrl: 		string;

	_productData: any;
	@Input() 
	public set productData(data: any){
		this._productData = data;
		this.parseId(data);
		this.parseTitle(data);
		this.parseHandle(data);
		this.parseImage(data);
		this.parseWeight(data);
		this.parseType(data);
		this.parsePrice(data);
	}

	_shopUrl: string;
	@Input()
	public set shopUrl(url: string){
		this._shopUrl = url;
		this.parseUrl(url);
	}



	constructor(
		private logger:		LoggerService
	) {}



	private parseId(data: any): void {

		this.id = data.node.id;
	}



	private parseTitle(data: any): void {

		let title: string = data.node.title;

		(title.length > 25) ?
			this.title = `${title.slice(0,22)}...` :
			this.title = title
		;
	}



	private parseHandle(data: any): void {

		this.handle = data.node.handle;
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



	private parseType(data: any): void {

		this.type = data.node.productType;
	}



	private parsePrice(data: any): void {

		this.price = +data.node.variants.edges[0].node.price;
	}



	private parseUrl(shopUrl: string): void {

		// set product base url
		this.productUrl = `${this._shopUrl}/products/${this.handle}`;

		// set add to cart url
		// TODO:
		// - figure out how to do this in the context of the Retina theme
		this.toCartUrl	= `${this._shopUrl}/cart/add?id=${this.id}`;
	}

}








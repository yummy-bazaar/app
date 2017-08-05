export interface Product {
    node: {
    	//id: string;
        vendor: string
    }
}

/*



Brand data model:
- name
- description
- cover image
- 1-M Product (a collection of products)


Product data model:
- name
- slug
- description
- cover image
- (price, inventory status...)

*/
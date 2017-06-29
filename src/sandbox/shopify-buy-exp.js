import client from './shopify-buy-sdk';


/*
let products = client
	.fetchAllProducts()
	.then(console.log, console.error)
	//.catch((err) => console.error(err));


//console.log(products);
*/


const shopPromise 		= client.fetchShopInfo();
const productsPromise 	= client.fetchAllProducts();


Promise
	.all(
		[
			shopPromise,
			productsPromise, 
		]
	)
	.then(
		([shop, products]) => {

   			// log shop data
   			console.log(
   							'shop is: ', 
   							JSON.stringify(shop,null,4)
   			);


			// log product data
   			console.log(
   							'products are: ', 
   							JSON.stringify(products,null,4)
   			);
    	}
    )
    .catch((err) => console.error(err));




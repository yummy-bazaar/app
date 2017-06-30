// import client
import client 	from './shopify-buy-client';



// fetch shop metadata
const shopPromise 		= client.fetchShopInfo();
// fetch data for entire product catalog
const productsPromise 	= client.fetchAllProducts();


// consume promises
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





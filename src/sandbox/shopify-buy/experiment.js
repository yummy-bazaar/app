// import client
import client 	from './shopify-buy-client';




/*
*
*	Experiment 1
*
*	Fetch all products & transform into brand map then print to stdout
*
*	issue: why is it only fetching 20 products at a time? 
*/


// init collections
let products = [], 
	brands	 = {};


client
	.fetchAllProducts()
	// TODO: consume payload
	.then(
		(catalog) => {

			// add entire catalog to cache
			products.push(...catalog);


			// populate brands map cache
			brands = catalog
						.reduce(
							(map,product) => {
								let brand = product.attrs.vendor.value;
								let handle = product.attrs.handle.value;

								!!map[brand]
								? map[brand].push(handle)
								: map[brand] = [handle];

								return map;
							},
							{}
						)
			;
		}
	)
	// Debug
	.then(
		()=>{

			// print products count
			console.log(`There are ${products.length} products in the catalog`);

			// print first product
			console.log(JSON.stringify(products[0],null,4));

			// print entire catalog
			//console.log(JSON.stringify(products,null,4));


			// print brands count
			console.log(`There are ${Object.keys(brands).length} brands in the catalog`);

			// print brands
			console.log(JSON.stringify(brands,null,4));
		}
	)
	.catch(console.error)
;








/*
*
*	Experiment 1
*
*	Fetch data & print to stdout
* 
*

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


*/


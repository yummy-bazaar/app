import gql 		from 'graphql-tag';


export const ProductsQuery = gql`
query ProductsQuery(
    $filters: String
    $limit: Int = 250
    $offset: String
  ) {
  shop{
    products(
      first: $limit
      after: $offset
      query: $filters
      sortKey: TITLE
    ){
      edges{
        node{
          id
          title
          productType
          handle
          variants(first: 1){
            edges{
              node{
                price
                weight
                weightUnit
                image{
                  src
                  altText
                }
              }
            }
          }
          images(first: 1) {
            edges {
              node {
                id
                src
                altText
              }
            }
          }
        }
        cursor
      }
      pageInfo{
        hasPreviousPage
        hasNextPage
      }
    }
  }
}
`;


export const ProductsUpdateQuery = 
	(prev,fetchMoreResult) => {
		return Object.assign(
			{}, 
			prev, 
			{
				shop: {
					products: {
						edges: [
							...prev.shop.products.edges, 
							...fetchMoreResult.shop.products.edges,
						],
						pageInfo: fetchMoreResult.shop.products.pageInfo,
						__typename: "ProductConnection"
					},
				},
				__typename: "Shop"
			}
		);
	}
;


export const ProductsByVendorQuery = gql`
query ProductsByVendor(
  	$vendor: String = null
  	$limit: Int = 250
  	$offset: String = null
	) {
  shop {
    products (
      first: $limit
      query: $vendor
      after: $offset
    ) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          variants (
            first: 1
        	){
            edges {
              node{
                id
                title
                image {
                  id
                  src
                  altText
                } 
                price
                weight
                weightUnit
              }
            }
          }
        }
      }
    }
  }
}
`;



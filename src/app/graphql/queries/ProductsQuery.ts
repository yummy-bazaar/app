import gql 		from 'graphql-tag';


export const ProductsQuery = gql`
query ProductsQuery {
	shop{
		products(
			first: 250
		){
			edges{
				node{
					id
					title
					vendor
					handle
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



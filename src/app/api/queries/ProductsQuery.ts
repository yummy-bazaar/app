import gql 					from 'graphql-tag';


// We use the gql tag to parse our query string into a query document
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



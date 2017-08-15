import gql 	from 'graphql-tag';


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



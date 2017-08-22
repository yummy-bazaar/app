import gql   from 'graphql-tag';


export const CollectionsQuery = gql`
query Collections(
	$offset: String
	$limit: Int!
) {
  shop {
    collections (
      first: $limit
      after: $offset
      sortKey: TITLE
    ) {
      edges {
        node {
          id
          handle
          title
          descriptionHtml
          image {
            id
            src
            altText
          }
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
      }
    }
  }
}
`;



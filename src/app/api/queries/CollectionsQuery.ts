import gql   from 'graphql-tag';


export const CollectionsQuery = gql`
query Collections($after: String) {
  shop {
    collections (
      first: 250
      after: $after
    ) {
      edges {
        node {
          id
          handle
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
`
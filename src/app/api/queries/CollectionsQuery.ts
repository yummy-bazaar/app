import gql   from 'graphql-tag';


export const CollectionsQuery = gql`
query Collections {
  shop {
    collections (
      first: 250
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
// schema.js
import Post from './post.js';
const RootQuery = `
  type RootQuery {
    post(id: Int!): Post
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;
export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition, RootQuery,
    // we have to destructure array imported from the post.js file
    // as typeDefs only accepts an array of strings or functions
    ...Post
  ],
  // we could also concatenate arrays
  // typeDefs: [SchemaDefinition, RootQuery].concat(Post)
  resolvers: {},
});
// This example demonstrates a simple server with some
// relational data: Posts and Authors. You can get the
// posts for a particular author, and vice-versa

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html


import { makeExecutableSchema } from 'graphql-tools';
import { Types } 				from './Types';
import { Resolvers }			from './Resolvers';



const typeDefs 	= Types;
const resolvers = Resolvers;


// Debug
//console.log(`Types are: \n${typeDefs}`);


export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


import { makeExecutableSchema } from 'graphql-tools';
import RootQuery 				from './schema/RootQuery';
import SchemaDefinition 		from './schema/SchemaDefinition';
import Author 					from './schema/Author';
import Post 					from './schema/Post';
import Resolvers				from './resolvers/Resolvers';




/*
// Debug
console.log('RootQuery is:\n',JSON.stringify(RootQuery,null,4),'\n');
console.log('SchemaDefinition is:\n',JSON.stringify(SchemaDefinition,null,4),'\n');
console.log('Author is:\n',JSON.stringify(Author,null,4),'\n');
console.log('Post is:\n',JSON.stringify(Post,null,4),'\n');
console.log('Resolvers are:\n',JSON.stringify(Resolvers,null,4),'\n');
*/



const resolvers = Resolvers;
export default makeExecutableSchema({
	typeDefs: [
		RootQuery, 
		SchemaDefinition, 
		Author, 
		Post
	],
	resolvers: resolvers,
});











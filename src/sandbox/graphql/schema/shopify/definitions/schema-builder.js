/**
*
*	GraphQLSchema builder
*	--------------
*	this is a utility for building a GraphQLSchema object 
*	from json result from introspection query
*
*	documentation: 
*	http://dev.apollodata.com/tools/graphql-tools/mocking.html#Mocking-a-schema-using-introspection
*		
*
*/
'use strict';


// Debug
//console.log('\n\nBEGIN PROCESS\n\n');
//process.on('exit',()=>console.log('\n\nEND PROCESS\n\n'));



// import modules
import { buildClientSchema } 		from 'graphql';
import introspectionData 			from './introspection-data.json';


// Debug
//console.log('\nintrospectionData is:\n',JSON.stringify(introspectionData.data,null,4),'\n');



// build Schema from introspection data
const schema = buildClientSchema(introspectionData.data);


// Debug
//console.log('\nSchema is:\n',JSON.stringify(schema,null,4),'\n');



export default schema;







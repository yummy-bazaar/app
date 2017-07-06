var GraphQL 	= require('jsonschema-to-graphql');
var Resolver 	= require('../../../node_modules/jsonschema-to-graphql/dist/knex-resolver/index').default;
var knex 		= require('knex');
var resolver 	= new Resolver(knex);



 
var opts = {
	resolver : resolver,
	skipConstraintModels: false,
	skipOperatorFields: false,
	skipPaginationFields: false,
	skipSortByFields: false
};




// Build GraphQL Schema
// This is all you need to do to generate the schema.
var graphQLSchema  = GraphQL.builder(opts)
	//.addSchema(
	//	require('./schemas/User'), 
	//	{
	//		exclude: ['ignoreField']
	//	}
	//)
	.addSchema(
		require('../graphql/schema.json'), 
		{}
	)
	//.addCustomQueryFunction(require('./schemas/CustomFunction'))
	.build();


console.log(JSON.stringify(graphQLSchema,null,4))












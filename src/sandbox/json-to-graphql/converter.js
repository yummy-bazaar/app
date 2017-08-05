import generateSchema 	from 'json-to-graphql'
//import data 			from '../graphql/schema.json'
import fs 				from 'fs';
import Path				from 'path';



/*
let data = JSON.parse(
	fs.readFileSync(
		Path.join(__dirname,'../graphql/schema.json'), 
		'utf8'
	)
);
*/


import typesBundle		from '../graphql/types';



const schema = generateSchema(typesBundle)
fs.writeFile(
	'schema.js', 
	schema, 
	null
)
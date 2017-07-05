let getQueryType = () => {
	return `
				type Query {
					posts: [Post]
					author(id: Int!): Author
				}
			`
	;
}


export default getQueryType;
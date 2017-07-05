let getPostType = () => {
	return `
				type Post {
					id: Int!
					title: String
					author: Author
					votes: Int
				}
			`
	;
}


export default getPostType;
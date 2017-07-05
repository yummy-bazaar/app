let getAuthorType = () => {
	return `
				type Author {
					id: Int!
					firstName: String
					lastName: String
					posts: [Post] # the list of Posts by this author
				}
			`
	;
}


export default getAuthorType;
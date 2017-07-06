import Post 	from './Post';


const Author = `
type Author {
	id: Int!
	firstName: String
	lastName: String
	posts: [Post] # the list of Posts by this author
}
`;


//export default [Author, ...Post];
export default Author;







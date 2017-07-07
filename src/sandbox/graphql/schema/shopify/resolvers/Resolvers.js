import { 
	find, 
	filter 
} from 'lodash';



const authors = [
	{ id: 1, firstName: 'Tom', lastName: 'Coleman' },
	{ id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
	{ id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];


const posts = [
	{ id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
	{ id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
	{ id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
	{ id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];


const Resolvers = {
	RootQuery: {
		author(_, { id }) {
			return find(authors, { id: id })
		},
		posts() {
			return posts;
		},
	},
	Author: {
		posts(author) {
			return filter(posts, { authorId: author.id });
		},
	},
	Post: {
		author(post) {
			return find(authors, { id: post.authorId });
		},
	},
};


export default Resolvers;






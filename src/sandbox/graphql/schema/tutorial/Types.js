import getAuthorType 	from './types/Author';
import getPostType 		from './types/Post';
import getQueryType 	from './types/Query';


const author 	= getAuthorType();
const post 		= getPostType();
const query 	= getQueryType();


export const Types = `
	${author}
	${post}
	${query}
`;









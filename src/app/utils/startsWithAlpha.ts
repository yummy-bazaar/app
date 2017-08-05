export const startsWithAlpha = function (str: string) {

	let code = str.charCodeAt(0);
	
	return  (code > 64 && code < 91) || 	// upper alpha (A-Z)
			(code > 96 && code < 123)		// lower alpha (a-z)

};


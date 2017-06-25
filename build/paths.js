let paths = 
{
	src:
	{
		root: 'src',
	},
	dist:
	{
		root: 'dist',
	},
	theme:
	{
		root: 'theme',
		dirs:
		[
			'assets/**/*',
			'layout/**/*',
			'config/**/*',
			'snippets/**/*',
			'templates/**/*',
			'locales/**/*',
		]
	}
	
};

export default paths;
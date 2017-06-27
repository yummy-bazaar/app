let paths = 
{
	src:
	{
		root: 'src',
		libs: 	
		[
			'node_modules/core-js/client/shim.min.js',
			'node_modules/zone.js/dist/zone.js',
			'node_modules/systemjs/dist/system.src.js',
			'src/**/systemjs*.js',
		],
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
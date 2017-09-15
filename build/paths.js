const paths = 
{
	src:
	{
		root: 'src',
		libs: 	
		[
			'dist/inline.bundle.js',
			'dist/polyfills.bundle.js',
			'dist/styles.bundle.js',
			'dist/vendor.bundle.js',
			'dist/main.bundle.js',
		],
		scripts: 
		[
			'src/**/*.ts',
		],
	},
	deploy:
	{
		root: 'deploy',
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


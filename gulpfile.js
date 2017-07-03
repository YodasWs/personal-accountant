'use strict';

const argv = require('yargs')
	.usage('$0 <command> [options]')
	.command(['serve', '*'], 'Build and serve component library', {
		port: {
			describe: 'The server port to listen to',
			default: 3000,
			alias: 'p'
		}
	})
	.help('?')
	.epilog('(C) 2017 Samuel B Grundman')
	.argv

const gulp = require('gulp'),

plugins = {
	server: require('gulp-webserver'),
	prefixCSS: require('gulp-autoprefixer'),
	sourcemaps: require('gulp-sourcemaps'),
	lintSass: require('gulp-sass-lint'),
	rmLines: require('gulp-rm-lines'),
	compileSass: require('gulp-sass'),
	compileJS: require('gulp-babel'),
	concat: require('gulp-concat'),
	lintES: require('gulp-eslint'),
	sort: require('gulp-order'),
	ssi: require('gulp-ssi'),
	path: require('path'),
},

options = {
	compileJS:{
		comments:false,
		plugins: [
			'transform-exponentiation-operator',
			'transform-remove-console'
		],
		presets: [
			'react',
			'es2015'
		]
	},
	compileSass:{
		outputStyle: 'compressed'
	},
	lintES:{
		env: {
			browser: true,
			es6: true
		},
		rules: {
			strict: [
				'error',
				'global'
			]
		}
	},
	lintSass:{
		files: {
			ignore: '**/*.min.css'
		},
		rules: {

'extends-before-mixins': 1,
'extends-before-declarations': 1,
'placeholder-in-extend': 1,
'mixins-before-declarations': 1,
'one-declaration-per-line': 1,
'empty-line-between-blocks': 1,
'single-line-per-selector': 1,
'no-attribute-selectors': 1,
'no-color-hex': 1,
'no-color-keywords': 1,
'no-color-literals': 1,
'no-combinators': 1,
'no-css-comments': 1,
'no-debug': 1,
'no-disallowed-properties': 1,
'no-duplicate-properties': 1,
'no-empty-rulesets': 1,
'no-extends': 1,
'no-ids': 1,
'no-important': 1,
'no-invalid-hex': 1,
'no-mergeable-selectors': 1,
'no-misspelled-properties': 1,
'no-qualifying-elements': 1,
'no-trailing-whitespace': 1,
'no-trailing-zero': 1,
'no-transition-all': 1,
'no-universal-selectors': 0,
'no-url-domains': 1,
'no-url-protocols': 1,
'no-vendor-prefixes': 1,
'no-warn': 1,
'property-units': 1,
'declarations-before-nesting': 1,
'force-attribute-nesting': 1,
'force-element-nesting': 1,
'force-pseudo-nesting': 1,
'class-name-format': 1,
'function-name-format': 1,
'id-name-format': 1,
'mixin-name-format': 1,
'placeholder-name-format': 1,
'variable-name-format': 1,
'attribute-quotes': 1,
'bem-depth': 1,
'border-zero': 1,
'brace-style': 1,
'clean-import-paths': 1,
'empty-args': 1,
'hex-length': 1,
'hex-notation': 1,
'indentation': [
	2,
	{
		size: 'tab'
	}
],
'leading-zero': 1,
'max-line-length': 1,
'max-file-line-count': 1,
'nesting-depth': 1,
'property-sort-order': 0,
'pseudo-element': 1,
'quotes': 1,
'shorthand-values': 1,
'url-quotes': 1,
'variable-for-property': 1,
'zero-unit': 1,
'space-after-comma': 1,
'space-before-colon': 1,
'space-after-colon': 1,
'space-before-brace': 1,
'space-before-bang': 1,
'space-after-bang': 1,
'space-between-parens': 1,
'space-around-operator': 1,
'trailing-semicolon': 1,
'final-newline': 1

		}
	},
	prefixCSS:{
		// more options at https://github.com/postcss/autoprefixer#options
		browsers: [
			// browser strings detailed at https://github.com/ai/browserslist#queries
			'last 2 Firefox versions',
			'last 2 Chrome versions',
			'Safari >= 10',
			'ie_mob >= 11',
			'ie >= 11'
		],
		cascade: false
	},
	dest: 'docs/',
	rmLines:{
		filters:[
			/^[\'"]use strict[\'"];$/,
			/^\s*$/
		]
	},
	concat:{
		css:{
			path: 'min.css'
		},
		js:{
			path: 'min.js'
		}
	},
	server:{
		path: '/personal-accountant/',
		directoryListing: false,
		defaultFile: 'index.html',
		port: argv.port,
	},
	sort:{
		css:[
			'src/main.scss',
			'src/**/*.{sa,sc,c}ss',
		],
		js:[
			'src/app.js',
			'src/**/*.js',
		]
	},
	ssi:{
		root: 'src'
	}
}

function runTasks(task) {
	const fileType = task.fileType || 'static'
	let stream = gulp.src(task.src)
	const tasks = task.tasks

	// Output Linting Results
	;[
		'lintSass',
		'lintES'
	].forEach((task) => {
		if (tasks.indexOf(task) != -1) {
			let option = options[task] || {}
			if (option[fileType]) option = option[fileType]
			stream = stream.pipe(plugins[task](option))
			stream = stream.pipe(plugins[task].format())
			stream = stream.pipe(plugins[task].failOnError())
			tasks.splice(tasks.indexOf(task), 1)
		}
	})

	// Init Sourcemaps
	stream = stream.pipe(plugins.sourcemaps.init())

	// Run each task
	if (tasks.length) for (let i=0, k=tasks.length; i<k; i++) {
		let option = options[tasks[i]] || {}
		if (option[fileType]) option = option[fileType]
		stream = stream.pipe(plugins[tasks[i]](option))
		if (plugins[tasks[i]].failOnError) stream = stream.pipe(plugins[tasks[i]].failOnError())
	}

	// Write Sourcemap
	stream = stream.pipe(plugins.sourcemaps.write())
	// Output Files
	return stream.pipe(gulp.dest(options.dest))
}

;[
	{
		name: 'compile:sass',
		src: [
			'src/**/*.{sa,sc,c}ss',
			'!**/*.min.css',
			'!**/min.css'
		],
		tasks: [
			'lintSass',
			'compileSass',
			'prefixCSS',
			'sort',
			'concat',
			'rmLines',
		],
		fileType: 'css'
	},
	{
		name: 'compile:js',
		src: [
			'src/**/*.js',
			'!**/*.min.js',
			'!**/min.js'
		],
		tasks: [
			'lintES',
			'compileJS',
			'rmLines',
			'concat',
		],
		fileType: 'js'
	},
	{
		name: 'compile:html',
		src: [
			'./src/**/*.html',
			'!**/components/**/*.html'
		],
		tasks: [
			'ssi',
		],
		fileType: 'html'
	},
	{
		name: 'transfer-files',
		src: [
			'./src/**/*.jp{,e}g',
			'./src/**/*.gif',
			'./src/**/*.png',
			'./src/**/*.ttf'
		],
		tasks: []
	}
].forEach((task) => {
	gulp.task(task.name, () => {
		return runTasks(task)
	})
})

gulp.task('lint:sass', () => {
	return gulp.src([
		'src/**/*.{sa,sc,c}ss',
		'!**/*.min.css',
		'!**/min.css'
	])
		.pipe(plugins.lintSass(options.lintSass))
		.pipe(plugins.lintSass.format())
})

gulp.task('lint:js', () => {
	return gulp.src([
		'src/**/*.js',
		'!**/*.min.js',
		'!**/min.js'
	])
		.pipe(plugins.lintES(options.lintES))
		.pipe(plugins.lintES.failOnError())
		.pipe(plugins.lintES.format())
})

gulp.task('compile', gulp.parallel('compile:html', 'compile:js', 'compile:sass', 'transfer-files'))

gulp.task('watch', () => {
	gulp.watch('./src/**/*.{sa,sc,c}ss', gulp.series('compile:sass'))
	gulp.watch('./src/**/*.html', gulp.series('compile:html'))
	gulp.watch('./src/**/*.js', gulp.series('compile:js'))
})

gulp.task('serve', () => {
	return gulp.src('./docs/')
		.pipe(plugins.server(options.server))
})

gulp.task('default', gulp.series(
	'compile',
	// Ugh, can't watch on Windows yet >_<
//	'watch',
	'serve'
))

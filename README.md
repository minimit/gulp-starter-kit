
// Settings
var settings = {};
settings.browserSync: { // browserSync server, html only
	server: {
		baseDir: './' + dest
	}
}
/*
settings.browserSync: { // proxy to webserver, keep trailing / or bugs
	proxy: 'http://192.168.1.183/git/mt-gulp/' + dest + '/',
	host: '192.168.1.183',
	open: 'external'
}*/
/*
settings.ftp: { // ftp upload
	host: 'website.com',
	port: 21,
	user: 'johndoe',
	pass: '1234',
	remotePath: '/',
	src: dest + "/**"
}*/
settings.imagemin: {
	progressive: true,
	svgoPlugins: [{
		removeViewBox: false
	}]
}





semplificare settings
rivedere istruzioni readme

WIP (work in progress)

scrivere che lo uso come codekit https://github.com/lazd/gulp-replace/issues
	spiegare perche' non uso browserify e requirejs(bugs + semplificare l'import + non voglio http requests addizionali)
	xe solo prepend e append
		it is enough also for modular javascript, just have one master file prepend/append the module files in the correct order
			https://incident57.com/codekit/help.html#javascript


################ install

install node http://nodejs.org

then

npm install -g bower
npm install -g gulp

then in the local directory

npm run build

or

npm install gulp-imagemin
npm install browser-sync
npm install
npm bower install

we install gulp-imagemin and browser-sync by themselves because of some issues with npm install


################ Features

	includes bootstrap and jquery
	other included stuff
	CSS Autoprefixing
	Built-in preview server with livereload
	scripts lint
	image compression
	browserify with Bower integration

we modify files inside the src folder only to install bower files, for the rest we don't touch the src folder, we copy and compile and do all the stuff in the dest folder
import and require the scripts and less from the bower_components folder, they'll be included and compressed in the main files
	if you prefer to have a lib folder, modify settings.bower.install to copy files from bower where you want
edit browserSync settings (mettere default in simple server non il proxy)
need to implement
	implement file revisions (gulp-rev) https://www.npmjs.org/package/gulp-rev + htaccess from boilerplate
	tests with mocha installed globally (npm run test) https://www.npmjs.org/package/gulp-mocha
future fixes
	waiting for new gulp version to do only watch task syncronous, async tasks for better build performances, and remove run-sequence
	waiting for gulp-minify-css to support sourcemaps https://github.com/jonathanepollack/gulp-minify-css/issues/34
	waiting for gulp-include to support sourcemaps https://github.com/wiledal/gulp-include/issues/9
todo
	add gulp-autoprefixer

If you ever need to stop the server, use Ctrl+C to quit the gulp process.

ADD LINKS to the doc on main files

################ REQUIRES (js)

REQUIRE SCRIPTS
you can require script from /bower_components
	require('../../bower_components/bootstrap/dist/js/bootstrap.js');
also require your own scripts from /scripts
	var test = require('./test.js');
	alert(test());
also require npm modules
	var $ = require('jquery');
test() will return the module.exports inside /test.js
	module.exports = function (n) {
		return 'browserify module.exports working';
	};

IMPORT BOWER LIBRARY WITH REQUIRE (js)
if you need to import a bower library that exposes globals
edit mt-gulp-template/package.json browserify-shim data
	"browser": {
		"name": "./bower_components/path/to/library.js"
	},
	"browserify-shim": {
		"name": "globalName"
	}
then you can import it with
	var globalName = require('name');

################ IMPORTS (less)

IMPORT FILE
you can import the files on /bower_component for compilation normally
	@import '../../bower_components/bootstrap/less/bootstrap.less';
but if you need to edit the file... see next

COPY FILES FROM BOWER OR NPM
if you want to copy file into the a folder on install (to customize it), just edit settings.bower.install in gulpfile.js
	var settings = {
		bower: {
			install: {
				// copy variables.less to customize it
				variablesLess: {
					filter: './bower_components/bootstrap/**/variables.less',
					dest: src + '/styles/bootstrap'
				},
				// copy font files to src for css loading
				fonts: {
					filter: './bower_components/bootstrap/fonts/**',
					dest: src + '/fonts'
				}
			}
		}
	}
to mantain the folder structure of the source folder when copying, just add 'base'
	// copy all .less files from bower_components/bootstrap, mantaining folder structure
	bootstrapLess: {
		base: './bower_components/bootstrap',
		filter: './bower_components/bootstrap/less/**',
		dest: src + '/styles/bootstrap'
	}
then you can import it normally where you copied it
	@import 'bootstrap/variables.less';

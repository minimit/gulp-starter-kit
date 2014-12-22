
##Build your projects with gulp

When you build with `gulp`, it does automatically:
- Js lint
- Js concatenation
- Uglify js
- Compile less and sass
- Minify css
- Source maps
- Optimize images
- Run http webserver or proxy to your webserver
- Sync all the browser
- Watch files for changes (keep the command window open)

##Requirements

First off download and install [node and npm](http://nodejs.org/) on your machine.

Then install gulp globally:

```sh
npm install -g gulp
```

And install bower globally:

```sh
npm install -g bower
```

##Usage

You can just execute the `.sh` or `.bat` files inside the `/bin` folder.

Or run the shell commands. Be sure to navigate in the the root directory of mt-gulp.

####Install all dependencies

Use `npm run build` script or use this command:

```sh
npm install && bower install
```

####Gulp task

Start building with `gulp`, it builds the project into `/dist`:

```sh
gulp
```

####Unbuild

Use `gulp unbuild` to remove the `/dist` folder.

Use `npm unbuild.bat` or `npm unbuild.sh` to clear the `/node_modules` and the `/bower_components`.

##Settings

Available advanced settings inside `gulpfile.js`:
- `src` and `dest` folders
- browserSync server or proxy to your own webserver
- automatic ftp upload
- imagemin compression

##Js concatenation and Less Sass compilation

The gulp task does Js concatenation and Less and Sass compilation, if you want to exclude a file, just name it with a starting underscore (ex: **_myfile.js**).
Files starting with "**_**" are excluded but you can still import them normally with Less and Sass.

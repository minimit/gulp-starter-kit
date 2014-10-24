
##Build your projects with gulp!

####Build webapps on node js with performances optimization, browser sync, less and sass support

When you build with `gulp`, it does automatically:
- Js lint
- Include js with `@codekit-prepend` and `@codekit-append`
- Uglify js
- Compile less and sass
- Minify css
- Optimize images
- Run http webserver or proxy to your webserver
- Sync all the browser
- Watch files for changes (keep the command window open)

##Requirements

First off go and download and install [node and npm](http://nodejs.org/) on your machine.

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

Start building with `gulp` task, it builds the project into `/dist`:

```sh
gulp
```

####Unbuild

Use `gulp unbuild` to remove the `/dist` folder.

Use `npm unbuild.bat` or `npm unbuild.sh` to clear the `/node_modules` and the `/bower_components`.

##Settings

Available advanced settings inside `gulpfile.js`:
- `src` and `dest` folders
- `js` `less` `sass` sources to compile
- `src` globs and `dest` folder for each file types
- browserSync server or proxy to your own webserver
- automatic ftp upload
- imagemin compression

##Codekit support

It supports `js` includes with `@codekit-prepend` and `@codekit-append`.
They are used by [Codekit](https://incident57.com/codekit/), [Prepros](http://alphapixels.com/prepros/) and others, so you can work with those files.

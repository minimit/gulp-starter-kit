
##Build your projects with gulp

When you build with `gulp`, it does automatically:
- Js lint
- Js concatenation, minification and source maps
- Less and Sass compilation, minification and source maps
- Css copy and minification
- Images optimization
- Http webserver or proxy to your webserver
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

You can just execute the `.sh` or `.bat` files inside the `/bin` folder. Or run the shell commands.

####Install all dependencies

Execute `npm install` and `bower update` files or use this command:

```sh
npm install && bower update
```

Bower default folder is `dist/bower_components`.

####Gulp task

Start building with `gulp`, it builds the project into `/dist` and open the browser on the webserver with browser sync.

```sh
gulp
```

Edit the settings inside `gulpfile.js` if you want to use your own webserver.

##Js concatenation

The gulp task does Js compilation and concatenation (to `main.js`) automatically.
If you want to exclude a file from compilation, just name it with a starting underscore (ex: **_myfile.js**).
Files starting with "**_**" are excluded but they are still concatenated in the `main.js`.

##Less and Sass compilation

The gulp task does Less and Sass compilation automatically.
If you want to exclude a file from compilation, just name it with a starting underscore (ex: **_myfile.less**).
Files starting with "**_**" are excluded but you can still import them normally with Less and Sass.

##Css copy and minification

The gulp task does Css copy and minification automatically.
If you want to exclude a file from copy and minification, just name it with a starting underscore (ex: **_myfile.css**).
Files starting with "**_**" are excluded but you can still import them normally with Less and Sass (ex: `@import (less) '_myfile.css';`).

##Settings

Available advanced settings inside `gulpfile.js`:
- `src` and `dest` folders (if you change the dest folder also change the directory inside `.bowerrc`)
- `settings.jsConcatTo` filename for the Js concatenation
- `settings.browserSync` [browserSync](http://www.browsersync.io/docs/options/) options, if you want to execute php or other server side, use proxy to your own webserver
- `settings.ftp` [gulp-ftp](https://www.npmjs.com/package/gulp-ftp) options
- `settings.imagemin` [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) options

##Sourcemaps
Sourcemaps are bugged now on [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css/issues/34) and on [gulp-concat](https://github.com/wearefractal/gulp-concat)

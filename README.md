
##Build your projects with gulp

When you build with `gulp`, it does automatically:
- Js concatenation and minification
- Js lint
- Compile and minify less and sass
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

##Settings

Available advanced settings inside `gulpfile.js`:
- `src` and `dest` folders (if you change the dest folder also change the directory inside `.bowerrc`)
- browserSync server or proxy to your own webserver
- automatic ftp upload
- imagemin compression settings

##Js concatenation and Less Sass compilation

The gulp task does Js concatenation and Less and Sass compilation, if you want to exclude a file, just name it with a starting underscore (ex: **_myfile.js**).
Files starting with "**_**" are excluded but you can still import them normally with Less and Sass.

##Sourcemaps
Sourcemaps are bugged now on [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css/issues/34) and on [gulp-concat](https://github.com/wearefractal/gulp-concat)

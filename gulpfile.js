var gulp = require('gulp');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

/*Path Files*/
var paths = {
    htmlTemplates: ['www/*.html', 'www/app/**/*.html'],
    appTypescript: ['www/**/*.ts', '!typings/**/*.*'],
    appJs: ['www/**/*.js', 'www/**/*.js.map'],
    appSass: ['www/**/**/*.scss'],
    inputSass: 'www/app/core/theme/**/*.scss',
    outputSass: 'www/app/core/theme/',
    sassdocOptions: {dest: './www/css/doc'}
};


/**
 * LOCAL SERVER
 * @desc This task is the responsible to run a local server in order to work locally
 */

gulp.task('webserver', function() {
  connect.server({
    root: 'www',
    livereload: true
  });
});

/**
 * REMOTE SERVER
 * @desc This task is the responsible to run a remote server
 */

gulp.task('serveprod', function() {
  connect.server({
    root: 'www',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

/**
 * SASS to CSS - based on http://www.sitepoint.com/simple-gulpy-workflow-sass/
 * @desc This task take app.scss and transform this to .css, after that put each new .css into App_Web -> dist -> styles
 */

var sassOptions = {
    outputStyle: 'compressed',
    errLogToConsole: true
};

gulp.task('sass', function() {
  gulp
    .src(paths.inputSass)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.outputSass))
    .pipe(connect.reload());
});

/**
 * HTML RELOAD
 * @desc This task is the responsible to reload browser when one html has changed
 */

gulp.task('html', function () {
  gulp.src(paths.htmlTemplates)
    .pipe(connect.reload());
});

/**
 * TS RELOAD
 * @desc This task is the responsible to reload browser when one .ts has changed
 */

gulp.task('ts', function () {
  gulp.src(paths.appTypescript)
    .pipe(connect.reload());
});

/*
 * TypeScript to Javascript
 */
//var paths = {
//    appTypescript: ['**/*.ts', '!node_modules/**/*.*', '!App_Web/typings/**/*.*']
//}

var tsProject1 = ts.createProject('tsconfig.json', {
    declaration: true,
    noExternalResolve: true,
    sortOutput: true
}); // loads our configuration

gulp.task('tsToJs4', function() {
    var tsResult = tsProject.src(paths.appTypescript) // load all files from our pathspecification
        .pipe(ts(tsProject)) // transpile the files into .js
        .pipe(gulp.dest(''));

    //return tsResult.js.pipe(gulp.dest('')).on('end', done); // save the .js in the same place as the original .ts-file
    //return tsResult.js.pipe(gulp.dest(paths.outputJs)).on('end', done); // save the .js in the same place as the original .ts-file
});


gulp.task('tsToJs3', function () {
    return gulp.src(paths.appTypescript)
        .pipe(ts(tsProject()))
        .pipe(gulp.dest(''));
});

gulp.task('tsToJs2', function() {
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('release'));
});

var tsProject = ts.createProject("tsconfig.json");

gulp.task("tsToJs", function () {
    return tsProject.src(paths.appTypescript)
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest('dist/js/'));
});

/**
 * WATCH METHOD
 * @desc This task is the responsible to listen each change on some files in order to reload browser or
 * doing some special task
 */

gulp.task('watch', function() {
    gulp.watch(paths.appSass, ['sass']);
    gulp.watch([paths.htmlTemplates], ['html']);
    gulp.watch([paths.appTypescript], ['ts']);
})

/*DEV*/
gulp.task('default', ['sass', 'tsToJs', 'webserver', 'watch']);
/*PROD*/
//gulp.task('default', ['sass']);
gulp.task('heroku:production', ['sass', 'serveprod']);

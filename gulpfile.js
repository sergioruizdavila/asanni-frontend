var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var lib = require('bower-files')();
var ngAnnotate = require('gulp-ng-annotate');


/*Path Files*/
var paths = {
    index: 'www/index.html',
    htmlTemplates: ['www/*.html', 'www/app/**/*.html'],
    appTypescript: ['www/**/*.ts', '!typings/**/*.*'],
    appJs: [
        "www/app/app.module.js",
        "www/app/app.core.module.js",
        "www/app/app.values.js",
        "www/app/app.run.js",
        "www/app/auth/auth.service.js",
        "www/app/account/account.service.js",
        "www/app/core/util/functionsUtil/functionsUtil.service.js",
        "www/app/core/util/getDataStaticJson/getDataStaticJson.service.js",
        "www/app/core/util/messageUtil/messageUtil.service.js",
        "www/app/core/util/filters/app.filter.js",
        "www/app/core/restApi/restApi.config.js",
        "www/app/core/restApi/restApi.service.js",
        "www/app/core/s3Upload/s3Upload.service.js",
        "www/app/models/feedback/feedback.model.js",
        "www/app/models/feedback/feedback.service.js",
        "www/app/models/user/user.model.js",
        "www/app/models/user/user.service.js",
        "www/app/register/register.service.js",
        "www/app/models/student/student.model.js",
        "www/app/models/student/student.service.js",
        "www/app/models/teacher/teacher.model.js",
        "www/app/models/teacher/teacher.service.js",
        "www/app/models/school/school.model.js",
        "www/app/models/school/school.service.js",
        "www/components/header/header.config.js",
        "www/components/header/header.directive.js",
        "www/components/rating/rating.config.js",
        "www/components/rating/rating.directive.js",
        "www/components/footer/footer.config.js",
        "www/components/footer/footer.directive.js",
        "www/components/floatMessageBar/floatMessageBar.config.js",
        "www/components/floatMessageBar/floatMessageBar.directive.js",
        "www/components/map/map.config.js",
        "www/components/map/map.directive.js",
        "www/components/modal/modal.config.js",
        "www/components/modal/modalCreateUser/modalWelcome/modalWelcome.controller.js",
        "www/components/modal/modalCreateUser/modalBorn/modalBorn.controller.js",
        "www/components/modal/modalCreateUser/modalBasicInfo/modalBasicInfo.controller.js",
        "www/components/modal/modalCreateUser/modalFinish/modalFinish.controller.js",
        "www/components/modal/modalMeetingPoint/modalMeetingPoint.controller.js",
        "www/components/modal/modalLanguages/modalLanguages.controller.js",
        "www/components/modal/modalExperience/modalExperience.controller.js",
        "www/components/modal/modalEducation/modalEducation.controller.js",
        "www/components/modal/modalCertificate/modalCertificate.controller.js",
        "www/components/modal/modalSignUp/modalSignUp.controller.js",
        "www/components/modal/modalLogIn/modalLogIn.controller.js",
        "www/components/modal/modalForgotPassword/modalForgotPassword.controller.js",
        "www/components/modal/modalRecommendTeacher/modalRecommendTeacher.controller.js",
        "www/app/pages/main/main.config.js",
        "www/app/pages/main/main.controller.js",
        "www/app/pages/studentLandingPage/studentLandingPage.config.js",
        "www/app/pages/studentLandingPage/studentLandingPage.controller.js",
        "www/app/pages/studentLandingPage/studentLandingPage.service.js",
        "www/app/pages/teacherLandingPage/teacherLandingPage.config.js",
        "www/app/pages/teacherLandingPage/teacherLandingPage.controller.js",
        "www/app/pages/resetPasswordPage/resetPasswordPage.config.js",
        "www/app/pages/resetPasswordPage/resetPasswordPage.controller.js",
        "www/app/pages/landingPage/landingPage.config.js",
        "www/app/pages/landingPage/landingPage.controller.js",
        "www/app/pages/landingPage/landingPage.service.js",
        "www/app/pages/searchPage/searchPage.config.js",
        "www/app/pages/searchPage/searchPage.controller.js",
        "www/app/pages/searchPage/teacherResult/teacherResult.directive.js",
        "www/app/pages/userProfilePage/userProfilePage.config.js",
        "www/app/pages/userProfilePage/userProfilePage.controller.js",
        "www/app/pages/userEditProfilePage/userEditProfilePage.config.js",
        "www/app/pages/userEditProfilePage/userEditProfilePage.controller.js",
        "www/app/pages/userEditMediaPage/userEditMediaPage.config.js",
        "www/app/pages/userEditMediaPage/userEditMediaPage.controller.js",
        "www/app/pages/userEditAgendaPage/userEditAgendaPage.config.js",
        "www/app/pages/userEditAgendaPage/userEditAgendaPage.controller.js",
        "www/app/pages/meetingConfirmationPage/meetingConfirmationPage.config.js",
        "www/app/pages/meetingConfirmationPage/meetingConfirmationPage.controller.js",
        "www/app/pages/userInboxPage/userInboxPage.config.js",
        "www/app/pages/userInboxPage/userInboxPage.controller.js",
        "www/app/pages/userInboxDetailsPage/userInboxDetailsPage.config.js",
        "www/app/pages/userInboxDetailsPage/userInboxDetailsPage.controller.js",
        "www/app/pages/createTeacherPage/createTeacherPage.config.js",
        "www/app/pages/createTeacherPage/createTeacherPage.controller.js",
        "www/app/pages/createTeacherPage/teacherWelcomeSection/teacherWelcomeSection.config.js",
        "www/app/pages/createTeacherPage/teacherWelcomeSection/teacherWelcomeSection.controller.js",
        "www/app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.config.js",
        "www/app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.controller.js",
        "www/app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.config.js",
        "www/app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.controller.js",
        "www/app/pages/createTeacherPage/teacherLanguageSection/teacherLanguageSection.config.js",
        "www/app/pages/createTeacherPage/teacherLanguageSection/teacherLanguageSection.controller.js",
        "www/app/pages/createTeacherPage/teacherExperienceSection/teacherExperienceSection.config.js",
        "www/app/pages/createTeacherPage/teacherExperienceSection/teacherExperienceSection.controller.js",
        "www/app/pages/createTeacherPage/teacherEducationSection/teacherEducationSection.config.js",
        "www/app/pages/createTeacherPage/teacherEducationSection/teacherEducationSection.controller.js",
        "www/app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.config.js",
        "www/app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.controller.js",
        "www/app/pages/createTeacherPage/teacherPriceSection/teacherPriceSection.config.js",
        "www/app/pages/createTeacherPage/teacherPriceSection/teacherPriceSection.controller.js",
        "www/app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.config.js",
        "www/app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.controller.js",
        "www/app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.config.js",
        "www/app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.controller.js",
        "www/app/pages/teacherProfilePage/teacherProfilePage.config.js",
        "www/app/pages/teacherProfilePage/teacherProfilePage.controller.js"
    ],
    appLibsJs: [
        'www/libs/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
        'www/libs/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js'
    ],
    vendorStyles: [
        'www/bower_components/normalize-css/normalize.css',
        'www/bower_components/animate.css/animate.min.css',
        'www/bower_components/flexboxgrid/dist/flexboxgrid.min.css',
        'www/bower_components/bootstrap/dist/css/bootstrap.min.css',
        'www/bower_components/fullcalendar/dist/fullcalendar.min.css',
        'www/bower_components/toastr/toastr.min.css',
        'www/bower_components/ng-img-crop/compile/minified/ng-img-crop.css'
    ],
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
    livereload: true,
    fallback: 'www/index.html'
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
    livereload: false,
    fallback: 'www/index.html'
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

/**
 * BUILD VENDOR CSS
 * @desc This task is the responsible to build vendor styles to one vendor css
 */

gulp.task('vendorCSS', function () {
  return gulp.src(paths.vendorStyles)
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('www/build/css'));
});

/**
 * BUILD BOWER JS
 * @desc This task is the responsible to build bower file to one vendor js
 */

gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/build/js'));
});

/**
 * BUILD LIBS JS
 * @desc This task is the responsible to build lib folder files to one vendor js
 */

gulp.task('libsJS', function () {
  return gulp.src(paths.appLibsJs)
    .pipe(concat('vendor-libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/build/js'));
});

/**
 * BUILD APP JS
 * @desc This task is the responsible to build app folder files to one vendor js
 */

gulp.task('appJS', function () {
  return gulp.src(paths.appJs)
    .pipe(concat('app.js'))
    //.pipe(ngAnnotate())
    //.pipe(uglify())
    .pipe(gulp.dest('www/build/js'));
});

/**
 * WATCH METHOD
 * @desc This task is the responsible to listen each change on some files in order to reload browser or
 * doing some special task
 */

gulp.task('watch', function() {
    gulp.watch(paths.appSass, ['sass', 'vendorCSS']);
    gulp.watch([paths.htmlTemplates], ['html']);
    gulp.watch([paths.appTypescript], ['appJS', 'ts']);
})

/*BUILD VENDOR*/
gulp.task('build-vendor', ['bowerJS', 'libsJS', 'appJS', 'vendorCSS']);
/*DEV*/
gulp.task('dev', ['sass', 'webserver', 'build-vendor', 'watch']);
/*PROD*/
gulp.task('heroku:production', ['sass', 'serveprod']);

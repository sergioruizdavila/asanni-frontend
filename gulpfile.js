var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var webserver = require('gulp-webserver');
var lib = require('bower-files')();
var ngAnnotate = require('gulp-ng-annotate');
var svgSprite = require('gulp-svg-sprite');
var svg2png = require('gulp-svg2png');
var size = require('gulp-size');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var express = require('express');

var app = express();


/*Path Files*/
var paths = {
    index: 'www/index.html',
    htmlTemplates: ['www/*.html', 'www/app/**/*.html'],
    appTypescript: ['www/**/*.ts', '!typings/**/*.*'],
    appJs: [
        "www/build/scripts/app/app.module.js",
        "www/build/scripts/app/app.core.module.js",
        "www/build/scripts/app/app.values.js",
        "www/build/scripts/app/app.run.js",
        "www/build/scripts/app/auth/auth.service.js",
        "www/build/scripts/app/account/account.service.js",
        "www/build/scripts/app/core/util/functionsUtil/functionsUtil.service.js",
        "www/build/scripts/app/core/util/getDataStaticJson/getDataStaticJson.service.js",
        "www/build/scripts/app/core/util/messageUtil/messageUtil.service.js",
        "www/build/scripts/app/core/util/filters/app.filter.js",
        "www/build/scripts/app/core/restApi/restApi.config.js",
        "www/build/scripts/app/core/restApi/restApi.service.js",
        "www/build/scripts/app/core/s3Upload/s3Upload.service.js",
        "www/build/scripts/app/models/feature/feature.model.js",
        "www/build/scripts/app/models/feature/feature.service.js",
        "www/build/scripts/app/models/feedback/feedback.model.js",
        "www/build/scripts/app/models/feedback/feedback.service.js",
        "www/build/scripts/app/models/user/user.model.js",
        "www/build/scripts/app/models/user/user.service.js",
        "www/build/scripts/app/register/register.service.js",
        "www/build/scripts/app/models/student/student.model.js",
        "www/build/scripts/app/models/student/student.service.js",
        "www/build/scripts/app/models/teacher/teacher.model.js",
        "www/build/scripts/app/models/teacher/teacher.service.js",
        "www/build/scripts/app/models/school/school.model.js",
        "www/build/scripts/app/models/school/school.service.js",
        "www/build/scripts/components/header/header.config.js",
        "www/build/scripts/components/header/header.directive.js",
        "www/build/scripts/components/sideMenu/sideMenu.config.js",
        "www/build/scripts/components/sideMenu/sideMenu.directive.js",
        "www/build/scripts/components/rating/rating.config.js",
        "www/build/scripts/components/rating/rating.directive.js",
        "www/build/scripts/components/meter/meter.config.js",
        "www/build/scripts/components/meter/meter.directive.js",
        "www/build/scripts/components/survey/survey.config.js",
        "www/build/scripts/components/survey/survey.directive.js",
        "www/build/scripts/components/footer/footer.config.js",
        "www/build/scripts/components/footer/footer.directive.js",
        "www/build/scripts/components/floatMessageBar/floatMessageBar.config.js",
        "www/build/scripts/components/floatMessageBar/floatMessageBar.directive.js",
        "www/build/scripts/components/map/map.config.js",
        "www/build/scripts/components/map/map.directive.js",
        "www/build/scripts/components/map/map.service.js",
        "www/build/scripts/components/modal/modal.config.js",
        "www/build/scripts/components/modal/modalCreateUser/modalWelcome/modalWelcome.controller.js",
        "www/build/scripts/components/modal/modalCreateUser/modalPhoto/modalPhoto.controller.js",
        "www/build/scripts/components/modal/modalCreateUser/modalBorn/modalBorn.controller.js",
        "www/build/scripts/components/modal/modalCreateUser/modalBasicInfo/modalBasicInfo.controller.js",
        "www/build/scripts/components/modal/modalCreateUser/modalFinish/modalFinish.controller.js",
        "www/build/scripts/components/modal/modalMeetingPoint/modalMeetingPoint.controller.js",
        "www/build/scripts/components/modal/modalLanguages/modalLanguages.controller.js",
        "www/build/scripts/components/modal/modalExperience/modalExperience.controller.js",
        "www/build/scripts/components/modal/modalEducation/modalEducation.controller.js",
        "www/build/scripts/components/modal/modalCertificate/modalCertificate.controller.js",
        "www/build/scripts/components/modal/modalSignUp/modalSignUp.controller.js",
        "www/build/scripts/components/modal/modalLogIn/modalLogIn.controller.js",
        "www/build/scripts/components/modal/modalForgotPassword/modalForgotPassword.controller.js",
        "www/build/scripts/components/modal/modalRecommendTeacher/modalRecommendTeacher.controller.js",
        "www/build/scripts/components/modal/modalSurvey/modalSurvey.controller.js",
        "www/build/scripts/app/pages/main/main.config.js",
        "www/build/scripts/app/pages/main/main.controller.js",
        "www/build/scripts/app/pages/studentLandingPage/studentLandingPage.config.js",
        "www/build/scripts/app/pages/studentLandingPage/studentLandingPage.controller.js",
        "www/build/scripts/app/pages/studentLandingPage/studentLandingPage.service.js",
        "www/build/scripts/app/pages/teacherLandingPage/teacherLandingPage.config.js",
        "www/build/scripts/app/pages/teacherLandingPage/teacherLandingPage.controller.js",
        "www/build/scripts/app/pages/resetPasswordPage/resetPasswordPage.config.js",
        "www/build/scripts/app/pages/resetPasswordPage/resetPasswordPage.controller.js",
        "www/build/scripts/app/pages/landingPage/landingPage.config.js",
        "www/build/scripts/app/pages/landingPage/landingPage.controller.js",
        "www/build/scripts/app/pages/landingPage/landingPage.service.js",
        "www/build/scripts/app/pages/searchPage/searchPage.config.js",
        "www/build/scripts/app/pages/searchPage/searchPage.controller.js",
        "www/build/scripts/app/pages/searchPage/teacherResult/teacherResult.directive.js",
        "www/build/scripts/app/pages/searchPage/schoolResult/schoolResult.directive.js",
        "www/build/scripts/app/pages/userProfilePage/userProfilePage.config.js",
        "www/build/scripts/app/pages/userProfilePage/userProfilePage.controller.js",
        "www/build/scripts/app/pages/editProfile/editProfile.config.js",
        "www/build/scripts/app/pages/editProfile/editProfile.controller.js",
        "www/build/scripts/app/pages/editProfile/editProfileBasicInfo/editProfileBasicInfo.config.js",
        "www/build/scripts/app/pages/editProfile/editProfileBasicInfo/editProfileBasicInfo.controller.js",
        "www/build/scripts/app/pages/editProfile/editProfileMedia/editProfileMedia.config.js",
        "www/build/scripts/app/pages/editProfile/editProfileMedia/editProfileMedia.controller.js",
        "www/build/scripts/app/pages/editProfile/editProfileLocation/editProfileLocation.config.js",
        "www/build/scripts/app/pages/editProfile/editProfileLocation/editProfileLocation.controller.js",
        "www/build/scripts/app/pages/editProfile/userEditAgendaPage/userEditAgendaPage.config.js",
        "www/build/scripts/app/pages/editProfile/userEditAgendaPage/userEditAgendaPage.controller.js",
        "www/build/scripts/app/pages/editTeacher/editTeacher.config.js",
        "www/build/scripts/app/pages/editTeacher/editTeacher.controller.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherExperience/editTeacherExperience.config.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherExperience/editTeacherExperience.controller.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherEducation/editTeacherEducation.config.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherEducation/editTeacherEducation.controller.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherTeach/editTeacherTeach.config.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherTeach/editTeacherTeach.controller.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherMethodology/editTeacherMethodology.config.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherMethodology/editTeacherMethodology.controller.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherPrice/editTeacherPrice.config.js",
        "www/build/scripts/app/pages/editTeacher/editTeacherPrice/editTeacherPrice.controller.js",
        "www/build/scripts/app/pages/meetingConfirmationPage/meetingConfirmationPage.config.js",
        "www/build/scripts/app/pages/meetingConfirmationPage/meetingConfirmationPage.controller.js",
        "www/build/scripts/app/pages/userInboxPage/userInboxPage.config.js",
        "www/build/scripts/app/pages/userInboxPage/userInboxPage.controller.js",
        "www/build/scripts/app/pages/userInboxDetailsPage/userInboxDetailsPage.config.js",
        "www/build/scripts/app/pages/userInboxDetailsPage/userInboxDetailsPage.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/createTeacherPage.config.js",
        "www/build/scripts/app/pages/createTeacherPage/createTeacherPage.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherWelcomeSection/teacherWelcomeSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherWelcomeSection/teacherWelcomeSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherLanguageSection/teacherLanguageSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherLanguageSection/teacherLanguageSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherExperienceSection/teacherExperienceSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherExperienceSection/teacherExperienceSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherEducationSection/teacherEducationSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherEducationSection/teacherEducationSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherPriceSection/teacherPriceSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherPriceSection/teacherPriceSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.controller.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.config.js",
        "www/build/scripts/app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.controller.js",
        "www/build/scripts/app/pages/teacherProfilePage/teacherProfilePage.config.js",
        "www/build/scripts/app/pages/teacherProfilePage/teacherProfilePage.controller.js",
        "www/build/scripts/app/pages/schoolProfilePage/schoolProfilePage.config.js",
        "www/build/scripts/app/pages/schoolProfilePage/schoolProfilePage.controller.js",
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
    svgFiles: 'www/assets/images/icons-svg-sources/*.svg',
    images: 'www/assets/images',
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
    middleware: function(connect, opt) {
      return [app.use(require('prerender-node').set('prerenderServiceUrl', 'http://service.prerender.io/').set('prerenderToken', 'JV1wlWf2vRAaydCSuqs7'))];
    },
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
    port: process.env.PORT || 5000,
    livereload: false,
    middleware: function(connect, opt) {
      return [app.use(require('prerender-node').set('prerenderServiceUrl', 'http://service.prerender.io/').set('prerenderToken', 'JV1wlWf2vRAaydCSuqs7'))];
    },
    fallback: 'www/index.html'
  });
});

/*gulp.task('serveprod', function() {
  gulp.src('www')
    .pipe(webserver({
      host: '0.0.0.0',
      port: process.env.PORT || 5000,
      livereload: false,
      fallback: 'www/index.html',
      open: true,
      https: false,
      middleware: function(req, res, next) {
        if (req.headers['x-forwarded-proto'] != 'https') {
            res.end('https://www.waysily.com' + req.originalUrl);
        }
        else {
            next();
        }
      }
    }));
});*/

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
 * IMAGE COMPRESS
 * @desc This task take each images (SVG, PNG, JPG, etc) and compress them
 */

gulp.task('images', function() {
  gulp.src('www/assets/images/*.{png,jpg,jpeg,gif}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest(paths.images));
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

gulp.task('ts2', function () {
  gulp.src(paths.appTypescript)
    .pipe(connect.reload());
});

var tsProject = ts.createProject("tsconfig.json");

gulp.task('ts', function () {
    return tsProject.src()
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(ts(tsProject))
        //.js.pipe(gulp.dest('www/**/*'));
        //.js.pipe(concat('app.js'))
        //.pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('www/build/scripts'))
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

/******************************************************************************/

/**
 * BUILD SVG SPRITE x45 (Default Size)
 * @desc This task is the responsible to build svg sprite and generate SCSS styles
 */

 var changeEvent = function(evt) {
	$.gutil.log('File', $.gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', $.gutil.colors.magenta(evt.type));
};

//NOTE: Modify to get size
var iconsType = 'small';

var spriteSize = null;
var spritePadding = null;
var sprite = 'sprite-liner-'+ iconsType +'.svg';
var dest = '../../app/core/theme/core/_sprite-'+ iconsType +'.scss';
var template = 'www/build/tpl/sprite-template-'+ iconsType +'.scss';
var mapname = 'sprite-liner-' + iconsType;

if(iconsType === 'small') {
    spriteSize = 32;
    spritePadding = 3;
} else if (iconsType === 'default') {
    spriteSize = 45;
    spritePadding = 5;
}

var svgConfig = {
    shape: {
        dimension: {
            maxWidth: spriteSize,
            maxHeight: spriteSize,
            precision: 2,
            attributes: false,
        },
        spacing: {
            padding: spritePadding
        }
    },
    mode: {
        css: {
            dest: "./",
            sprite: sprite,
            bust: false,
            render: {
                scss: {
                    dest: dest,
                    template: template
                }
            }
        }
    },
    variables: {
        mapname: mapname
    }
};

gulp.task('svg-sprite-' + iconsType, function () {
	return gulp.src(paths.svgFiles)
		.pipe(svgSprite(svgConfig))
		.pipe(gulp.dest(paths.images));
});

//NOTE: Hay un error en el plugin: svg2png, en la linea 28:
//node_modules/svg2png/lib/svg2png.js (Error: Unspected token =) fue necesario
// cambiar (options = {}) a (options) para solucionarlo localmente. Asi que cuando
// se vuelva a correr el comando npm install, va a pisar este cambio, y va a volver
// a romper.
gulp.task('png-sprite-' + iconsType, ['svg-sprite-' + iconsType], function() {
	return gulp.src(paths.images + sprite)
		.pipe(svg2png())
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.images));
});

/******************************************************************************/


/**
 * WATCH METHOD
 * @desc This task is the responsible to listen each change on some files in
 * order to reload browser or
 * doing some special task
 */

gulp.task('watch', function() {
    gulp.watch(paths.appSass, ['sass', 'vendorCSS']);
    gulp.watch([paths.htmlTemplates], ['html']);
    gulp.watch([paths.appTypescript], ['appJS', 'ts']);
    gulp.watch(paths.svgFiles, ['sprite']).on('change', function(evt) {
		changeEvent(evt);
	});
})

/*BUILD SPRITE*/
gulp.task('sprite', ['png-sprite-' + iconsType]);
/*BUILD VENDOR*/
gulp.task('build-vendor', ['bowerJS', 'libsJS', 'ts', 'appJS', 'vendorCSS', 'images']);
/*DEV*/
gulp.task('dev', ['sass', 'webserver', 'build-vendor', 'watch']);
/*gulp.task('dev', ['sass', 'build-vendor', 'watch']);*/
/*PROD*/
gulp.task('heroku:production', ['sass', 'serveprod']);

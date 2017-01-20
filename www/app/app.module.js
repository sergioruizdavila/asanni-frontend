(function () {
    'use strict';
    angular
        .module('mainApp', [
        'mainApp.auth',
        'mainApp.core',
        'mainApp.core.util',
        'mainApp.localStorage',
        'mainApp.core.restApi',
        'mainApp.core.s3Upload',
        'mainApp.models.feedback',
        'mainApp.models.user',
        'mainApp.models.student',
        'mainApp.models.teacher',
        'mainApp.models.school',
        'mainApp.pages.main',
        'mainApp.pages.studentLandingPage',
        'mainApp.pages.teacherLandingPage',
        'mainApp.pages.landingPage',
        'mainApp.pages.searchPage',
        'mainApp.pages.createTeacherPage',
        'mainApp.pages.teacherProfilePage',
        'mainApp.pages.userProfilePage',
        'mainApp.pages.userEditProfilePage',
        'mainApp.pages.userEditAgendaPage',
        'mainApp.pages.userEditMediaPage',
        'mainApp.pages.userInboxPage',
        'mainApp.pages.userInboxDetailsPage',
        'mainApp.pages.meetingConfirmationPage',
        'mainApp.components.header',
        'mainApp.components.rating',
        'mainApp.components.map',
        'mainApp.components.modal',
        'mainApp.components.footer'
    ])
        .config(config);
    function config($locationProvider, $urlRouterProvider, $translateProvider) {
        $urlRouterProvider.otherwise('/page/main');
        var prefix = 'assets/i18n/';
        var suffix = '.json';
        $translateProvider.useStaticFilesLoader({
            prefix: prefix,
            suffix: suffix
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useCookieStorage();
    }
})();
//# sourceMappingURL=app.module.js.map
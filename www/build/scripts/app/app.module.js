(function () {
    'use strict';
    angular
        .module('mainApp', [
        'mainApp.core',
        'mainApp.core.util',
        'mainApp.localStorage',
        'mainApp.core.restApi',
        'mainApp.core.s3Upload',
        'mainApp.auth',
        'mainApp.register',
        'mainApp.account',
        'mainApp.models.country',
        'mainApp.models.feature',
        'mainApp.models.feedback',
        'mainApp.models.user',
        'mainApp.models.student',
        'mainApp.models.teacher',
        'mainApp.models.school',
        'mainApp.pages.main',
        'mainApp.pages.studentLandingPage',
        'mainApp.pages.teacherLandingPage',
        'mainApp.pages.landingPage',
        'mainApp.pages.resetPasswordPage',
        'mainApp.pages.searchPage',
        'mainApp.pages.createTeacherPage',
        'mainApp.pages.teacherProfilePage',
        'mainApp.pages.editProfile',
        'mainApp.pages.editTeacher',
        'mainApp.pages.schoolProfilePage',
        'mainApp.components.header',
        'mainApp.components.sideMenu',
        'mainApp.components.rating',
        'mainApp.components.meter',
        'mainApp.components.map',
        'mainApp.components.modal',
        'mainApp.components.survey',
        'mainApp.components.footer',
        'mainApp.components.floatMessageBar'
    ])
        .config(['OAuthProvider', 'dataConfig',
        function (OAuthProvider, dataConfig) {
            OAuthProvider.configure({
                baseUrl: dataConfig.baseUrl,
                clientId: dataConfig.localOAuth2Key,
                grantPath: '/oauth2/token/',
                revokePath: '/oauth2/revoke_token/'
            });
        }
    ])
        .config(['OAuthTokenProvider', 'dataConfig',
        function (OAuthTokenProvider, dataConfig) {
            OAuthTokenProvider.configure({
                name: dataConfig.cookieName,
                options: {
                    secure: dataConfig.https,
                }
            });
        }
    ])
        .config(config);
    function config($locationProvider, $urlRouterProvider, $translateProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
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

//# sourceMappingURL=../../maps/app/app.module.js.map

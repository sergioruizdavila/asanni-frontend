(function () {
    'use strict';
    angular
        .module('mainApp', [
        'mainApp.auth',
        'mainApp.core',
        'mainApp.localStorage',
        'mainApp.core.restApi',
        'mainApp.models.user',
        'mainApp.pages.main',
        'mainApp.pages.studentLandingPage',
        'mainApp.pages.signUpPage',
        'mainApp.pages.searchPage',
        'mainApp.pages.userProfilePage',
        'mainApp.pages.userEditProfilePage',
        'mainApp.pages.userEditMediaPage',
        'mainApp.pages.userEditAgendaPage',
        'mainApp.pages.meetingConfirmationPage',
        'mainApp.pages.userInboxPage',
        'mainApp.pages.userInboxDetailsPage',
        'mainApp.components.header',
        'mainApp.components.footer',
        'mainApp.components.map',
        'mainApp.components.modal'
    ])
        .config(config);
    function config($locationProvider, $urlRouterProvider, $translateProvider) {
        $urlRouterProvider.otherwise('/page');
        var prefix = 'assets/i18n/';
        var suffix = '.json';
        $translateProvider.useStaticFilesLoader({
            prefix: prefix,
            suffix: suffix
        });
        $translateProvider.preferredLanguage('es');
    }
})();
//# sourceMappingURL=app.module.js.map
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
        'mainApp.pages.searchPage',
        'mainApp.components.header',
        'mainApp.components.map',
        'mainApp.components.footer'
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
        $translateProvider.preferredLanguage('en');
    }
})();
//# sourceMappingURL=app.module.js.map
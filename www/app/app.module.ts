/**
 * module() Here inject dependencies of App modules and components,
 * such as controllers, service, directive, etc
 * config() Here define the main state, routes, http interceptor
 *
 * @param {angular.ui.IUrlRouterProvider} $urlRouterProvider
 * @return {void}
 */

(function (): void {
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

        /* Configuration for angular-oauth2 */

        .config(['OAuthProvider', 'dataConfig',
            function(
                    OAuthProvider,
                    dataConfig: IDataConfig) {

                OAuthProvider.configure({
                    baseUrl: dataConfig.baseUrl,
                    clientId: dataConfig.localOAuth2Key,
                    grantPath: '/oauth2/token/',
                    revokePath: '/oauth2/revoke_token/'
                });

            }
        ])

        .config(['OAuthTokenProvider', 'dataConfig',
            function(
                    OAuthTokenProvider,
                    dataConfig: IDataConfig) {

                OAuthTokenProvider.configure({
                    name: dataConfig.cookieName,
                    options: {
                        secure: dataConfig.https,
                    }
                });

            }
        ])

        /* Default Configuration */

        .config(config);

    function config($locationProvider: angular.ILocationProvider,
                    $urlRouterProvider: angular.ui.IUrlRouterProvider,
                    $translateProvider: angular.translate.ITranslateProvider) {

        //Turn on/off Sentry alerting catcher
        //FIXME: No he podido inyectar ravenProvider, lo comento por ahora.
        //$ravenProvider.development(DEBUG);

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $urlRouterProvider.otherwise('/page/main');
        //$urlRouterProvider.otherwise('/page/landing/student');

        /* Translate Provider */
        let prefix = 'assets/i18n/';
        let suffix = '.json';

        $translateProvider.useStaticFilesLoader({
            prefix: prefix,
            suffix: suffix
        });

        $translateProvider.preferredLanguage('en');

        //Save language on cookie Storage
        $translateProvider.useCookieStorage();

    }

})();

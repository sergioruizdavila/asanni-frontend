/**
 * module() Here inject dependencies of App modules and components, such as controllers, service, directive, etc
 * config() Here define the main state, routes, http interceptor
 *
 * @param {angular.ui.IUrlRouterProvider} $urlRouterProvider
 * @return {void}
 */

(function (): void {
    'use strict';

    angular
        .module('mainApp', [
            'mainApp.auth',
            'mainApp.core',
            'mainApp.core.util',
            'mainApp.localStorage',
            'mainApp.core.restApi',
            'mainApp.core.s3Upload',
            'mainApp.models.user',
            'mainApp.models.student',
            'mainApp.models.teacher',
            'mainApp.models.school',
            'mainApp.pages.main',
            'mainApp.pages.studentLandingPage',
            'mainApp.pages.searchPage',
            'mainApp.pages.createTeacherPage',
            'mainApp.pages.userProfilePage',
            'mainApp.pages.userEditProfilePage',
            'mainApp.pages.userEditAgendaPage',
            'mainApp.pages.userEditMediaPage',
            'mainApp.pages.userInboxPage',
            'mainApp.pages.userInboxDetailsPage',
            'mainApp.pages.meetingConfirmationPage',
            'mainApp.components.header',
            'mainApp.components.map',
            'mainApp.components.modal',
            'mainApp.components.footer'
        ])
        .config(config);

    function config($locationProvider: angular.ILocationProvider,
                    $urlRouterProvider: angular.ui.IUrlRouterProvider,
                    $translateProvider: angular.translate.ITranslateProvider) {

        /*$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');*/

        $urlRouterProvider.otherwise('/page');
        //$urlRouterProvider.otherwise('/page/landing/student');

        /* Translate Provider */
        let prefix = 'assets/i18n/';
        let suffix = '.json';

        $translateProvider.useStaticFilesLoader({
            prefix: prefix,
            suffix: suffix
        });

        $translateProvider.preferredLanguage('es');

    }

})();

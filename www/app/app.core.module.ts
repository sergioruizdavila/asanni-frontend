/**
 * module() Here inject dependencies of Angular Modules and 3rd Party
 *
 * @param {none}
 * @return {void}
 */

(function (): void {
    'use strict';

    angular.module('mainApp.core', [
        /*Angular Modules*/
        /*'ngRaven',*/
        'ngResource',
        'ngCookies',
        'ui.router',
        'angular-oauth2',
        /*3rd Party*/
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.calendar',
        'ngFileUpload',
        'ngImgCrop'
    ]);


})();

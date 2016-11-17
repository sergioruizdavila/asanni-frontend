/**
 * module() Here inject dependencies of Angular Modules and 3rd Party
 *
 * @param {none}
 * @return {void}
 */

(function (): void {
    'use strict';

    /*angular.module('mainApp.core', [
        'ngResource',
        'ui.router',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.calendar',
        'ui.bootstrap.datetimepicker'
    ]);*/

    angular.module('mainApp.core', [
        /*Angular Modules*/
        'ngResource',
        'ui.router',
        /*3rd Party*/
        'pascalprecht.translate'
    ]);

})();

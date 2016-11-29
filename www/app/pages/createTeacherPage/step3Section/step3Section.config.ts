/**
* config()
* @description - step 3 section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage.step3', {
                url: '/step3',
                views: {
                    'step': {
                        templateUrl: 'app/pages/createTeacherPage/step3Section/step3Section.html'
                    }
                }
            });
    }
})();

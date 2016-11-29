/**
* config()
* @description - teacher location section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage.location', {
                url: '/location',
                views: {
                    'step': {
                        templateUrl: 'app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.html'
                    }
                }
            });
    }
})();

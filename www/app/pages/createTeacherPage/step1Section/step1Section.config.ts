/**
* config()
* @description - step1 section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage.step1', {
                url: '/step1',
                views: {
                    'step': {
                        templateUrl: 'app/pages/createTeacherPage/step1Section/step1Section.html',
                        controller: 'mainApp.pages.createTeacherPage.Step1SectionController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page.createTeacherPage',
                params: {
                    user: null
                }
            });
    }
})();

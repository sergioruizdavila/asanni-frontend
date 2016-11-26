/**
* config()
* @description - create Teacher page config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage', {
                url: '/create/teacher',
                abstract: true,
                views: {
                    'container': {
                        templateUrl: 'app/pages/createTeacherPage/createTeacherPage.html',
                        controller: 'mainApp.pages.createTeacherPage.CreateTeacherPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }],
                params: {
                    user: null
                }
            });
    }
})();

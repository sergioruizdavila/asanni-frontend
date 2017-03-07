/**
* config()
* @description - teacher profile page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.teacherProfilePage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.teacherProfilePage', {
                url: '/teachers/show/:id',
                views: {
                    'container': {
                        templateUrl: 'app/pages/teacherProfilePage/teacherProfilePage.html',
                        controller: 'mainApp.pages.teacherProfilePage.TeacherProfilePageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                data: {
                    requireLogin: false
                },
                params: {
                    id: null
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
            });
    }
})();

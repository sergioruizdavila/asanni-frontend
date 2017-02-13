/**
* config()
* @description - teacher landing page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.teacherLandingPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.teacherLandingPage', {
                url: '/main/teacher',
                views: {
                    'container': {
                        templateUrl: 'app/pages/teacherLandingPage/teacherLandingPage.html',
                        controller: 'mainApp.pages.teacherLandingPage.TeacherLandingPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                data: {
                    requireLogin: false
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
            });
    }
})();

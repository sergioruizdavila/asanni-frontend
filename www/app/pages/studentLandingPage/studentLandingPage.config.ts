/**
* config()
* @description - student landing page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.studentLandingPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.studentLandingPage', {
                url: '/landing/student',
                views: {
                    'container': {
                        templateUrl: 'app/pages/studentLandingPage/studentLandingPage.html',
                        controller: 'mainApp.pages.studentLandingPage.StudentLandingPageController',
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
                    user: null,
                    id: null
                }
            });
    }
})();

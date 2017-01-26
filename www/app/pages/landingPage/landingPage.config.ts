/**
* config()
* @description - landing page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.landingPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.landingPage', {
                url: '/main',
                views: {
                    'container': {
                        templateUrl: 'app/pages/landingPage/landingPage.html',
                        controller: 'mainApp.pages.landingPage.LandingPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                cache: false,
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
            })
            .state('page.landingPage.recommendation', {
                url: '/main/recommendation/:id',
                views: {
                    'container': {
                        templateUrl: 'app/pages/landingPage/landingPage.html',
                        controller: 'mainApp.pages.landingPage.LandingPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    id: null
                },
                cache: false,
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
            });
    }
})();

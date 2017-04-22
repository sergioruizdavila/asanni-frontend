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
                data: {
                    requireLogin: false
                },
                params: {
                    title: 'TEST: Use Waysily to find language teachers and schools, have a complete immersion',
                    description: 'TEST Waysily is a free community-based platform that helps you find local language teachers / schools in your area to have a complete immersion.',
                    url: 'https://www.waysily.com/',
                    robots: 'follow,index',
                    image: 'https://www.waysily.com/assets/images/waysily-shared.png',
                    showLogin: false,
                },
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
                params: {
                    id: null,
                    title: 'Use Waysily to find language teachers and schools, have a complete immersion',
                    description: 'Waysily is a free community-based platform that helps you find local language teachers / schools in your area to have a complete immersion.',
                    url: 'https://www.waysily.com/main/recommendation',
                    image: 'https://www.waysily.com/assets/images/waysily-shared.png',
                    robots: 'noindex'
                },
                parent: 'page',
                cache: false,
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
            });
    }
})();

/**
* config()
* @description - search page config file
* @note - If requireLogin is true, this state must have 'resolve' function,
* If requireLogin is false, this state must not have 'resolve' function:
* resolve: {
    waitForAuth: ['mainApp.auth.AuthService', function(AuthService) {
        return AuthService.autoRefreshToken();
    }]
* }
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.searchPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.searchPage', {
                url: '/search',
                views: {
                    'container': {
                        templateUrl: 'app/pages/searchPage/searchPage.html',
                        controller: 'mainApp.pages.searchPage.SearchPageController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    requireLogin: false
                },
                parent: 'page',
                params: {
                    title: 'Use Waysily to find language teachers and schools, have a complete immersion',
                    description: 'Waysily is a free community-based platform that helps you find local language teachers / schools in your area to have a complete immersion.',
                    url: 'https://www.waysily.com/search',
                    robots: 'follow,index',
                    image: 'https://www.waysily.com/assets/images/waysily-shared.png',
                    country: null,
                    target: null
                },
                onEnter: ['$rootScope',
                    function ($rootScope) {
                        // Show/Hide header & footer
                        $rootScope.activeHeader = true;
                        $rootScope.activeFooter = false;
                    }
                ]
            });

    }

})();

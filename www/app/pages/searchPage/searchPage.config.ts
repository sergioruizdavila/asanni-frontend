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
                    country: null,
                    target: null
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = false;
                }]
            });

    }

})();

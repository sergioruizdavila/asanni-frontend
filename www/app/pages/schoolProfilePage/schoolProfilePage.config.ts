/**
* config()
* @description - school profile page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.schoolProfilePage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.schoolProfilePage', {
                url: '/school/:aliasSchool',
                views: {
                    'container': {
                        templateUrl: 'app/pages/schoolProfilePage/schoolProfilePage.html',
                        controller: 'mainApp.pages.schoolProfilePage.SchoolProfilePageController',
                        controllerAs: 'vm',
                        resolve: {
                            waitForAuth: ['mainApp.auth.AuthService', function(AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                        }
                    }
                },
                parent: 'page',
                data: {
                    requireLogin: true
                },
                params: {
                    aliasSchool: null
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
            });
    }
})();

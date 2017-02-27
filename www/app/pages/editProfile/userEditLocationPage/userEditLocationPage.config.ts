/**
* config()
* @description - user edit location page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.userEditLocationPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.userEditLocationPage', {
                url: '/users/edit/location',
                views: {
                    'container': {
                        templateUrl: 'app/pages/editProfile/userEditLocationPage/userEditLocationPage.html',
                        controller: 'mainApp.pages.userEditLocationPage.UserEditLocationPageController',
                        controllerAs: 'vm',
                        resolve: {
                            waitForAuth: ['mainApp.auth.AuthService', function(AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                        }
                    }
                },
                cache: false,
                data: {
                    requireLogin: true
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
            });
    }
})();

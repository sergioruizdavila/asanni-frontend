/**
* config()
* @description - user edit profile page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.userEditProfilePage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.userEditProfilePage', {
                url: '/users/edit',
                views: {
                    'container': {
                        templateUrl: 'app/pages/editProfile/userEditProfilePage/userEditProfilePage.html',
                        controller: 'mainApp.pages.userEditProfilePage.UserEditProfilePageController',
                        controllerAs: 'vm',
                        resolve: {
                            waitForAuth: ['mainApp.auth.AuthService', function(AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                        }
                    }
                },
                cache: false,
                params: {
                    user: null,
                    id: null
                },
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

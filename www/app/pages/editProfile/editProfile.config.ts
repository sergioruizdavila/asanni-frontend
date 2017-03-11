/**
* config()
* @description - edit Profile page config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.editProfile', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.editProfile', {
                url: '/users/edit',
                views: {
                    'container': {
                        templateUrl: 'app/pages/editProfile/editProfile.html',
                        controller: 'mainApp.pages.editProfile.EditProfileController',
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

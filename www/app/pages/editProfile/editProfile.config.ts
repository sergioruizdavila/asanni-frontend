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

        const CLIENT_URL = 'http://www.waysily.com';

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
                params: {
                    title: 'Profile',
                    description: 'Waysily is a free community-based platform that helps you find local language teachers / schools in your area to have a complete immersion.',
                    url: CLIENT_URL + '/page/users/edit/info',
                    robots: 'nofollow',
                    image: CLIENT_URL + '/assets/images/waysily-shared.png'
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

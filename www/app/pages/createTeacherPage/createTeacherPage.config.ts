/**
* config()
* @description - create Teacher page config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        const CLIENT_URL = 'http://www.waysily.com';

        $stateProvider
            .state('page.createTeacherPage', {
                url: '/create/teacher',
                views: {
                    'container': {
                        templateUrl: 'app/pages/createTeacherPage/createTeacherPage.html',
                        controller: 'mainApp.pages.createTeacherPage.CreateTeacherPageController',
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
                    title: 'Join as a teacher',
                    description: 'Build a reputation, become visible and earn 340 USD on average doing what you most passionate about.',
                    url: CLIENT_URL + '/page/users/edit/info',
                    robots: 'nofollow',
                    image: CLIENT_URL + '/assets/images/waysily-shared.png',
                    type: ''
                },
                data: {
                    requireLogin: true
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
            });
    }
})();

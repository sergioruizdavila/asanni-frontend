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
                    type: '',
                },
                data: {
                    requireLogin: true
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = false;
                    $rootScope.activeMessageBar = false;
                }]
            });
    }
})();

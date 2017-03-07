/**
* config()
* @description - edit Teacher page config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.editTeacher', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.editTeacher', {
                url: '/teachers/edit',
                views: {
                    'container': {
                        templateUrl: 'app/pages/editTeacher/editTeacher.html',
                        controller: 'mainApp.pages.editTeacher.EditTeacherController',
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

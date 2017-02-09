/**
* config()
* @description - reset Password page config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.resetPasswordPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.resetPasswordPage', {
                url: '/users/password/edit/:uid/:token',
                views: {
                    'container': {
                        templateUrl: 'app/pages/resetPasswordPage/resetPasswordPage.html',
                        controller: 'mainApp.pages.resetPasswordPage.ResetPasswordPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                data: {
                    requireLogin: false
                },
                params: {
                    uid: null,
                    token: null
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

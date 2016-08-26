/**
* config()
* @description - sign up page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.signUpPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('signUp', {
                url: '/signUp',
                views: {
                    'container': {
                        templateUrl: 'app/pages/signUpPage/signUpPage.html',
                        controller: 'mainApp.pages.signUpPage.SignUpPageController',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    user: null
                }
            });
    }
})();

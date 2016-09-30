/**
* config()
* @description - user profile page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.userProfilePage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.userProfilePage', {
                url: '/users/show/:id',
                views: {
                    'container': {
                        templateUrl: 'app/pages/userProfilePage/userProfilePage.html',
                        controller: 'mainApp.pages.userProfilePage.UserProfilePageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    user: null,
                    id: '1'
                }
            });
    }
})();

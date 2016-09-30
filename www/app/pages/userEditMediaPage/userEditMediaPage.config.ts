/**
* config()
* @description - user edit profile page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.userEditMediaPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.userEditMediaPage', {
                url: '/users/edit/:id/media',
                views: {
                    'container': {
                        templateUrl: 'app/pages/userEditMediaPage/userEditMediaPage.html',
                        controller: 'mainApp.pages.userEditMediaPage.UserEditMediaPageController',
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

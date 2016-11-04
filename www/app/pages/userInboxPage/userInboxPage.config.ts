/**
* config()
* @description - user inbox page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.userInboxPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.userInboxPage', {
                url: '/users/:userId/inbox',
                views: {
                    'container': {
                        templateUrl: 'app/pages/userInboxPage/userInboxPage.html',
                        controller: 'mainApp.pages.userInboxPage.UserInboxPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    userId: '123'
                }
            });
    }
})();

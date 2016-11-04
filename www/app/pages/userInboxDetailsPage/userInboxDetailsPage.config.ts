/**
* config()
* @description - user inbox details page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.userInboxDetailsPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.userInboxDetailsPage', {
                url: '/users/:userId/inbox/:messageId',
                views: {
                    'container': {
                        templateUrl: 'app/pages/userInboxDetailsPage/userInboxDetailsPage.html',
                        controller: 'mainApp.pages.userInboxDetailsPage.UserInboxDetailsPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    userId: '123',
                    messageId: '1234'
                }
            });
    }
})();

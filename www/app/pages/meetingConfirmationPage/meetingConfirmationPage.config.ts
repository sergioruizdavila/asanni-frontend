/**
* config()
* @description - meeting confirmation page config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.meetingConfirmationPage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.meetingConfirmationPage', {
                url: '/meeting/confirmation',
                views: {
                    'container': {
                        templateUrl: 'app/pages/meetingConfirmationPage/meetingConfirmationPage.html',
                        controller: 'mainApp.pages.meetingConfirmationPage.MeetingConfirmationPageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                params: {
                    user: null
                }
            });
    }
})();

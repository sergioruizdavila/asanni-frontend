/**
* config()
* @description - user edit profile location page config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.editProfile')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.editProfile.location', {
                url: '/location',
                views: {
                    'section': {
                        templateUrl: 'app/pages/editProfile/editProfileLocation/editProfileLocation.html',
                        controller: 'mainApp.pages.editProfile.EditProfileLocationController',
                        controllerAs: 'vm'
                    }
                },
                cache: false
            });
    }
})();

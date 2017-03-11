/**
* config()
* @description - user edit profile basic info page config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.editProfile')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.editProfile.basicInfo', {
                url: '/info',
                views: {
                    'section': {
                        templateUrl: 'app/pages/editProfile/editProfileBasicInfo/editProfileBasicInfo.html',
                        controller: 'mainApp.pages.editProfile.EditProfileBasicInfoController',
                        controllerAs: 'vm'
                    }
                },
                cache: false
            });
    }
})();

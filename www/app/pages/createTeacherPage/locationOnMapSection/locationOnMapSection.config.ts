/**
* config()
* @description - location on map section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage.map', {
                url: '/map',
                views: {
                    'step': {
                        templateUrl: 'app/pages/createTeacherPage/locationOnMapSection/locationOnMapSection.html'
                    }
                }
            });
    }
})();

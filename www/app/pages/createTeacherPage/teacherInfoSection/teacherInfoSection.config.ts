/**
* config()
* @description - basic teacher information section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage.basicInfo', {
                url: '/basicInfo',
                views: {
                    'step': {
                        templateUrl: 'app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.html'
                    }
                },
                cache: false
            });
    }
})();

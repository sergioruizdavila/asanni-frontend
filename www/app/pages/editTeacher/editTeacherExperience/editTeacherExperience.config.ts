/**
* config()
* @description - edit teacher experience section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.editTeacher')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.editTeacher.experience', {
                url: '/experience',
                views: {
                    'section': {
                        templateUrl: 'app/pages/editTeacher/editTeacherExperience/editTeacherExperience.html',
                        controller: 'mainApp.pages.editTeacher.EditTeacherExperienceController',
                        controllerAs: 'vm'
                    }
                },
                cache: false
            });
    }
})();

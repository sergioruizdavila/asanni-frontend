/**
* config()
* @description - teacher experience section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage.experience', {
                url: '/experience',
                views: {
                    'step': {
                        templateUrl: 'app/pages/createTeacherPage/teacherExperienceSection/teacherExperienceSection.html',
                        controller: 'mainApp.pages.createTeacherPage.TeacherExperienceSectionController',
                        controllerAs: 'vm'
                    }
                },
                cache: false
            });
    }
})();

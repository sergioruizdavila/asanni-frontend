/**
* config()
* @description - teacher language section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage.language', {
                url: '/language',
                views: {
                    'step': {
                        templateUrl: 'app/pages/createTeacherPage/teacherLanguageSection/teacherLanguageSection.html',
                        controller: 'mainApp.pages.createTeacherPage.TeacherLanguageSectionController',
                        controllerAs: 'vm'
                    }
                },
                cache: false
            });
    }
})();

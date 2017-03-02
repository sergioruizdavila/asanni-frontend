/**
* config()
* @description - edit teacher language to teach section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.editTeacher')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.editTeacher.teach', {
                url: '/teach',
                views: {
                    'section': {
                        templateUrl: 'app/pages/editTeacher/editTeacherTeach/editTeacherTeach.html',
                        controller: 'mainApp.pages.editTeacher.EditTeacherTeachController',
                        controllerAs: 'vm'
                    }
                },
                cache: false
            });
    }
})();

/**
* config()
* @description - edit teacher price section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.editTeacher')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.editTeacher.price', {
                url: '/price',
                views: {
                    'section': {
                        templateUrl: 'app/pages/editTeacher/editTeacherPrice/editTeacherPrice.html',
                        controller: 'mainApp.pages.editTeacher.EditTeacherPriceController',
                        controllerAs: 'vm'
                    }
                },
                cache: false
            });
    }
})();

/**
* config()
* @description - teacher price section config file
*/

(function() {
    'use strict';

    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.createTeacherPage.price', {
                url: '/price',
                views: {
                    'step': {
                        templateUrl: 'app/pages/createTeacherPage/teacherPriceSection/teacherPriceSection.html',
                        controller: 'mainApp.pages.createTeacherPage.TeacherPriceSectionController',
                        controllerAs: 'vm'
                    }
                },
                cache: false
            });
    }
})();

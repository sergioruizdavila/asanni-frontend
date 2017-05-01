/**
* config()
* @description - school profile page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.schoolProfilePage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.schoolProfilePage', {
                url: '/school/:aliasSchool',
                views: {
                    'container': {
                        templateUrl: 'app/pages/schoolProfilePage/schoolProfilePage.html',
                        controller: 'mainApp.pages.schoolProfilePage.SchoolProfilePageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                data: {
                    requireLogin: false
                },
                params: {
                    aliasSchool: null,
                    title: 'Compare and find the best language school',
                    description: 'The best way to fit in a country when you travel is by learning their language. Find a language school and immerse yourself in the local culture.',
                    url: 'https://www.waysily.com/page/school',
                    image: 'https://s3.amazonaws.com/waysily-img/school-photo-prd/20-34d2e9a3-6a6a-424d-bbcf-da5966c2b51d.jpg',
                    robots: 'follow,index'
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
            });
    }
})();

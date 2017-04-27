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
                params: {
                    aliasSchool: null,
                    title: 'Colombia Immersion Spanish School',
                    description: 'Offer classes from $100 per week, volunteering, immersion, accomodation, discounts, package.',
                    url: 'https://www.waysily.com/page/school/colombia-immersion-spanish-school-20',
                    image: 'https://s3.amazonaws.com/waysily-img/school-photo-prd/20-34d2e9a3-6a6a-424d-bbcf-da5966c2b51d.jpg',
                    robots: 'follow,index'
                },
                parent: 'page',
                data: {
                    requireLogin: false
                },
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
            });
    }
})();

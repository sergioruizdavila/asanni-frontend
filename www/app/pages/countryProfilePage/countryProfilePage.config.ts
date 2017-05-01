/**
* config()
* @description - country profile page config file
*/


(function() {
    'use strict';

    angular
        .module('mainApp.pages.countryProfilePage', [])
        .config(config);


    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.countryProfilePage', {
                url: '/country/:aliasCountry',
                views: {
                    'container': {
                        templateUrl: 'app/pages/countryProfilePage/countryProfilePage.html',
                        controller: 'mainApp.pages.countryProfilePage.CountryProfilePageController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'page',
                data: {
                    requireLogin: false
                },
                params: {
                    aliasCountry: null,
                    title: 'Use Waysily to find language teachers and schools, have a complete immersion',
                    description: 'Waysily is a free community-based platform that helps you find local language teachers / schools in your area to have a complete immersion.',
                    url: 'https://www.waysily.com/',
                    robots: 'follow,index',
                    image: 'https://www.waysily.com/assets/images/waysily-shared.png'
                },
                cache: false,
                onEnter: ['$rootScope', function ($rootScope) {
                    // Show/Hide header & footer
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
            });
    }
})();

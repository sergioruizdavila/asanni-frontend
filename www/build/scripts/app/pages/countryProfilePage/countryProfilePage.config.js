(function () {
    'use strict';
    angular
        .module('mainApp.pages.countryProfilePage', [])
        .config(config);
    function config($stateProvider) {
        var CLIENT_URL = 'http://www.waysily.com';
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
                url: CLIENT_URL,
                robots: 'follow,index',
                image: CLIENT_URL + '/assets/images/waysily-shared.png'
            },
            cache: false,
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/countryProfilePage/countryProfilePage.config.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.searchPage', [])
        .config(config);
    function config($stateProvider) {
        var CLIENT_URL = 'http://www.waysily.com';
        $stateProvider
            .state('page.searchPage', {
            url: '/search',
            views: {
                'container': {
                    templateUrl: 'app/pages/searchPage/searchPage.html',
                    controller: 'mainApp.pages.searchPage.SearchPageController',
                    controllerAs: 'vm'
                }
            },
            data: {
                requireLogin: false
            },
            parent: 'page',
            params: {
                title: 'Use Waysily to find language teachers and schools, have a complete immersion',
                description: 'Waysily is a free community-based platform that helps you find local language teachers / schools in your area to have a complete immersion.',
                url: CLIENT_URL + '/search',
                robots: 'follow,index',
                image: CLIENT_URL + '/assets/images/waysily-shared.png',
                country: null,
                target: null
            },
            onEnter: ['$rootScope',
                function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = false;
                }
            ]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/searchPage/searchPage.config.js.map

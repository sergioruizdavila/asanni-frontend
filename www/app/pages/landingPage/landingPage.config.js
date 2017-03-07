(function () {
    'use strict';
    angular
        .module('mainApp.pages.landingPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.landingPage', {
            url: '/main',
            views: {
                'container': {
                    templateUrl: 'app/pages/landingPage/landingPage.html',
                    controller: 'mainApp.pages.landingPage.LandingPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: false
            },
            params: {
                showLogin: false,
            },
            cache: false,
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
        })
            .state('page.landingPage.recommendation', {
            url: '/main/recommendation/:id',
            views: {
                'container': {
                    templateUrl: 'app/pages/landingPage/landingPage.html',
                    controller: 'mainApp.pages.landingPage.LandingPageController',
                    controllerAs: 'vm'
                }
            },
            params: {
                id: null
            },
            parent: 'page',
            cache: false,
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();
//# sourceMappingURL=landingPage.config.js.map
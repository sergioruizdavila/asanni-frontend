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
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();
//# sourceMappingURL=landingPage.config.js.map
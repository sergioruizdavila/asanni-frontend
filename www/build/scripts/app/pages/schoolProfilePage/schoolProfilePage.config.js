(function () {
    'use strict';
    angular
        .module('mainApp.pages.schoolProfilePage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.schoolProfilePage', {
            url: '/school/:aliasSchool',
            views: {
                'container': {
                    templateUrl: 'app/pages/schoolProfilePage/schoolProfilePage.html',
                    controller: 'mainApp.pages.schoolProfilePage.SchoolProfilePageController',
                    controllerAs: 'vm',
                    resolve: {
                        waitForAuth: ['mainApp.auth.AuthService', function (AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                    }
                }
            },
            parent: 'page',
            data: {
                requireLogin: true
            },
            params: {
                aliasSchool: null
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/schoolProfilePage/schoolProfilePage.config.js.map

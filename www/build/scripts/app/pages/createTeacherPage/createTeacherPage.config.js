(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage', {
            url: '/create/teacher',
            views: {
                'container': {
                    templateUrl: 'app/pages/createTeacherPage/createTeacherPage.html',
                    controller: 'mainApp.pages.createTeacherPage.CreateTeacherPageController',
                    controllerAs: 'vm',
                    resolve: {
                        waitForAuth: ['mainApp.auth.AuthService', function (AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                    }
                }
            },
            cache: false,
            params: {
                type: '',
            },
            data: {
                requireLogin: true
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/createTeacherPage/createTeacherPage.config.js.map

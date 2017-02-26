(function () {
    'use strict';
    angular
        .module('mainApp.pages.userEditLocationPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.userEditLocationPage', {
            url: '/users/edit/location',
            views: {
                'container': {
                    templateUrl: 'app/pages/editProfile/userEditLocationPage/userEditLocationPage.html',
                    controller: 'mainApp.pages.userEditLocationPage.UserEditLocationPageController',
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
                user: null,
                id: null
            },
            data: {
                requireLogin: true
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
        });
    }
})();
//# sourceMappingURL=userEditLocationPage.config.js.map
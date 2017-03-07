(function () {
    'use strict';
    angular
        .module('mainApp.pages.userEditMediaPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.userEditMediaPage', {
            url: '/users/edit/media',
            views: {
                'container': {
                    templateUrl: 'app/pages/editProfile/userEditMediaPage/userEditMediaPage.html',
                    controller: 'mainApp.pages.userEditMediaPage.UserEditMediaPageController',
                    controllerAs: 'vm',
                    resolve: {
                        waitForAuth: ['mainApp.auth.AuthService', function (AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                    }
                }
            },
            cache: false,
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
//# sourceMappingURL=userEditMediaPage.config.js.map
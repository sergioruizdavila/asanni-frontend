(function () {
    'use strict';
    angular
        .module('mainApp.pages.resetPasswordPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.resetPasswordPage', {
            url: '/users/password/edit/:uid/:token',
            views: {
                'container': {
                    templateUrl: 'app/pages/resetPasswordPage/resetPasswordPage.html',
                    controller: 'mainApp.pages.resetPasswordPage.ResetPasswordPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: false
            },
            params: {
                uid: null,
                token: null
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
        });
    }
})();
//# sourceMappingURL=resetPasswordPage.config.js.map
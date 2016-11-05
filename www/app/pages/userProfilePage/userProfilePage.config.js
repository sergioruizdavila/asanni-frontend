(function () {
    'use strict';
    angular
        .module('mainApp.pages.userProfilePage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.userProfilePage', {
            url: '/users/show/:id',
            views: {
                'container': {
                    templateUrl: 'app/pages/userProfilePage/userProfilePage.html',
                    controller: 'mainApp.pages.userProfilePage.UserProfilePageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            params: {
                user: null,
                id: null
            }
        });
    }
})();
//# sourceMappingURL=userProfilePage.config.js.map
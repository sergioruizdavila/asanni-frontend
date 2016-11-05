(function () {
    'use strict';
    angular
        .module('mainApp.pages.searchPage', [])
        .config(config);
    function config($stateProvider) {
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
            parent: 'page',
            params: {
                user: null
            }
        });
    }
})();
//# sourceMappingURL=searchPage.config.js.map
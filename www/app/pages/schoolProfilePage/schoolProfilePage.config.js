(function () {
    'use strict';
    angular
        .module('mainApp.pages.schoolProfilePage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.schoolProfilePage', {
            url: '/schools/show/:id',
            views: {
                'container': {
                    templateUrl: 'app/pages/schoolProfilePage/schoolProfilePage.html',
                    controller: 'mainApp.pages.schoolProfilePage.SchoolProfilePageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: false
            },
            params: {
                id: null
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();
//# sourceMappingURL=schoolProfilePage.config.js.map
(function () {
    'use strict';
    angular
        .module('mainApp.pages.teacherLandingPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.teacherLandingPage', {
            url: '/main/teacher',
            views: {
                'container': {
                    templateUrl: 'app/pages/teacherLandingPage/teacherLandingPage.html',
                    controller: 'mainApp.pages.teacherLandingPage.TeacherLandingPageController',
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
//# sourceMappingURL=teacherLandingPage.config.js.map
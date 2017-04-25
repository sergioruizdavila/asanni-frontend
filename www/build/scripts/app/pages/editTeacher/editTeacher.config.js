(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher', {
            url: '/teachers/edit',
            views: {
                'container': {
                    templateUrl: 'app/pages/editTeacher/editTeacher.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherController',
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
                title: 'Teacher Profile',
                description: 'Waysily is a free community-based platform that helps you find local language teachers / schools in your area to have a complete immersion.',
                url: 'https://www.waysily.com/page/teachers/edit/teach',
                robots: 'nofollow',
                image: 'https://www.waysily.com/assets/images/waysily-shared.png'
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

//# sourceMappingURL=../../../../maps/app/pages/editTeacher/editTeacher.config.js.map

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

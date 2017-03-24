(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.method', {
            url: '/method',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherMethodSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.config.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.education', {
            url: '/education',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherEducationSection/teacherEducationSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherEducationSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();
//# sourceMappingURL=teacherEducationSection.config.js.map
(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.finish', {
            url: '/finish',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherFinishSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.config.js.map

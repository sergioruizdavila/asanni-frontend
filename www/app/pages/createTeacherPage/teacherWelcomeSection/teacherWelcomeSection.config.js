(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.start', {
            url: '/start',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherWelcomeSection/teacherWelcomeSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherWelcomeSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();
//# sourceMappingURL=teacherWelcomeSection.config.js.map
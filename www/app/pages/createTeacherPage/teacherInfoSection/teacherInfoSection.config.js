(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.basicInfo', {
            url: '/basicInfo',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherInfoSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();
//# sourceMappingURL=teacherInfoSection.config.js.map
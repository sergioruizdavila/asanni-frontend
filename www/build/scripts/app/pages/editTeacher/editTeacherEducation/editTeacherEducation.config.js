(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher.education', {
            url: '/education',
            views: {
                'section': {
                    templateUrl: 'app/pages/editTeacher/editTeacherEducation/editTeacherEducation.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherEducationController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherEducation/editTeacherEducation.config.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher.teach', {
            url: '/teach',
            views: {
                'section': {
                    templateUrl: 'app/pages/editTeacher/editTeacherTeach/editTeacherTeach.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherTeachController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherTeach/editTeacherTeach.config.js.map

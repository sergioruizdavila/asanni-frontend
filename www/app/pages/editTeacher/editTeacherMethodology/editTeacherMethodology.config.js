(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher.methodology', {
            url: '/methodology',
            views: {
                'section': {
                    templateUrl: 'app/pages/editTeacher/editTeacherMethodology/editTeacherMethodology.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherMethodologyController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();
//# sourceMappingURL=editTeacherMethodology.config.js.map
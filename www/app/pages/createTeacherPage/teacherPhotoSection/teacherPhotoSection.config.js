(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.photo', {
            url: '/photo',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherPhotoSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();
//# sourceMappingURL=teacherPhotoSection.config.js.map
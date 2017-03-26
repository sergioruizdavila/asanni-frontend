(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.location', {
            url: '/location',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherLocationSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.config.js.map

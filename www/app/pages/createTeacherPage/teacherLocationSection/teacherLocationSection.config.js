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
                    templateUrl: 'app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.html'
                }
            }
        });
    }
})();
//# sourceMappingURL=teacherLocationSection.config.js.map
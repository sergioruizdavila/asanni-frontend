(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.map', {
            url: '/map',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/locationOnMapSection/locationOnMapSection.html'
                }
            }
        });
    }
})();
//# sourceMappingURL=locationOnMapSection.config.js.map
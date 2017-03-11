(function () {
    'use strict';
    angular
        .module('mainApp.pages.editProfile')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editProfile.location', {
            url: '/location',
            views: {
                'section': {
                    templateUrl: 'app/pages/editProfile/editProfileLocation/editProfileLocation.html',
                    controller: 'mainApp.pages.editProfile.EditProfileLocationController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();
//# sourceMappingURL=editProfileLocation.config.js.map
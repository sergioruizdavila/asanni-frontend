(function () {
    'use strict';
    angular
        .module('mainApp.pages.editProfile')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editProfile.basicInfo', {
            url: '/info',
            views: {
                'section': {
                    templateUrl: 'app/pages/editProfile/editProfileBasicInfo/editProfileBasicInfo.html',
                    controller: 'mainApp.pages.editProfile.EditProfileBasicInfoController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();
//# sourceMappingURL=editProfileBasicInfo.config.js.map
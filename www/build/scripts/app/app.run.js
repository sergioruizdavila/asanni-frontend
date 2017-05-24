(function () {
    'use strict';
    angular
        .module('mainApp')
        .run(run);
    run.$inject = [
        '$rootScope',
        '$state',
        'dataConfig',
        'mainApp.auth.AuthService',
        'mainApp.models.user.UserService',
        'mainApp.localStorageService',
        'screenSize'
    ];
    function run($rootScope, $state, dataConfig, AuthService, userService, localStorage, screenSize) {
        var productionHost = dataConfig.domain;
        var mixpanelTokenDEV = dataConfig.mixpanelTokenDEV;
        var mixpanelTokenPRD = dataConfig.mixpanelTokenPRD;
        if (window.location.hostname.toLowerCase().search(productionHost) < 0) {
            mixpanel.init(mixpanelTokenDEV);
        }
        else {
            mixpanel.init(mixpanelTokenPRD, {
                loaded: function (mixpanel) {
                    var first_visit = mixpanel.get_property("First visit");
                    var current_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                    if (first_visit == null) {
                        mixpanel.register_once({ "First visit": current_date });
                        mixpanel.track("Visit");
                    }
                }
            });
        }
        if (AuthService.isAuthenticated()) {
            var userAccountInfo = JSON.parse(localStorage.getItem(dataConfig.userDataLocalStorage));
            if (userAccountInfo) {
                $rootScope.userData = userAccountInfo;
                userService.getUserProfileById($rootScope.userData.id).then(function (response) {
                    if (response.userId) {
                        $rootScope.profileData = new app.models.user.Profile(response);
                    }
                });
            }
            else {
                DEBUG && Raven.captureMessage('Error app.run.js method: userAccountInfo is null');
                AuthService.logout();
            }
        }
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.data.requireLogin && !AuthService.isAuthenticated()) {
                event.preventDefault();
                $state.go('page.landingPage');
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.title = toParams.title;
            $rootScope.description = toParams.description;
            $rootScope.url = toParams.url;
            $rootScope.robots = toParams.robots;
            $rootScope.image = toParams.image;
        });
        $rootScope.isMobile = screenSize.on('xs, sm', function (isMatch) {
            $rootScope.isMobile = isMatch;
        });
    }
})();
(function (angular) {
    function localStorageServiceFactory($window) {
        if ($window.localStorage) {
            return $window.localStorage;
        }
        throw new Error('Local storage support is needed');
    }
    localStorageServiceFactory.$inject = ['$window'];
    angular
        .module('mainApp.localStorage', [])
        .factory('mainApp.localStorageService', localStorageServiceFactory);
})(angular);

//# sourceMappingURL=../../maps/app/app.run.js.map

(function () {
    'use strict';
    angular
        .module('mainApp')
        .run(run);
    run.$inject = ['$rootScope',
        '$state',
        'dataConfig',
        'mainApp.auth.AuthService'];
    function run($rootScope, $state, dataConfig, AuthService) {
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
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.data.requireLogin && !AuthService.isAuthenticated()) {
                event.preventDefault();
                $state.go('page');
            }
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
//# sourceMappingURL=app.run.js.map
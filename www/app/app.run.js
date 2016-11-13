(function () {
    'use strict';
    angular
        .module('mainApp')
        .run(run);
    run.$inject = ['$rootScope', 'dataConfig', '$http'];
    function run($rootScope, dataConfig, $http) {
        mixpanel.init(dataConfig.mixpanelToken, {
            loaded: function (mixpanel) {
                var first_visit = mixpanel.get_property("First visit");
                var current_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                if (first_visit == null) {
                    mixpanel.register_once({ "First visit": current_date });
                    mixpanel.track("Visit");
                }
            }
        });
        dataConfig.userId = 'id1234';
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
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
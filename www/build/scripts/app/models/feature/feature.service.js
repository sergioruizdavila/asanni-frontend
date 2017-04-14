var app;
(function (app) {
    var models;
    (function (models) {
        var feature;
        (function (feature) {
            'use strict';
            var FeatureService = (function () {
                function FeatureService(restApi, AuthService, $q) {
                    this.restApi = restApi;
                    this.AuthService = AuthService;
                    this.$q = $q;
                    DEBUG && console.log('feature service instanced');
                    this.FEATURE_URI = 'features';
                }
                FeatureService.prototype.getFeaturesByRange = function (minId) {
                    var self = this;
                    var url = this.FEATURE_URI + '?minId=' + minId;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                FeatureService.serviceId = 'mainApp.models.feature.FeatureService';
                FeatureService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    'mainApp.auth.AuthService',
                    '$q'
                ];
                return FeatureService;
            }());
            feature.FeatureService = FeatureService;
            angular
                .module('mainApp.models.feature', [])
                .service(FeatureService.serviceId, FeatureService);
        })(feature = models.feature || (models.feature = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/feature/feature.service.js.map

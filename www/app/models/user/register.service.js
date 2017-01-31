var app;
(function (app) {
    var models;
    (function (models) {
        var user;
        (function (user) {
            'use strict';
            var RegisterService = (function () {
                function RegisterService(restApi) {
                    this.restApi = restApi;
                    console.log('register service instanced');
                }
                RegisterService.prototype.checkEmail = function (value) {
                    var url = '/register/check-email/';
                    return this.restApi.create({ url: url }, value).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                RegisterService.prototype.checkUsername = function (value) {
                    var url = '/register/check-username/';
                    return this.restApi.create({ url: url }, value).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                RegisterService.prototype.register = function (value) {
                    var promise;
                    var url = 'register/';
                    promise = this.restApi.create({ url: url }, value)
                        .$promise.then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                    return promise;
                };
                return RegisterService;
            }());
            RegisterService.serviceId = 'mainApp.models.user.RegisterService';
            RegisterService.$inject = [
                'mainApp.core.restApi.restApiService'
            ];
            user.RegisterService = RegisterService;
            angular
                .module('mainApp.models.user', [])
                .service(RegisterService.serviceId, RegisterService);
        })(user = models.user || (models.user = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=register.service.js.map
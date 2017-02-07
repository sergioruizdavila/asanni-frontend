var app;
(function (app) {
    var register;
    (function (register) {
        'use strict';
        var RegisterService = (function () {
            function RegisterService($q, restApi) {
                this.$q = $q;
                this.restApi = restApi;
                DEBUG && console.log('register service instanced');
                this.REGISTER_URI = 'register';
                this.REGISTER_CHECK_EMAIL_URI = 'register/check-email';
                this.REGISTER_CHECK_USERNAME_URI = 'register/check-username';
            }
            RegisterService.prototype.checkEmail = function (email) {
                var url = this.REGISTER_CHECK_EMAIL_URI;
                var deferred = this.$q.defer();
                var data = {
                    email: email
                };
                this.restApi.create({ url: url }, data).$promise
                    .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            RegisterService.prototype.checkUsername = function (username) {
                var url = this.REGISTER_CHECK_USERNAME_URI;
                return this.restApi.create({ url: url }, username).$promise
                    .then(function (data) {
                    return data;
                }, function (error) {
                    DEBUG && console.log(error);
                    return error;
                });
            };
            RegisterService.prototype.register = function (userData) {
                var url = this.REGISTER_URI;
                var deferred = this.$q.defer();
                this.restApi.create({ url: url }, userData).$promise
                    .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            return RegisterService;
        }());
        RegisterService.serviceId = 'mainApp.register.RegisterService';
        RegisterService.$inject = [
            '$q',
            'mainApp.core.restApi.restApiService'
        ];
        register.RegisterService = RegisterService;
        angular
            .module('mainApp.register', [])
            .service(RegisterService.serviceId, RegisterService);
    })(register = app.register || (app.register = {}));
})(app || (app = {}));
//# sourceMappingURL=register.service.js.map
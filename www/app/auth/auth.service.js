var app;
(function (app) {
    var auth;
    (function (auth) {
        'use strict';
        var AuthService = (function () {
            function AuthService($q, $rootScope, $http) {
                this.$q = $q;
                this.$http = $http;
                console.log('auth service called');
            }
            AuthService.prototype.signUpPassword = function (username, email, password) {
                var self = this;
                var userData = {
                    username: username,
                    email: email,
                    password: password
                };
                return this.$http.post('http://asanni.herokuapp.com/api/v1/posts/', {
                    Title: userData.username,
                    Link: userData.password
                });
            };
            return AuthService;
        }());
        AuthService.serviceId = 'mainApp.auth.AuthService';
        AuthService.$inject = ['$q',
            '$rootScope',
            '$http'];
        auth.AuthService = AuthService;
        angular
            .module('mainApp.auth', [])
            .service(AuthService.serviceId, AuthService);
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
//# sourceMappingURL=auth.service.js.map
var app;
(function (app) {
    var auth;
    (function (auth) {
        'use strict';
        var AuthService = (function () {
            function AuthService($q, $timeout, $cookies, OAuth, dataConfig) {
                this.$q = $q;
                this.$timeout = $timeout;
                this.$cookies = $cookies;
                this.OAuth = OAuth;
                this.dataConfig = dataConfig;
                DEBUG && console.log('auth service called');
                this.autoRefreshTokenInterval = dataConfig.autoRefreshTokenIntervalSeconds * 1000;
                this.refreshNeeded = true;
            }
            AuthService.prototype.isAuthenticated = function () {
                return this.OAuth.isAuthenticated();
            };
            AuthService.prototype.forceLogout = function () {
                DEBUG && console.log("Forcing logout");
                this.$cookies.remove(this.dataConfig.cookieName);
            };
            AuthService.prototype.login = function (user) {
                var self = this;
                var deferred = this.$q.defer();
                this.OAuth.getAccessToken(user, {}).then(function (response) {
                    DEBUG && console.info("Logged in successfuly!");
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error("Error while logging in!");
                    deferred.resolve(error);
                });
                return deferred.promise;
            };
            AuthService.prototype.logout = function () {
                var self = this;
                var deferred = this.$q.defer();
                this.OAuth.revokeToken().then(function (response) {
                    DEBUG && console.info("Logged out successfuly!");
                    deferred.resolve(response);
                }, function (response) {
                    DEBUG && console.error("Error while logging you out!");
                    self.forceLogout();
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            AuthService.prototype.refreshToken = function () {
                var self = this;
                var deferred = this.$q.defer();
                if (!this.isAuthenticated()) {
                    DEBUG && console.error('Cannot refresh token if Unauthenticated');
                    deferred.reject();
                    return deferred.promise;
                }
                this.OAuth.getRefreshToken().then(function (response) {
                    DEBUG && console.info("Access token refreshed");
                    deferred.resolve(response);
                }, function (response) {
                    DEBUG && console.error("Error refreshing token ");
                    DEBUG && console.error(response);
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            AuthService.prototype.autoRefreshToken = function () {
                var self = this;
                var deferred = this.$q.defer();
                if (!this.refreshNeeded) {
                    deferred.resolve();
                    return deferred.promise;
                }
                this.refreshToken().then(function (response) {
                    self.refreshNeeded = false;
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
                this.$timeout(function () {
                    if (self.isAuthenticated()) {
                        self.refreshNeeded = true;
                        self.autoRefreshToken();
                    }
                }, self.autoRefreshTokenInterval);
                return deferred.promise;
            };
            return AuthService;
        }());
        AuthService.serviceId = 'mainApp.auth.AuthService';
        AuthService.$inject = ['$q',
            '$timeout',
            '$cookies',
            'OAuth',
            'dataConfig'];
        auth.AuthService = AuthService;
        angular
            .module('mainApp.auth', [])
            .service(AuthService.serviceId, AuthService);
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
//# sourceMappingURL=auth.service.js.map
var app;
(function (app) {
    var auth;
    (function (auth) {
        'use strict';
        var AuthService = (function () {
            function AuthService($q, $timeout, $cookies, OAuth, restApi, dataConfig, localStorage) {
                this.$q = $q;
                this.$timeout = $timeout;
                this.$cookies = $cookies;
                this.OAuth = OAuth;
                this.restApi = restApi;
                this.dataConfig = dataConfig;
                this.localStorage = localStorage;
                DEBUG && console.log('auth service called');
                this.AUTH_RESET_PASSWORD_URI = 'rest-auth/password/reset/';
                this.AUTH_CONFIRM_RESET_PASSWORD_URI = 'rest-auth/password/reset/confirm/';
                this.autoRefreshTokenInterval = dataConfig.autoRefreshTokenIntervalSeconds * 1000;
                this.refreshNeeded = true;
            }
            AuthService.prototype.isAuthenticated = function () {
                return this.OAuth.isAuthenticated();
            };
            AuthService.prototype.forceLogout = function () {
                DEBUG && console.log("Forcing logout");
                this.$cookies.remove(this.dataConfig.cookieName);
                this.localStorage.removeItem(this.dataConfig.userDataLocalStorage);
                this.localStorage.removeItem(this.dataConfig.teacherDataLocalStorage);
            };
            AuthService.prototype.resetPassword = function (email) {
                var url = this.AUTH_RESET_PASSWORD_URI;
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
            AuthService.prototype.confirmResetPassword = function (uid, token, newPassword1, newPassword2) {
                var url = this.AUTH_CONFIRM_RESET_PASSWORD_URI;
                var deferred = this.$q.defer();
                var data = {
                    uid: uid,
                    token: token,
                    new_password1: newPassword1,
                    new_password2: newPassword2
                };
                this.restApi.create({ url: url }, data).$promise
                    .then(function (response) {
                    DEBUG && console.error(response);
                    deferred.resolve(response.detail);
                }, function (error) {
                    DEBUG && console.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            AuthService.prototype.login = function (user) {
                var self = this;
                var deferred = this.$q.defer();
                this.OAuth.getAccessToken(user, {}).then(function (response) {
                    DEBUG && console.info("Logged in successfuly!");
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error("Error while logging in!");
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            AuthService.prototype.logout = function () {
                var self = this;
                var deferred = this.$q.defer();
                this.OAuth.revokeToken().then(function (response) {
                    DEBUG && console.info("Logged out successfuly!");
                    self.localStorage.removeItem(self.dataConfig.userDataLocalStorage);
                    self.localStorage.removeItem(self.dataConfig.teacherDataLocalStorage);
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
            'mainApp.core.restApi.restApiService',
            'dataConfig',
            'mainApp.localStorageService'];
        auth.AuthService = AuthService;
        angular
            .module('mainApp.auth', [])
            .service(AuthService.serviceId, AuthService);
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));
//# sourceMappingURL=auth.service.js.map
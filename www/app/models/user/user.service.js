var app;
(function (app) {
    var models;
    (function (models) {
        var user;
        (function (user_1) {
            'use strict';
            var UserService = (function () {
                function UserService(restApi, AuthService) {
                    this.restApi = restApi;
                    this.AuthService = AuthService;
                    console.log('user service instanced');
                    this.USER_URI = 'users';
                }
                UserService.prototype.getUserProfileById = function (id) {
                    var self = this;
                    var url = this.USER_URI;
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    });
                };
                UserService.prototype.getAllUsersProfile = function () {
                    var self = this;
                    var url = this.USER_URI;
                    return this.restApi.query({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (error) {
                        DEBUG && console.log(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    });
                };
                UserService.prototype.updateUserProfile = function (profile) {
                    var self = this;
                    var url = this.USER_URI;
                    return this.restApi.update({ url: url, id: profile.userId }, profile).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    });
                };
                return UserService;
            }());
            UserService.serviceId = 'mainApp.models.user.UserService';
            UserService.$inject = [
                'mainApp.core.restApi.restApiService',
                'mainApp.auth.AuthService'
            ];
            user_1.UserService = UserService;
            angular
                .module('mainApp.models.user', [])
                .service(UserService.serviceId, UserService);
        })(user = models.user || (models.user = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=user.service.js.map
var app;
(function (app) {
    var models;
    (function (models) {
        var user;
        (function (user_1) {
            'use strict';
            var UserService = (function () {
                function UserService(restApi) {
                    this.restApi = restApi;
                    console.log('user service instanced');
                    this.USER_URI = 'users';
                }
                UserService.prototype.getUserProfileById = function (id) {
                    var url = this.USER_URI;
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                UserService.prototype.getAllUsersProfile = function () {
                    var url = this.USER_URI;
                    return this.restApi.query({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                UserService.prototype.updateUserProfile = function (profile) {
                    var url = this.USER_URI;
                    return this.restApi.update({ url: url, id: profile.userId }, profile).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return error;
                    });
                };
                return UserService;
            }());
            UserService.serviceId = 'mainApp.models.user.UserService';
            UserService.$inject = [
                'mainApp.core.restApi.restApiService'
            ];
            user_1.UserService = UserService;
            angular
                .module('mainApp.models.user', [])
                .service(UserService.serviceId, UserService);
        })(user = models.user || (models.user = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=user.service.js.map
var app;
(function (app) {
    var account;
    (function (account) {
        'use strict';
        var AccountService = (function () {
            function AccountService($q, restApi) {
                this.$q = $q;
                this.restApi = restApi;
                DEBUG && console.log('account service instanced');
                this.ACCOUNT_URI = 'account';
                this.ACCOUNT_GET_USERNAME_URI = 'account/username';
            }
            AccountService.prototype.getAccount = function () {
                var url = this.ACCOUNT_URI;
                return this.restApi.show({ url: url }).$promise
                    .then(function (response) {
                    return response;
                }, function (error) {
                    DEBUG && console.error(error);
                    return error;
                });
            };
            AccountService.prototype.getUsername = function (email) {
                var url = this.ACCOUNT_GET_USERNAME_URI;
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
            return AccountService;
        }());
        AccountService.serviceId = 'mainApp.account.AccountService';
        AccountService.$inject = [
            '$q',
            'mainApp.core.restApi.restApiService'
        ];
        account.AccountService = AccountService;
        angular
            .module('mainApp.account', [])
            .service(AccountService.serviceId, AccountService);
    })(account = app.account || (app.account = {}));
})(app || (app = {}));
//# sourceMappingURL=account.service.js.map
var app;
(function (app) {
    var account;
    (function (account) {
        'use strict';
        var AccountService = (function () {
            function AccountService(restApi) {
                this.restApi = restApi;
                DEBUG && console.log('account service instanced');
                this.ACCOUNT_URI = 'account';
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
            return AccountService;
        }());
        AccountService.serviceId = 'mainApp.account.AccountService';
        AccountService.$inject = [
            'mainApp.core.restApi.restApiService'
        ];
        account.AccountService = AccountService;
        angular
            .module('mainApp.account', [])
            .service(AccountService.serviceId, AccountService);
    })(account = app.account || (app.account = {}));
})(app || (app = {}));
//# sourceMappingURL=account.service.js.map
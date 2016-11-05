var app;
(function (app) {
    var pages;
    (function (pages) {
        var userInboxDetailsPage;
        (function (userInboxDetailsPage) {
            var UserInboxDetailsPageController = (function () {
                function UserInboxDetailsPageController($state, $scope) {
                    this.$state = $state;
                    this.$scope = $scope;
                    this._init();
                }
                UserInboxDetailsPageController.prototype._init = function () {
                    this.form = {};
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                UserInboxDetailsPageController.prototype.activate = function () {
                    console.log('userInboxDetailsPage controller actived');
                };
                return UserInboxDetailsPageController;
            }());
            UserInboxDetailsPageController.controllerId = 'mainApp.pages.userInboxDetailsPage.UserInboxDetailsPageController';
            UserInboxDetailsPageController.$inject = [
                '$state',
                '$scope'
            ];
            userInboxDetailsPage.UserInboxDetailsPageController = UserInboxDetailsPageController;
            angular
                .module('mainApp.pages.userInboxDetailsPage')
                .controller(UserInboxDetailsPageController.controllerId, UserInboxDetailsPageController);
        })(userInboxDetailsPage = pages.userInboxDetailsPage || (pages.userInboxDetailsPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=userInboxDetailsPage.controller.js.map
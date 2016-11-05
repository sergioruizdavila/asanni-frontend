var app;
(function (app) {
    var pages;
    (function (pages) {
        var userEditProfilePage;
        (function (userEditProfilePage) {
            var UserEditProfilePageController = (function () {
                function UserEditProfilePageController($state, $filter, $scope) {
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this._init();
                }
                UserEditProfilePageController.prototype._init = function () {
                    this.form = {
                        username: '',
                        email: ''
                    };
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                UserEditProfilePageController.prototype.activate = function () {
                    console.log('userEditProfilePage controller actived');
                };
                UserEditProfilePageController.prototype.goToEditMedia = function () {
                    this.$state.go('page.userEditMediaPage');
                };
                UserEditProfilePageController.prototype.goToEditAgenda = function () {
                    this.$state.go('page.userEditAgendaPage');
                };
                return UserEditProfilePageController;
            }());
            UserEditProfilePageController.controllerId = 'mainApp.pages.userEditProfilePage.UserEditProfilePageController';
            UserEditProfilePageController.$inject = [
                '$state',
                '$filter',
                '$scope'
            ];
            userEditProfilePage.UserEditProfilePageController = UserEditProfilePageController;
            angular
                .module('mainApp.pages.userEditProfilePage')
                .controller(UserEditProfilePageController.controllerId, UserEditProfilePageController);
        })(userEditProfilePage = pages.userEditProfilePage || (pages.userEditProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=userEditProfilePage.controller.js.map
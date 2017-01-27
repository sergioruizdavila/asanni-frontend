var app;
(function (app) {
    var pages;
    (function (pages) {
        var main;
        (function (main) {
            var MainController = (function () {
                function MainController($state, $rootScope, localStorage, dataConfig) {
                    this.$state = $state;
                    this.$rootScope = $rootScope;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.init();
                }
                MainController.prototype.init = function () {
                    this.activate();
                };
                MainController.prototype.activate = function () {
                    var self = this;
                    var earlyId = this.localStorage.getItem(this.dataConfig.earlyIdLocalStorage);
                    var currentState = this.$state.current.name;
                    if (currentState.indexOf('page.createTeacherPage') !== -1) {
                        this.$rootScope.activeMessageBar = false;
                    }
                    else {
                        this.$rootScope.activeMessageBar = earlyId ? true : false;
                    }
                    console.log('main controller actived');
                };
                return MainController;
            }());
            MainController.controllerId = 'mainApp.pages.main.MainController';
            MainController.$inject = [
                '$state',
                '$rootScope',
                'mainApp.localStorageService',
                'dataConfig'
            ];
            main.MainController = MainController;
            angular
                .module('mainApp.pages.main')
                .controller(MainController.controllerId, MainController);
        })(main = pages.main || (pages.main = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=main.controller.js.map
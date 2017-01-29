var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherFinishSectionController = (function () {
                function TeacherFinishSectionController($scope, $rootScope, $state, dataConfig, functionsUtilService, localStorage) {
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.functionsUtilService = functionsUtilService;
                    this.localStorage = localStorage;
                    this._init();
                }
                TeacherFinishSectionController.prototype._init = function () {
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(9, 9);
                    this.activate();
                };
                TeacherFinishSectionController.prototype.activate = function () {
                    console.log('TeacherFinishSectionController controller actived');
                    mixpanel.track("Enter: Finish Create Teacher Process");
                };
                TeacherFinishSectionController.prototype._finishProcess = function () {
                    this.localStorage.setItem(this.dataConfig.teacherIdLocalStorage, '');
                    this.localStorage.setItem(this.dataConfig.earlyIdLocalStorage, '');
                    mixpanel.track("Finish Process: Create Teacher", {
                        "id": this.$rootScope.teacherData.Id,
                        "name": this.$rootScope.teacherData.FirstName + ' ' + this.$rootScope.teacherData.LastName,
                        "email": this.$rootScope.teacherData.Email
                    });
                    this.$state.go('page.landingPage');
                };
                return TeacherFinishSectionController;
            }());
            TeacherFinishSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherFinishSectionController';
            TeacherFinishSectionController.$inject = [
                '$scope',
                '$rootScope',
                '$state',
                'dataConfig',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.localStorageService'
            ];
            createTeacherPage.TeacherFinishSectionController = TeacherFinishSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherFinishSectionController.controllerId, TeacherFinishSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherFinishSection.controller.js.map
var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherWelcomeSectionController = (function () {
                function TeacherWelcomeSectionController($state, $scope, $rootScope, functionsUtilService) {
                    this.$state = $state;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.functionsUtilService = functionsUtilService;
                    this._init();
                }
                TeacherWelcomeSectionController.prototype._init = function () {
                    this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    this.INITIAL_PROGRESS_WIDTH = '2%';
                    this.$scope.$parent.vm.progressWidth = this.INITIAL_PROGRESS_WIDTH;
                    this.activate();
                };
                TeacherWelcomeSectionController.prototype.activate = function () {
                    console.log('TeacherWelcomeSectionController controller actived');
                    mixpanel.track("Enter: Start Create Teacher Process");
                };
                TeacherWelcomeSectionController.prototype.goToStart = function () {
                    this.$rootScope.teacherData.Profile = this.$rootScope.profileData;
                    this.$scope.$emit('Save Data');
                    this.$state.go(this.STEP1_STATE, { reload: true });
                };
                return TeacherWelcomeSectionController;
            }());
            TeacherWelcomeSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherWelcomeSectionController';
            TeacherWelcomeSectionController.$inject = [
                '$state',
                '$scope',
                '$rootScope',
                'mainApp.core.util.FunctionsUtilService'
            ];
            createTeacherPage.TeacherWelcomeSectionController = TeacherWelcomeSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherWelcomeSectionController.controllerId, TeacherWelcomeSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherWelcomeSection.controller.js.map
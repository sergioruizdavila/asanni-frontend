var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherFinishSectionController = (function () {
                function TeacherFinishSectionController($scope, functionsUtilService) {
                    this.$scope = $scope;
                    this.functionsUtilService = functionsUtilService;
                    this._init();
                }
                TeacherFinishSectionController.prototype._init = function () {
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(9, 9);
                    this.activate();
                };
                TeacherFinishSectionController.prototype.activate = function () {
                    console.log('TeacherFinishSectionController controller actived');
                };
                return TeacherFinishSectionController;
            }());
            TeacherFinishSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherFinishSectionController';
            TeacherFinishSectionController.$inject = [
                '$scope',
                'mainApp.core.util.FunctionsUtilService'
            ];
            createTeacherPage.TeacherFinishSectionController = TeacherFinishSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherFinishSectionController.controllerId, TeacherFinishSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherFinishSection.controller.js.map
var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherLanguageSectionController = (function () {
                function TeacherLanguageSectionController(functionsUtilService, $state, $scope, $timeout) {
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$scope = $scope;
                    this.$timeout = $timeout;
                    this._init();
                }
                TeacherLanguageSectionController.prototype._init = function () {
                    var self = this;
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.STEP4_STATE = 'page.createTeacherPage.experience';
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(3, 9);
                    this.form = {
                        native: [],
                        learn: [],
                        teach: []
                    };
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                TeacherLanguageSectionController.prototype.activate = function () {
                    console.log('TeacherLanguageSectionController controller actived');
                    this._subscribeToEvents();
                };
                TeacherLanguageSectionController.prototype.goToNext = function () {
                    var CURRENT_STEP = 3;
                    this._setDataModelFromForm();
                    this.$scope.$emit('Save Data', CURRENT_STEP);
                    this.$state.go(this.STEP4_STATE, { reload: true });
                };
                TeacherLanguageSectionController.prototype.goToBack = function () {
                    this._setDataModelFromForm();
                    this.$scope.$emit('Save Data');
                    this.$state.go(this.STEP2_STATE, { reload: true });
                };
                TeacherLanguageSectionController.prototype._setDataModelFromForm = function () {
                    this.$scope.$parent.vm.teacherData.Languages.Native = this.form.native;
                    this.$scope.$parent.vm.teacherData.Languages.Learn = this.form.learn;
                    this.$scope.$parent.vm.teacherData.Languages.Teach = this.form.teach;
                };
                TeacherLanguageSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.native = args.Languages.Native;
                        self.form.learn = args.Languages.Learn;
                        self.form.teach = args.Languages.Teach;
                    });
                };
                return TeacherLanguageSectionController;
            }());
            TeacherLanguageSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherLanguageSectionController';
            TeacherLanguageSectionController.$inject = [
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$scope',
                '$timeout'
            ];
            createTeacherPage.TeacherLanguageSectionController = TeacherLanguageSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherLanguageSectionController.controllerId, TeacherLanguageSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherLanguageSection.controller.js.map
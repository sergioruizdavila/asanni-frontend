var app;
(function (app) {
    var pages;
    (function (pages) {
        var teacherLandingPage;
        (function (teacherLandingPage) {
            var TeacherLandingPageController = (function () {
                function TeacherLandingPageController(TeacherService, $state, dataConfig, $translate, $uibModal) {
                    this.TeacherService = TeacherService;
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.$translate = $translate;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherLandingPageController.prototype._init = function () {
                    this.form = {
                        language: this.$translate.use() || 'en'
                    };
                    this.activate();
                };
                TeacherLandingPageController.prototype.activate = function () {
                    var self = this;
                    this.teacherData = [];
                    console.log('teacherLandingPage controller actived');
                    this.TeacherService.getTeacherById('1').then(function (response) {
                        self.teacherData.push(response);
                    });
                };
                TeacherLandingPageController.prototype.changeLanguage = function () {
                    this.$translate.use(this.form.language);
                };
                TeacherLandingPageController.prototype._openSignUpModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalSignUpTmpl,
                        controller: 'mainApp.components.modal.ModalSignUpController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    event.preventDefault();
                };
                TeacherLandingPageController.prototype.gotoCreate = function () {
                    this.$state.go('page.createTeacherPage', { reload: true });
                };
                return TeacherLandingPageController;
            }());
            TeacherLandingPageController.controllerId = 'mainApp.pages.teacherLandingPage.TeacherLandingPageController';
            TeacherLandingPageController.$inject = ['mainApp.models.teacher.TeacherService',
                '$state',
                'dataConfig',
                '$translate',
                '$uibModal'];
            teacherLandingPage.TeacherLandingPageController = TeacherLandingPageController;
            angular
                .module('mainApp.pages.teacherLandingPage')
                .controller(TeacherLandingPageController.controllerId, TeacherLandingPageController);
        })(teacherLandingPage = pages.teacherLandingPage || (pages.teacherLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherLandingPage.controller.js.map
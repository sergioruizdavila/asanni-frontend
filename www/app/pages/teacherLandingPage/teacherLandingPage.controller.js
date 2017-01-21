var app;
(function (app) {
    var pages;
    (function (pages) {
        var teacherLandingPage;
        (function (teacherLandingPage) {
            var TeacherLandingPageController = (function () {
                function TeacherLandingPageController(functionsUtil, $state, dataConfig, $uibModal) {
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherLandingPageController.prototype._init = function () {
                    this.form = {
                        language: this.functionsUtil.getCurrentLanguage() || 'en'
                    };
                    this._hoverDetail = [];
                    this._buildFakeTeacher();
                    this.activate();
                };
                TeacherLandingPageController.prototype.activate = function () {
                    this.TEACHER_FAKE_TMPL = 'app/pages/teacherLandingPage/teacherContainerExample/teacherContainerExample.html';
                    var self = this;
                    console.log('teacherLandingPage controller actived');
                    mixpanel.track("Enter: Teacher Landing Page");
                };
                TeacherLandingPageController.prototype.changeLanguage = function () {
                    this.functionsUtil.changeLanguage(this.form.language);
                    mixpanel.track("Change Language on teacherLandingPage");
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
                    mixpanel.track("Click on 'Join as Student' teacher landing page header");
                };
                TeacherLandingPageController.prototype._buildFakeTeacher = function () {
                    this.fake = new app.models.teacher.Teacher();
                    this.fake.Id = '1';
                    this.fake.FirstName = 'Dianne';
                    this.fake.Born = 'New York, United States';
                    this.fake.Avatar = 'https://waysily-img.s3.amazonaws.com/b3605bad-0924-4bc1-98c8-676c664acd9d-example.jpeg';
                    this.fake.Methodology = 'I can customize the lessons to fit your needs. I teach conversational English to intermediate and advanced students with a focus on grammar, pronunciation, vocabulary and clear fluency and Business English with a focus on formal English in a business setting (role-play), business journal articles, and technical, industry based vocabulary';
                    this.fake.TeacherSince = '2013';
                    this.fake.Type = 'H';
                    this.fake.Languages.Native = ['6'];
                    this.fake.Languages.Teach = ['6', '8'];
                    this.fake.Languages.Learn = ['8', '7'];
                    this.fake.Immersion.Active = true;
                    this.fake.Price.PrivateClass.Active = true;
                    this.fake.Price.PrivateClass.HourPrice = 20.00;
                    this.fake.Price.GroupClass.Active = true;
                    this.fake.Price.GroupClass.HourPrice = 15.00;
                };
                TeacherLandingPageController.prototype._hoverEvent = function (id, status) {
                    var args = { id: id, status: status };
                    this._hoverDetail[id] = status;
                };
                TeacherLandingPageController.prototype._assignNativeClass = function (languages) {
                    var native = languages.native;
                    var teach = languages.teach;
                    var isNative = false;
                    for (var i = 0; i < native.length; i++) {
                        for (var j = 0; j < teach.length; j++) {
                            if (teach[j] === native[i]) {
                                isNative = true;
                            }
                        }
                    }
                    return isNative;
                };
                TeacherLandingPageController.prototype.goToCreate = function () {
                    var params = {
                        type: 'new'
                    };
                    this.$state.go('page.createTeacherPage.start', params, { reload: true });
                };
                return TeacherLandingPageController;
            }());
            TeacherLandingPageController.controllerId = 'mainApp.pages.teacherLandingPage.TeacherLandingPageController';
            TeacherLandingPageController.$inject = ['mainApp.core.util.FunctionsUtilService',
                '$state',
                'dataConfig',
                '$uibModal'];
            teacherLandingPage.TeacherLandingPageController = TeacherLandingPageController;
            angular
                .module('mainApp.pages.teacherLandingPage')
                .controller(TeacherLandingPageController.controllerId, TeacherLandingPageController);
        })(teacherLandingPage = pages.teacherLandingPage || (pages.teacherLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherLandingPage.controller.js.map
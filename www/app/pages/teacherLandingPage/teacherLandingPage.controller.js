var app;
(function (app) {
    var pages;
    (function (pages) {
        var teacherLandingPage;
        (function (teacherLandingPage) {
            var TeacherLandingPageController = (function () {
                function TeacherLandingPageController($scope, functionsUtil, AuthService, $state, dataConfig, $uibModal, $rootScope, localStorage) {
                    this.$scope = $scope;
                    this.functionsUtil = functionsUtil;
                    this.AuthService = AuthService;
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.$rootScope = $rootScope;
                    this.localStorage = localStorage;
                    this._init();
                }
                TeacherLandingPageController.prototype._init = function () {
                    this.isAuthenticated = this.AuthService.isAuthenticated();
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
                    this._subscribeToEvents();
                };
                TeacherLandingPageController.prototype.changeLanguage = function () {
                    this.functionsUtil.changeLanguage(this.form.language);
                    mixpanel.track("Change Language on teacherLandingPage");
                };
                TeacherLandingPageController.prototype._openSignUpModal = function (event) {
                    var self = this;
                    var hasNextStep = false;
                    if (this.isAuthenticated) {
                        this.goToCreate();
                        return;
                    }
                    if (event.target.id === 'hero-go-to-button') {
                        hasNextStep = true;
                    }
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        templateUrl: this.dataConfig.modalSignUpTmpl,
                        controller: 'mainApp.components.modal.ModalSignUpController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: hasNextStep
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    mixpanel.track("Click on 'Join as Student' teacher landing page header");
                };
                TeacherLandingPageController.prototype._openLogInModal = function () {
                    mixpanel.track("Click on 'Log in' from teacher landing page");
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        templateUrl: this.dataConfig.modalLogInTmpl,
                        controller: 'mainApp.components.modal.ModalLogInController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: false
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function () {
                        self.$rootScope.$broadcast('Is Authenticated', false);
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                };
                TeacherLandingPageController.prototype.logout = function () {
                    var self = this;
                    this.AuthService.logout().then(function (response) {
                        window.location.reload();
                    }, function (response) {
                        DEBUG && console.log('A problem occured while logging you out.');
                    });
                };
                TeacherLandingPageController.prototype._buildFakeTeacher = function () {
                    this.profileFake = new app.models.user.Profile();
                    this.teacherFake = new app.models.teacher.Teacher();
                    this.profileFake.UserId = '1';
                    this.profileFake.FirstName = 'Dianne';
                    this.profileFake.BornCity = 'New York';
                    this.profileFake.BornCountry = 'United States';
                    this.profileFake.Avatar = 'https://waysily-img.s3.amazonaws.com/b3605bad-0924-4bc1-98c8-676c664acd9d-example.jpeg';
                    this.profileFake.Languages.Native = ['6'];
                    this.profileFake.Languages.Teach = ['6', '8'];
                    this.profileFake.Languages.Learn = ['8', '7'];
                    this.teacherFake.Methodology = 'I can customize the lessons to fit your needs. I teach conversational English to intermediate and advanced students with a focus on grammar, pronunciation, vocabulary and clear fluency and Business English with a focus on formal English in a business setting (role-play), business journal articles, and technical, industry based vocabulary';
                    this.teacherFake.TeacherSince = '2013';
                    this.teacherFake.Type = 'H';
                    this.teacherFake.Immersion.Active = true;
                    this.teacherFake.Price.PrivateClass.Active = true;
                    this.teacherFake.Price.PrivateClass.HourPrice = 20.00;
                    this.teacherFake.Price.GroupClass.Active = true;
                    this.teacherFake.Price.GroupClass.HourPrice = 15.00;
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
                TeacherLandingPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Is Authenticated', function (event, args) {
                        self.isAuthenticated = self.AuthService.isAuthenticated();
                        if (self.isAuthenticated && args) {
                            self.goToCreate();
                        }
                    });
                };
                return TeacherLandingPageController;
            }());
            TeacherLandingPageController.controllerId = 'mainApp.pages.teacherLandingPage.TeacherLandingPageController';
            TeacherLandingPageController.$inject = ['$scope',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.auth.AuthService',
                '$state',
                'dataConfig',
                '$uibModal',
                '$rootScope',
                'mainApp.localStorageService'];
            teacherLandingPage.TeacherLandingPageController = TeacherLandingPageController;
            angular
                .module('mainApp.pages.teacherLandingPage')
                .controller(TeacherLandingPageController.controllerId, TeacherLandingPageController);
        })(teacherLandingPage = pages.teacherLandingPage || (pages.teacherLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherLandingPage.controller.js.map
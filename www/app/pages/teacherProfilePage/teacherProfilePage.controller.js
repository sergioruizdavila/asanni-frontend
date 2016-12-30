var app;
(function (app) {
    var pages;
    (function (pages) {
        var teacherProfilePage;
        (function (teacherProfilePage) {
            var TeacherProfilePageController = (function () {
                function TeacherProfilePageController(TeacherService, $state, $stateParams, $filter) {
                    this.TeacherService = TeacherService;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this._init();
                }
                TeacherProfilePageController.prototype._init = function () {
                    this.data = null;
                    this.mapConfig = {
                        type: 'location-map',
                        data: null
                    };
                    this.activate();
                };
                TeacherProfilePageController.prototype.activate = function () {
                    var self = this;
                    console.log('teacherProfilePage controller actived');
                    this.TeacherService.getTeacherById(this.$stateParams.id).then(function (response) {
                        self.data = new app.models.teacher.Teacher(response);
                    });
                };
                TeacherProfilePageController.prototype.goToConfirm = function () {
                };
                TeacherProfilePageController.prototype._assignNative = function (language) {
                    var native = this.data.Languages.Native;
                    var isNativeOfThisLanguage = false;
                    for (var i = 0; i < native.length; i++) {
                        if (language === native[i]) {
                            isNativeOfThisLanguage = true;
                            break;
                        }
                    }
                    return isNativeOfThisLanguage;
                };
                return TeacherProfilePageController;
            }());
            TeacherProfilePageController.controllerId = 'mainApp.pages.teacherProfilePage.TeacherProfilePageController';
            TeacherProfilePageController.$inject = [
                'mainApp.models.teacher.TeacherService',
                '$state',
                '$stateParams',
                '$filter',
                '$scope'
            ];
            teacherProfilePage.TeacherProfilePageController = TeacherProfilePageController;
            angular
                .module('mainApp.pages.teacherProfilePage')
                .controller(TeacherProfilePageController.controllerId, TeacherProfilePageController);
        })(teacherProfilePage = pages.teacherProfilePage || (pages.teacherProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherProfilePage.controller.js.map
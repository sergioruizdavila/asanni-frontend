var app;
(function (app) {
    var pages;
    (function (pages) {
        var teacherProfilePage;
        (function (teacherProfilePage) {
            var TeacherProfilePageController = (function () {
                function TeacherProfilePageController(TeacherService, functionsUtil, $state, $stateParams, $filter) {
                    this.TeacherService = TeacherService;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this._init();
                }
                TeacherProfilePageController.prototype._init = function () {
                    this.data = null;
                    this.loading = true;
                    this._initNativeTooltip();
                    this.activate();
                };
                TeacherProfilePageController.prototype.activate = function () {
                    var self = this;
                    console.log('teacherProfilePage controller actived');
                    this.TeacherService.getTeacherById(this.$stateParams.id).then(function (response) {
                        self.data = new app.models.teacher.Teacher(response);
                        self.mapConfig = self.functionsUtil.buildMapConfig([
                            {
                                id: self.data.Location.Position.Id,
                                location: {
                                    position: {
                                        lat: parseFloat(self.data.Location.Position.Lat),
                                        lng: parseFloat(self.data.Location.Position.Lng)
                                    }
                                }
                            }
                        ], 'location-circle-map', { lat: parseFloat(self.data.Location.Position.Lat), lng: parseFloat(self.data.Location.Position.Lng) }, null);
                        self.loading = false;
                    });
                };
                TeacherProfilePageController.prototype._initNativeTooltip = function () {
                    this.nativeTooltipOptions = {
                        placement: 'top',
                        animation: false,
                        class: 'ma-tooltip ma-tooltip--primary ma-tooltip--default'
                    };
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
                TeacherProfilePageController.prototype._assignNativeTooltip = function (language) {
                    var TOOLTIP_TEXT = this.$filter('translate')('%profile.teacher.native.lang.tooltip.text');
                    var firstName = this.data.FirstName;
                    var tooltipText = null;
                    var isNative = this._assignNative(language);
                    if (isNative) {
                        tooltipText = firstName + ' ' + TOOLTIP_TEXT;
                    }
                    return tooltipText;
                };
                TeacherProfilePageController.prototype._ratingTotalAverage = function (ratingsArr) {
                    return this.functionsUtil.teacherRatingAverage(ratingsArr);
                };
                TeacherProfilePageController.prototype._ratingUnitAverage = function (ratingsArr, type) {
                    var average = 0;
                    var averageArr = [];
                    var ratings = [];
                    for (var i = 0; i < ratingsArr.length; i++) {
                        ratings.push(new app.models.teacher.Rating(ratingsArr[i]));
                        switch (type) {
                            case 'methodology':
                                averageArr.push(ratings[i].MethodologyValue);
                                break;
                            case 'communication':
                                averageArr.push(ratings[i].CommunicationValue);
                                break;
                            case 'teaching':
                                averageArr.push(ratings[i].TeachingValue);
                                break;
                        }
                    }
                    average = this.functionsUtil.averageNumbersArray(averageArr);
                    return average;
                };
                return TeacherProfilePageController;
            }());
            TeacherProfilePageController.controllerId = 'mainApp.pages.teacherProfilePage.TeacherProfilePageController';
            TeacherProfilePageController.$inject = [
                'mainApp.models.teacher.TeacherService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$stateParams',
                '$filter'
            ];
            teacherProfilePage.TeacherProfilePageController = TeacherProfilePageController;
            angular
                .module('mainApp.pages.teacherProfilePage')
                .controller(TeacherProfilePageController.controllerId, TeacherProfilePageController);
        })(teacherProfilePage = pages.teacherProfilePage || (pages.teacherProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherProfilePage.controller.js.map
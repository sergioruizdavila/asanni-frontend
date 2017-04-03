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
                    this.data = new app.models.teacher.Teacher();
                    this.loading = true;
                    this._initNativeTooltip();
                    this.activate();
                };
                TeacherProfilePageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Teacher Profile Page Id: ' + this.$stateParams.id;
                    var self = this;
                    console.log('teacherProfilePage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this.TeacherService.getTeacherById(this.$stateParams.id).then(function (response) {
                        self.data = new app.models.teacher.Teacher(response);
                        self.mapConfig = self.functionsUtil.buildMapConfig([
                            {
                                id: self.data.Profile.Location.Position.Id,
                                location: {
                                    position: {
                                        lat: parseFloat(self.data.Profile.Location.Position.Lat),
                                        lng: parseFloat(self.data.Profile.Location.Position.Lng)
                                    }
                                }
                            }
                        ], 'location-circle-map', { lat: parseFloat(self.data.Profile.Location.Position.Lat), lng: parseFloat(self.data.Profile.Location.Position.Lng) }, null);
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
                    var CLICK_MIXPANEL = 'Click: Book a Class';
                    mixpanel.track(CLICK_MIXPANEL, {
                        "teacher_id": this.data.Id,
                        "teacher_name": this.data.Profile.FirstName + ' ' + this.data.Profile.LastName
                    });
                    var url = 'https://waysily.typeform.com/to/NDPRAb';
                    window.open(url, '_blank');
                };
                TeacherProfilePageController.prototype._assignNative = function (language) {
                    var native = this.data.Profile.Languages.Native;
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
                    var firstName = this.data.Profile.FirstName;
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
                TeacherProfilePageController.controllerId = 'mainApp.pages.teacherProfilePage.TeacherProfilePageController';
                TeacherProfilePageController.$inject = [
                    'mainApp.models.teacher.TeacherService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$stateParams',
                    '$filter'];
                return TeacherProfilePageController;
            }());
            teacherProfilePage.TeacherProfilePageController = TeacherProfilePageController;
            angular
                .module('mainApp.pages.teacherProfilePage')
                .controller(TeacherProfilePageController.controllerId, TeacherProfilePageController);
        })(teacherProfilePage = pages.teacherProfilePage || (pages.teacherProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/teacherProfilePage/teacherProfilePage.controller.js.map

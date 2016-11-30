var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var CreateTeacherPageController = (function () {
                function CreateTeacherPageController(getDataFromJson, functionsUtilService, teacherService, localStorage, dataConfig, $state, $filter, $scope, $rootScope, $uibModal) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                CreateTeacherPageController.prototype._init = function () {
                    var START_DAY = 1;
                    var FINAL_DAY = 31;
                    var START_YEAR = 1916;
                    var FINAL_YEAR = 1998;
                    this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.STEP3_STATE = 'page.createTeacherPage.map';
                    this.STEP4_STATE = 'page.createTeacherPage.step4';
                    var currentState = this.$state.current.name;
                    switch (currentState) {
                        case this.STEP1_STATE:
                            this.titleSection = 'Step1: Basic Information';
                            this.progress(1);
                            break;
                        case this.STEP2_STATE:
                            this.titleSection = 'Step2: Where are you located?';
                            this.progress(2);
                            break;
                        case this.STEP3_STATE:
                            this.titleSection = 'Step2: Where are you located?';
                            this.progress(3);
                            break;
                    }
                    this.geocoder = new google.maps.Geocoder();
                    this.mapConfig = this.functionsUtilService.buildMapConfig([{ id: 1, location: { position: { lat: 6.175434, lng: -75.583329 } } }], 'drag-maker-map', { lat: 6.175434, lng: -75.583329 });
                    this.form = {
                        teacherData: new app.models.teacher.Teacher(),
                        dateSplitted: { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } },
                        locationCountry: { code: '', value: '' }
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                CreateTeacherPageController.prototype.activate = function () {
                    var self = this;
                    console.log('createTeacherPage controller actived');
                    this.fillFormWithTeacherData();
                };
                CreateTeacherPageController.prototype.progress = function (step) {
                    var STEPS = 9;
                    var percent = (100 / STEPS) * (step);
                    this.progressWidth = percent + '%';
                };
                CreateTeacherPageController.prototype.goToNext = function () {
                    var self = this;
                    var dateFormatted = this.functionsUtilService.joinDate(this.form.dateSplitted.day.value, this.form.dateSplitted.month.code, this.form.dateSplitted.year.value);
                    var countryCode = this.form.locationCountry.code;
                    var city = this.form.teacherData.CityLocation;
                    var address = this.form.teacherData.AddressLocation;
                    var zipCode = this.form.teacherData.ZipCodeLocation;
                    this.form.teacherData.BirthDate = dateFormatted;
                    this.form.teacherData.CountryLocation = countryCode;
                    if (address) {
                        var dataRequest = {
                            address: address,
                            componentRestrictions: {
                                country: countryCode
                            }
                        };
                        this.geocoder.geocode(dataRequest, function (results, status) {
                            if (status === 'OK') {
                                console.log(results, status);
                            }
                            else {
                                console.log(results, status);
                            }
                        });
                    }
                    if (this.$rootScope.teacher_id) {
                        this.form.teacherData.Id = this.$rootScope.teacher_id;
                        this.teacherService.updateTeacher(this.form.teacherData)
                            .then(function (response) {
                            if (response.id) {
                                self.$rootScope.teacher_id = response.id;
                                self.localStorage.setItem('waysily.teacher_id', response.id);
                            }
                            else {
                            }
                        });
                    }
                    else {
                        this.teacherService.createTeacher(this.form.teacherData)
                            .then(function (response) {
                            if (response.id) {
                                self.$rootScope.teacher_id = response.id;
                                self.localStorage.setItem('waysily.teacher_id', response.id);
                            }
                            else {
                            }
                        });
                    }
                    var currentState = this.$state.current.name;
                    switch (currentState) {
                        case this.STEP1_STATE:
                            this.titleSection = 'Step1: Basic Information';
                            this.progress(2);
                            this.$state.go(this.STEP2_STATE, { reload: true });
                            break;
                        case this.STEP2_STATE:
                            this.titleSection = 'Step2: Where are you located?';
                            this.progress(3);
                            this.$state.go(this.STEP3_STATE, { reload: true });
                            break;
                        case this.STEP3_STATE:
                            this.titleSection = 'Step2: Where are you located?';
                            this.progress(3);
                            this.$state.go(this.STEP4_STATE, { reload: true });
                            break;
                    }
                };
                CreateTeacherPageController.prototype.goToBack = function () {
                    var currentState = this.$state.current.name;
                    switch (currentState) {
                        case this.STEP1_STATE:
                            break;
                        case this.STEP2_STATE:
                            this.progress(1);
                            this.$state.go(this.STEP1_STATE, { reload: true });
                            break;
                        case this.STEP3_STATE:
                            this.progress(2);
                            this.$state.go(this.STEP2_STATE, { reload: true });
                            break;
                    }
                };
                CreateTeacherPageController.prototype.fillFormWithTeacherData = function () {
                    var self = this;
                    this.$rootScope.teacher_id = this.localStorage.getItem('waysily.teacher_id');
                    if (this.$rootScope.teacher_id) {
                        this.teacherService.getTeacherById(this.$rootScope.teacher_id)
                            .then(function (response) {
                            if (response.id) {
                                var date = self.functionsUtilService.splitDate(response.birthDate);
                                self.form.dateSplitted.day.value = parseInt(date.day);
                                self.form.dateSplitted.month.code = date.month;
                                self.form.dateSplitted.year.value = parseInt(date.year);
                                self.form.locationCountry.code = response.countryLocation;
                                self.form.teacherData = new app.models.teacher.Teacher(response);
                            }
                            else {
                            }
                        });
                    }
                };
                return CreateTeacherPageController;
            }());
            CreateTeacherPageController.controllerId = 'mainApp.pages.createTeacherPage.CreateTeacherPageController';
            CreateTeacherPageController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                'mainApp.models.teacher.TeacherService',
                'mainApp.localStorageService',
                'dataConfig',
                '$state',
                '$filter',
                '$scope',
                '$rootScope',
                '$uibModal'
            ];
            createTeacherPage.CreateTeacherPageController = CreateTeacherPageController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(CreateTeacherPageController.controllerId, CreateTeacherPageController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=createTeacherPage.controller.js.map
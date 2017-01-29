var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherLocationSectionController = (function () {
                function TeacherLocationSectionController(getDataFromJson, functionsUtilService, $state, $filter, $scope, $rootScope, $timeout) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$timeout = $timeout;
                    this._init();
                }
                TeacherLocationSectionController.prototype._init = function () {
                    var self = this;
                    this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    this.STEP3_STATE = 'page.createTeacherPage.language';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.location.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(2, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.countryObject = { code: '', value: '' };
                    this.form = {
                        countryLocation: '',
                        cityLocation: '',
                        stateLocation: '',
                        addressLocation: '',
                        zipCodeLocation: '',
                        positionLocation: new app.models.user.Position()
                    };
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.mapConfig = self.functionsUtilService.buildMapConfig(null, 'drag-maker-map', null, null);
                    this.validate = {
                        countryLocation: { valid: true, message: '' },
                        cityLocation: { valid: true, message: '' },
                        stateLocation: { valid: true, message: '' },
                        addressLocation: { valid: true, message: '' },
                        zipCodeLocation: { valid: true, message: '' },
                        positionLocation: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherLocationSectionController.prototype.activate = function () {
                    console.log('TeacherLocationSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                TeacherLocationSectionController.prototype.goToNext = function () {
                    var CURRENT_STEP = 2;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data', CURRENT_STEP);
                        this.$state.go(this.STEP3_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherLocationSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP1_STATE, { reload: true });
                };
                TeacherLocationSectionController.prototype._fillForm = function (data) {
                    this.form.addressLocation = data.Location.Address;
                    this.form.cityLocation = data.Location.City;
                    this.form.stateLocation = data.Location.State;
                    this.form.zipCodeLocation = data.Location.ZipCode;
                    this.countryObject.code = data.Location.Country;
                    this.form.positionLocation = new app.models.user.Position(data.Location.Position);
                    this.mapConfig = this.functionsUtilService.buildMapConfig([
                        {
                            id: this.form.positionLocation.Id,
                            location: {
                                position: {
                                    lat: parseFloat(this.form.positionLocation.Lat),
                                    lng: parseFloat(this.form.positionLocation.Lng)
                                }
                            }
                        }
                    ], 'drag-maker-map', { lat: parseFloat(this.form.positionLocation.Lat), lng: parseFloat(this.form.positionLocation.Lng) }, null);
                    this.$scope.$broadcast('BuildMarkers', this.mapConfig);
                };
                TeacherLocationSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var NUMBER_ENUM = 4;
                    var formValid = true;
                    var country_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.countryLocation = this.functionsUtilService.validator(this.countryObject.code, country_rules);
                    if (!this.validate.countryLocation.valid) {
                        formValid = this.validate.countryLocation.valid;
                    }
                    var city_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.cityLocation = this.functionsUtilService.validator(this.form.cityLocation, city_rules);
                    if (!this.validate.cityLocation.valid) {
                        formValid = this.validate.cityLocation.valid;
                    }
                    var state_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.stateLocation = this.functionsUtilService.validator(this.form.stateLocation, state_rules);
                    if (!this.validate.stateLocation.valid) {
                        formValid = this.validate.stateLocation.valid;
                    }
                    var address_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.addressLocation = this.functionsUtilService.validator(this.form.addressLocation, address_rules);
                    if (!this.validate.addressLocation.valid) {
                        formValid = this.validate.addressLocation.valid;
                    }
                    var position_rules = [NULL_ENUM, EMPTY_ENUM];
                    var latValidate = this.functionsUtilService.validator(this.form.positionLocation.Lat, position_rules);
                    var lngValidate = this.functionsUtilService.validator(this.form.positionLocation.Lng, position_rules);
                    if (!latValidate.valid || !lngValidate.valid) {
                        if (!latValidate.valid) {
                            this.validate.positionLocation = latValidate;
                            formValid = this.validate.positionLocation.valid;
                        }
                        else if (!lngValidate.valid) {
                            this.validate.positionLocation = lngValidate;
                            formValid = this.validate.positionLocation.valid;
                        }
                    }
                    return formValid;
                };
                TeacherLocationSectionController.prototype.changeHelpText = function (type) {
                    var COUNTRY_TITLE = this.$filter('translate')('%create.teacher.location.help_text.cntry.title.text');
                    var COUNTRY_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.cntry.description.text');
                    var CITY_TITLE = this.$filter('translate')('%create.teacher.location.help_text.city.title.text');
                    var CITY_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.city.description.text');
                    var STATE_TITLE = this.$filter('translate')('%create.teacher.location.help_text.state.title.text');
                    var STATE_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.state.description.text');
                    var ADDRESS_TITLE = this.$filter('translate')('%create.teacher.location.help_text.address.title.text');
                    var ADDRESS_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.address.description.text');
                    var ZIP_CODE_TITLE = this.$filter('translate')('%create.teacher.location.help_text.zip_code.title.text');
                    var ZIP_CODE_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.zip_code.description.text');
                    var POSITION_TITLE = this.$filter('translate')('%create.teacher.location.help_text.position.title.text');
                    var POSITION_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.position.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'country':
                            this.helpText.title = COUNTRY_TITLE;
                            this.helpText.description = COUNTRY_DESCRIPTION;
                            break;
                        case 'city':
                            this.helpText.title = CITY_TITLE;
                            this.helpText.description = CITY_DESCRIPTION;
                            break;
                        case 'state':
                            this.helpText.title = STATE_TITLE;
                            this.helpText.description = STATE_DESCRIPTION;
                            break;
                        case 'address':
                            this.helpText.title = ADDRESS_TITLE;
                            this.helpText.description = ADDRESS_DESCRIPTION;
                            break;
                        case 'zipCode':
                            this.helpText.title = ZIP_CODE_TITLE;
                            this.helpText.description = ZIP_CODE_DESCRIPTION;
                            break;
                        case 'position':
                            this.helpText.title = POSITION_TITLE;
                            this.helpText.description = POSITION_DESCRIPTION;
                            break;
                    }
                };
                TeacherLocationSectionController.prototype.changeMapPosition = function () {
                    var self = this;
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    var location = {
                        country: this.form.countryLocation,
                        city: this.form.cityLocation,
                        address: this.form.addressLocation
                    };
                    this.$timeout(function () {
                        self.$scope.$broadcast('CodeAddress', location);
                    });
                };
                TeacherLocationSectionController.prototype._setDataModelFromForm = function () {
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    this.$rootScope.teacherData.Location.Country = this.form.countryLocation;
                    this.$rootScope.teacherData.Location.Address = this.form.addressLocation;
                    this.$rootScope.teacherData.Location.City = this.form.cityLocation;
                    this.$rootScope.teacherData.Location.State = this.form.stateLocation;
                    this.$rootScope.teacherData.Location.ZipCode = this.form.zipCodeLocation;
                    this.$rootScope.teacherData.Location.Position = this.form.positionLocation;
                    this.changeMapPosition();
                };
                TeacherLocationSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                    this.$scope.$on('Position', function (event, args) {
                        self.form.positionLocation.Lng = args.lng;
                        self.form.positionLocation.Lat = args.lat;
                    });
                };
                return TeacherLocationSectionController;
            }());
            TeacherLocationSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherLocationSectionController';
            TeacherLocationSectionController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$filter',
                '$scope',
                '$rootScope',
                '$timeout'
            ];
            createTeacherPage.TeacherLocationSectionController = TeacherLocationSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherLocationSectionController.controllerId, TeacherLocationSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherLocationSection.controller.js.map
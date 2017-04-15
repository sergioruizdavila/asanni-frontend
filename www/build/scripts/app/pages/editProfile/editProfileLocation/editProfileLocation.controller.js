var app;
(function (app) {
    var pages;
    (function (pages) {
        var editProfileLocation;
        (function (editProfileLocation) {
            var EditProfileLocationController = (function () {
                function EditProfileLocationController(dataConfig, userService, getDataFromJson, functionsUtil, $state, $filter, $timeout, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.userService = userService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                EditProfileLocationController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
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
                    this.marker = 'round';
                    this.mapConfig = this.functionsUtil.buildMapConfig(null, 'drag-maker-map', null, null);
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
                EditProfileLocationController.prototype.activate = function () {
                    DEBUG && console.log('EditProfileLocation controller actived');
                    this._subscribeToEvents();
                    this._fillForm(this.$rootScope.profileData);
                };
                EditProfileLocationController.prototype.goToEditMedia = function () {
                    this.$state.go('page.editProfile.media');
                };
                EditProfileLocationController.prototype.goToEditProfile = function () {
                    this.$state.go('page.editProfile.basicInfo');
                };
                EditProfileLocationController.prototype._fillForm = function (data) {
                    this.form.addressLocation = data.Location.Address;
                    this.form.cityLocation = data.Location.City;
                    this.form.stateLocation = data.Location.State;
                    this.form.zipCodeLocation = data.Location.ZipCode;
                    this.countryObject.code = data.Location.Country;
                    this.form.positionLocation = new app.models.user.Position(data.Location.Position);
                    this.mapConfig = this.functionsUtil.buildMapConfig([
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
                    this.$scope.$broadcast('BuildMarkers', { mapConfig: this.mapConfig, typeOfMarker: 'round' });
                };
                EditProfileLocationController.prototype._validateLocationForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var NUMBER_ENUM = 4;
                    var formValid = true;
                    var country_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.countryLocation = this.functionsUtil.validator(this.countryObject.code, country_rules);
                    if (!this.validate.countryLocation.valid) {
                        formValid = this.validate.countryLocation.valid;
                    }
                    var city_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.cityLocation = this.functionsUtil.validator(this.form.cityLocation, city_rules);
                    if (!this.validate.cityLocation.valid) {
                        formValid = this.validate.cityLocation.valid;
                    }
                    var state_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.stateLocation = this.functionsUtil.validator(this.form.stateLocation, state_rules);
                    if (!this.validate.stateLocation.valid) {
                        formValid = this.validate.stateLocation.valid;
                    }
                    var address_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.addressLocation = this.functionsUtil.validator(this.form.addressLocation, address_rules);
                    if (!this.validate.addressLocation.valid) {
                        formValid = this.validate.addressLocation.valid;
                    }
                    var position_rules = [NULL_ENUM, EMPTY_ENUM];
                    var latValidate = this.functionsUtil.validator(this.form.positionLocation.Lat, position_rules);
                    var lngValidate = this.functionsUtil.validator(this.form.positionLocation.Lng, position_rules);
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
                EditProfileLocationController.prototype.changeMapPosition = function () {
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
                EditProfileLocationController.prototype._setLocationFromForm = function () {
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    this.$rootScope.profileData.Location.Country = this.form.countryLocation;
                    this.$rootScope.profileData.Location.Address = this.form.addressLocation;
                    this.$rootScope.profileData.Location.City = this.form.cityLocation;
                    this.$rootScope.profileData.Location.State = this.form.stateLocation;
                    this.$rootScope.profileData.Location.ZipCode = this.form.zipCodeLocation;
                    this.$rootScope.profileData.Location.Position = this.form.positionLocation;
                };
                EditProfileLocationController.prototype.saveLocationSection = function () {
                    var self = this;
                    var formValid = this._validateLocationForm();
                    if (formValid) {
                        this.saving = true;
                        this._setLocationFromForm();
                        this.$scope.$emit('Save Profile Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditProfileLocationController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Position', function (event, args) {
                        self.form.positionLocation.Lng = args.lng;
                        self.form.positionLocation.Lat = args.lat;
                    });
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditProfileLocationController.controllerId = 'mainApp.pages.editProfile.EditProfileLocationController';
                EditProfileLocationController.$inject = [
                    'dataConfig',
                    'mainApp.models.user.UserService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$timeout',
                    '$scope',
                    '$rootScope'
                ];
                return EditProfileLocationController;
            }());
            editProfileLocation.EditProfileLocationController = EditProfileLocationController;
            angular
                .module('mainApp.pages.editProfile')
                .controller(EditProfileLocationController.controllerId, EditProfileLocationController);
        })(editProfileLocation = pages.editProfileLocation || (pages.editProfileLocation = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/editProfileLocation/editProfileLocation.controller.js.map

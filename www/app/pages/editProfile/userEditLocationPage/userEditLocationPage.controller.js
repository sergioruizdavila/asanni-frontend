var app;
(function (app) {
    var pages;
    (function (pages) {
        var userEditLocationPage;
        (function (userEditLocationPage) {
            var UserEditLocationPageController = (function () {
                function UserEditLocationPageController(dataConfig, userService, getDataFromJson, functionsUtil, $state, $filter, $timeout, $uibModal, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.userService = userService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$uibModal = $uibModal;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                UserEditLocationPageController.prototype._init = function () {
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.form = {
                        countryLocation: '',
                        cityLocation: '',
                        stateLocation: '',
                        addressLocation: '',
                        zipCodeLocation: '',
                        positionLocation: new app.models.user.Position()
                    };
                    this.countryObject = { code: '', value: '' };
                    this.listCountries = this.getDataFromJson.getCountryi18n();
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
                UserEditLocationPageController.prototype.activate = function () {
                    DEBUG && console.log('UserEditLocationPage controller actived');
                    this.fillFormWithLocationData();
                    this._subscribeToEvents();
                };
                UserEditLocationPageController.prototype.goToEditMedia = function () {
                    this.$state.go('page.userEditMediaPage');
                };
                UserEditLocationPageController.prototype.goToEditProfile = function () {
                    this.$state.go('page.userEditProfilePage');
                };
                UserEditLocationPageController.prototype.fillFormWithLocationData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    if (userId) {
                        this.userService.getUserProfileById(userId)
                            .then(function (response) {
                            if (response.userId) {
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                self._fillForm(self.$rootScope.profileData);
                            }
                        });
                    }
                };
                UserEditLocationPageController.prototype._fillForm = function (data) {
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
                    this.$scope.$broadcast('BuildMarkers', this.mapConfig);
                };
                UserEditLocationPageController.prototype._validateLocationForm = function () {
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
                UserEditLocationPageController.prototype.changeMapPosition = function () {
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
                UserEditLocationPageController.prototype._setLocationFromForm = function () {
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    this.$rootScope.profileData.Location.Country = this.form.countryLocation;
                    this.$rootScope.profileData.Location.Address = this.form.addressLocation;
                    this.$rootScope.profileData.Location.City = this.form.cityLocation;
                    this.$rootScope.profileData.Location.State = this.form.stateLocation;
                    this.$rootScope.profileData.Location.ZipCode = this.form.zipCodeLocation;
                    this.$rootScope.profileData.Location.Position = this.form.positionLocation;
                };
                UserEditLocationPageController.prototype.saveLocationSection = function () {
                    var self = this;
                    var formValid = this._validateLocationForm();
                    if (formValid) {
                        this.saving = true;
                        this._setLocationFromForm();
                        this.save().then(function (saved) {
                            self.saving = false;
                            self.saved = saved;
                            self.error = !saved;
                            self.$timeout(function () {
                                self.saved = false;
                            }, 3000);
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                UserEditLocationPageController.prototype.save = function () {
                    var self = this;
                    return this.userService.updateUserProfile(this.$rootScope.profileData)
                        .then(function (response) {
                        var saved = false;
                        if (response.userId) {
                            self.$rootScope.profileData = new app.models.user.Profile(response);
                            saved = true;
                        }
                        return saved;
                    }, function (error) {
                        DEBUG && console.error(error);
                        return false;
                    });
                };
                UserEditLocationPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Position', function (event, args) {
                        self.form.positionLocation.Lng = args.lng;
                        self.form.positionLocation.Lat = args.lat;
                    });
                };
                return UserEditLocationPageController;
            }());
            UserEditLocationPageController.controllerId = 'mainApp.pages.userEditLocationPage.UserEditLocationPageController';
            UserEditLocationPageController.$inject = [
                'dataConfig',
                'mainApp.models.user.UserService',
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$filter',
                '$timeout',
                '$uibModal',
                '$scope',
                '$rootScope'
            ];
            userEditLocationPage.UserEditLocationPageController = UserEditLocationPageController;
            angular
                .module('mainApp.pages.userEditLocationPage')
                .controller(UserEditLocationPageController.controllerId, UserEditLocationPageController);
        })(userEditLocationPage = pages.userEditLocationPage || (pages.userEditLocationPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=userEditLocationPage.controller.js.map
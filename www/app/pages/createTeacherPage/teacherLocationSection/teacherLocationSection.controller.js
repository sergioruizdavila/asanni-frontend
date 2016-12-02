var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherLocationSectionController = (function () {
                function TeacherLocationSectionController(getDataFromJson, functionsUtilService, $state, $scope, $timeout) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$scope = $scope;
                    this.$timeout = $timeout;
                    this._init();
                }
                TeacherLocationSectionController.prototype._init = function () {
                    var self = this;
                    this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.$scope.$parent.vm.titleSection = 'Step2: Where are you located?';
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(2, 9);
                    this.countryObject = { code: '', value: '' };
                    this.form = {
                        countryLocation: '',
                        cityLocation: '',
                        stateLocation: '',
                        addressLocation: '',
                        zipCodeLocation: ''
                    };
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.mapConfig = this.functionsUtilService.buildMapConfig([{ id: 1, location: { position: { lat: 6.175434, lng: -75.583329 } } }], 'drag-maker-map', { lat: 6.175434, lng: -75.583329 });
                    var location = {
                        country: 'Colombia',
                        city: 'Envigado',
                        address: 'Carrera 31 No 41Sur - 64'
                    };
                    this.$timeout(function () {
                        self.$scope.$broadcast('CodeAddress', location);
                    });
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                TeacherLocationSectionController.prototype.activate = function () {
                    console.log('TeacherLocationSectionController controller actived');
                    this._subscribeToEvents();
                };
                TeacherLocationSectionController.prototype.goToNext = function () {
                    var CURRENT_STEP = 2;
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    this.$scope.$parent.vm.teacherData.Location.Country = this.form.countryLocation;
                    this.$scope.$parent.vm.teacherData.Location.Address = this.form.addressLocation;
                    this.$scope.$parent.vm.teacherData.Location.City = this.form.cityLocation;
                    this.$scope.$parent.vm.teacherData.Location.State = this.form.stateLocation;
                    this.$scope.$parent.vm.teacherData.Location.ZipCode = this.form.zipCodeLocation;
                    this.$scope.$emit('Save Data', CURRENT_STEP);
                    this.$state.go(this.STEP2_STATE, { reload: true });
                };
                TeacherLocationSectionController.prototype.goToBack = function () {
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    this.$scope.$parent.vm.teacherData.Location.Country = this.form.countryLocation;
                    this.$scope.$parent.vm.teacherData.Location.Address = this.form.addressLocation;
                    this.$scope.$parent.vm.teacherData.Location.City = this.form.cityLocation;
                    this.$scope.$parent.vm.teacherData.Location.State = this.form.stateLocation;
                    this.$scope.$parent.vm.teacherData.Location.ZipCode = this.form.zipCodeLocation;
                    this.$scope.$emit('Save Data');
                    this.$state.go(this.STEP1_STATE, { reload: true });
                };
                TeacherLocationSectionController.prototype.changeMapPosition = function () {
                    var location = {
                        country: this.form.countryLocation,
                        city: this.form.cityLocation,
                        address: this.form.addressLocation
                    };
                    this.$scope.$broadcast('CodeAddress', location);
                };
                TeacherLocationSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.addressLocation = args.Location.Address;
                        self.form.cityLocation = args.Location.City;
                        self.form.stateLocation = args.Location.State;
                        self.form.zipCodeLocation = args.Location.ZipCode;
                        self.countryObject.code = args.Location.Country;
                    });
                    this.$scope.$on('Position', function (event, args) {
                        self.$scope.$parent.vm.teacherData.Location.Position = args;
                    });
                };
                return TeacherLocationSectionController;
            }());
            TeacherLocationSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherLocationSectionController';
            TeacherLocationSectionController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$scope',
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
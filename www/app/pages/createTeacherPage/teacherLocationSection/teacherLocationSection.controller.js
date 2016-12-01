var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherLocationSectionController = (function () {
                function TeacherLocationSectionController(getDataFromJson, functionsUtilService, $state, $scope) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$scope = $scope;
                    this._init();
                }
                TeacherLocationSectionController.prototype._init = function () {
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
                    this.$scope.$parent.vm.teacherData.CountryLocation = this.form.countryLocation;
                    this.$scope.$parent.vm.teacherData.AddressLocation = this.form.addressLocation;
                    this.$scope.$parent.vm.teacherData.CityLocation = this.form.cityLocation;
                    this.$scope.$parent.vm.teacherData.StateLocation = this.form.stateLocation;
                    this.$scope.$parent.vm.teacherData.ZipCodeLocation = this.form.zipCodeLocation;
                    this.$scope.$emit('Save Data', CURRENT_STEP);
                    this.$state.go(this.STEP2_STATE, { reload: true });
                };
                TeacherLocationSectionController.prototype.goToBack = function () {
                    this.$scope.$emit('Save Data');
                    this.$state.go(this.STEP1_STATE, { reload: true });
                };
                TeacherLocationSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.addressLocation = args.AddressLocation;
                        self.form.cityLocation = args.CityLocation;
                        self.form.stateLocation = args.StateLocation;
                        self.form.zipCodeLocation = args.ZipCodeLocation;
                        self.countryObject.code = args.CountryLocation;
                    });
                };
                return TeacherLocationSectionController;
            }());
            TeacherLocationSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherLocationSectionController';
            TeacherLocationSectionController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$scope'
            ];
            createTeacherPage.TeacherLocationSectionController = TeacherLocationSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherLocationSectionController.controllerId, TeacherLocationSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherLocationSection.controller.js.map
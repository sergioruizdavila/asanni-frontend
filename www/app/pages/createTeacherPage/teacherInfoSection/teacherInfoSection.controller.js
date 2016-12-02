var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherInfoSectionController = (function () {
                function TeacherInfoSectionController(getDataFromJson, functionsUtilService, $state, $scope) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$scope = $scope;
                    this._init();
                }
                TeacherInfoSectionController.prototype._init = function () {
                    this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.STEP3_STATE = 'page.createTeacherPage.map';
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(1, 9);
                    this.dateObject = { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } };
                    this.form = {
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        sex: '',
                        birthDate: '',
                        born: '',
                        about: ''
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 1998);
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                TeacherInfoSectionController.prototype.activate = function () {
                    console.log('TeacherInfoSectionController controller actived');
                    this._subscribeToEvents();
                };
                TeacherInfoSectionController.prototype.goToNext = function () {
                    this._setDataModelFromForm();
                    this.$scope.$emit('Save Data');
                    this.$state.go(this.STEP2_STATE, { reload: true });
                };
                TeacherInfoSectionController.prototype._setDataModelFromForm = function () {
                    var dateFormatted = this.functionsUtilService.joinDate(this.dateObject.day.value, this.dateObject.month.code, this.dateObject.year.value);
                    this.$scope.$parent.vm.teacherData.FirstName = this.form.firstName;
                    this.$scope.$parent.vm.teacherData.LastName = this.form.lastName;
                    this.$scope.$parent.vm.teacherData.Email = this.form.email;
                    this.$scope.$parent.vm.teacherData.PhoneNumber = this.form.phoneNumber;
                    this.$scope.$parent.vm.teacherData.Sex = this.form.sex;
                    this.$scope.$parent.vm.teacherData.BirthDate = dateFormatted;
                    this.$scope.$parent.vm.teacherData.Born = this.form.born;
                    this.$scope.$parent.vm.teacherData.About = this.form.about;
                };
                TeacherInfoSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.form.firstName = args.FirstName;
                        self.form.lastName = args.LastName;
                        self.form.email = args.Email;
                        self.form.phoneNumber = args.PhoneNumber;
                        self.form.sex = args.Sex;
                        var date = self.functionsUtilService.splitDate(args.BirthDate);
                        self.dateObject.day.value = parseInt(date.day);
                        self.dateObject.month.code = date.month;
                        self.dateObject.year.value = parseInt(date.year);
                        self.form.born = args.Born;
                        self.form.about = args.About;
                    });
                };
                return TeacherInfoSectionController;
            }());
            TeacherInfoSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherInfoSectionController';
            TeacherInfoSectionController.$inject = [
                'mainApp.core.util.GetDataStaticJsonService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$scope'
            ];
            createTeacherPage.TeacherInfoSectionController = TeacherInfoSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherInfoSectionController.controllerId, TeacherInfoSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherInfoSection.controller.js.map
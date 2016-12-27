var app;
(function (app) {
    var pages;
    (function (pages) {
        var searchPage;
        (function (searchPage) {
            var SearchPageController = (function () {
                function SearchPageController(StudentService, TeacherService, SchoolService, FunctionsUtilService, $state, $filter, $scope) {
                    this.StudentService = StudentService;
                    this.TeacherService = TeacherService;
                    this.SchoolService = SchoolService;
                    this.FunctionsUtilService = FunctionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this._init();
                }
                SearchPageController.prototype._init = function () {
                    this.data = [{ firstName: 'Sergio', lastName: 'Ruiz' }, { firstName: 'Sergio', lastName: 'Ruiz' }, { firstName: 'Sergio', lastName: 'Ruiz' }];
                    this.type = 'teacher';
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                SearchPageController.prototype.activate = function () {
                    var self = this;
                    console.log('searchPage controller actived');
                    this._subscribeToEvents();
                };
                SearchPageController.prototype._getResultTemplate = function (type) {
                    var STUDENT_TYPE = 'student';
                    var TEACHER_TYPE = 'teacher';
                    var SCHOOL_TYPE = 'school';
                    switch (type) {
                        case STUDENT_TYPE:
                            return 'app/pages/searchPage/studentResult/studentResult.html';
                        case TEACHER_TYPE:
                            return 'app/pages/searchPage/teacherResult/teacherResult.html';
                        case SCHOOL_TYPE:
                            return 'app/pages/searchPage/schoolResult/schoolResult.html';
                    }
                };
                SearchPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Students', function (event, args) {
                        self.StudentService.getAllStudents().then(function (response) {
                            self.type = 'student';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response, 'search-map', { lat: 6.175434, lng: -75.583329 });
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                        });
                    });
                    this.$scope.$on('Teachers', function (event, args) {
                        self.TeacherService.getAllTeachers().then(function (response) {
                            self.type = 'teacher';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response, 'search-map', { lat: 6.175434, lng: -75.583329 });
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                        });
                    });
                    this.$scope.$on('Schools', function (event, args) {
                        self.SchoolService.getAllSchools().then(function (response) {
                            self.type = 'school';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response, 'search-map', { lat: 6.175434, lng: -75.583329 });
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                        });
                    });
                };
                return SearchPageController;
            }());
            SearchPageController.controllerId = 'mainApp.pages.searchPage.SearchPageController';
            SearchPageController.$inject = [
                'mainApp.models.student.StudentService',
                'mainApp.models.teacher.TeacherService',
                'mainApp.models.school.SchoolService',
                'mainApp.core.util.FunctionsUtilService',
                '$state',
                '$filter',
                '$scope'
            ];
            searchPage.SearchPageController = SearchPageController;
            angular
                .module('mainApp.pages.searchPage')
                .controller(SearchPageController.controllerId, SearchPageController);
        })(searchPage = pages.searchPage || (pages.searchPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=searchPage.controller.js.map
var app;
(function (app) {
    var pages;
    (function (pages) {
        var searchPage;
        (function (searchPage) {
            var SearchPageController = (function () {
                function SearchPageController(StudentService, TeacherService, SchoolService, FunctionsUtilService, $state, $stateParams, $filter, $scope, $rootScope, $timeout) {
                    this.StudentService = StudentService;
                    this.TeacherService = TeacherService;
                    this.SchoolService = SchoolService;
                    this.FunctionsUtilService = FunctionsUtilService;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$timeout = $timeout;
                    this._init();
                }
                SearchPageController.prototype._init = function () {
                    this.VALIDATED = 'VA';
                    this.data = [];
                    this.type = 'teacher';
                    this.loading = true;
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                SearchPageController.prototype.activate = function () {
                    var self = this;
                    console.log('searchPage controller actived');
                    mixpanel.track("Enter: Search Page");
                    this._subscribeToEvents();
                    this.TeacherService.getAllTeachersByStatus(this.VALIDATED).then(function (response) {
                        self.type = 'teacher';
                        self.mapConfig = self.FunctionsUtilService.buildMapConfig(response.results, 'search-map', null, 6);
                        self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                        self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                        self.$timeout(function () {
                            self.loading = false;
                        });
                        if (self.$stateParams.country) {
                            self.$timeout(function () {
                                self._searchByCountry(self.$stateParams.country);
                            });
                        }
                    });
                };
                SearchPageController.prototype._getResultLoading = function (type) {
                    var STUDENT_TYPE = 'student';
                    var TEACHER_TYPE = 'teacher';
                    var SCHOOL_TYPE = 'school';
                    switch (type) {
                        case STUDENT_TYPE:
                            return 'app/pages/searchPage/studentResult/studentResult.html';
                        case TEACHER_TYPE:
                            return 'app/pages/searchPage/teacherLoading/teacherLoading.html';
                        case SCHOOL_TYPE:
                            return 'app/pages/searchPage/schoolResult/schoolResult.html';
                    }
                };
                SearchPageController.prototype._searchByCountry = function (country) {
                    var self = this;
                    if (country == 'Colombia') {
                        var location_1 = {
                            country: country,
                            city: 'Medellin',
                            address: 'Transversal 31Sur #32B-64'
                        };
                        this.$timeout(function () {
                            self.$rootScope.$broadcast('PositionCountry', location_1);
                        });
                    }
                };
                SearchPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Students', function (event, args) {
                        self.StudentService.getAllStudents().then(function (response) {
                            self.type = 'student';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response, 'search-map', { lat: 6.175434, lng: -75.583329 }, 6);
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                        });
                    });
                    this.$scope.$on('Teachers', function (event, args) {
                        self.TeacherService.getAllTeachersByStatus(self.VALIDATED).then(function (response) {
                            self.type = 'teacher';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response.results, 'search-map', null, 6);
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                        });
                    });
                    this.$scope.$on('Schools', function (event, args) {
                        self.SchoolService.getAllSchools().then(function (response) {
                            self.type = 'school';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response, 'search-map', { lat: 6.175434, lng: -75.583329 }, 6);
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                        });
                    });
                    this.$scope.$on('SelectContainer', function (event, args) {
                        var containerId = '#container-' + args;
                        var containerClasses = document.querySelector(containerId).classList;
                        containerClasses.add('search-result__teacher__block--selected');
                        document.querySelector(containerId).scrollIntoView({ behavior: 'smooth' });
                    });
                    this.$scope.$on('SearchCountry', function (event, args) {
                        self._searchByCountry(args);
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
                '$stateParams',
                '$filter',
                '$scope',
                '$rootScope',
                '$timeout'
            ];
            searchPage.SearchPageController = SearchPageController;
            angular
                .module('mainApp.pages.searchPage')
                .controller(SearchPageController.controllerId, SearchPageController);
        })(searchPage = pages.searchPage || (pages.searchPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=searchPage.controller.js.map
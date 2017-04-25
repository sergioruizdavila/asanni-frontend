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
                    this.type = 'school';
                    this.marker = null;
                    this.rightLoading = true;
                    this._teacherChecked = this.$stateParams.target === 'teacher';
                    this._schoolChecked = this.$stateParams.target === 'school';
                    if (!this._teacherChecked && !this._schoolChecked) {
                        this._teacherChecked = this.type === 'teacher';
                        this._schoolChecked = this.type === 'school';
                    }
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                SearchPageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Search Page';
                    var self = this;
                    DEBUG && console.log('searchPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this._subscribeToEvents();
                    this._firstFetchData(this.$stateParams.target);
                };
                SearchPageController.prototype._firstFetchData = function (target) {
                    var TARGET_TEACHER = 'teacher';
                    var TARGET_SCHOOL = 'school';
                    var self = this;
                    target = target || TARGET_SCHOOL;
                    if (target === TARGET_TEACHER) {
                        this.TeacherService.getAllTeachersByStatus(this.VALIDATED).then(function (response) {
                            self.type = 'teacher';
                            self.marker = 'round';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response.results, 'search-map', null, 6);
                            self.$scope.$broadcast('BuildMarkers', { mapConfig: self.mapConfig, typeOfMarker: self.marker });
                            self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                            if (self.$stateParams.country) {
                                self.$timeout(function () {
                                    self._searchByCountry(self.$stateParams.country);
                                });
                            }
                            self.$timeout(function () {
                                self.rightLoading = false;
                            });
                        });
                    }
                    else if (target === TARGET_SCHOOL) {
                        this.SchoolService.getAllSchoolsByStatus(this.VALIDATED).then(function (response) {
                            self.type = 'school';
                            self.marker = 'long';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response.results, 'search-map', null, 6);
                            self.$scope.$broadcast('BuildMarkers', { mapConfig: self.mapConfig, typeOfMarker: self.marker });
                            self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                            if (self.$stateParams.country) {
                                self.$timeout(function () {
                                    self._searchByCountry(self.$stateParams.country);
                                });
                            }
                            self.$timeout(function () {
                                self.rightLoading = false;
                            });
                        });
                    }
                };
                SearchPageController.prototype.goToSearch = function (target) {
                    var SEARCH_PAGE_STATE = 'page.searchPage';
                    var CLICK_MIXPANEL = 'SearchPage: Click on ' + target + 'btn';
                    mixpanel.track(CLICK_MIXPANEL);
                    this.$state.go(SEARCH_PAGE_STATE, { target: target }, { reload: true });
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
                            self.$scope.$broadcast('BuildMarkers', { mapConfig: self.mapConfig, typeOfMarker: 'round' });
                            self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                        });
                    });
                    this.$scope.$on('Teachers', function (event, args) {
                        self.leftLoading = true;
                        self.TeacherService.getAllTeachersByStatus(self.VALIDATED).then(function (response) {
                            self.type = 'teacher';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response.results, 'search-map', null, 6);
                            self.leftLoading = false;
                            self.$scope.$broadcast('BuildMarkers', { mapConfig: self.mapConfig, typeOfMarker: 'round' });
                            self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                        });
                    });
                    this.$scope.$on('Schools', function (event, args) {
                        self.leftLoading = true;
                        self.SchoolService.getAllSchoolsByStatus(self.VALIDATED).then(function (response) {
                            self.type = 'school';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response.results, 'search-map', { lat: 6.175434, lng: -75.583329 }, 6);
                            self.leftLoading = false;
                            self.$scope.$broadcast('BuildMarkers', { mapConfig: self.mapConfig, typeOfMarker: 'long' });
                            self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                        });
                    });
                    this.$scope.$on('SelectContainer', function (event, args) {
                        var hoverClass = 'ma-box--border-hover';
                        var containerId = '#container-' + args;
                        var containers = document.getElementsByClassName(hoverClass);
                        for (var i = 0; i < containers.length; i++) {
                            containers[i].classList.remove(hoverClass);
                        }
                        var containerClasses = document.querySelector(containerId).classList;
                        containerClasses.add(hoverClass);
                        document.querySelector(containerId).scrollIntoView({ behavior: 'smooth' });
                    });
                    this.$scope.$on('SearchCountry', function (event, args) {
                        self._searchByCountry(args);
                    });
                };
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
                    '$timeout'];
                return SearchPageController;
            }());
            searchPage.SearchPageController = SearchPageController;
            angular
                .module('mainApp.pages.searchPage')
                .controller(SearchPageController.controllerId, SearchPageController);
        })(searchPage = pages.searchPage || (pages.searchPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/searchPage/searchPage.controller.js.map

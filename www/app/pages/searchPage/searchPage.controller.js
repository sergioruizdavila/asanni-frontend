var app;
(function (app) {
    var pages;
    (function (pages) {
        var searchPage;
        (function (searchPage) {
            var SearchPageController = (function () {
                function SearchPageController(StudentService, TeacherService, FunctionsUtilService, $state, $filter, $scope) {
                    this.StudentService = StudentService;
                    this.TeacherService = TeacherService;
                    this.FunctionsUtilService = FunctionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this._init();
                }
                SearchPageController.prototype._init = function () {
                    this.data = [];
                    this.type = null;
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                SearchPageController.prototype.activate = function () {
                    var self = this;
                    console.log('searchPage controller actived');
                    this.StudentService.getAllStudents().then(function (response) {
                        self.type = 'student';
                        self.mapConfig = self.FunctionsUtilService.buildMarkersOnMap(response, 'search-map', { lat: 6.175434, lng: -75.583329 });
                        self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                    });
                };
                SearchPageController.prototype._buildMarkers = function (userData) {
                    var mapConfig = {
                        type: 'search-map',
                        data: {
                            position: {
                                lat: 6.175434,
                                lng: -75.583329
                            },
                            markers: []
                        }
                    };
                    for (var i = 0; i < userData.length; i++) {
                        mapConfig.data.markers.push({
                            id: userData[i].id,
                            position: userData[i].location.position
                        });
                    }
                    return mapConfig;
                };
                SearchPageController.prototype.getResultTemplate = function (type) {
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
                return SearchPageController;
            }());
            SearchPageController.controllerId = 'mainApp.pages.searchPage.SearchPageController';
            SearchPageController.$inject = [
                'mainApp.models.student.StudentService',
                'mainApp.models.teacher.TeacherService',
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
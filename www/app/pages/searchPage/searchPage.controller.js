var app;
(function (app) {
    var pages;
    (function (pages) {
        var searchPage;
        (function (searchPage) {
            var SearchPageController = (function () {
                function SearchPageController(UserService, $state, $filter, $scope) {
                    this.UserService = UserService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this._init();
                }
                SearchPageController.prototype._init = function () {
                    this.data = [];
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                SearchPageController.prototype.activate = function () {
                    var self = this;
                    console.log('searchPage controller actived');
                    this.UserService.getAllUsers().then(function (response) {
                        self.mapConfig = self._buildMarkers(response);
                        self.data = self._chunk(response, 2);
                    });
                };
                SearchPageController.prototype._chunk = function (arr, size) {
                    var newArr = [];
                    for (var i = 0; i < arr.length; i += size) {
                        newArr.push(arr.slice(i, i + size));
                    }
                    return newArr;
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
                return SearchPageController;
            }());
            SearchPageController.controllerId = 'mainApp.pages.searchPage.SearchPageController';
            SearchPageController.$inject = [
                'mainApp.models.user.UserService',
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
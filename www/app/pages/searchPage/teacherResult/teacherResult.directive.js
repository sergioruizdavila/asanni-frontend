var app;
(function (app) {
    var pages;
    (function (pages) {
        var searchPage;
        (function (searchPage) {
            'use strict';
            var MaTeacherResult = (function () {
                function MaTeacherResult() {
                    this.bindToController = true;
                    this.controller = app.pages.searchPage.SearchPageController.controllerId;
                    this.controllerAs = 'vm';
                    this.restrict = 'E';
                    this.templateUrl = 'app/pages/searchPage/teacherResult/teacherResult.html';
                    console.log('maTeacherResult directive constructor');
                }
                MaTeacherResult.prototype.link = function ($scope, elm, attr) {
                    console.log('maTeacherResult link function');
                };
                MaTeacherResult.instance = function () {
                    return new MaTeacherResult();
                };
                return MaTeacherResult;
            }());
            MaTeacherResult.directiveId = 'maTeacherResult';
            angular
                .module('mainApp.pages.searchPage')
                .directive(MaTeacherResult.directiveId, MaTeacherResult.instance);
        })(searchPage = pages.searchPage || (pages.searchPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherResult.directive.js.map
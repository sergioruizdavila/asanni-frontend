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
                    this.controller = TeacherResultController.controllerId;
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
            var TeacherResultController = (function () {
                function TeacherResultController(functionsUtil, $uibModal, dataConfig, $filter, $state, $rootScope) {
                    this.functionsUtil = functionsUtil;
                    this.$uibModal = $uibModal;
                    this.dataConfig = dataConfig;
                    this.$filter = $filter;
                    this.$state = $state;
                    this.$rootScope = $rootScope;
                    this.init();
                }
                TeacherResultController.prototype.init = function () {
                    this.form = {};
                    this._hoverDetail = [];
                    this.activate();
                };
                TeacherResultController.prototype.activate = function () {
                    console.log('teacherResult controller actived');
                };
                TeacherResultController.prototype.goToDetails = function (containerId) {
                    var url = this.$state.href('page.teacherProfilePage', { id: containerId });
                    window.open(url, '_blank');
                };
                TeacherResultController.prototype._assignNativeClass = function (languages) {
                    var native = languages.native;
                    var teach = languages.teach;
                    var isNative = false;
                    for (var i = 0; i < native.length; i++) {
                        for (var j = 0; j < teach.length; j++) {
                            if (teach[j] === native[i]) {
                                isNative = true;
                            }
                        }
                    }
                    return isNative;
                };
                TeacherResultController.prototype._ratingAverage = function (ratingsArr) {
                    return this.functionsUtil.teacherRatingAverage(ratingsArr);
                };
                TeacherResultController.prototype._hoverEvent = function (id, status) {
                    var args = { id: id, status: status };
                    this._hoverDetail[id] = status;
                    this.$rootScope.$broadcast('ChangeMarker', args);
                };
                return TeacherResultController;
            }());
            TeacherResultController.controllerId = 'mainApp.pages.searchPage.TeacherResultController';
            TeacherResultController.$inject = [
                'mainApp.core.util.FunctionsUtilService',
                '$uibModal',
                'dataConfig',
                '$filter',
                '$state',
                '$rootScope'
            ];
            searchPage.TeacherResultController = TeacherResultController;
            angular.module('mainApp.pages.searchPage')
                .controller(TeacherResultController.controllerId, TeacherResultController);
        })(searchPage = pages.searchPage || (pages.searchPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=teacherResult.directive.js.map
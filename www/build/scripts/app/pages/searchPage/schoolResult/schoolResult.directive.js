var app;
(function (app) {
    var pages;
    (function (pages) {
        var searchPage;
        (function (searchPage) {
            'use strict';
            var MaSchoolResult = (function () {
                function MaSchoolResult() {
                    this.bindToController = true;
                    this.controller = SchoolResultController.controllerId;
                    this.controllerAs = 'vm';
                    this.restrict = 'E';
                    this.templateUrl = 'app/pages/searchPage/schoolResult/schoolResult.html';
                    DEBUG && console.log('maSchoolResult directive constructor');
                }
                MaSchoolResult.prototype.link = function ($scope, elm, attr) {
                    DEBUG && console.log('maSchoolResult link function');
                };
                MaSchoolResult.instance = function () {
                    return new MaSchoolResult();
                };
                MaSchoolResult.directiveId = 'maSchoolResult';
                return MaSchoolResult;
            }());
            angular
                .module('mainApp.pages.searchPage')
                .directive(MaSchoolResult.directiveId, MaSchoolResult.instance);
            var SchoolResultController = (function () {
                function SchoolResultController(functionsUtil, SchoolService, AuthService, $uibModal, dataConfig, $filter, $state, $rootScope) {
                    this.functionsUtil = functionsUtil;
                    this.SchoolService = SchoolService;
                    this.AuthService = AuthService;
                    this.$uibModal = $uibModal;
                    this.dataConfig = dataConfig;
                    this.$filter = $filter;
                    this.$state = $state;
                    this.$rootScope = $rootScope;
                    this.init();
                }
                SchoolResultController.prototype.init = function () {
                    this._hoverDetail = [];
                    this.activate();
                };
                SchoolResultController.prototype.activate = function () {
                    DEBUG && console.log('schoolResult controller actived');
                };
                SchoolResultController.prototype._openSignUpModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        templateUrl: this.dataConfig.modalSignUpTmpl,
                        controller: 'mainApp.components.modal.ModalSignUpController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: false
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                };
                SchoolResultController.prototype._chooseMinorPrice = function (prices) {
                    var priceInstance = new app.models.school.Price(prices);
                    return this.SchoolService.getMinorSchoolPrice(priceInstance);
                };
                SchoolResultController.prototype._ratingFeatureAverage = function (school) {
                    var schoolInstance = new app.models.school.School(school);
                    return this.SchoolService.schoolFeatureRatingAverage(schoolInstance);
                };
                SchoolResultController.prototype.goToDetails = function (containerId) {
                    var GOTO_MIXPANEL = 'Go to School Details: ' + containerId;
                    mixpanel.track(GOTO_MIXPANEL);
                    this.isAuthenticated = this.AuthService.isAuthenticated();
                    if (this.isAuthenticated) {
                        var url = this.$state.href('page.schoolProfilePage', { id: containerId });
                        window.open(url, '_blank');
                        return;
                    }
                    else {
                        this._openSignUpModal();
                    }
                };
                SchoolResultController.prototype._hoverEvent = function (id, status) {
                    var hoverClass = 'ma-box--border-hover';
                    var args = { id: id, status: status, typeOfMarker: 'long' };
                    this._hoverDetail[id] = status;
                    var containers = document.getElementsByClassName(hoverClass);
                    for (var i = 0; i < containers.length; i++) {
                        var containerClasses = containers[i].classList;
                        containerClasses.remove(hoverClass);
                    }
                    this.$rootScope.$broadcast('ChangeMarker', args);
                };
                SchoolResultController.controllerId = 'mainApp.pages.searchPage.SchoolResultController';
                SchoolResultController.$inject = [
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.school.SchoolService',
                    'mainApp.auth.AuthService',
                    '$uibModal',
                    'dataConfig',
                    '$filter',
                    '$state',
                    '$rootScope'
                ];
                return SchoolResultController;
            }());
            searchPage.SchoolResultController = SchoolResultController;
            angular.module('mainApp.pages.searchPage')
                .controller(SchoolResultController.controllerId, SchoolResultController);
        })(searchPage = pages.searchPage || (pages.searchPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/searchPage/schoolResult/schoolResult.directive.js.map

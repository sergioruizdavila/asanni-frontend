var components;
(function (components) {
    var header;
    (function (header) {
        'use strict';
        var MaHeader = (function () {
            function MaHeader() {
                this.bindToController = true;
                this.controller = HeaderController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = true;
                this.templateUrl = 'components/header/header.html';
                console.log('maHeader directive constructor');
            }
            MaHeader.prototype.link = function ($scope, elm, attr) {
                console.log('maHeader link function');
            };
            MaHeader.instance = function () {
                return new MaHeader();
            };
            return MaHeader;
        }());
        MaHeader.directiveId = 'maHeader';
        angular
            .module('mainApp.components.header')
            .directive(MaHeader.directiveId, MaHeader.instance);
        var HeaderController = (function () {
            function HeaderController(functionsUtil, $uibModal, dataConfig, $filter, $scope, $rootScope, $state) {
                this.functionsUtil = functionsUtil;
                this.$uibModal = $uibModal;
                this.dataConfig = dataConfig;
                this.$filter = $filter;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.init();
            }
            HeaderController.prototype.init = function () {
                this.form = {
                    language: this.functionsUtil.getCurrentLanguage() || 'en',
                    whereTo: this.$filter('translate')('%header.search.placeholder.text')
                };
                this._slideout = false;
                this.activate();
            };
            HeaderController.prototype.activate = function () {
                console.log('header controller actived');
            };
            HeaderController.prototype.slideNavMenu = function () {
                this._slideout = !this._slideout;
            };
            HeaderController.prototype.changeLanguage = function () {
                this.functionsUtil.changeLanguage(this.form.language);
            };
            HeaderController.prototype.search = function (country) {
                var currentState = this.$state.current.name;
                this.form.whereTo = country;
                if (currentState !== 'page.searchPage') {
                    this.$state.go('page.searchPage', { country: country });
                }
                else {
                    this.$rootScope.$broadcast('SearchCountry', country);
                }
            };
            HeaderController.prototype._openSignUpModal = function () {
                var self = this;
                var options = {
                    animation: false,
                    backdrop: 'static',
                    keyboard: false,
                    templateUrl: this.dataConfig.modalSignUpTmpl,
                    controller: 'mainApp.components.modal.ModalSignUpController as vm'
                };
                var modalInstance = this.$uibModal.open(options);
                event.preventDefault();
            };
            return HeaderController;
        }());
        HeaderController.controllerId = 'mainApp.components.header.HeaderController';
        HeaderController.$inject = [
            'mainApp.core.util.FunctionsUtilService',
            '$uibModal',
            'dataConfig',
            '$filter',
            '$scope',
            '$rootScope',
            '$state'
        ];
        header.HeaderController = HeaderController;
        angular.module('mainApp.components.header')
            .controller(HeaderController.controllerId, HeaderController);
    })(header = components.header || (components.header = {}));
})(components || (components = {}));
//# sourceMappingURL=header.directive.js.map
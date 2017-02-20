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
            function HeaderController(functionsUtil, AuthService, $uibModal, dataConfig, $filter, $scope, $rootScope, $state, localStorage) {
                this.functionsUtil = functionsUtil;
                this.AuthService = AuthService;
                this.$uibModal = $uibModal;
                this.dataConfig = dataConfig;
                this.$filter = $filter;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.localStorage = localStorage;
                this.init();
            }
            HeaderController.prototype.init = function () {
                this.isAuthenticated = this.AuthService.isAuthenticated();
                this.form = {
                    whereTo: this.$filter('translate')('%header.search.placeholder.text')
                };
                this._slideout = false;
                this.activate();
            };
            HeaderController.prototype.activate = function () {
                console.log('header controller actived');
                this._subscribeToEvents();
            };
            HeaderController.prototype.slideNavMenu = function () {
                this._slideout = !this._slideout;
            };
            HeaderController.prototype.logout = function () {
                var self = this;
                this.AuthService.logout().then(function (response) {
                    window.location.reload();
                }, function (response) {
                    DEBUG && console.log('A problem occured while logging you out.');
                });
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
                mixpanel.track("Click on 'Sign Up' from header");
            };
            HeaderController.prototype._openLogInModal = function () {
                mixpanel.track("Click on 'Log In' from header");
                var self = this;
                var options = {
                    animation: false,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'sm',
                    templateUrl: this.dataConfig.modalLogInTmpl,
                    controller: 'mainApp.components.modal.ModalLogInController as vm',
                    resolve: {
                        dataSetModal: function () {
                            return {
                                hasNextStep: false
                            };
                        }
                    }
                };
                var modalInstance = this.$uibModal.open(options);
                modalInstance.result.then(function () {
                    self.$rootScope.$broadcast('Is Authenticated');
                }, function () {
                    DEBUG && console.info('Modal dismissed at: ' + new Date());
                });
            };
            HeaderController.prototype._subscribeToEvents = function () {
                var self = this;
                this.$scope.$on('Is Authenticated', function (event, args) {
                    self.isAuthenticated = self.AuthService.isAuthenticated();
                });
            };
            return HeaderController;
        }());
        HeaderController.controllerId = 'mainApp.components.header.HeaderController';
        HeaderController.$inject = [
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.auth.AuthService',
            '$uibModal',
            'dataConfig',
            '$filter',
            '$scope',
            '$rootScope',
            '$state',
            'mainApp.localStorageService'
        ];
        header.HeaderController = HeaderController;
        angular.module('mainApp.components.header')
            .controller(HeaderController.controllerId, HeaderController);
    })(header = components.header || (components.header = {}));
})(components || (components = {}));
//# sourceMappingURL=header.directive.js.map
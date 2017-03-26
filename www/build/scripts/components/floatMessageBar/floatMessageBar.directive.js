var components;
(function (components) {
    var floatMessageBar;
    (function (floatMessageBar) {
        'use strict';
        var MaFloatMessageBar = (function () {
            function MaFloatMessageBar() {
                this.bindToController = true;
                this.controller = FloatMessageBarController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = true;
                this.templateUrl = 'components/floatMessageBar/floatMessageBar.html';
                console.log('maFloatMessageBar directive constructor');
            }
            MaFloatMessageBar.prototype.link = function ($scope, elm, attr) {
                console.log('maFloatMessageBar link function');
            };
            MaFloatMessageBar.instance = function () {
                return new MaFloatMessageBar();
            };
            MaFloatMessageBar.directiveId = 'maFloatMessageBar';
            return MaFloatMessageBar;
        }());
        angular
            .module('mainApp.components.floatMessageBar')
            .directive(MaFloatMessageBar.directiveId, MaFloatMessageBar.instance);
        var FloatMessageBarController = (function () {
            function FloatMessageBarController(dataConfig, $filter, $scope, $rootScope, $state) {
                this.dataConfig = dataConfig;
                this.$filter = $filter;
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.init();
            }
            FloatMessageBarController.prototype.init = function () {
                this.activate();
            };
            FloatMessageBarController.prototype.activate = function () {
                console.log('floatMessageBar controller actived');
            };
            FloatMessageBarController.prototype._join = function () {
                var CREATE_TEACHER = 'page.createTeacherPage.start';
                var CLICK_MIXPANEL = 'Click: Join as a teacher from floatMessageBar';
                mixpanel.track(CLICK_MIXPANEL);
                this.$state.go(CREATE_TEACHER, { reload: true });
            };
            FloatMessageBarController.controllerId = 'mainApp.components.floatMessageBar.FloatMessageBarController';
            FloatMessageBarController.$inject = [
                'dataConfig',
                '$filter',
                '$scope',
                '$rootScope',
                '$state'
            ];
            return FloatMessageBarController;
        }());
        floatMessageBar.FloatMessageBarController = FloatMessageBarController;
        angular.module('mainApp.components.floatMessageBar')
            .controller(FloatMessageBarController.controllerId, FloatMessageBarController);
    })(floatMessageBar = components.floatMessageBar || (components.floatMessageBar = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/floatMessageBar/floatMessageBar.directive.js.map

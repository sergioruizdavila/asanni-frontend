var components;
(function (components) {
    var meter;
    (function (meter) {
        'use strict';
        var MaMeter = (function () {
            function MaMeter() {
                this.bindToController = true;
                this.controller = MeterController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = {
                    meterValue: '=',
                    size: '@',
                    showLabel: '=',
                    showBorder: '='
                };
                this.templateUrl = 'components/meter/meter.html';
                DEBUG && console.log('maMeter directive constructor');
            }
            MaMeter.prototype.link = function ($scope, elm, attr) {
                DEBUG && console.log('maMeter link function');
            };
            MaMeter.instance = function () {
                return new MaMeter();
            };
            MaMeter.directiveId = 'maMeter';
            return MaMeter;
        }());
        angular
            .module('mainApp.components.meter')
            .directive(MaMeter.directiveId, MaMeter.instance);
        var MeterController = (function () {
            function MeterController($filter) {
                this.$filter = $filter;
                this.init();
            }
            MeterController.prototype.init = function () {
                this.CIRCLES_AMOUNT = 5;
                this._title = '';
                if (this.showLabel) {
                    this._assignTitle();
                }
                this.activate();
            };
            MeterController.prototype.activate = function () {
                DEBUG && console.log('meter controller actived');
            };
            MeterController.prototype._assignMeterClass = function () {
                var ratingClass = 'ma-meter--rating-' + this.meterValue;
                var meterClass = 'ma-meter--' + this.size;
                var borderClass = 'ma-meter--border ma-meter--border-1';
                var joinedClass = '';
                if (this.showBorder) {
                    joinedClass = ratingClass + ' ' + meterClass + ' ' + borderClass;
                }
                else {
                    joinedClass = ratingClass;
                }
                return joinedClass;
            };
            MeterController.prototype._assignTitle = function () {
                var BAD_TEXT = this.$filter('translate')('%global.rating.bad.label.text');
                var REGULAR_TEXT = this.$filter('translate')('%global.rating.regular.label.text');
                var OKAY_TEXT = this.$filter('translate')('%global.rating.okay.label.text');
                var GOOD_TEXT = this.$filter('translate')('%global.rating.good.label.text');
                var GREAT_TEXT = this.$filter('translate')('%global.rating.great.label.text');
                var title = '';
                switch (this.meterValue) {
                    case 1:
                        title = BAD_TEXT;
                        break;
                    case 2:
                        title = REGULAR_TEXT;
                        break;
                    case 3:
                        title = OKAY_TEXT;
                        break;
                    case 4:
                        title = GOOD_TEXT;
                        break;
                    case 5:
                        title = GREAT_TEXT;
                        break;
                    default:
                        title = GOOD_TEXT;
                        break;
                }
                this._title = title;
            };
            MeterController.prototype._assignCircleClass = function () {
                return 'circle--' + this.size;
            };
            MeterController.controllerId = 'mainApp.components.meter.MeterController';
            MeterController.$inject = ['$filter'];
            return MeterController;
        }());
        meter.MeterController = MeterController;
        angular.module('mainApp.components.meter')
            .controller(MeterController.controllerId, MeterController);
    })(meter = components.meter || (components.meter = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/meter/meter.directive.js.map

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
                    size: '@'
                };
                this.templateUrl = 'components/meter/meter.html';
                console.log('maMeter directive constructor');
            }
            MaMeter.prototype.link = function ($scope, elm, attr) {
                console.log('maMeter link function');
            };
            MaMeter.instance = function () {
                return new MaMeter();
            };
            return MaMeter;
        }());
        MaMeter.directiveId = 'maMeter';
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
                this._assignTitle();
                this.activate();
            };
            MeterController.prototype.activate = function () {
                console.log('meter controller actived');
            };
            MeterController.prototype._assignMeterClass = function () {
                var ratingClass = 'ma-meter--rating-' + this.meterValue;
                var meterClass = 'ma-meter--' + this.size;
                return ratingClass + ' ' + meterClass;
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
            return MeterController;
        }());
        MeterController.controllerId = 'mainApp.components.meter.MeterController';
        MeterController.$inject = ['$filter'];
        meter.MeterController = MeterController;
        angular.module('mainApp.components.meter')
            .controller(MeterController.controllerId, MeterController);
    })(meter = components.meter || (components.meter = {}));
})(components || (components = {}));
//# sourceMappingURL=meter.directive.js.map
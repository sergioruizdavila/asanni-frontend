var components;
(function (components) {
    var footer;
    (function (footer) {
        'use strict';
        var MaFooter = (function () {
            function MaFooter() {
                this.bindToController = true;
                this.controller = FooterController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.templateUrl = 'components/footer/footer.html';
                console.log('maFooter directive constructor');
            }
            MaFooter.prototype.link = function ($scope, elm, attr) {
                console.log('maFooter link function');
            };
            MaFooter.instance = function () {
                return new MaFooter();
            };
            return MaFooter;
        }());
        MaFooter.directiveId = 'maFooter';
        angular
            .module('mainApp.components.footer')
            .directive(MaFooter.directiveId, MaFooter.instance);
        var FooterController = (function () {
            function FooterController() {
                this.init();
            }
            FooterController.prototype.init = function () {
                this.activate();
            };
            FooterController.prototype.activate = function () {
                console.log('footer controller actived');
            };
            return FooterController;
        }());
        FooterController.controllerId = 'mainApp.components.footer.FooterController';
        footer.FooterController = FooterController;
        angular.module('mainApp.components.footer')
            .controller(FooterController.controllerId, FooterController);
    })(footer = components.footer || (components.footer = {}));
})(components || (components = {}));
//# sourceMappingURL=footer.directive.js.map
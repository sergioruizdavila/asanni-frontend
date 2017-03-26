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
            MaFooter.directiveId = 'maFooter';
            return MaFooter;
        }());
        angular
            .module('mainApp.components.footer')
            .directive(MaFooter.directiveId, MaFooter.instance);
        var FooterController = (function () {
            function FooterController(functionsUtil) {
                this.functionsUtil = functionsUtil;
                this.init();
            }
            FooterController.prototype.init = function () {
                var currentLanguageCode = this.functionsUtil.getCurrentLanguage() || 'en';
                var languageLabel = '%header.lang.options.' + currentLanguageCode + '.text';
                this.form = {
                    language: {
                        key: currentLanguageCode,
                        value: languageLabel
                    }
                };
                this.assignFlag = 'ma-flag--default--flag-' + this.form.language.key;
                this.activate();
            };
            FooterController.prototype.activate = function () {
                console.log('footer controller actived');
            };
            FooterController.prototype.changeLanguage = function (code) {
                var self = this;
                this.functionsUtil.changeLanguage(code).then(function (key) {
                    if (typeof key === 'string') {
                        self.form.language.key = code;
                        self.form.language.value = '%header.lang.options.' + code + '.text';
                        self.assignFlag = 'ma-flag--default--flag-' + code;
                        window.location.reload();
                    }
                });
            };
            FooterController.controllerId = 'mainApp.components.footer.FooterController';
            FooterController.$inject = [
                'mainApp.core.util.FunctionsUtilService'
            ];
            return FooterController;
        }());
        footer.FooterController = FooterController;
        angular.module('mainApp.components.footer')
            .controller(FooterController.controllerId, FooterController);
    })(footer = components.footer || (components.footer = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/footer/footer.directive.js.map

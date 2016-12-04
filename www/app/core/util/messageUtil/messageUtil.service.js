var app;
(function (app) {
    var core;
    (function (core) {
        var util;
        (function (util) {
            var messageUtil;
            (function (messageUtil) {
                'use strict';
                var messageUtilService = (function () {
                    function messageUtilService() {
                        toastr.options.positionClass = "toast-top-right";
                        toastr.options.showDuration = 300;
                        toastr.options.hideDuration = 300;
                        toastr.options.timeOut = 2000;
                    }
                    messageUtilService.prototype.success = function (message) {
                        toastr.success(message);
                    };
                    messageUtilService.prototype.error = function (message) {
                        toastr.options.closeButton = true;
                        toastr.options.timeOut = 100000;
                        if (!message) {
                            message = 'Server error occurred, try again';
                        }
                        toastr.error(message);
                    };
                    messageUtilService.prototype.info = function (message) {
                        toastr.info(message);
                    };
                    messageUtilService.instance = function () {
                        return new messageUtilService();
                    };
                    return messageUtilService;
                }());
                messageUtilService.serviceId = 'mainApp.core.util.messageUtilService';
                messageUtilService.$inject = [''];
                angular
                    .module('mainApp.core.util')
                    .factory(messageUtilService.serviceId, messageUtilService.instance);
            })(messageUtil = util.messageUtil || (util.messageUtil = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=messageUtil.service.js.map
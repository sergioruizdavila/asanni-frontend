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
                    function messageUtilService($filter) {
                        this.$filter = $filter;
                        toastr.options.positionClass = "toast-top-right";
                        toastr.options.showDuration = 300;
                        toastr.options.hideDuration = 300;
                        toastr.options.timeOut = 0;
                    }
                    messageUtilService.prototype.success = function (message) {
                        toastr.options.timeOut = 2000;
                        toastr.success(message);
                    };
                    messageUtilService.prototype.error = function (message) {
                        var ERROR_SERVER_MESSAGE = this.$filter('translate')('%notification.error.server.text');
                        toastr.options.closeButton = true;
                        toastr.options.timeOut = 0;
                        if (!message) {
                            message = ERROR_SERVER_MESSAGE;
                        }
                        toastr.error(message);
                    };
                    messageUtilService.prototype.info = function (message) {
                        toastr.options.closeButton = true;
                        toastr.options.timeOut = 0;
                        toastr.info(message);
                    };
                    messageUtilService.instance = function ($filter) {
                        return new messageUtilService($filter);
                    };
                    messageUtilService.serviceId = 'mainApp.core.util.messageUtilService';
                    messageUtilService.$inject = ['$filter'];
                    return messageUtilService;
                }());
                angular
                    .module('mainApp.core.util')
                    .factory(messageUtilService.serviceId, messageUtilService.instance);
            })(messageUtil = util.messageUtil || (util.messageUtil = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/core/util/messageUtil/messageUtil.service.js.map

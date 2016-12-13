var app;
(function (app) {
    var core;
    (function (core) {
        var util;
        (function (util) {
            var getDataStaticJson;
            (function (getDataStaticJson) {
                'use strict';
                var GetDataStaticJsonService = (function () {
                    function GetDataStaticJsonService($translate) {
                        this.$translate = $translate;
                        console.log('getDataStaticJsonService service called');
                    }
                    GetDataStaticJsonService.prototype.returnValuei18n = function (type, code) {
                        var jsonDoc = this.$translate.getTranslationTable();
                        var key = '';
                        for (var element in jsonDoc) {
                            if (element.indexOf(type) >= 0) {
                                var regex = new RegExp('%' + type + '.', 'g');
                                var codeFromJson = element.replace(regex, '');
                                if (codeFromJson === code) {
                                    key = element;
                                }
                            }
                        }
                        return key;
                    };
                    GetDataStaticJsonService.prototype.getMonthi18n = function () {
                        var jsonDoc = this.$translate.getTranslationTable();
                        var array = [];
                        for (var element in jsonDoc) {
                            if (element.indexOf("month") >= 0) {
                                var code = element.replace(/%month./g, '');
                                array.push({ value: element, code: code });
                            }
                        }
                        return array;
                    };
                    GetDataStaticJsonService.prototype.getSexi18n = function () {
                        var jsonDoc = this.$translate.getTranslationTable();
                        var array = [];
                        for (var element in jsonDoc) {
                            if (element.indexOf("sex") >= 0) {
                                var code = element.replace(/%sex./g, '');
                                array.push({ value: element, code: code });
                            }
                        }
                        return array;
                    };
                    GetDataStaticJsonService.prototype.getCountryi18n = function () {
                        var jsonDoc = this.$translate.getTranslationTable();
                        var array = [];
                        for (var element in jsonDoc) {
                            if (element.indexOf("country") >= 0) {
                                var code = element.replace(/%country./g, '');
                                array.push({ value: element, code: code });
                            }
                        }
                        return array;
                    };
                    GetDataStaticJsonService.prototype.getLanguagei18n = function () {
                        var jsonDoc = this.$translate.getTranslationTable();
                        var array = [];
                        for (var element in jsonDoc) {
                            if (element.indexOf("language") >= 0) {
                                var code = element.replace(/%language./g, '');
                                var value = jsonDoc[element];
                                array.push({ value: value, code: code });
                            }
                        }
                        return array;
                    };
                    GetDataStaticJsonService.prototype.getDegreei18n = function () {
                        var jsonDoc = this.$translate.getTranslationTable();
                        var array = [];
                        for (var element in jsonDoc) {
                            if (element.indexOf("degree") >= 0) {
                                var code = element.replace(/%degree./g, '');
                                array.push({ value: element, code: code });
                            }
                        }
                        return array;
                    };
                    return GetDataStaticJsonService;
                }());
                GetDataStaticJsonService.serviceId = 'mainApp.core.util.GetDataStaticJsonService';
                GetDataStaticJsonService.$inject = ['$translate'];
                getDataStaticJson.GetDataStaticJsonService = GetDataStaticJsonService;
                angular
                    .module('mainApp.core.util')
                    .service(GetDataStaticJsonService.serviceId, GetDataStaticJsonService);
            })(getDataStaticJson = util.getDataStaticJson || (util.getDataStaticJson = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=getDataStaticJson.service.js.map
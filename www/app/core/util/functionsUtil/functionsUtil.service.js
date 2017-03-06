var app;
(function (app) {
    var core;
    (function (core) {
        var util;
        (function (util) {
            var functionsUtil;
            (function (functionsUtil) {
                'use strict';
                var Validation;
                (function (Validation) {
                    Validation[Validation["Email"] = 0] = "Email";
                    Validation[Validation["String"] = 1] = "String";
                    Validation[Validation["Null"] = 2] = "Null";
                    Validation[Validation["Empty"] = 3] = "Empty";
                    Validation[Validation["Number"] = 4] = "Number";
                    Validation[Validation["IsNotZero"] = 5] = "IsNotZero";
                    Validation[Validation["Defined"] = 6] = "Defined";
                    Validation[Validation["IsTrue"] = 7] = "IsTrue";
                    Validation[Validation["IsNotNaN"] = 8] = "IsNotNaN";
                })(Validation = functionsUtil.Validation || (functionsUtil.Validation = {}));
                var FunctionsUtilService = (function () {
                    function FunctionsUtilService($filter, dataConfig, $translate) {
                        this.$filter = $filter;
                        this.dataConfig = dataConfig;
                        this.$translate = $translate;
                        console.log('functionsUtil service called');
                    }
                    FunctionsUtilService.prototype.normalizeString = function (str) {
                        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
                        var to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
                        var mapping = {};
                        for (var i = 0; i < from.length; i++)
                            mapping[from.charAt(i)] = to.charAt(i);
                        var ret = [];
                        for (var i = 0; i < str.length; i++) {
                            var c = str.charAt(i);
                            if (mapping.hasOwnProperty(str.charAt(i)))
                                ret.push(mapping[c]);
                            else
                                ret.push(c);
                        }
                        return ret.join('');
                    };
                    FunctionsUtilService.generateGuid = function () {
                        var fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
                        var guid = fmt.replace(/[xy]/g, function (c) {
                            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                            return v.toString(16);
                        });
                        return guid;
                    };
                    FunctionsUtilService.prototype.dateFormat = function (date) {
                        var DEFAULT_DJANGO_DATE_FORMAT = 'YYYY-MM-DD';
                        var TEMPORAL_FORMAT = 'MM/DD/YYYY';
                        var dateTemporalFormatted = moment(date).format(TEMPORAL_FORMAT);
                        var dateFormattedSplit = this.splitDate(dateTemporalFormatted);
                        var dateFormatted = this.joinDate(dateFormattedSplit.day, dateFormattedSplit.month, dateFormattedSplit.year);
                        return dateFormatted;
                    };
                    FunctionsUtilService.prototype.ageFormat = function (year) {
                        var currentYear = parseInt(this.dataConfig.currentYear);
                        var birthYear = parseInt(year);
                        var age = currentYear - birthYear;
                        return age.toString();
                    };
                    FunctionsUtilService.prototype.getCurrentLanguage = function () {
                        var currentLanguage = this.$translate.use();
                        return currentLanguage;
                    };
                    FunctionsUtilService.prototype.generateUsername = function (firstName, lastName) {
                        var alias = '';
                        var username = '';
                        var randomCode = '';
                        var minLength = this.dataConfig.usernameMinLength;
                        var maxLength = this.dataConfig.usernameMaxLength;
                        var ALPHABET = '0123456789';
                        var ID_LENGTH = 7;
                        var REMAINDER = maxLength - ID_LENGTH;
                        var EXTRAS = 2;
                        firstName = this.normalizeString(firstName);
                        firstName = firstName.replace(/[^\w\s]/gi, '').replace(/\s/g, '');
                        lastName = this.normalizeString(lastName);
                        lastName = lastName.replace(/[^\w\s]/gi, '').replace(/\s/g, '');
                        if (firstName.length > REMAINDER - EXTRAS) {
                            firstName = firstName.substring(0, REMAINDER - EXTRAS);
                        }
                        alias = (firstName + lastName.substring(0, 1)).toLowerCase();
                        for (var i = 0; i < ID_LENGTH; i++) {
                            randomCode += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
                        }
                        username = alias + '-' + randomCode;
                        return username;
                    };
                    FunctionsUtilService.prototype.changeLanguage = function (language) {
                        return this.$translate.use(language).then(function (data) {
                            return data;
                        });
                    };
                    FunctionsUtilService.prototype.joinDate = function (day, month, year) {
                        var newDate = year + '-' + month + '-' + day;
                        return newDate;
                    };
                    FunctionsUtilService.prototype.splitDate = function (date) {
                        var TEMPORAL_FORMAT = 'MM/DD/YYYY';
                        var dateString = moment(date).format(TEMPORAL_FORMAT).split('/');
                        var dateFormatted = {
                            day: dateString[1],
                            month: dateString[0],
                            year: dateString[2]
                        };
                        return dateFormatted;
                    };
                    FunctionsUtilService.prototype.splitToColumns = function (arr, size) {
                        var newArr = [];
                        for (var i = 0; i < arr.length; i += size) {
                            newArr.push(arr.slice(i, i + size));
                        }
                        return newArr;
                    };
                    FunctionsUtilService.prototype.buildMapConfig = function (dataSet, mapType, position, zoom) {
                        var mapConfig = {
                            type: mapType,
                            data: {
                                position: position || { lat: 6.175434, lng: -75.583329 },
                                markers: [],
                                zoom: zoom
                            }
                        };
                        if (dataSet) {
                            for (var i = 0; i < dataSet.length; i++) {
                                var markerPosition = null;
                                if (dataSet[i].profile) {
                                    markerPosition = new app.models.user.Position(dataSet[i].profile.location.position);
                                }
                                else if (dataSet[i].location) {
                                    markerPosition = new app.models.user.Position(dataSet[i].location.position);
                                }
                                mapConfig.data.markers.push({
                                    id: dataSet[i].id,
                                    position: markerPosition
                                });
                            }
                        }
                        return mapConfig;
                    };
                    FunctionsUtilService.prototype.generateRangesOfNumbers = function (from, to) {
                        var array = [];
                        for (var i = from; i <= to; i++) {
                            array.push(i);
                        }
                        return array;
                    };
                    FunctionsUtilService.prototype.buildNumberSelectList = function (from, to) {
                        var dayRange = this.generateRangesOfNumbers(from, to);
                        var list = [];
                        for (var i = 0; i < dayRange.length; i++) {
                            list.push({ value: dayRange[i] });
                        }
                        return list;
                    };
                    FunctionsUtilService.prototype.progress = function (currentStep, totalSteps) {
                        var percent = (100 / totalSteps) * (currentStep);
                        return percent + '%';
                    };
                    FunctionsUtilService.prototype.validator = function (value, validations) {
                        if (validations === void 0) { validations = []; }
                        var NULL_MESSAGE = this.$filter('translate')('%global.validation.null.message.text');
                        var EMPTY_MESSAGE = this.$filter('translate')('%global.validation.empty.message.text');
                        var DEFINED_MESSAGE = this.$filter('translate')('%global.validation.null.message.text');
                        var IS_NOT_ZERO_MESSAGE = this.$filter('translate')('%global.validation.is_not_zero.message.text');
                        var STRING_MESSAGE = this.$filter('translate')('%global.validation.string.message.text');
                        var NUMBER_MESSAGE = this.$filter('translate')('%global.validation.number.message.text');
                        var EMAIL_MESSAGE = this.$filter('translate')('%global.validation.email.message.text');
                        var TRUE_MESSAGE = this.$filter('translate')('%global.validation.true.message.text');
                        var NAN_MESSAGE = this.$filter('translate')('%global.validation.number.message.text');
                        var obj = { valid: true, message: 'ok' };
                        for (var i = 0; i < validations.length; i++) {
                            switch (validations[i]) {
                                case 0:
                                    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    obj.valid = pattern.test(value);
                                    if (obj.valid == false) {
                                        obj.message = EMAIL_MESSAGE;
                                    }
                                    break;
                                case 1:
                                    if (typeof value !== 'string') {
                                        obj.message = STRING_MESSAGE;
                                        obj.valid = false;
                                    }
                                    break;
                                case 2:
                                    if (value == null) {
                                        obj.message = NULL_MESSAGE;
                                        obj.valid = false;
                                    }
                                    break;
                                case 3:
                                    if (value == '') {
                                        obj.message = EMPTY_MESSAGE;
                                        obj.valid = false;
                                    }
                                    break;
                                case 4:
                                    if (typeof value !== 'number') {
                                        obj.message = NUMBER_MESSAGE;
                                        obj.valid = false;
                                    }
                                    break;
                                case 5:
                                    if (parseInt(value) == 0) {
                                        obj.message = IS_NOT_ZERO_MESSAGE;
                                        obj.valid = false;
                                    }
                                    break;
                                case 6:
                                    if (value === undefined) {
                                        obj.message = DEFINED_MESSAGE;
                                        obj.valid = false;
                                    }
                                    break;
                                case 7:
                                    if (value !== true) {
                                        obj.message = TRUE_MESSAGE;
                                        obj.valid = false;
                                    }
                                    break;
                                case 8:
                                    if (isNaN(value)) {
                                        obj.message = NAN_MESSAGE;
                                        obj.valid = false;
                                    }
                                    break;
                            }
                        }
                        return obj;
                    };
                    FunctionsUtilService.extractCountriesFromHtml = function () {
                        var countries_json = {};
                        var language = 'EN';
                        var html = document.getElementById("countriesList." + language);
                        for (var i = 0; i < html.length; i++) {
                            var countryText = html[i].innerText;
                            var countryCode = html[i].attributes[0].nodeValue;
                            countries_json["%country." + countryCode] = countryText;
                        }
                        console.log(JSON.stringify(countries_json));
                    };
                    FunctionsUtilService.prototype.averageNumbersArray = function (values) {
                        var total = 0;
                        var average = 0;
                        var amountValues = values.length;
                        for (var i = 0; i < values.length; i++) {
                            total = values[i] + total;
                        }
                        average = Math.round(total / amountValues);
                        return average;
                    };
                    FunctionsUtilService.prototype.teacherRatingAverage = function (ratingsArr) {
                        var average = 0;
                        var averageArr = [];
                        var ratings = [];
                        for (var i = 0; i < ratingsArr.length; i++) {
                            ratings.push(new app.models.teacher.Rating(ratingsArr[i]));
                            var newArr = [
                                ratings[i].MethodologyValue,
                                ratings[i].TeachingValue,
                                ratings[i].CommunicationValue
                            ];
                            averageArr.push(this.averageNumbersArray(newArr));
                        }
                        average = this.averageNumbersArray(averageArr);
                        return average;
                    };
                    FunctionsUtilService.prototype.addUserIndentifyMixpanel = function (userId) {
                        mixpanel.identify(userId);
                    };
                    FunctionsUtilService.prototype.setUserMixpanel = function (userData) {
                        mixpanel.people.set({
                            'username': userData.Username,
                            '$name': userData.FirstName + ' ' + userData.LastName,
                            'gender': userData.Gender,
                            '$email': userData.Email,
                            '$created': userData.DateJoined,
                            '$last_login': new Date()
                        });
                    };
                    FunctionsUtilService.prototype.setPropertyMixpanel = function (property) {
                        var arr = [];
                        arr.push(property);
                        var setData = {};
                        _.mapKeys(arr, function (value, key) {
                            setData[key] = value;
                        });
                        mixpanel.people.set(setData);
                    };
                    return FunctionsUtilService;
                }());
                FunctionsUtilService.serviceId = 'mainApp.core.util.FunctionsUtilService';
                FunctionsUtilService.$inject = ['$filter',
                    'dataConfig',
                    '$translate'];
                functionsUtil.FunctionsUtilService = FunctionsUtilService;
                angular
                    .module('mainApp.core.util', [])
                    .service(FunctionsUtilService.serviceId, FunctionsUtilService);
            })(functionsUtil = util.functionsUtil || (util.functionsUtil = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=functionsUtil.service.js.map
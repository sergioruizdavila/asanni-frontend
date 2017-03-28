(function () {
    'use strict';
    angular
        .module('mainApp', [
        'mainApp.core',
        'mainApp.core.util',
        'mainApp.localStorage',
        'mainApp.core.restApi',
        'mainApp.core.s3Upload',
        'mainApp.auth',
        'mainApp.register',
        'mainApp.account',
        'mainApp.models.feedback',
        'mainApp.models.user',
        'mainApp.models.student',
        'mainApp.models.teacher',
        'mainApp.models.school',
        'mainApp.pages.main',
        'mainApp.pages.studentLandingPage',
        'mainApp.pages.teacherLandingPage',
        'mainApp.pages.landingPage',
        'mainApp.pages.resetPasswordPage',
        'mainApp.pages.searchPage',
        'mainApp.pages.createTeacherPage',
        'mainApp.pages.teacherProfilePage',
        'mainApp.pages.editProfile',
        'mainApp.pages.userEditAgendaPage',
        'mainApp.pages.editTeacher',
        'mainApp.pages.userInboxPage',
        'mainApp.pages.userInboxDetailsPage',
        'mainApp.pages.meetingConfirmationPage',
        'mainApp.pages.schoolProfilePage',
        'mainApp.components.header',
        'mainApp.components.sideMenu',
        'mainApp.components.rating',
        'mainApp.components.meter',
        'mainApp.components.map',
        'mainApp.components.modal',
        'mainApp.components.footer',
        'mainApp.components.floatMessageBar'
    ])
        .config(['OAuthProvider', 'dataConfig',
        function (OAuthProvider, dataConfig) {
            OAuthProvider.configure({
                baseUrl: dataConfig.baseUrl,
                clientId: dataConfig.localOAuth2Key,
                grantPath: '/oauth2/token/',
                revokePath: '/oauth2/revoke_token/'
            });
        }
    ])
        .config(['OAuthTokenProvider', 'dataConfig',
        function (OAuthTokenProvider, dataConfig) {
            OAuthTokenProvider.configure({
                name: dataConfig.cookieName,
                options: {
                    secure: dataConfig.https,
                }
            });
        }
    ])
        .config(config);
    function config($locationProvider, $urlRouterProvider, $translateProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/page/main');
        var prefix = 'assets/i18n/';
        var suffix = '.json';
        $translateProvider.useStaticFilesLoader({
            prefix: prefix,
            suffix: suffix
        });
        $translateProvider.preferredLanguage('es');
        $translateProvider.useCookieStorage();
    }
})();

//# sourceMappingURL=../../maps/app/app.module.js.map

(function () {
    'use strict';
    angular.module('mainApp.core', [
        'ngResource',
        'ngCookies',
        'ui.router',
        'angular-oauth2',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.calendar',
        'ui.bootstrap.datetimepicker',
        'ngFileUpload',
        'ngImgCrop'
    ]);
})();

//# sourceMappingURL=../../maps/app/app.core.module.js.map

DEBUG = true;
(function () {
    'use strict';
    var BASE_URL = 'https://waysily-server-production.herokuapp.com/api/v1/';
    var BUCKETS3 = 'waysily-img/profile-avatar-prd';
    if (DEBUG) {
        BASE_URL = 'http://127.0.0.1:8000/api/v1/';
        BUCKETS3 = 'waysily-img/profile-avatar-dev';
    }
    var dataConfig = {
        currentYear: '2017',
        baseUrl: BASE_URL,
        domain: 'www.waysily.com',
        https: false,
        autoRefreshTokenIntervalSeconds: 300,
        usernameMinLength: 8,
        usernameMaxLength: 80,
        passwordMinLength: 8,
        passwordMaxLength: 80,
        localOAuth2Key: 'fCY4EWQIPuixOGhA9xRIxzVLNgKJVmG1CVnwXssq',
        googleMapKey: 'AIzaSyD-vO1--MMK-XmQurzNQrxW4zauddCJh5Y',
        mixpanelTokenPRD: '86a48c88274599c662ad64edb74b12da',
        mixpanelTokenDEV: 'eda475bf46e7f01e417a4ed1d9cc3e58',
        modalWelcomeTmpl: 'components/modal/modalCreateUser/modalWelcome/modalWelcome.html',
        modalBornTmpl: 'components/modal/modalCreateUser/modalBorn/modalBorn.html',
        modalPhotoTmpl: 'components/modal/modalCreateUser/modalPhoto/modalPhoto.html',
        modalBasicInfoTmpl: 'components/modal/modalCreateUser/modalBasicInfo/modalBasicInfo.html',
        modalFinishTmpl: 'components/modal/modalCreateUser/modalFinish/modalFinish.html',
        modalMeetingPointTmpl: 'components/modal/modalMeetingPoint/modalMeetingPoint.html',
        modalLanguagesTmpl: 'components/modal/modalLanguages/modalLanguages.html',
        modalExperienceTmpl: 'components/modal/modalExperience/modalExperience.html',
        modalEducationTmpl: 'components/modal/modalEducation/modalEducation.html',
        modalCertificateTmpl: 'components/modal/modalCertificate/modalCertificate.html',
        modalSignUpTmpl: 'components/modal/modalSignUp/modalSignUp.html',
        modalLogInTmpl: 'components/modal/modalLogIn/modalLogIn.html',
        modalForgotPasswordTmpl: 'components/modal/modalForgotPassword/modalForgotPassword.html',
        modalRecommendTeacherTmpl: 'components/modal/modalRecommendTeacher/modalRecommendTeacher.html',
        bucketS3: BUCKETS3,
        regionS3: 'us-east-1',
        accessKeyIdS3: 'AKIAIHKBYIUQD4KBIRLQ',
        secretAccessKeyS3: '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',
        userId: '',
        userDataLocalStorage: 'waysily.userData',
        teacherDataLocalStorage: 'waysily.teacherData',
        earlyIdLocalStorage: 'waysily.early_id',
        cookieName: 'token'
    };
    angular
        .module('mainApp')
        .constant('dataConfig', dataConfig);
})();

//# sourceMappingURL=../../maps/app/app.values.js.map

(function () {
    'use strict';
    angular
        .module('mainApp')
        .run(run);
    run.$inject = [
        '$rootScope',
        '$state',
        'dataConfig',
        'mainApp.auth.AuthService',
        'mainApp.models.user.UserService',
        'mainApp.localStorageService'
    ];
    function run($rootScope, $state, dataConfig, AuthService, userService, localStorage) {
        var productionHost = dataConfig.domain;
        var mixpanelTokenDEV = dataConfig.mixpanelTokenDEV;
        var mixpanelTokenPRD = dataConfig.mixpanelTokenPRD;
        if (window.location.hostname.toLowerCase().search(productionHost) < 0) {
            mixpanel.init(mixpanelTokenDEV);
        }
        else {
            mixpanel.init(mixpanelTokenPRD, {
                loaded: function (mixpanel) {
                    var first_visit = mixpanel.get_property("First visit");
                    var current_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                    if (first_visit == null) {
                        mixpanel.register_once({ "First visit": current_date });
                        mixpanel.track("Visit");
                    }
                }
            });
        }
        if (AuthService.isAuthenticated()) {
            var userAccountInfo = JSON.parse(localStorage.getItem(dataConfig.userDataLocalStorage));
            $rootScope.userData = userAccountInfo;
            userService.getUserProfileById($rootScope.userData.id).then(function (response) {
                if (response.userId) {
                    $rootScope.profileData = new app.models.user.Profile(response);
                }
            });
        }
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.data.requireLogin && !AuthService.isAuthenticated()) {
                event.preventDefault();
                $state.go('page.landingPage');
            }
        });
    }
})();
(function (angular) {
    function localStorageServiceFactory($window) {
        if ($window.localStorage) {
            return $window.localStorage;
        }
        throw new Error('Local storage support is needed');
    }
    localStorageServiceFactory.$inject = ['$window'];
    angular
        .module('mainApp.localStorage', [])
        .factory('mainApp.localStorageService', localStorageServiceFactory);
})(angular);

//# sourceMappingURL=../../maps/app/app.run.js.map

var app;
(function (app) {
    var auth;
    (function (auth) {
        'use strict';
        var AuthService = (function () {
            function AuthService($q, $timeout, $cookies, OAuth, restApi, dataConfig, localStorage) {
                this.$q = $q;
                this.$timeout = $timeout;
                this.$cookies = $cookies;
                this.OAuth = OAuth;
                this.restApi = restApi;
                this.dataConfig = dataConfig;
                this.localStorage = localStorage;
                DEBUG && console.log('auth service called');
                this.AUTH_RESET_PASSWORD_URI = 'rest-auth/password/reset/';
                this.AUTH_CONFIRM_RESET_PASSWORD_URI = 'rest-auth/password/reset/confirm/';
                this.autoRefreshTokenInterval = dataConfig.autoRefreshTokenIntervalSeconds * 1000;
                this.refreshNeeded = true;
            }
            AuthService.prototype.isAuthenticated = function () {
                return this.OAuth.isAuthenticated();
            };
            AuthService.prototype.forceLogout = function () {
                DEBUG && console.log("Forcing logout");
                this.$cookies.remove(this.dataConfig.cookieName);
                this.localStorage.removeItem(this.dataConfig.userDataLocalStorage);
                this.localStorage.removeItem(this.dataConfig.teacherDataLocalStorage);
                window.location.reload();
            };
            AuthService.prototype.resetPassword = function (email) {
                var url = this.AUTH_RESET_PASSWORD_URI;
                var deferred = this.$q.defer();
                var data = {
                    email: email
                };
                this.restApi.create({ url: url }, data).$promise
                    .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            AuthService.prototype.confirmResetPassword = function (uid, token, newPassword1, newPassword2) {
                var url = this.AUTH_CONFIRM_RESET_PASSWORD_URI;
                var deferred = this.$q.defer();
                var data = {
                    uid: uid,
                    token: token,
                    new_password1: newPassword1,
                    new_password2: newPassword2
                };
                this.restApi.create({ url: url }, data).$promise
                    .then(function (response) {
                    DEBUG && console.error(response);
                    deferred.resolve(response.detail);
                }, function (error) {
                    DEBUG && console.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            AuthService.prototype.login = function (user) {
                var self = this;
                var deferred = this.$q.defer();
                this.OAuth.getAccessToken(user, {}).then(function (response) {
                    DEBUG && console.info("Logged in successfuly!");
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error("Error while logging in!");
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            AuthService.prototype.logout = function () {
                var self = this;
                var deferred = this.$q.defer();
                this.OAuth.revokeToken().then(function (response) {
                    DEBUG && console.info("Logged out successfuly!");
                    self.localStorage.removeItem(self.dataConfig.userDataLocalStorage);
                    self.localStorage.removeItem(self.dataConfig.teacherDataLocalStorage);
                    window.location.reload();
                    deferred.resolve(response);
                }, function (response) {
                    DEBUG && console.error("Error while logging you out!");
                    self.forceLogout();
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            AuthService.prototype.refreshToken = function () {
                var self = this;
                var deferred = this.$q.defer();
                if (!this.isAuthenticated()) {
                    DEBUG && console.error('Cannot refresh token if Unauthenticated');
                    deferred.reject();
                    return deferred.promise;
                }
                this.OAuth.getRefreshToken().then(function (response) {
                    DEBUG && console.info("Access token refreshed");
                    deferred.resolve(response);
                }, function (response) {
                    DEBUG && console.error("Error refreshing token ");
                    DEBUG && console.error(response);
                    deferred.reject(response);
                });
                return deferred.promise;
            };
            AuthService.prototype.autoRefreshToken = function () {
                var self = this;
                var deferred = this.$q.defer();
                if (!this.refreshNeeded) {
                    deferred.resolve();
                    return deferred.promise;
                }
                this.refreshToken().then(function (response) {
                    self.refreshNeeded = false;
                    deferred.resolve(response);
                }, function (response) {
                    deferred.reject(response);
                });
                this.$timeout(function () {
                    if (self.isAuthenticated()) {
                        self.refreshNeeded = true;
                        self.autoRefreshToken();
                    }
                }, self.autoRefreshTokenInterval);
                return deferred.promise;
            };
            AuthService.serviceId = 'mainApp.auth.AuthService';
            AuthService.$inject = ['$q',
                '$timeout',
                '$cookies',
                'OAuth',
                'mainApp.core.restApi.restApiService',
                'dataConfig',
                'mainApp.localStorageService'];
            return AuthService;
        }());
        auth.AuthService = AuthService;
        angular
            .module('mainApp.auth', [])
            .service(AuthService.serviceId, AuthService);
    })(auth = app.auth || (app.auth = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../maps/app/auth/auth.service.js.map

var app;
(function (app) {
    var account;
    (function (account) {
        'use strict';
        var AccountService = (function () {
            function AccountService($q, restApi) {
                this.$q = $q;
                this.restApi = restApi;
                DEBUG && console.log('account service instanced');
                this.ACCOUNT_URI = 'account';
                this.ACCOUNT_GET_USERNAME_URI = 'account/username';
            }
            AccountService.prototype.getAccount = function () {
                var url = this.ACCOUNT_URI;
                return this.restApi.show({ url: url }).$promise
                    .then(function (response) {
                    return response;
                }, function (error) {
                    DEBUG && console.error(error);
                    return error;
                });
            };
            AccountService.prototype.getUsername = function (email) {
                var url = this.ACCOUNT_GET_USERNAME_URI;
                var deferred = this.$q.defer();
                var data = {
                    email: email
                };
                this.restApi.create({ url: url }, data).$promise
                    .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            AccountService.serviceId = 'mainApp.account.AccountService';
            AccountService.$inject = [
                '$q',
                'mainApp.core.restApi.restApiService'
            ];
            return AccountService;
        }());
        account.AccountService = AccountService;
        angular
            .module('mainApp.account', [])
            .service(AccountService.serviceId, AccountService);
    })(account = app.account || (app.account = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../maps/app/account/account.service.js.map

var app;
(function (app) {
    var core;
    (function (core) {
        var util;
        (function (util) {
            var functionsUtil;
            (function (functionsUtil) {
                'use strict';
                var FunctionsUtilService = (function () {
                    function FunctionsUtilService($filter, dataConfig, $translate) {
                        this.$filter = $filter;
                        this.dataConfig = dataConfig;
                        this.$translate = $translate;
                        DEBUG && console.log('functionsUtil service called');
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
                        DEBUG && console.log(JSON.stringify(countries_json));
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
                    FunctionsUtilService.prototype.assignAmenitieIconClass = function (amenitie) {
                        var iconClass = '';
                        var options = [
                            {
                                key: '1',
                                value: 'wifi'
                            },
                            {
                                key: '2',
                                value: 'laptop'
                            },
                            {
                                key: '3',
                                value: 'air-conditing'
                            },
                            {
                                key: '4',
                                value: 'heating'
                            },
                            {
                                key: '5',
                                value: 'breakfast'
                            },
                            {
                                key: '6',
                                value: 'lunch'
                            },
                            {
                                key: '7',
                                value: 'dinner'
                            },
                            {
                                key: '8',
                                value: 'snack'
                            },
                            {
                                key: '9',
                                value: 'coffee'
                            },
                            {
                                key: '10',
                                value: 'tea'
                            },
                            {
                                key: '11',
                                value: 'hammock'
                            },
                            {
                                key: '12',
                                value: 'class-room'
                            },
                            {
                                key: '13',
                                value: 'computer'
                            },
                            {
                                key: '14',
                                value: 'video-projector'
                            },
                            {
                                key: '15',
                                value: 'lounge'
                            },
                            {
                                key: '16',
                                value: 'pool'
                            }
                        ];
                        for (var i = 0; i < options.length; i++) {
                            if (options[i].key === amenitie) {
                                iconClass = options[i].value;
                                break;
                            }
                        }
                        return iconClass;
                    };
                    FunctionsUtilService.prototype.assignAccommodatioAmenitieIconClass = function (amenitie) {
                        var iconClass = '';
                        var options = [
                            {
                                key: '1',
                                value: 'private-room'
                            },
                            {
                                key: '2',
                                value: 'shared-room'
                            },
                            {
                                key: '3',
                                value: 'bathroom'
                            },
                            {
                                key: '4',
                                value: 'breakfast'
                            },
                            {
                                key: '5',
                                value: 'lunch'
                            },
                            {
                                key: '6',
                                value: 'dinner'
                            },
                            {
                                key: '7',
                                value: 'snack'
                            },
                            {
                                key: '8',
                                value: 'coffee'
                            },
                            {
                                key: '9',
                                value: 'tea'
                            },
                            {
                                key: '10',
                                value: 'wifi'
                            },
                            {
                                key: '11',
                                value: 'close-to'
                            },
                            {
                                key: '12',
                                value: 'washer'
                            },
                            {
                                key: '13',
                                value: 'cable-tv'
                            },
                            {
                                key: '14',
                                value: 'tv'
                            },
                            {
                                key: '15',
                                value: 'kitchen'
                            },
                            {
                                key: '16',
                                value: 'pool'
                            }
                        ];
                        for (var i = 0; i < options.length; i++) {
                            if (options[i].key === amenitie) {
                                iconClass = options[i].value;
                                break;
                            }
                        }
                        return iconClass;
                    };
                    FunctionsUtilService.serviceId = 'mainApp.core.util.FunctionsUtilService';
                    FunctionsUtilService.$inject = ['$filter',
                        'dataConfig',
                        '$translate'];
                    return FunctionsUtilService;
                }());
                functionsUtil.FunctionsUtilService = FunctionsUtilService;
                angular
                    .module('mainApp.core.util', [])
                    .service(FunctionsUtilService.serviceId, FunctionsUtilService);
            })(functionsUtil = util.functionsUtil || (util.functionsUtil = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/core/util/functionsUtil/functionsUtil.service.js.map

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
                                if (codeFromJson == code) {
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
                    GetDataStaticJsonService.prototype.getTypeOfImmersioni18n = function () {
                        var jsonDoc = this.$translate.getTranslationTable();
                        var array = [];
                        for (var element in jsonDoc) {
                            if (element.indexOf("immersion") >= 0) {
                                var code = element.replace(/%immersion./g, '');
                                array.push({ value: element, code: code });
                            }
                        }
                        return array;
                    };
                    GetDataStaticJsonService.serviceId = 'mainApp.core.util.GetDataStaticJsonService';
                    GetDataStaticJsonService.$inject = ['$translate'];
                    return GetDataStaticJsonService;
                }());
                getDataStaticJson.GetDataStaticJsonService = GetDataStaticJsonService;
                angular
                    .module('mainApp.core.util')
                    .service(GetDataStaticJsonService.serviceId, GetDataStaticJsonService);
            })(getDataStaticJson = util.getDataStaticJson || (util.getDataStaticJson = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/core/util/getDataStaticJson/getDataStaticJson.service.js.map

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

var app;
(function (app) {
    var core;
    (function (core) {
        var util;
        (function (util) {
            var filters;
            (function (filters) {
                GetI18nFilter.$inject = ['$filter', 'mainApp.core.util.GetDataStaticJsonService'];
                function GetI18nFilter($filter, getDataFromJson) {
                    return function (value, type) {
                        var valueI18n = getDataFromJson.returnValuei18n(type, value);
                        var translated = $filter('translate')(valueI18n);
                        return translated;
                    };
                }
                filters.GetI18nFilter = GetI18nFilter;
                GetTypeOfTeacherFilter.$inject = ['$filter'];
                function GetTypeOfTeacherFilter($filter) {
                    return function (value) {
                        var translated = '';
                        if (value === 'H') {
                            translated = $filter('translate')('%global.teacher.type.hobby.text');
                        }
                        else if (value === 'P') {
                            translated = $filter('translate')('%global.teacher.type.professional.text');
                        }
                        return translated;
                    };
                }
                filters.GetTypeOfTeacherFilter = GetTypeOfTeacherFilter;
                AgeFilter.$inject = ['$filter', 'mainApp.core.util.FunctionsUtilService'];
                function AgeFilter($filter, functionsUtil) {
                    return function (value) {
                        var age = functionsUtil.ageFormat(value);
                        var translated = $filter('translate')('%global.age.text');
                        return age + ' ' + translated;
                    };
                }
                filters.AgeFilter = AgeFilter;
                YearMonthFormatFilter.$inject = ['$filter', 'mainApp.core.util.GetDataStaticJsonService'];
                function YearMonthFormatFilter($filter, getDataFromJson) {
                    return function (value) {
                        var dateString = moment(value).format('YYYY/MM/DD').split('/');
                        var valueI18n = getDataFromJson.returnValuei18n('month', dateString[1]);
                        var translated = $filter('translate')(valueI18n);
                        var dateFormatted = {
                            month: translated,
                            year: dateString[0]
                        };
                        return dateFormatted.month + ' ' + dateFormatted.year;
                    };
                }
                filters.YearMonthFormatFilter = YearMonthFormatFilter;
                RangeFilter.$inject = [];
                function RangeFilter() {
                    return function (value) {
                        var lowBound, highBound;
                        if (value.length == 1) {
                            lowBound = 0;
                            highBound = +value[0] - 1;
                        }
                        else if (value.length == 2) {
                            lowBound = +value[0];
                            highBound = +value[1];
                        }
                        var i = lowBound;
                        var result = [];
                        while (i <= highBound) {
                            result.push(i);
                            i++;
                        }
                        return result;
                    };
                }
                filters.RangeFilter = RangeFilter;
                RangeFormatFilter.$inject = [];
                function RangeFormatFilter() {
                    return function (value) {
                        var result = '0';
                        if (value.length === 1) {
                            result = value[0];
                        }
                        else if (value.length === 2) {
                            result = value[0] + ' - ' + value[1];
                        }
                        return result;
                    };
                }
                filters.RangeFormatFilter = RangeFormatFilter;
                angular
                    .module('mainApp.core.util')
                    .filter('getI18nFilter', GetI18nFilter)
                    .filter('getTypeOfTeacherFilter', GetTypeOfTeacherFilter)
                    .filter('ageFilter', AgeFilter)
                    .filter('yearMonthFormatFilter', YearMonthFormatFilter)
                    .filter('rangeFilter', RangeFilter)
                    .filter('rangeFormatFilter', RangeFormatFilter);
            })(filters = util.filters || (util.filters = {}));
        })(util = core.util || (core.util = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/core/util/filters/app.filter.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.core.restApi', [])
        .config(config);
    function config() {
    }
})();

//# sourceMappingURL=../../../../maps/app/core/restApi/restApi.config.js.map

var app;
(function (app) {
    var core;
    (function (core) {
        var restApi;
        (function (restApi) {
            'use strict';
            var RestApiService = (function () {
                function RestApiService($resource, dataConfig) {
                    this.$resource = $resource;
                }
                RestApiService.Api = function ($resource, dataConfig) {
                    var resource = $resource(dataConfig.baseUrl + ':url/:id', { url: '@url' }, {
                        show: { method: 'GET', params: { id: '@id' } },
                        query: { method: 'GET', isArray: true },
                        queryObject: { method: 'GET', isArray: false },
                        create: { method: 'POST' },
                        update: { method: 'PUT', params: { id: '@id' } },
                        remove: { method: 'DELETE', params: { id: '@id' } }
                    });
                    return resource;
                };
                RestApiService.serviceId = 'mainApp.core.restApi.restApiService';
                RestApiService.$inject = [
                    '$resource',
                    'dataConfig'
                ];
                return RestApiService;
            }());
            restApi.RestApiService = RestApiService;
            angular
                .module('mainApp.core.restApi')
                .factory(RestApiService.serviceId, RestApiService.Api)
                .factory('customHttpInterceptor', customHttpInterceptor)
                .config(configApi);
            configApi.$inject = ['$httpProvider'];
            customHttpInterceptor.$inject = ['$q', 'mainApp.core.util.messageUtilService'];
            function configApi($httpProvider) {
                $httpProvider.interceptors.push('customHttpInterceptor');
            }
            function customHttpInterceptor($q, messageUtil) {
                return {
                    request: function (req) {
                        req.url = decodeURIComponent(req.url);
                        return req;
                    },
                    requestError: function (rejection) {
                        return rejection;
                    },
                    response: function (res) {
                        return res;
                    }
                };
            }
        })(restApi = core.restApi || (core.restApi = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/core/restApi/restApi.service.js.map

var app;
(function (app) {
    var core;
    (function (core) {
        var s3Upload;
        (function (s3Upload) {
            'use strict';
            var S3UploadService = (function () {
                function S3UploadService($q, dataConfig) {
                    this.$q = $q;
                    this.dataConfig = dataConfig;
                    console.log('S3Upload service instanced');
                    this.REGION = this.dataConfig.regionS3;
                    this.ACCESS_KEY_ID = this.dataConfig.accessKeyIdS3;
                    this.SECRET_ACCESS_KEY = this.dataConfig.secretAccessKeyS3;
                    this.BUCKET = this.dataConfig.bucketS3;
                    AWS.config.region = this.REGION;
                    AWS.config.update({
                        accessKeyId: this.ACCESS_KEY_ID,
                        secretAccessKey: this.SECRET_ACCESS_KEY
                    });
                    this.bucket = new AWS.S3({
                        params: { Bucket: this.BUCKET, maxRetries: 10 },
                        httpOptions: { timeout: 360000 }
                    });
                }
                S3UploadService.prototype.upload = function (file) {
                    var deferred = this.$q.defer();
                    var params = {
                        Bucket: this.BUCKET,
                        Key: file.name,
                        ContentType: file.type,
                        Body: file
                    };
                    var options = {
                        partSize: 10 * 1024 * 1024,
                        queueSize: 1,
                        ACL: 'bucket-owner-full-control'
                    };
                    var uploader = this.bucket.upload(params, options, function (err, data) {
                        if (err) {
                            deferred.reject(err);
                        }
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                };
                S3UploadService.serviceId = 'mainApp.core.s3Upload.S3UploadService';
                S3UploadService.$inject = ['$q', 'dataConfig'];
                return S3UploadService;
            }());
            s3Upload.S3UploadService = S3UploadService;
            angular
                .module('mainApp.core.s3Upload', [])
                .service(S3UploadService.serviceId, S3UploadService);
        })(s3Upload = core.s3Upload || (core.s3Upload = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/core/s3Upload/s3Upload.service.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var feedback;
        (function (feedback) {
            var Feedback = (function () {
                function Feedback(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Feedback Model instanced');
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.nextCountry = obj.nextCountry || '';
                }
                Object.defineProperty(Feedback.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Feedback.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply next country uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Feedback.prototype, "NextCountry", {
                    get: function () {
                        return this.nextCountry;
                    },
                    set: function (nextCountry) {
                        if (nextCountry === undefined) {
                            throw 'Please supply next country';
                        }
                        this.nextCountry = nextCountry;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Feedback;
            }());
            feedback.Feedback = Feedback;
        })(feedback = models.feedback || (models.feedback = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/feedback/feedback.model.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var feedback;
        (function (feedback_1) {
            'use strict';
            var FeedbackService = (function () {
                function FeedbackService(restApi) {
                    this.restApi = restApi;
                    console.log('feedback service instanced');
                }
                FeedbackService.prototype.createFeedback = function (feedback) {
                    var promise;
                    var url = 'feedbacks';
                    promise = this.restApi.create({ url: url }, feedback)
                        .$promise.then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                    return promise;
                };
                FeedbackService.prototype.getEarlyById = function (id) {
                    var url = 'early/';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                FeedbackService.serviceId = 'mainApp.models.feedback.FeedbackService';
                FeedbackService.$inject = [
                    'mainApp.core.restApi.restApiService'
                ];
                return FeedbackService;
            }());
            feedback_1.FeedbackService = FeedbackService;
            angular
                .module('mainApp.models.feedback', [])
                .service(FeedbackService.serviceId, FeedbackService);
        })(feedback = models.feedback || (models.feedback = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/feedback/feedback.service.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var user;
        (function (user) {
            var Profile = (function () {
                function Profile(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('Profile Model instanced');
                    if (obj === null)
                        obj = {};
                    this.userId = obj.userId || '';
                    this.avatar = obj.avatar || '';
                    this.username = obj.username || '';
                    this.email = obj.email || '';
                    this.phoneNumber = obj.phoneNumber || '';
                    this.firstName = obj.firstName || '';
                    this.lastName = obj.lastName || '';
                    this.gender = obj.gender || '';
                    this.birthDate = obj.birthDate || null;
                    this.bornCountry = obj.bornCountry || '';
                    this.bornCity = obj.bornCity || '';
                    this.about = obj.about || '';
                    this.languages = new Language(obj.languages);
                    this.location = new Location(obj.location);
                    this.isTeacher = obj.isTeacher || false;
                    this.dateJoined = obj.dateJoined || '';
                    this.createdAt = obj.createdAt || '';
                }
                Object.defineProperty(Profile.prototype, "UserId", {
                    get: function () {
                        return this.userId;
                    },
                    set: function (userId) {
                        if (userId === undefined) {
                            throw 'Please supply profile userId';
                        }
                        this.userId = userId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Avatar", {
                    get: function () {
                        return this.avatar;
                    },
                    set: function (avatar) {
                        if (avatar === undefined) {
                            throw 'Please supply profile avatar';
                        }
                        this.avatar = avatar;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Username", {
                    get: function () {
                        return this.username;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Email", {
                    get: function () {
                        return this.email;
                    },
                    set: function (email) {
                        if (email === undefined) {
                            throw 'Please supply profile email';
                        }
                        this.email = email;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "PhoneNumber", {
                    get: function () {
                        return this.phoneNumber;
                    },
                    set: function (phoneNumber) {
                        if (phoneNumber === undefined) {
                            throw 'Please supply profile phone number';
                        }
                        this.phoneNumber = phoneNumber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "FirstName", {
                    get: function () {
                        return this.firstName;
                    },
                    set: function (firstName) {
                        if (firstName === undefined) {
                            throw 'Please supply profile first name';
                        }
                        this.firstName = firstName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "LastName", {
                    get: function () {
                        return this.lastName;
                    },
                    set: function (lastName) {
                        if (lastName === undefined) {
                            throw 'Please supply profile last name';
                        }
                        this.lastName = lastName;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Gender", {
                    get: function () {
                        return this.gender;
                    },
                    set: function (gender) {
                        if (gender === undefined) {
                            throw 'Please supply profile gender';
                        }
                        this.gender = gender;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "BirthDate", {
                    get: function () {
                        return this.birthDate;
                    },
                    set: function (birthDate) {
                        if (birthDate === undefined) {
                            throw 'Please supply profile birth date';
                        }
                        this.birthDate = birthDate;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "BornCountry", {
                    get: function () {
                        return this.bornCountry;
                    },
                    set: function (bornCountry) {
                        if (bornCountry === undefined) {
                            throw 'Please supply profile born country';
                        }
                        this.bornCountry = bornCountry;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "BornCity", {
                    get: function () {
                        return this.bornCity;
                    },
                    set: function (bornCity) {
                        if (bornCity === undefined) {
                            throw 'Please supply profile born city';
                        }
                        this.bornCity = bornCity;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Languages", {
                    get: function () {
                        return this.languages;
                    },
                    set: function (languages) {
                        if (languages === undefined) {
                            throw 'Please supply profile languages';
                        }
                        this.languages = languages;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "Location", {
                    get: function () {
                        return this.location;
                    },
                    set: function (location) {
                        if (location === undefined) {
                            throw 'Please supply profile location';
                        }
                        this.location = location;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "About", {
                    get: function () {
                        return this.about;
                    },
                    set: function (about) {
                        if (about === undefined) {
                            throw 'Please supply profile about';
                        }
                        this.about = about;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "IsTeacher", {
                    get: function () {
                        return this.isTeacher;
                    },
                    set: function (isTeacher) {
                        if (isTeacher === undefined) {
                            throw 'Please supply profile IsTeacher value';
                        }
                        this.isTeacher = isTeacher;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "DateJoined", {
                    get: function () {
                        return this.dateJoined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Profile.prototype, "CreatedAt", {
                    get: function () {
                        return this.createdAt;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Profile;
            }());
            user.Profile = Profile;
            var Language = (function () {
                function Language(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Languages Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.native = obj.native || [];
                    this.learn = obj.learn || [];
                    this.teach = obj.teach || [];
                }
                Object.defineProperty(Language.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Language.prototype, "Native", {
                    get: function () {
                        return this.native;
                    },
                    set: function (native) {
                        if (native === undefined) {
                            throw 'Please supply native languages';
                        }
                        this.native = native;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Language.prototype, "Learn", {
                    get: function () {
                        return this.learn;
                    },
                    set: function (learn) {
                        if (learn === undefined) {
                            throw 'Please supply learn languages';
                        }
                        this.learn = learn;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Language.prototype, "Teach", {
                    get: function () {
                        return this.teach;
                    },
                    set: function (teach) {
                        if (teach === undefined) {
                            throw 'Please supply teach languages';
                        }
                        this.teach = teach;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Language;
            }());
            user.Language = Language;
            var Location = (function () {
                function Location(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('Location Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id || '';
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.country = obj.country || '';
                    this.address = obj.address || '';
                    this.position = new Position(obj.position);
                    this.city = obj.city || '';
                    this.state = obj.state || '';
                    this.zipCode = obj.zipCode || '';
                }
                Object.defineProperty(Location.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply location uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "Country", {
                    get: function () {
                        return this.country;
                    },
                    set: function (country) {
                        if (country === undefined) {
                            throw 'Please supply country location';
                        }
                        this.country = country;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "Address", {
                    get: function () {
                        return this.address;
                    },
                    set: function (address) {
                        if (address === undefined) {
                            throw 'Please supply address location';
                        }
                        this.address = address;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "Position", {
                    get: function () {
                        return this.position;
                    },
                    set: function (position) {
                        if (position === undefined) {
                            throw 'Please supply address location';
                        }
                        this.position = position;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "City", {
                    get: function () {
                        return this.city;
                    },
                    set: function (city) {
                        if (city === undefined) {
                            throw 'Please supply city location';
                        }
                        this.city = city;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "State", {
                    get: function () {
                        return this.state;
                    },
                    set: function (state) {
                        if (state === undefined) {
                            throw 'Please supply state location';
                        }
                        this.state = state;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Location.prototype, "ZipCode", {
                    get: function () {
                        return this.zipCode;
                    },
                    set: function (zipCode) {
                        if (zipCode === undefined) {
                            throw 'Please supply zip code location';
                        }
                        this.zipCode = zipCode;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Location;
            }());
            user.Location = Location;
            var Position = (function () {
                function Position(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('Position Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id || '';
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.lng = obj.lng || '';
                    this.lat = obj.lat || '';
                }
                Object.defineProperty(Position.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Position.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply position uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Position.prototype, "Lng", {
                    get: function () {
                        return this.lng;
                    },
                    set: function (lng) {
                        if (lng === undefined) {
                            throw 'Please supply lng position';
                        }
                        this.lng = lng;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Position.prototype, "Lat", {
                    get: function () {
                        return this.lat;
                    },
                    set: function (lat) {
                        if (lat === undefined) {
                            throw 'Please supply lat position';
                        }
                        this.lat = lat;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Position;
            }());
            user.Position = Position;
        })(user = models.user || (models.user = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/user/user.model.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var user;
        (function (user_1) {
            'use strict';
            var UserService = (function () {
                function UserService(restApi, AuthService) {
                    this.restApi = restApi;
                    this.AuthService = AuthService;
                    DEBUG && console.log('user service instanced');
                    this.USER_URI = 'users';
                }
                UserService.prototype.getUserProfileById = function (id) {
                    var self = this;
                    var url = this.USER_URI;
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    });
                };
                UserService.prototype.getAllUsersProfile = function () {
                    var self = this;
                    var url = this.USER_URI;
                    return this.restApi.query({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (error) {
                        DEBUG && console.log(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    });
                };
                UserService.prototype.updateUserProfile = function (profile) {
                    var self = this;
                    var url = this.USER_URI;
                    return this.restApi.update({ url: url, id: profile.userId }, profile).$promise
                        .then(function (response) {
                        return response;
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        return error;
                    });
                };
                UserService.serviceId = 'mainApp.models.user.UserService';
                UserService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    'mainApp.auth.AuthService'
                ];
                return UserService;
            }());
            user_1.UserService = UserService;
            angular
                .module('mainApp.models.user', [])
                .service(UserService.serviceId, UserService);
        })(user = models.user || (models.user = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/user/user.service.js.map

var app;
(function (app) {
    var register;
    (function (register) {
        'use strict';
        var RegisterService = (function () {
            function RegisterService($q, restApi) {
                this.$q = $q;
                this.restApi = restApi;
                DEBUG && console.log('register service instanced');
                this.REGISTER_URI = 'register';
                this.REGISTER_CHECK_EMAIL_URI = 'register/check-email';
                this.REGISTER_CHECK_USERNAME_URI = 'register/check-username';
            }
            RegisterService.prototype.checkEmail = function (email) {
                var url = this.REGISTER_CHECK_EMAIL_URI;
                var deferred = this.$q.defer();
                var data = {
                    email: email
                };
                this.restApi.create({ url: url }, data).$promise
                    .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error(error);
                    deferred.resolve(error);
                });
                return deferred.promise;
            };
            RegisterService.prototype.checkUsername = function (username) {
                var url = this.REGISTER_CHECK_USERNAME_URI;
                return this.restApi.create({ url: url }, username).$promise
                    .then(function (data) {
                    return data;
                }, function (error) {
                    DEBUG && console.log(error);
                    return error;
                });
            };
            RegisterService.prototype.register = function (userData) {
                var url = this.REGISTER_URI;
                var deferred = this.$q.defer();
                this.restApi.create({ url: url }, userData).$promise
                    .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    DEBUG && console.error(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
            RegisterService.serviceId = 'mainApp.register.RegisterService';
            RegisterService.$inject = [
                '$q',
                'mainApp.core.restApi.restApiService'
            ];
            return RegisterService;
        }());
        register.RegisterService = RegisterService;
        angular
            .module('mainApp.register', [])
            .service(RegisterService.serviceId, RegisterService);
    })(register = app.register || (app.register = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../maps/app/register/register.service.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var student;
        (function (student) {
            var Student = (function () {
                function Student(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Student Model instanced');
                    this.id = obj.id || '';
                    this.school = obj.school || '';
                    this.occupation = obj.occupation || '';
                    this.fluent_in = obj.fluent_in || '';
                    this.learning = obj.learning || '';
                    this.interests = obj.interests || '';
                }
                Object.defineProperty(Student.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Student.prototype, "School", {
                    get: function () {
                        return this.school;
                    },
                    set: function (school) {
                        if (school === undefined) {
                            throw 'Please supply school';
                        }
                        this.school = school;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Student.prototype, "Occupation", {
                    get: function () {
                        return this.occupation;
                    },
                    set: function (occupation) {
                        if (occupation === undefined) {
                            throw 'Please supply occupation';
                        }
                        this.occupation = occupation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Student.prototype, "Fluent_in", {
                    get: function () {
                        return this.fluent_in;
                    },
                    enumerable: true,
                    configurable: true
                });
                Student.prototype.addFluentIn = function (language) {
                    if (language === undefined) {
                        throw 'Please supply fluent in language element (Add)';
                    }
                    this.fluent_in.push(language);
                };
                Student.prototype.editFluentIn = function (language) {
                    if (language === undefined) {
                        throw 'Please supply fluent in language element (Edit)';
                    }
                    this.fluent_in.forEach(function (element, index, array) {
                        if (language === element) {
                            array[index] = language;
                        }
                    });
                };
                Object.defineProperty(Student.prototype, "Learning", {
                    get: function () {
                        return this.learning;
                    },
                    enumerable: true,
                    configurable: true
                });
                Student.prototype.addLearning = function (language) {
                    if (language === undefined) {
                        throw 'Please supply learning language element (Add)';
                    }
                    this.fluent_in.push(language);
                };
                Student.prototype.editLearning = function (language) {
                    if (language === undefined) {
                        throw 'Please supply learning language element (Edit)';
                    }
                    this.learning.forEach(function (element, index, array) {
                        if (language === element) {
                            array[index] = language;
                        }
                    });
                };
                Object.defineProperty(Student.prototype, "Interests", {
                    get: function () {
                        return this.interests;
                    },
                    enumerable: true,
                    configurable: true
                });
                Student.prototype.addInterest = function (interest) {
                    if (interest === undefined) {
                        throw 'Please supply interest element (Add)';
                    }
                    this.interests.push(interest);
                };
                Student.prototype.editInterest = function (interest) {
                    if (interest === undefined) {
                        throw 'Please supply interest element (Edit)';
                    }
                    this.interests.forEach(function (element, index, array) {
                        if (interest === element) {
                            array[index] = interest;
                        }
                    });
                };
                return Student;
            }());
            student.Student = Student;
        })(student = models.student || (models.student = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/student/student.model.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var student;
        (function (student) {
            'use strict';
            var StudentService = (function () {
                function StudentService(restApi) {
                    this.restApi = restApi;
                    console.log('student service instanced');
                }
                StudentService.prototype.getStudentById = function (id) {
                    var url = 'students';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                StudentService.prototype.getAllStudents = function () {
                    var url = 'students';
                    return this.restApi.query({ url: url }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                StudentService.prototype.getRatingByEarlyid = function (id) {
                    var url = 'ratings';
                    return this.restApi.show({ url: url, id: id }).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                StudentService.serviceId = 'mainApp.models.student.StudentService';
                StudentService.$inject = [
                    'mainApp.core.restApi.restApiService'
                ];
                return StudentService;
            }());
            student.StudentService = StudentService;
            angular
                .module('mainApp.models.student', [])
                .service(StudentService.serviceId, StudentService);
        })(student = models.student || (models.student = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/student/student.service.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var teacher;
        (function (teacher) {
            var Teacher = (function () {
                function Teacher(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Teacher Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id || '';
                    this.profile = new app.models.user.Profile(obj.profile);
                    this.type = obj.type || '';
                    this.teacherSince = obj.teacherSince || '';
                    this.methodology = obj.methodology || '';
                    this.immersion = new Immersion(obj.immersion);
                    this.price = new Price(obj.price);
                    this.status = obj.status || 'NW';
                    this.recommended = obj.recomended || 0;
                    this.createdAt = obj.createdAt || '';
                    if (obj != {}) {
                        this.experiences = [];
                        for (var key in obj.experiences) {
                            var experienceInstance = new Experience(obj.experiences[key]);
                            this.addExperience(experienceInstance);
                        }
                        this.educations = [];
                        for (var key in obj.educations) {
                            var educationInstance = new Education(obj.educations[key]);
                            this.addEducation(educationInstance);
                        }
                        this.certificates = [];
                        for (var key in obj.certificates) {
                            var certificateInstance = new Certificate(obj.certificates[key]);
                            this.addCertificate(certificateInstance);
                        }
                        this.ratings = [];
                        for (var key in obj.ratings) {
                            var ratingInstance = new Rating(obj.ratings[key]);
                            this.addRating(ratingInstance);
                        }
                    }
                    else {
                        this.experiences = [];
                        this.educations = [];
                        this.certificates = [];
                        this.ratings = [];
                    }
                }
                Object.defineProperty(Teacher.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id of teacher';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Profile", {
                    get: function () {
                        return this.profile;
                    },
                    set: function (profile) {
                        if (profile === undefined) {
                            throw 'Please supply teacher profile data';
                        }
                        this.profile = profile;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Type", {
                    get: function () {
                        return this.type;
                    },
                    set: function (type) {
                        if (type === undefined) {
                            throw 'Please supply type of teacher';
                        }
                        this.type = type;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "TeacherSince", {
                    get: function () {
                        return this.teacherSince;
                    },
                    set: function (teacherSince) {
                        if (teacherSince === undefined) {
                            throw 'Please supply teacher since';
                        }
                        this.teacherSince = teacherSince;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Experiences", {
                    get: function () {
                        return this.experiences;
                    },
                    enumerable: true,
                    configurable: true
                });
                Teacher.prototype.addExperience = function (experience) {
                    if (experience === undefined) {
                        throw 'Please supply experience value (Add)';
                    }
                    this.experiences.push(experience);
                };
                Teacher.prototype.editExperience = function (experience) {
                    if (experience === undefined) {
                        throw 'Please supply experience value (Edit)';
                    }
                    this.experiences.forEach(function (element, index, array) {
                        if (experience.Id === element.Id) {
                            array[index] = experience;
                        }
                    });
                };
                Object.defineProperty(Teacher.prototype, "Educations", {
                    get: function () {
                        return this.educations;
                    },
                    enumerable: true,
                    configurable: true
                });
                Teacher.prototype.addEducation = function (education) {
                    if (education === undefined) {
                        throw 'Please supply education value (Add)';
                    }
                    this.educations.push(education);
                };
                Teacher.prototype.editEducation = function (education) {
                    if (education === undefined) {
                        throw 'Please supply education value (Edit)';
                    }
                    this.educations.forEach(function (element, index, array) {
                        if (education.Id === element.Id) {
                            array[index] = education;
                        }
                    });
                };
                Object.defineProperty(Teacher.prototype, "Certificates", {
                    get: function () {
                        return this.certificates;
                    },
                    enumerable: true,
                    configurable: true
                });
                Teacher.prototype.addCertificate = function (certificate) {
                    if (certificate === undefined) {
                        throw 'Please supply certificate value (Add)';
                    }
                    this.certificates.push(certificate);
                };
                Teacher.prototype.editCertificate = function (certificate) {
                    if (certificate === undefined) {
                        throw 'Please supply certificate value (Edit)';
                    }
                    this.certificates.forEach(function (element, index, array) {
                        if (certificate.Id === element.Id) {
                            array[index] = certificate;
                        }
                    });
                };
                Object.defineProperty(Teacher.prototype, "Methodology", {
                    get: function () {
                        return this.methodology;
                    },
                    set: function (methodology) {
                        if (methodology === undefined) {
                            throw 'Please supply methodology';
                        }
                        this.methodology = methodology;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Immersion", {
                    get: function () {
                        return this.immersion;
                    },
                    set: function (immersion) {
                        if (immersion === undefined) {
                            throw 'Please supply immersion';
                        }
                        this.immersion = immersion;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply price';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Ratings", {
                    get: function () {
                        return this.ratings;
                    },
                    enumerable: true,
                    configurable: true
                });
                Teacher.prototype.addRating = function (rating) {
                    if (rating === undefined) {
                        throw 'Please supply rating value (Add)';
                    }
                    this.ratings.push(rating);
                };
                Teacher.prototype.editRating = function (rating) {
                    if (rating === undefined) {
                        throw 'Please supply rating value (Edit)';
                    }
                    this.ratings.forEach(function (element, index, array) {
                        if (rating.Id === element.Id) {
                            array[index] = rating;
                        }
                    });
                };
                Object.defineProperty(Teacher.prototype, "Status", {
                    get: function () {
                        return this.status;
                    },
                    set: function (status) {
                        if (status === undefined) {
                            throw 'Please supply profile status value';
                        }
                        this.status = status;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "Recommended", {
                    get: function () {
                        return this.recommended;
                    },
                    set: function (recommended) {
                        if (recommended === undefined) {
                            throw 'Please supply recommended early id';
                        }
                        this.recommended = recommended;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Teacher.prototype, "CreatedAt", {
                    get: function () {
                        return this.createdAt;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Teacher;
            }());
            teacher.Teacher = Teacher;
            var Experience = (function () {
                function Experience(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Experience Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.position = obj.position || '';
                    this.company = obj.company || '';
                    this.country = obj.country || '';
                    this.city = obj.city || '';
                    this.dateStart = obj.dateStart || '';
                    this.dateFinish = obj.dateFinish || '';
                    this.description = obj.description || '';
                }
                Object.defineProperty(Experience.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply experience uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Position", {
                    get: function () {
                        return this.position;
                    },
                    set: function (position) {
                        if (position === undefined) {
                            throw 'Please supply position on company';
                        }
                        this.position = position;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Company", {
                    get: function () {
                        return this.company;
                    },
                    set: function (company) {
                        if (company === undefined) {
                            throw 'Please supply company experience';
                        }
                        this.company = company;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Country", {
                    get: function () {
                        return this.country;
                    },
                    set: function (country) {
                        if (country === undefined) {
                            throw 'Please supply country experience';
                        }
                        this.country = country;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "City", {
                    get: function () {
                        return this.city;
                    },
                    set: function (city) {
                        if (city === undefined) {
                            throw 'Please supply city experience';
                        }
                        this.city = city;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "DateStart", {
                    get: function () {
                        return this.dateStart;
                    },
                    set: function (dateStart) {
                        if (dateStart === undefined) {
                            throw 'Please supply dateStart experience';
                        }
                        this.dateStart = dateStart;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "DateFinish", {
                    get: function () {
                        return this.dateFinish;
                    },
                    set: function (dateFinish) {
                        if (dateFinish === undefined) {
                            throw 'Please supply dateFinish experience';
                        }
                        this.dateFinish = dateFinish;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Experience.prototype, "Description", {
                    get: function () {
                        return this.description;
                    },
                    set: function (description) {
                        if (description === undefined) {
                            throw 'Please supply description experience';
                        }
                        this.description = description;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Experience;
            }());
            teacher.Experience = Experience;
            var Education = (function () {
                function Education(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Education Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.school = obj.school || '';
                    this.degree = obj.degree || '';
                    this.fieldStudy = obj.fieldStudy || '';
                    this.dateStart = obj.dateStart || '';
                    this.dateFinish = obj.dateFinish || '';
                    this.description = obj.description || '';
                }
                Object.defineProperty(Education.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply position uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "School", {
                    get: function () {
                        return this.school;
                    },
                    set: function (school) {
                        if (school === undefined) {
                            throw 'Please supply school value (teacher education)';
                        }
                        this.school = school;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "Degree", {
                    get: function () {
                        return this.degree;
                    },
                    set: function (degree) {
                        if (degree === undefined) {
                            throw 'Please supply degree value (teacher education)';
                        }
                        this.degree = degree;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "FieldStudy", {
                    get: function () {
                        return this.fieldStudy;
                    },
                    set: function (fieldStudy) {
                        if (fieldStudy === undefined) {
                            throw 'Please supply field of study value (teacher education)';
                        }
                        this.fieldStudy = fieldStudy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "DateStart", {
                    get: function () {
                        return this.dateStart;
                    },
                    set: function (dateStart) {
                        if (dateStart === undefined) {
                            throw 'Please supply dateStart experience';
                        }
                        this.dateStart = dateStart;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "DateFinish", {
                    get: function () {
                        return this.dateFinish;
                    },
                    set: function (dateFinish) {
                        if (dateFinish === undefined) {
                            throw 'Please supply dateFinish experience';
                        }
                        this.dateFinish = dateFinish;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Education.prototype, "Description", {
                    get: function () {
                        return this.description;
                    },
                    set: function (description) {
                        if (description === undefined) {
                            throw 'Please supply description experience';
                        }
                        this.description = description;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Education;
            }());
            teacher.Education = Education;
            var Certificate = (function () {
                function Certificate(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Certificate Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.name = obj.name || '';
                    this.institution = obj.institution || '';
                    this.dateReceived = obj.dateReceived || '';
                    this.description = obj.description || '';
                }
                Object.defineProperty(Certificate.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply position uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "Name", {
                    get: function () {
                        return this.name;
                    },
                    set: function (name) {
                        if (name === undefined) {
                            throw 'Please supply name of certificate';
                        }
                        this.name = name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "Institution", {
                    get: function () {
                        return this.institution;
                    },
                    set: function (institution) {
                        if (institution === undefined) {
                            throw 'Please supply institution of certificate';
                        }
                        this.institution = institution;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "DateReceived", {
                    get: function () {
                        return this.dateReceived;
                    },
                    set: function (dateReceived) {
                        if (dateReceived === undefined) {
                            throw 'Please supply dateReceived of certificate';
                        }
                        this.dateReceived = dateReceived;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Certificate.prototype, "Description", {
                    get: function () {
                        return this.description;
                    },
                    set: function (description) {
                        if (description === undefined) {
                            throw 'Please supply description of certificate';
                        }
                        this.description = description;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Certificate;
            }());
            teacher.Certificate = Certificate;
            var Immersion = (function () {
                function Immersion(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Certificate Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.active = obj.active || false;
                    this.otherCategory = obj.otherCategory || '';
                    this.category = obj.category || [];
                }
                Object.defineProperty(Immersion.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply experience uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of immersion';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Category", {
                    get: function () {
                        return this.category;
                    },
                    set: function (category) {
                        if (category === undefined) {
                            throw 'Please supply category of immersion';
                        }
                        this.category = category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "OtherCategory", {
                    get: function () {
                        return this.otherCategory;
                    },
                    set: function (otherCategory) {
                        if (otherCategory === undefined) {
                            throw 'Please supply other immersion category';
                        }
                        this.otherCategory = otherCategory;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Immersion;
            }());
            teacher.Immersion = Immersion;
            var TypeOfImmersion = (function () {
                function TypeOfImmersion(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('TypeOfImmersion Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.category = obj.category || '';
                }
                Object.defineProperty(TypeOfImmersion.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply type of immersion id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfImmersion.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply type of immersion uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfImmersion.prototype, "Category", {
                    get: function () {
                        return this.category;
                    },
                    set: function (category) {
                        if (category === undefined) {
                            throw 'Please supply category of immersion';
                        }
                        this.category = category;
                    },
                    enumerable: true,
                    configurable: true
                });
                return TypeOfImmersion;
            }());
            teacher.TypeOfImmersion = TypeOfImmersion;
            var Price = (function () {
                function Price(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Price of Teacher Class Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.privateClass = new TypeOfPrice(obj.privateClass);
                    this.groupClass = new TypeOfPrice(obj.groupClass);
                }
                Object.defineProperty(Price.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply experience uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "PrivateClass", {
                    get: function () {
                        return this.privateClass;
                    },
                    set: function (privateClass) {
                        if (privateClass === undefined) {
                            throw 'Please supply privateClass';
                        }
                        this.privateClass = privateClass;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "GroupClass", {
                    get: function () {
                        return this.groupClass;
                    },
                    set: function (groupClass) {
                        if (groupClass === undefined) {
                            throw 'Please supply groupClass';
                        }
                        this.groupClass = groupClass;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Price;
            }());
            teacher.Price = Price;
            var TypeOfPrice = (function () {
                function TypeOfPrice(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('TypeOfPrice Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.active = obj.active || false;
                    this.hourPrice = obj.hourPrice || 0;
                }
                Object.defineProperty(TypeOfPrice.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply experience id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfPrice.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply experience uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfPrice.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of price';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TypeOfPrice.prototype, "HourPrice", {
                    get: function () {
                        return this.hourPrice;
                    },
                    set: function (hourPrice) {
                        if (hourPrice === undefined) {
                            throw 'Please supply hour price value';
                        }
                        this.hourPrice = hourPrice;
                    },
                    enumerable: true,
                    configurable: true
                });
                return TypeOfPrice;
            }());
            teacher.TypeOfPrice = TypeOfPrice;
            var Rating = (function () {
                function Rating(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Rating Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
                    this.author = new app.models.user.Profile(obj.author);
                    this.methodologyValue = obj.methodologyValue || 0;
                    this.teachingValue = obj.teachingValue || 0;
                    this.communicationValue = obj.communicationValue || 0;
                    this.review = obj.review || '';
                    this.createdAt = obj.createdAt || '';
                }
                Object.defineProperty(Rating.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply rating id';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "Uid", {
                    get: function () {
                        return this.uid;
                    },
                    set: function (uid) {
                        if (uid === undefined) {
                            throw 'Please supply rating uid';
                        }
                        this.uid = uid;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "Author", {
                    get: function () {
                        return this.author;
                    },
                    set: function (author) {
                        if (author === undefined) {
                            throw 'Please supply author';
                        }
                        this.author = author;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "MethodologyValue", {
                    get: function () {
                        return this.methodologyValue;
                    },
                    set: function (methodologyValue) {
                        if (methodologyValue === undefined) {
                            throw 'Please supply methodology value';
                        }
                        this.methodologyValue = methodologyValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "TeachingValue", {
                    get: function () {
                        return this.teachingValue;
                    },
                    set: function (teachingValue) {
                        if (teachingValue === undefined) {
                            throw 'Please supply teaching value';
                        }
                        this.teachingValue = teachingValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "CommunicationValue", {
                    get: function () {
                        return this.communicationValue;
                    },
                    set: function (communicationValue) {
                        if (communicationValue === undefined) {
                            throw 'Please supply communication value';
                        }
                        this.communicationValue = communicationValue;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "Review", {
                    get: function () {
                        return this.review;
                    },
                    set: function (review) {
                        if (review === undefined) {
                            throw 'Please supply review value';
                        }
                        this.review = review;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rating.prototype, "CreatedAt", {
                    get: function () {
                        return this.createdAt;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Rating;
            }());
            teacher.Rating = Rating;
        })(teacher = models.teacher || (models.teacher = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/teacher/teacher.model.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var teacher;
        (function (teacher_1) {
            'use strict';
            var TeacherService = (function () {
                function TeacherService(restApi, AuthService, $q) {
                    this.restApi = restApi;
                    this.AuthService = AuthService;
                    this.$q = $q;
                    console.log('teacher service instanced');
                    this.TEACHER_URI = 'teachers';
                    this.PROFILE_TEACHER_URI = 'teachers?profileId=';
                    this.STATUS_TEACHER_URI = 'teachers?status=';
                    this.EXPERIENCES_URI = 'experiences';
                    this.EDUCATIONS_URI = 'educations';
                    this.CERTIFICATES_URI = 'certificates';
                }
                TeacherService.prototype.getTeacherById = function (id) {
                    var self = this;
                    var url = this.TEACHER_URI;
                    var deferred = this.$q.defer();
                    this.restApi.show({ url: url, id: id }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.getTeacherByProfileId = function (profileId) {
                    var self = this;
                    var url = this.PROFILE_TEACHER_URI + profileId;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        if (response.results) {
                            var res = response.results[0] ? response.results[0] : '';
                            deferred.resolve(res);
                        }
                        else {
                            DEBUG && console.error(response);
                            deferred.reject(response);
                        }
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.getAllTeachersByStatus = function (status) {
                    var self = this;
                    var url = this.STATUS_TEACHER_URI + status;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.getAllTeachers = function () {
                    var self = this;
                    var url = this.TEACHER_URI;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.createTeacher = function (teacher) {
                    var self = this;
                    var url = this.TEACHER_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, teacher).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.updateTeacher = function (teacher) {
                    var self = this;
                    var url = this.TEACHER_URI;
                    var deferred = this.$q.defer();
                    this.restApi.update({ url: url, id: teacher.Id }, teacher).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.createExperience = function (teacherId, experience) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EXPERIENCES_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, experience).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.log(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.updateExperience = function (teacherId, experience) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EXPERIENCES_URI;
                    var deferred = this.$q.defer();
                    this.restApi.update({ url: url, id: experience.Id }, experience).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.createEducation = function (teacherId, education) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EDUCATIONS_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, education).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.updateEducation = function (teacherId, education) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.EDUCATIONS_URI;
                    var deferred = this.$q.defer();
                    this.restApi.update({ url: url, id: education.Id }, education).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.createCertificate = function (teacherId, certificate) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.CERTIFICATES_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, certificate).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.prototype.updateCertificate = function (teacherId, certificate) {
                    var self = this;
                    var url = this.TEACHER_URI + '/' + teacherId + '/' + this.CERTIFICATES_URI;
                    var deferred = this.$q.defer();
                    this.restApi.update({ url: url, id: certificate.Id }, certificate).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                TeacherService.serviceId = 'mainApp.models.teacher.TeacherService';
                TeacherService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    'mainApp.auth.AuthService',
                    '$q'
                ];
                return TeacherService;
            }());
            teacher_1.TeacherService = TeacherService;
            angular
                .module('mainApp.models.teacher', [])
                .service(TeacherService.serviceId, TeacherService);
        })(teacher = models.teacher || (models.teacher = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/teacher/teacher.service.js.map

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app;
(function (app) {
    var models;
    (function (models) {
        var school;
        (function (school) {
            var School = (function () {
                function School(obj) {
                    if (obj === void 0) { obj = {}; }
                    DEBUG && console.log('School Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.user = obj.user || '';
                    this.photo = obj.photo || '';
                    this.name = obj.name || '';
                    this.email = obj.email || '';
                    this.about = obj.about || '';
                    this.website = obj.website || '';
                    this.phoneNumber = obj.phoneNumber || '';
                    this.facebook = obj.facebook || '';
                    this.twitter = obj.twitter || '';
                    this.instagram = obj.instagram || '';
                    this.meetupGroup = obj.meetupGroup || '';
                    this.facebookGroup = obj.facebookGroup || '';
                    this.location = new app.models.user.Location(obj.location);
                    this.languageTeach = obj.languageTeach || [];
                    this.immersion = new Immersion(obj.immersion);
                    this.languageExchange = obj.languageExchange || false;
                    this.workExchange = new WorkExchange(obj.workExchange);
                    this.volunteering = new Volunteering(obj.volunteering);
                    this.tour = new Tour(obj.tour);
                    this.atmosphere = obj.atmosphere || 0;
                    this.amenities = new Amenities(obj.amenities);
                    this.accommodation = new Accommodation(obj.accommodation);
                    this.classesBegin = obj.classesBegin || [];
                    this.price = new Price(obj.price);
                    this.discount = new Discount(obj.discount);
                    this.package = new Package(obj.package);
                    this.paymentMethod = new PaymentMethod(obj.paymentMethod);
                    this.bookingFee = new BookingFee(obj.bookingFee);
                    this.active = obj.active || false;
                    this.createdAt = obj.createdAt || '';
                }
                Object.defineProperty(School.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "User", {
                    get: function () {
                        return this.user;
                    },
                    set: function (user) {
                        if (user === undefined) {
                            throw 'Please supply school user id manager';
                        }
                        this.user = user;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Photo", {
                    get: function () {
                        return this.photo;
                    },
                    set: function (photo) {
                        if (photo === undefined) {
                            throw 'Please supply school photo';
                        }
                        this.photo = photo;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Name", {
                    get: function () {
                        return this.name;
                    },
                    set: function (name) {
                        if (name === undefined) {
                            throw 'Please supply school name';
                        }
                        this.name = name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Email", {
                    get: function () {
                        return this.email;
                    },
                    set: function (email) {
                        if (email === undefined) {
                            throw 'Please supply profile email';
                        }
                        this.email = email;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "About", {
                    get: function () {
                        return this.about;
                    },
                    set: function (about) {
                        if (about === undefined) {
                            throw 'Please supply school about';
                        }
                        this.about = about;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Website", {
                    get: function () {
                        return this.website;
                    },
                    set: function (website) {
                        if (website === undefined) {
                            throw 'Please supply school website';
                        }
                        this.website = website;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "PhoneNumber", {
                    get: function () {
                        return this.phoneNumber;
                    },
                    set: function (phoneNumber) {
                        if (phoneNumber === undefined) {
                            throw 'Please supply school phoneNumber';
                        }
                        this.phoneNumber = phoneNumber;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Facebook", {
                    get: function () {
                        return this.facebook;
                    },
                    set: function (facebook) {
                        if (facebook === undefined) {
                            throw 'Please supply school facebook';
                        }
                        this.facebook = facebook;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Twitter", {
                    get: function () {
                        return this.twitter;
                    },
                    set: function (twitter) {
                        if (twitter === undefined) {
                            throw 'Please supply school twitter';
                        }
                        this.twitter = twitter;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Instagram", {
                    get: function () {
                        return this.instagram;
                    },
                    set: function (instagram) {
                        if (instagram === undefined) {
                            throw 'Please supply school instagram';
                        }
                        this.instagram = instagram;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "MeetupGroup", {
                    get: function () {
                        return this.meetupGroup;
                    },
                    set: function (meetupGroup) {
                        if (meetupGroup === undefined) {
                            throw 'Please supply school meetupGroup';
                        }
                        this.meetupGroup = meetupGroup;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "FacebookGroup", {
                    get: function () {
                        return this.facebookGroup;
                    },
                    set: function (facebookGroup) {
                        if (facebookGroup === undefined) {
                            throw 'Please supply school facebookGroup';
                        }
                        this.facebookGroup = facebookGroup;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Location", {
                    get: function () {
                        return this.location;
                    },
                    set: function (location) {
                        if (location === undefined) {
                            throw 'Please supply school location';
                        }
                        this.location = location;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "LanguageTeach", {
                    get: function () {
                        return this.languageTeach;
                    },
                    set: function (languageTeach) {
                        if (languageTeach === undefined) {
                            throw 'Please supply school language teach';
                        }
                        this.languageTeach = languageTeach;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Immersion", {
                    get: function () {
                        return this.immersion;
                    },
                    set: function (immersion) {
                        if (immersion === undefined) {
                            throw 'Please supply school immersion';
                        }
                        this.immersion = immersion;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "LanguageExchange", {
                    get: function () {
                        return this.languageExchange;
                    },
                    set: function (languageExchange) {
                        if (languageExchange === undefined) {
                            throw 'Please supply school language exchange';
                        }
                        this.languageExchange = languageExchange;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "WorkExchange", {
                    get: function () {
                        return this.workExchange;
                    },
                    set: function (workExchange) {
                        if (workExchange === undefined) {
                            throw 'Please supply school work exchange';
                        }
                        this.workExchange = workExchange;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Volunteering", {
                    get: function () {
                        return this.volunteering;
                    },
                    set: function (volunteering) {
                        if (volunteering === undefined) {
                            throw 'Please supply school volunteering';
                        }
                        this.volunteering = volunteering;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Tour", {
                    get: function () {
                        return this.tour;
                    },
                    set: function (tour) {
                        if (tour === undefined) {
                            throw 'Please supply school tour';
                        }
                        this.tour = tour;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Atmosphere", {
                    get: function () {
                        return this.atmosphere;
                    },
                    set: function (atmosphere) {
                        if (atmosphere === undefined) {
                            throw 'Please supply school atmosphere';
                        }
                        this.atmosphere = atmosphere;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Amenities", {
                    get: function () {
                        return this.amenities;
                    },
                    set: function (amenities) {
                        if (amenities === undefined) {
                            throw 'Please supply school amenities';
                        }
                        this.amenities = amenities;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Accommodation", {
                    get: function () {
                        return this.accommodation;
                    },
                    set: function (accommodation) {
                        if (accommodation === undefined) {
                            throw 'Please supply school accommodation';
                        }
                        this.accommodation = accommodation;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "ClassesBegin", {
                    get: function () {
                        return this.classesBegin;
                    },
                    set: function (classesBegin) {
                        if (classesBegin === undefined) {
                            throw 'Please supply school classes begin';
                        }
                        this.classesBegin = classesBegin;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply school price';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Discount", {
                    get: function () {
                        return this.discount;
                    },
                    set: function (discount) {
                        if (discount === undefined) {
                            throw 'Please supply school discount';
                        }
                        this.discount = discount;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Package", {
                    get: function () {
                        return this.package;
                    },
                    set: function (value) {
                        if (value === undefined) {
                            throw 'Please supply school package';
                        }
                        this.package = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "PaymentMethod", {
                    get: function () {
                        return this.paymentMethod;
                    },
                    set: function (paymentMethod) {
                        if (paymentMethod === undefined) {
                            throw 'Please supply school payment methods';
                        }
                        this.paymentMethod = paymentMethod;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "BookingFee", {
                    get: function () {
                        return this.bookingFee;
                    },
                    set: function (bookingFee) {
                        if (bookingFee === undefined) {
                            throw 'Please supply school booking fee';
                        }
                        this.bookingFee = bookingFee;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of school';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(School.prototype, "CreatedAt", {
                    get: function () {
                        return this.createdAt;
                    },
                    enumerable: true,
                    configurable: true
                });
                return School;
            }());
            school.School = School;
            var Immersion = (function () {
                function Immersion(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Immersion Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                    this.otherOption = obj.otherOption || '';
                    this.rating = obj.rating || 0;
                }
                Object.defineProperty(Immersion.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of school';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of school';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply option value of school';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "OtherOption", {
                    get: function () {
                        return this.otherOption;
                    },
                    set: function (otherOption) {
                        if (otherOption === undefined) {
                            throw 'Please supply other option value of school';
                        }
                        this.otherOption = otherOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Immersion.prototype, "Rating", {
                    get: function () {
                        return this.rating;
                    },
                    set: function (rating) {
                        if (rating === undefined) {
                            throw 'Please supply rating immersion value of school';
                        }
                        this.rating = rating;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Immersion;
            }());
            school.Immersion = Immersion;
            var Package = (function () {
                function Package(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Package Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    if (obj != {}) {
                        this.packageOption = [];
                        for (var key in obj.packageOption) {
                            var packageOptionInstance = new PackageOption(obj.packageOption[key]);
                            this.addPackageOption(packageOptionInstance);
                        }
                    }
                    else {
                        this.packageOption = [];
                    }
                }
                Object.defineProperty(Package.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of package school';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Package.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of package school';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Package.prototype, "PackageOption", {
                    get: function () {
                        return this.packageOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                Package.prototype.addPackageOption = function (packageOption) {
                    if (packageOption === undefined) {
                        throw 'Please supply package option value (Add)';
                    }
                    this.packageOption.push(packageOption);
                };
                Package.prototype.editPackageOption = function (packageOption) {
                    if (packageOption === undefined) {
                        throw 'Please supply package option value (Edit)';
                    }
                    this.packageOption.forEach(function (element, index, array) {
                        if (packageOption.Id === element.Id) {
                            array[index] = packageOption;
                        }
                    });
                };
                return Package;
            }());
            school.Package = Package;
            var PackageOption = (function () {
                function PackageOption(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Package Option Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.name = obj.name || '';
                    this.price = obj.price || 0;
                    this.description = obj.description || '';
                }
                Object.defineProperty(PackageOption.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of package option school';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PackageOption.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of package option school';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PackageOption.prototype, "Name", {
                    get: function () {
                        return this.name;
                    },
                    set: function (name) {
                        if (name === undefined) {
                            throw 'Please supply name value of package option school';
                        }
                        this.name = name;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PackageOption.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply price value of package option school';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PackageOption.prototype, "Description", {
                    get: function () {
                        return this.description;
                    },
                    set: function (description) {
                        if (description === undefined) {
                            throw 'Please supply description value of package option school';
                        }
                        this.description = description;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PackageOption;
            }());
            school.PackageOption = PackageOption;
            var WorkExchange = (function () {
                function WorkExchange(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Work Exchange Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    if (obj != {}) {
                        this.workExchangeOption = [];
                        for (var key in obj.workExchangeOption) {
                            var workExchangeOptionInstance = new WorkExchangeOption(obj.workExchangeOption[key]);
                            this.addWorkExchangeOption(workExchangeOptionInstance);
                        }
                    }
                    else {
                        this.workExchangeOption = [];
                    }
                }
                Object.defineProperty(WorkExchange.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of work exchange';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchange.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of work exchange';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchange.prototype, "WorkExchangeOption", {
                    get: function () {
                        return this.workExchangeOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                WorkExchange.prototype.addWorkExchangeOption = function (workExchangeOption) {
                    if (workExchangeOption === undefined) {
                        throw 'Please supply work exchange option value (Add)';
                    }
                    this.workExchangeOption.push(workExchangeOption);
                };
                WorkExchange.prototype.editWorkExchangeOption = function (workExchangeOption) {
                    if (workExchangeOption === undefined) {
                        throw 'Please supply work exchange Option value (Edit)';
                    }
                    this.workExchangeOption.forEach(function (element, index, array) {
                        if (workExchangeOption.Id === element.Id) {
                            array[index] = workExchangeOption;
                        }
                    });
                };
                return WorkExchange;
            }());
            school.WorkExchange = WorkExchange;
            var WorkExchangeOption = (function () {
                function WorkExchangeOption(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Work Exchange Option Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.category = obj.category || 0;
                    this.terms = obj.terms || '';
                }
                Object.defineProperty(WorkExchangeOption.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of work exchange';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchangeOption.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of work exchange';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchangeOption.prototype, "Category", {
                    get: function () {
                        return this.category;
                    },
                    set: function (category) {
                        if (category === undefined) {
                            throw 'Please supply category value of work exchange';
                        }
                        this.category = category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WorkExchangeOption.prototype, "Terms", {
                    get: function () {
                        return this.terms;
                    },
                    set: function (terms) {
                        if (terms === undefined) {
                            throw 'Please supply terms value of work exchange';
                        }
                        this.terms = terms;
                    },
                    enumerable: true,
                    configurable: true
                });
                return WorkExchangeOption;
            }());
            school.WorkExchangeOption = WorkExchangeOption;
            var Volunteering = (function () {
                function Volunteering(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Volunteering Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                    this.rating = obj.rating || 0;
                }
                Object.defineProperty(Volunteering.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of volunteering';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Volunteering.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of volunteering';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Volunteering.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply volunteering option value of school';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Volunteering.prototype, "Rating", {
                    get: function () {
                        return this.rating;
                    },
                    set: function (rating) {
                        if (rating === undefined) {
                            throw 'Please supply rating volunteering value of school';
                        }
                        this.rating = rating;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Volunteering;
            }());
            school.Volunteering = Volunteering;
            var Tour = (function () {
                function Tour(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Tours Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                    this.cityTour = obj.cityTour || false;
                }
                Object.defineProperty(Tour.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of volunteering';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Tour.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of volunteering';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Tour.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply volunteering option value of school';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Tour.prototype, "CityTour", {
                    get: function () {
                        return this.cityTour;
                    },
                    set: function (cityTour) {
                        if (cityTour === undefined) {
                            throw 'Please supply cityTour value of school';
                        }
                        this.cityTour = cityTour;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Tour;
            }());
            school.Tour = Tour;
            var Amenities = (function () {
                function Amenities(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Amenities Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                    this.otherOption = obj.otherOption || '';
                    this.rating = obj.rating || 0;
                }
                Object.defineProperty(Amenities.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of amenities';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Amenities.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of amenities';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Amenities.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply amenities option value of school';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Amenities.prototype, "OtherOption", {
                    get: function () {
                        return this.otherOption;
                    },
                    set: function (otherOption) {
                        if (otherOption === undefined) {
                            throw 'Please supply other amenities options value of school';
                        }
                        this.otherOption = otherOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Amenities.prototype, "Rating", {
                    get: function () {
                        return this.rating;
                    },
                    set: function (rating) {
                        if (rating === undefined) {
                            throw 'Please supply rating amenities value of school';
                        }
                        this.rating = rating;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Amenities;
            }());
            school.Amenities = Amenities;
            var Accommodation = (function () {
                function Accommodation(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Accommodation Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.rating = obj.rating || 0;
                    if (obj != {}) {
                        this.accommodationOption = [];
                        for (var key in obj.accommodationOption) {
                            var accommodationOptionInstance = new AccommodationOption(obj.accommodationOption[key]);
                            this.addAccommodationOption(accommodationOptionInstance);
                        }
                    }
                    else {
                        this.accommodationOption = [];
                    }
                }
                Object.defineProperty(Accommodation.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of Accommodation';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Accommodation.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of Accommodation';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Accommodation.prototype, "Rating", {
                    get: function () {
                        return this.rating;
                    },
                    set: function (rating) {
                        if (rating === undefined) {
                            throw 'Please supply rating accommodation value of school';
                        }
                        this.rating = rating;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Accommodation.prototype, "AccommodationOption", {
                    get: function () {
                        return this.accommodationOption;
                    },
                    enumerable: true,
                    configurable: true
                });
                Accommodation.prototype.addAccommodationOption = function (accommodationOption) {
                    if (accommodationOption === undefined) {
                        throw 'Please supply accommodation option value (Add)';
                    }
                    this.accommodationOption.push(accommodationOption);
                };
                Accommodation.prototype.editAccommodationOption = function (accommodationOption) {
                    if (accommodationOption === undefined) {
                        throw 'Please supply Accommodation Option value (Edit)';
                    }
                    this.accommodationOption.forEach(function (element, index, array) {
                        if (accommodationOption.Id === element.Id) {
                            array[index] = accommodationOption;
                        }
                    });
                };
                return Accommodation;
            }());
            school.Accommodation = Accommodation;
            var AccommodationOption = (function () {
                function AccommodationOption(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('Accommodation Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.category = obj.category || 0;
                    this.otherAmenities = obj.otherAmenities || '';
                    this.price = obj.price || 0;
                    this.amenities = obj.amenities || [];
                    this.terms = obj.terms || '';
                }
                Object.defineProperty(AccommodationOption.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of Accommodation';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of Accommodation';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Category", {
                    get: function () {
                        return this.category;
                    },
                    set: function (category) {
                        if (category === undefined) {
                            throw 'Please supply category value of Accommodation';
                        }
                        this.category = category;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "OtherAmenities", {
                    get: function () {
                        return this.otherAmenities;
                    },
                    set: function (otherAmenities) {
                        if (otherAmenities === undefined) {
                            throw 'Please supply other amenities value of Accommodation';
                        }
                        this.otherAmenities = otherAmenities;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply price value of Accommodation';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Amenities", {
                    get: function () {
                        return this.amenities;
                    },
                    set: function (amenities) {
                        if (amenities === undefined) {
                            throw 'Please supply amenities option value of Accommodation';
                        }
                        this.amenities = amenities;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AccommodationOption.prototype, "Terms", {
                    get: function () {
                        return this.terms;
                    },
                    set: function (terms) {
                        if (terms === undefined) {
                            throw 'Please supply terms value of Accommodation';
                        }
                        this.terms = terms;
                    },
                    enumerable: true,
                    configurable: true
                });
                return AccommodationOption;
            }());
            school.AccommodationOption = AccommodationOption;
            var Price = (function () {
                function Price(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Price Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.privateClass = new PrivateClass(obj.privateClass);
                    this.groupClass = new GroupClass(obj.groupClass);
                }
                Object.defineProperty(Price.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School Price';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School Price';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "PrivateClass", {
                    get: function () {
                        return this.privateClass;
                    },
                    set: function (privateClass) {
                        if (privateClass === undefined) {
                            throw 'Please supply privateClass value of School Price';
                        }
                        this.privateClass = privateClass;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Price.prototype, "GroupClass", {
                    get: function () {
                        return this.groupClass;
                    },
                    set: function (groupClass) {
                        if (groupClass === undefined) {
                            throw 'Please supply groupClass value of School Price';
                        }
                        this.groupClass = groupClass;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Price;
            }());
            school.Price = Price;
            var PrivateClass = (function () {
                function PrivateClass(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Private classes Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.generalType = new ClassType(obj.generalType);
                    this.intensiveType = new ClassType(obj.intensiveType);
                }
                Object.defineProperty(PrivateClass.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School Private classes';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PrivateClass.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School Private classes';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PrivateClass.prototype, "GeneralType", {
                    get: function () {
                        return this.generalType;
                    },
                    set: function (generalType) {
                        if (generalType === undefined) {
                            throw 'Please supply general type value of School Private classes';
                        }
                        this.generalType = generalType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PrivateClass.prototype, "IntensiveType", {
                    get: function () {
                        return this.intensiveType;
                    },
                    set: function (intensiveType) {
                        if (intensiveType === undefined) {
                            throw 'Please supply intensive type value of School Private classes';
                        }
                        this.intensiveType = intensiveType;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PrivateClass;
            }());
            school.PrivateClass = PrivateClass;
            var GroupClass = (function () {
                function GroupClass(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Group classes Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.generalType = new GroupType(obj.generalType);
                    this.intensiveType = new GroupType(obj.intensiveType);
                }
                Object.defineProperty(GroupClass.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School Group classes';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GroupClass.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School Group classes';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GroupClass.prototype, "GeneralType", {
                    get: function () {
                        return this.generalType;
                    },
                    set: function (generalType) {
                        if (generalType === undefined) {
                            throw 'Please supply general type value of School Group classes';
                        }
                        this.generalType = generalType;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GroupClass.prototype, "IntensiveType", {
                    get: function () {
                        return this.intensiveType;
                    },
                    set: function (intensiveType) {
                        if (intensiveType === undefined) {
                            throw 'Please supply intensive type value of School Group classes';
                        }
                        this.intensiveType = intensiveType;
                    },
                    enumerable: true,
                    configurable: true
                });
                return GroupClass;
            }());
            school.GroupClass = GroupClass;
            var ClassType = (function () {
                function ClassType(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School classes Type Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.value = obj.value || 0;
                    this.hour = obj.hour || 0;
                    this.terms = obj.terms || '';
                }
                Object.defineProperty(ClassType.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School classes type';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassType.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School classes type';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassType.prototype, "Value", {
                    get: function () {
                        return this.value;
                    },
                    set: function (value) {
                        if (value === undefined) {
                            throw 'Please supply price value of School classes type';
                        }
                        this.value = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassType.prototype, "Hour", {
                    get: function () {
                        return this.hour;
                    },
                    set: function (hour) {
                        if (hour === undefined) {
                            throw 'Please supply hour value of School classes type';
                        }
                        this.hour = hour;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ClassType.prototype, "Terms", {
                    get: function () {
                        return this.terms;
                    },
                    set: function (terms) {
                        if (terms === undefined) {
                            throw 'Please supply terms value of School classes type';
                        }
                        this.terms = terms;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ClassType;
            }());
            school.ClassType = ClassType;
            var GroupType = (function (_super) {
                __extends(GroupType, _super);
                function GroupType(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School group classes Type Model instanced');
                    if (obj === null)
                        obj = {};
                    _super.call(this, obj);
                    this.student = obj.student || [];
                }
                Object.defineProperty(GroupType.prototype, "Student", {
                    get: function () {
                        return this.student;
                    },
                    set: function (student) {
                        if (student === undefined) {
                            throw 'Please supply student value of School group classes type';
                        }
                        this.student = student;
                    },
                    enumerable: true,
                    configurable: true
                });
                return GroupType;
            }(ClassType));
            school.GroupType = GroupType;
            var Discount = (function () {
                function Discount(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Discount Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.option = obj.option || [];
                }
                Object.defineProperty(Discount.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School discount';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Discount.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School discount';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Discount.prototype, "Option", {
                    get: function () {
                        return this.option;
                    },
                    set: function (option) {
                        if (option === undefined) {
                            throw 'Please supply option value of School discount';
                        }
                        this.option = option;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Discount;
            }());
            school.Discount = Discount;
            var PaymentMethod = (function () {
                function PaymentMethod(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Payment Methods Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.methods = obj.methods || [];
                    this.other = obj.other || [];
                }
                Object.defineProperty(PaymentMethod.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School payment methods';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaymentMethod.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School payment methods';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaymentMethod.prototype, "Methods", {
                    get: function () {
                        return this.methods;
                    },
                    set: function (methods) {
                        if (methods === undefined) {
                            throw 'Please supply methods value of School payment methods';
                        }
                        this.methods = methods;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PaymentMethod.prototype, "Other", {
                    get: function () {
                        return this.other;
                    },
                    set: function (other) {
                        if (other === undefined) {
                            throw 'Please supply other value of School payment methods';
                        }
                        this.other = other;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PaymentMethod;
            }());
            school.PaymentMethod = PaymentMethod;
            var BookingFee = (function () {
                function BookingFee(obj) {
                    if (obj === void 0) { obj = {}; }
                    console.log('School Booking Fee Model instanced');
                    if (obj === null)
                        obj = {};
                    this.id = obj.id;
                    this.active = obj.active || false;
                    this.price = obj.price || 0;
                    this.terms = obj.terms || '';
                }
                Object.defineProperty(BookingFee.prototype, "Id", {
                    get: function () {
                        return this.id;
                    },
                    set: function (id) {
                        if (id === undefined) {
                            throw 'Please supply id value of School booking fee';
                        }
                        this.id = id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BookingFee.prototype, "Active", {
                    get: function () {
                        return this.active;
                    },
                    set: function (active) {
                        if (active === undefined) {
                            throw 'Please supply active value of School booking fee';
                        }
                        this.active = active;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BookingFee.prototype, "Price", {
                    get: function () {
                        return this.price;
                    },
                    set: function (price) {
                        if (price === undefined) {
                            throw 'Please supply price value of School booking fee';
                        }
                        this.price = price;
                    },
                    enumerable: true,
                    configurable: true
                });
                return BookingFee;
            }());
            school.BookingFee = BookingFee;
        })(school = models.school || (models.school = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/school/school.model.js.map

var app;
(function (app) {
    var models;
    (function (models) {
        var school;
        (function (school) {
            'use strict';
            var SchoolService = (function () {
                function SchoolService(restApi, AuthService, $q) {
                    this.restApi = restApi;
                    this.AuthService = AuthService;
                    this.$q = $q;
                    DEBUG && console.log('schools service instanced');
                    this.SCHOOL_URI = 'schools';
                    this.USER_SCHOOL_URI = 'schools?userId=';
                }
                SchoolService.prototype.getSchoolById = function (id) {
                    var self = this;
                    var url = this.SCHOOL_URI;
                    var deferred = this.$q.defer();
                    this.restApi.show({ url: url, id: id }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                SchoolService.prototype.getSchoolByUserId = function (userId) {
                    var self = this;
                    var url = this.USER_SCHOOL_URI + userId;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        if (response.results) {
                            var res = response.results[0] ? response.results[0] : '';
                            deferred.resolve(res);
                        }
                        else {
                            DEBUG && console.error(response);
                            deferred.reject(response);
                        }
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                SchoolService.prototype.getAllSchools = function () {
                    var self = this;
                    var url = this.SCHOOL_URI;
                    var deferred = this.$q.defer();
                    this.restApi.queryObject({ url: url }).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        if (error.statusText == 'Unauthorized') {
                            self.AuthService.logout();
                        }
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                SchoolService.serviceId = 'mainApp.models.school.SchoolService';
                SchoolService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    'mainApp.auth.AuthService',
                    '$q'
                ];
                return SchoolService;
            }());
            school.SchoolService = SchoolService;
            angular
                .module('mainApp.models.school', [])
                .service(SchoolService.serviceId, SchoolService);
        })(school = models.school || (models.school = {}));
    })(models = app.models || (app.models = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/models/school/school.service.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.components.header', [])
        .config(config);
    function config() { }
})();

//# sourceMappingURL=../../../maps/components/header/header.config.js.map

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
            MaHeader.directiveId = 'maHeader';
            return MaHeader;
        }());
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
                if (this.$rootScope.profileData) {
                    this.isTeacher = this.$rootScope.profileData.IsTeacher;
                }
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
                var CLICK_MIXPANEL = 'Click: Search Teacher on SearchBox';
                var currentState = this.$state.current.name;
                this.form.whereTo = country;
                mixpanel.track(CLICK_MIXPANEL);
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
            };
            HeaderController.prototype._openLogInModal = function () {
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
                    if (self.$rootScope.profileData) {
                        self.isTeacher = self.$rootScope.profileData.IsTeacher;
                    }
                });
            };
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
            return HeaderController;
        }());
        header.HeaderController = HeaderController;
        angular.module('mainApp.components.header')
            .controller(HeaderController.controllerId, HeaderController);
    })(header = components.header || (components.header = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/header/header.directive.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.components.sideMenu', [])
        .config(config);
    function config() { }
})();

//# sourceMappingURL=../../../maps/components/sideMenu/sideMenu.config.js.map

var components;
(function (components) {
    var sideMenu;
    (function (sideMenu) {
        'use strict';
        var MaSideMenu = (function () {
            function MaSideMenu() {
                this.bindToController = true;
                this.controller = SideMenuController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = {
                    type: '@',
                    viewProfileBtn: '=',
                    viewProfileId: '@'
                };
                this.templateUrl = 'components/sideMenu/sideMenu.html';
                DEBUG && console.log('maSideMenu directive constructor');
            }
            MaSideMenu.prototype.link = function ($scope, elm, attr) {
                DEBUG && console.log('maSideMenu link function');
            };
            MaSideMenu.instance = function () {
                return new MaSideMenu();
            };
            MaSideMenu.directiveId = 'maSideMenu';
            return MaSideMenu;
        }());
        angular
            .module('mainApp.components.sideMenu')
            .directive(MaSideMenu.directiveId, MaSideMenu.instance);
        var SideMenuController = (function () {
            function SideMenuController($state, $filter) {
                this.$state = $state;
                this.$filter = $filter;
                this.init();
            }
            SideMenuController.prototype.init = function () {
                this.activate();
            };
            SideMenuController.prototype.activate = function () {
                DEBUG && console.log('sideMenu controller actived');
                this._buildSideMenunOptions();
            };
            SideMenuController.prototype._buildSideMenunOptions = function () {
                var type = this.type;
                var BASIC_INFO_OPTION = this.$filter('translate')('%profile.teacher.edit_profile.button.text');
                var PHOTO_OPTION = this.$filter('translate')('%edit.profile.edit_photo.option.button.text');
                var LOCATION_OPTION = this.$filter('translate')('%edit.profile.edit_location.option.button.text');
                var TEACH_OPTION = this.$filter('translate')('%edit.teacher.menu.option.teach.label.text');
                var EXPERIENCE_OPTION = this.$filter('translate')('%landing.teacher.badge_explanation.get.first_requirement.title.text');
                var EDUCATION_OPTION = this.$filter('translate')('%edit.teacher.education.menu.option.text');
                var METHODOLOGY_OPTION = this.$filter('translate')('%search.container.teacher.methodology.title.text');
                var PRICE_OPTION = this.$filter('translate')('%search.container.teacher.price.title.text');
                switch (type) {
                    case 'edit-teacher':
                        this.optionsList = [
                            {
                                name: TEACH_OPTION,
                                state: 'page.editTeacher.teach'
                            },
                            {
                                name: EXPERIENCE_OPTION,
                                state: 'page.editTeacher.experience'
                            },
                            {
                                name: EDUCATION_OPTION,
                                state: 'page.editTeacher.education'
                            },
                            {
                                name: METHODOLOGY_OPTION,
                                state: 'page.editTeacher.methodology'
                            },
                            {
                                name: PRICE_OPTION,
                                state: 'page.editTeacher.price'
                            }
                        ];
                        break;
                    case 'edit-profile':
                        this.optionsList = [
                            {
                                name: BASIC_INFO_OPTION,
                                state: 'page.editProfile.basicInfo'
                            },
                            {
                                name: PHOTO_OPTION,
                                state: 'page.editProfile.media'
                            },
                            {
                                name: LOCATION_OPTION,
                                state: 'page.editProfile.location'
                            }
                        ];
                        break;
                }
            };
            SideMenuController.prototype._currentState = function (state) {
                var currentState = this.$state.current.name;
                return state === currentState;
            };
            SideMenuController.prototype._goToSection = function (state) {
                this.$state.go(state, { reload: true });
            };
            SideMenuController.prototype._goToViewProfile = function () {
                var id = this.viewProfileId;
                var state = this.type == 'edit-teacher' ? 'page.teacherProfilePage' : 'page.userProfilePage';
                var url = this.$state.href(state, { id: id });
                window.open(url, '_blank');
            };
            SideMenuController.controllerId = 'mainApp.components.sideMenu.SideMenuController';
            SideMenuController.$inject = ['$state', '$filter'];
            return SideMenuController;
        }());
        sideMenu.SideMenuController = SideMenuController;
        angular.module('mainApp.components.sideMenu')
            .controller(SideMenuController.controllerId, SideMenuController);
    })(sideMenu = components.sideMenu || (components.sideMenu = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/sideMenu/sideMenu.directive.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.components.rating', [])
        .config(config);
    function config() { }
})();

//# sourceMappingURL=../../../maps/components/rating/rating.config.js.map

var components;
(function (components) {
    var rating;
    (function (rating) {
        'use strict';
        var MaRating = (function () {
            function MaRating() {
                this.bindToController = true;
                this.controller = RatingController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.scope = {
                    ratingValue: '=',
                    size: '@'
                };
                this.templateUrl = 'components/rating/rating.html';
                console.log('maRating directive constructor');
            }
            MaRating.prototype.link = function ($scope, elm, attr) {
                console.log('maRating link function');
            };
            MaRating.instance = function () {
                return new MaRating();
            };
            MaRating.directiveId = 'maRating';
            return MaRating;
        }());
        angular
            .module('mainApp.components.rating')
            .directive(MaRating.directiveId, MaRating.instance);
        var RatingController = (function () {
            function RatingController() {
                this.init();
            }
            RatingController.prototype.init = function () {
                this._ratingList = [];
                this.activate();
            };
            RatingController.prototype.activate = function () {
                console.log('rating controller actived');
                this._calcuteStars();
            };
            RatingController.prototype._calcuteStars = function () {
                var value = this.ratingValue;
                var halfValue = value / 2;
                for (var i = 0; i < 5; i++) {
                    if (halfValue >= 1) {
                        this._ratingList.push('star');
                    }
                    else if (halfValue == 0.5) {
                        this._ratingList.push('star_half');
                    }
                    else if (halfValue <= 0) {
                        this._ratingList.push('star_border');
                    }
                    halfValue = halfValue - 1;
                }
            };
            RatingController.prototype._assignClass = function () {
                return 'ma-stars__icon--' + this.size;
            };
            RatingController.controllerId = 'mainApp.components.rating.RatingController';
            return RatingController;
        }());
        rating.RatingController = RatingController;
        angular.module('mainApp.components.rating')
            .controller(RatingController.controllerId, RatingController);
    })(rating = components.rating || (components.rating = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/rating/rating.directive.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.components.meter', [])
        .config(config);
    function config() { }
})();

//# sourceMappingURL=../../../maps/components/meter/meter.config.js.map

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

(function () {
    'use strict';
    angular
        .module('mainApp.components.footer', [])
        .config(config);
    function config() { }
})();

//# sourceMappingURL=../../../maps/components/footer/footer.config.js.map

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

(function () {
    'use strict';
    angular
        .module('mainApp.components.floatMessageBar', [])
        .config(config);
    function config() { }
})();

//# sourceMappingURL=../../../maps/components/floatMessageBar/floatMessageBar.config.js.map

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

(function () {
    'use strict';
    angular
        .module('mainApp.components.map', [])
        .config(config);
    function config() { }
})();

//# sourceMappingURL=../../../maps/components/map/map.config.js.map

var components;
(function (components) {
    var map;
    (function (map) {
        'use strict';
        var MaMap = (function () {
            function MaMap() {
                this.bindToController = true;
                this.controller = MapController.controllerId;
                this.controllerAs = 'vm';
                this.restrict = 'E';
                this.transclude = true;
                this.scope = {
                    mapConfig: '='
                };
                this.templateUrl = 'components/map/map.html';
                console.log('maMap directive constructor');
            }
            MaMap.prototype.link = function ($scope, elm, attr) {
                console.log('maMap link function');
            };
            MaMap.instance = function () {
                return new MaMap();
            };
            MaMap.directiveId = 'maMap';
            return MaMap;
        }());
        angular
            .module('mainApp.components.map')
            .directive(MaMap.directiveId, MaMap.instance);
        var MapController = (function () {
            function MapController($scope, $rootScope, $timeout) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.$timeout = $timeout;
                this.init();
            }
            MapController.prototype.init = function () {
                this.RED_PIN = 'assets/images/red-pin.png';
                this.POSITION_PIN = 'assets/images/red-pin.png';
                this.GREEN_PIN = 'assets/images/green-pin.png';
                this.SCHOOL_PIN = 'assets/images/school-pin.png';
                var self = this;
                this._map;
                this._draggable = false;
                this.mapId = 'ma-map-' + Math.floor((Math.random() * 100) + 1);
                this._infoWindow = null;
                this._markers = [];
                this.$scope.options = null;
                switch (this.mapConfig.type) {
                    case 'search-map':
                        this._searchMapBuilder();
                        break;
                    case 'drag-maker-map':
                        this._dragMarkerMapBuilder();
                        break;
                    case 'location-circle-map':
                        this._locationCircleMapBuilder();
                        break;
                    case 'location-marker-map':
                        this._locationMarkerMapBuilder();
                        break;
                }
                this.activate();
            };
            MapController.prototype.activate = function () {
                console.log('map controller actived');
                this._subscribeToEvents();
            };
            MapController.prototype._searchMapBuilder = function () {
                var self = this;
                var zoom = this.mapConfig.data.zoom || 16;
                var center = this.mapConfig.data.position;
                this._draggable = false;
                this.$scope.options = {
                    center: new google.maps.LatLng(center.lat, center.lng),
                    zoom: zoom,
                    mapTypeControl: false,
                    zoomControl: true,
                    streetViewControl: false,
                    scrollwheel: false,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.TOP_LEFT
                    }
                };
                if (this._map === void 0) {
                    this.$timeout(function () {
                        self._map = new google.maps.Map(document.getElementById(self.mapId), self.$scope.options);
                        for (var i = 0; i < self.mapConfig.data.markers.length; i++) {
                            var marker = self.mapConfig.data.markers[i];
                            self._setMarker(marker.id, new google.maps.LatLng(marker.position.lat, marker.position.lng), self.GREEN_PIN);
                        }
                    });
                }
            };
            MapController.prototype._dragMarkerMapBuilder = function () {
                var self = this;
                var zoom = this.mapConfig.data.zoom || 17;
                var center = this.mapConfig.data.position;
                this._draggable = true;
                this.$scope.options = {
                    center: new google.maps.LatLng(center.lat, center.lng),
                    zoom: zoom,
                    mapTypeControl: false,
                    zoomControl: true,
                    streetViewControl: false,
                    scrollwheel: false,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.TOP_LEFT
                    }
                };
                if (this._map === void 0) {
                    this.$timeout(function () {
                        self._map = new google.maps.Map(document.getElementById(self.mapId), self.$scope.options);
                        for (var i = 0; i < self.mapConfig.data.markers.length; i++) {
                            var marker = self.mapConfig.data.markers[i];
                            self._setMarker(marker.id, new google.maps.LatLng(marker.position.lat, marker.position.lng), self.POSITION_PIN);
                        }
                    });
                }
            };
            MapController.prototype._locationCircleMapBuilder = function () {
                var self = this;
                var zoom = this.mapConfig.data.zoom || 16;
                var center = this.mapConfig.data.position;
                var circle_strokeColor = '#ff5a5f';
                var circle_strokeOpacity = 0.8;
                var circle_strokeWeight = 2;
                var circle_fillColor = '#ff5a5f';
                var circle_fillOpacity = 0.35;
                var circle_center = {
                    lat: 6.1739743,
                    lng: -75.5822414
                };
                var circle_radius = 140;
                this._draggable = false;
                this.$scope.options = {
                    center: new google.maps.LatLng(center.lat, center.lng),
                    zoom: zoom,
                    mapTypeControl: false,
                    zoomControl: true,
                    streetViewControl: false,
                    scrollwheel: false,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                };
                if (this._map === void 0) {
                    this.$timeout(function () {
                        self._map = new google.maps.Map(document.getElementById(self.mapId), self.$scope.options);
                        var circle = new google.maps.Circle({
                            strokeColor: circle_strokeColor,
                            strokeOpacity: circle_strokeOpacity,
                            strokeWeight: circle_strokeWeight,
                            fillColor: circle_fillColor,
                            fillOpacity: circle_fillOpacity,
                            map: self._map,
                            center: new google.maps.LatLng(center.lat, center.lng),
                            radius: circle_radius
                        });
                    });
                }
            };
            MapController.prototype._locationMarkerMapBuilder = function () {
                var self = this;
                var zoom = this.mapConfig.data.zoom || 16;
                var center = this.mapConfig.data.position;
                this._draggable = false;
                this.$scope.options = {
                    center: new google.maps.LatLng(center.lat, center.lng),
                    zoom: zoom,
                    mapTypeControl: false,
                    zoomControl: true,
                    streetViewControl: false,
                    scrollwheel: false,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.TOP_RIGHT
                    }
                };
                if (this._map === void 0) {
                    this.$timeout(function () {
                        self._map = new google.maps.Map(document.getElementById(self.mapId), self.$scope.options);
                        for (var i = 0; i < self.mapConfig.data.markers.length; i++) {
                            var marker = self.mapConfig.data.markers[i];
                            self._setMarker(marker.id, new google.maps.LatLng(marker.position.lat, marker.position.lng), self.SCHOOL_PIN);
                        }
                    });
                }
            };
            MapController.prototype._setMarker = function (id, position, icon) {
                var self = this;
                var marker;
                var markerOptions = {
                    id: id,
                    position: position,
                    map: this._map,
                    icon: icon,
                    draggable: this._draggable
                };
                marker = new google.maps.Marker(markerOptions);
                this._markers.push(marker);
                if (this._map) {
                    this._map.setCenter(position);
                }
                if (this._draggable) {
                    google.maps.event.addListener(marker, 'dragend', function (event) {
                        var position = {
                            lng: this.getPosition().lng(),
                            lat: this.getPosition().lat()
                        };
                        self.$scope.$emit('Position', position);
                    });
                }
                if (this.mapConfig.type === 'search-map') {
                    google.maps.event.addListener(marker, 'click', function (event) {
                        for (var i = 0; i < self._markers.length; i++) {
                            if (self._markers[i].id === marker.id) {
                                self._markers[i].setIcon(self.GREEN_PIN);
                            }
                            else {
                                self._markers[i].setIcon(self.RED_PIN);
                            }
                        }
                        self.$scope.$emit('SelectContainer', marker.id);
                    });
                }
            };
            MapController.prototype._removeMarkers = function () {
                for (var i = 0; i < this._markers.length; i++) {
                    this._markers[i].setMap(null);
                }
            };
            MapController.prototype._createFilterButtons = function () {
                var buttons = ['Students', 'Teachers', 'Schools'];
                for (var i = 0; i < buttons.length; i++) {
                    var controlDiv = document.createElement('div');
                    var control = this._filterControl(controlDiv, buttons[i]);
                    this._map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
                }
            };
            MapController.prototype._filterControl = function (controlDiv, type) {
                var self = this;
                var defaultBtn = 'Students';
                var className = 'filterBtnMap';
                var background_color = 'rgb(255, 255, 255)';
                var background_color_active = '#00B592';
                var border_radius = '3px';
                var box_shadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
                var cursor = 'pointer';
                var margin_top = '10px';
                var margin_bottom = '22px';
                var margin_right = '10px';
                var text_align = 'center';
                var title = 'Click to search' + type;
                var color = '#4E4E4E';
                var color_active = '#FFF';
                var font_family = 'Roboto,Arial,sans-serif';
                var font_size = '15px';
                var line_height = '10px';
                var padding_top = '10px';
                var padding_bottom = '10px';
                var padding_left = '20px';
                var padding_right = '20px';
                var border_bottom = '0 hidden transparent';
                var border_bottom_active = '2px solid #018a6f';
                var controlUI = document.createElement('div');
                controlUI.className = className;
                controlUI.style.borderRadius = border_radius;
                controlUI.style.boxShadow = box_shadow;
                controlUI.style.cursor = cursor;
                controlUI.style.marginTop = margin_top;
                controlUI.style.marginBottom = margin_bottom;
                controlUI.style.marginRight = margin_right;
                controlUI.style.textAlign = text_align;
                controlUI.title = title;
                if (type === defaultBtn) {
                    controlUI.style.backgroundColor = background_color_active;
                    controlUI.style.borderBottom = border_bottom_active;
                }
                else {
                    controlUI.style.backgroundColor = background_color;
                }
                controlDiv.appendChild(controlUI);
                var controlText = document.createElement('div');
                controlText.style.fontFamily = font_family;
                controlText.style.fontSize = font_size;
                controlText.style.lineHeight = line_height;
                controlText.style.paddingTop = padding_top;
                controlText.style.paddingBottom = padding_bottom;
                controlText.style.paddingLeft = padding_left;
                controlText.style.paddingRight = padding_right;
                controlText.innerHTML = type;
                if (type === defaultBtn) {
                    controlText.style.color = color_active;
                }
                else {
                    controlText.style.color = color;
                }
                controlUI.appendChild(controlText);
                controlUI.addEventListener('click', function (e) {
                    var element = this;
                    var child = this.children[0];
                    var filterBtn = document.getElementsByClassName(className);
                    for (var i = 0; i < filterBtn.length; i++) {
                        filterBtn[i].style.backgroundColor = background_color;
                        filterBtn[i].style.borderBottom = border_bottom;
                        filterBtn[i].children[0].style.color = color;
                    }
                    element.style.backgroundColor = background_color_active;
                    element.style.borderBottom = border_bottom_active;
                    child.style.color = color_active;
                    self.$scope.$emit(type);
                });
            };
            MapController.prototype._codeAddress = function (geocoder, country, address, city) {
                var self = this;
                var location = country + ',' + city + ',' + address;
                geocoder.geocode({
                    address: location
                }, function (results, status) {
                    if (status == 'OK') {
                        self._removeMarkers();
                        self._setMarker('1', results[0].geometry.location, self.RED_PIN);
                        var position = {
                            lng: results[0].geometry.location.lng(),
                            lat: results[0].geometry.location.lat()
                        };
                        self.$scope.$emit('Position', position);
                    }
                    else {
                        console.log(status);
                    }
                });
            };
            MapController.prototype._positionCountry = function (geocoder, country, address, city) {
                var self = this;
                var location = country + ',' + city + ',' + address;
                geocoder.geocode({
                    address: location
                }, function (results, status) {
                    if (status == 'OK') {
                        self._map.setCenter(results[0].geometry.location);
                        if (self.mapConfig.data.zoom) {
                            self._map.setZoom(self.mapConfig.data.zoom);
                        }
                    }
                    else {
                        console.log(status);
                    }
                });
            };
            MapController.prototype._subscribeToEvents = function () {
                var self = this;
                this.$scope.$on('BuildMarkers', function (event, args) {
                    self.mapConfig = args;
                    self._removeMarkers();
                    for (var i = 0; i < self.mapConfig.data.markers.length; i++) {
                        var marker = self.mapConfig.data.markers[i];
                        self._setMarker(marker.id, new google.maps.LatLng(marker.position.lat, marker.position.lng), self.RED_PIN);
                    }
                });
                this.$scope.$on('ChangeMarker', function (event, args) {
                    var markerId = args.id;
                    var status = args.status;
                    for (var i = 0; i < self._markers.length; i++) {
                        if (self._markers[i].id === markerId) {
                            if (status === true) {
                                self._markers[i].setIcon(self.GREEN_PIN);
                            }
                            else {
                                self._markers[i].setIcon(self.RED_PIN);
                            }
                        }
                        else {
                            self._markers[i].setIcon(self.RED_PIN);
                        }
                    }
                });
                this.$scope.$on('CodeAddress', function (event, args) {
                    var geocoder = new google.maps.Geocoder();
                    self._codeAddress(geocoder, args.country, args.address, args.city);
                });
                this.$scope.$on('PositionCountry', function (event, args) {
                    var geocoder = new google.maps.Geocoder();
                    self._positionCountry(geocoder, args.country, args.address, args.city);
                });
            };
            MapController.controllerId = 'mainApp.components.map.MapController';
            MapController.$inject = ['$scope', '$rootScope', '$timeout'];
            return MapController;
        }());
        map.MapController = MapController;
        angular.module('mainApp.components.map')
            .controller(MapController.controllerId, MapController);
    })(map = components.map || (components.map = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../maps/components/map/map.directive.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.components.modal', [])
        .config(config);
    function config() { }
})();

//# sourceMappingURL=../../../maps/components/modal/modal.config.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalWelcome;
        (function (modalWelcome) {
            var ModalWelcomeController = (function () {
                function ModalWelcomeController($uibModalInstance, dataConfig, $uibModal) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                ModalWelcomeController.prototype._init = function () {
                    var self = this;
                    this.activate();
                };
                ModalWelcomeController.prototype.activate = function () {
                    DEBUG && console.log('modalWelcome controller actived');
                };
                ModalWelcomeController.prototype._openPhotoModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalPhotoTmpl,
                        controller: 'mainApp.components.modal.ModalPhotoController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalWelcomeController.controllerId = 'mainApp.components.modal.ModalWelcomeController';
                ModalWelcomeController.$inject = [
                    '$uibModalInstance',
                    'dataConfig',
                    '$uibModal'
                ];
                return ModalWelcomeController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalWelcomeController.controllerId, ModalWelcomeController);
        })(modalWelcome = modal.modalWelcome || (modal.modalWelcome = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../../maps/components/modal/modalCreateUser/modalWelcome/modalWelcome.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalPhoto;
        (function (modalPhoto) {
            var ModalPhotoController = (function () {
                function ModalPhotoController(userService, S3UploadService, $uibModalInstance, messageUtil, Upload, dataConfig, $uibModal, $rootScope) {
                    this.userService = userService;
                    this.S3UploadService = S3UploadService;
                    this.$uibModalInstance = $uibModalInstance;
                    this.messageUtil = messageUtil;
                    this.Upload = Upload;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                ModalPhotoController.prototype._init = function () {
                    var self = this;
                    this.uploading = false;
                    this.form = {
                        avatar: null,
                        croppedDataUrl: '',
                        thumbnail: ''
                    };
                    this.validate = {
                        avatar: { valid: true, message: '' },
                        thumbnail: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalPhotoController.prototype.activate = function () {
                    DEBUG && console.log('modalPhoto controller actived');
                };
                ModalPhotoController.prototype._resizeImage = function () {
                    var self = this;
                    var newName = app.core.util.functionsUtil.FunctionsUtilService.generateGuid() + '.jpeg';
                    var options = {
                        width: 250,
                        height: 250,
                        quality: 1.0,
                        type: 'image/jpeg',
                        pattern: '.jpg',
                        restoreExif: false
                    };
                    var file = this.Upload.dataUrltoBlob(this.form.croppedDataUrl, newName);
                    return this.Upload.resize(file, options).then(function (resizedFile) {
                        if (resizedFile) {
                            return self._uploadImage(resizedFile).then(function (result) {
                                return result;
                            });
                        }
                        else {
                            self.messageUtil.error('Hubo un problema al redimensionar la foto, intenta nuevamente por favor.');
                        }
                    });
                };
                ModalPhotoController.prototype._uploadImage = function (resizedFile) {
                    var self = this;
                    return this.S3UploadService.upload(resizedFile).then(function (result) {
                        return result;
                    }, function (error) {
                        console.log('error', error);
                        return error;
                    });
                };
                ModalPhotoController.prototype._parseData = function (avatar) {
                    this.$rootScope.profileData.Avatar = avatar;
                };
                ModalPhotoController.prototype._goToNext = function () {
                    var self = this;
                    this.uploading = true;
                    if (this.form.avatar) {
                        this._resizeImage().then(function (result) {
                            if (result.Location) {
                                self._parseData(result.Location);
                                self.userService.updateUserProfile(self.$rootScope.profileData)
                                    .then(function (response) {
                                    if (response.userId) {
                                        self.uploading = false;
                                        self._openBornModal();
                                    }
                                });
                            }
                            else {
                                self.messageUtil.error('');
                            }
                        });
                    }
                    else {
                        this._openBornModal();
                    }
                };
                ModalPhotoController.prototype._openBornModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalBornTmpl,
                        controller: 'mainApp.components.modal.ModalBornController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalPhotoController.controllerId = 'mainApp.components.modal.ModalPhotoController';
                ModalPhotoController.$inject = [
                    'mainApp.models.user.UserService',
                    'mainApp.core.s3Upload.S3UploadService',
                    '$uibModalInstance',
                    'mainApp.core.util.messageUtilService',
                    'Upload',
                    'dataConfig',
                    '$uibModal',
                    '$rootScope'
                ];
                return ModalPhotoController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalPhotoController.controllerId, ModalPhotoController);
        })(modalPhoto = modal.modalPhoto || (modal.modalPhoto = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../../maps/components/modal/modalCreateUser/modalPhoto/modalPhoto.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalBorn;
        (function (modalBorn) {
            var ModalBornController = (function () {
                function ModalBornController(userService, getDataFromJson, functionsUtilService, $uibModalInstance, dataConfig, $filter, $uibModal, $rootScope) {
                    this.userService = userService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.$filter = $filter;
                    this.$uibModal = $uibModal;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                ModalBornController.prototype._init = function () {
                    var BIRTHDATE_TOOLTIP = this.$filter('translate')('%tooltip.modal_born.birthdate.text');
                    var COUNTRY_BIRTH_TOOLTIP = this.$filter('translate')('%tooltip.modal_born.cntry_birth.text');
                    var CITY_BIRTH_TOOLTIP = this.$filter('translate')('%tooltip.modal_born.city_birth.text');
                    var self = this;
                    this.form = {
                        country: '',
                        city: '',
                        birthDate: null
                    };
                    this.tooltip = {
                        birthDate: BIRTHDATE_TOOLTIP,
                        countryBirth: COUNTRY_BIRTH_TOOLTIP,
                        cityBirth: CITY_BIRTH_TOOLTIP
                    };
                    this.dateObject = { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } };
                    this.countryObject = { code: '', value: '' };
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 2017);
                    this.validate = {
                        birthDate: {
                            day: { valid: true, message: '' },
                            month: { valid: true, message: '' },
                            year: { valid: true, message: '' },
                            valid: true,
                            message: ''
                        },
                        country: { valid: true, message: '' },
                        city: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalBornController.prototype.activate = function () {
                    DEBUG && console.log('modalBorn controller actived');
                };
                ModalBornController.prototype._openBasicInfoModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalBasicInfoTmpl,
                        controller: 'mainApp.components.modal.ModalBasicInfoController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalBornController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
                    this.validate.birthDate.valid = true;
                    var day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.day = this.functionsUtilService.validator(this.dateObject.day.value, day_birthdate_rules);
                    if (!this.validate.birthDate.day.valid) {
                        formValid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.birthDate.month = this.functionsUtilService.validator(this.dateObject.month.code, month_birthdate_rules);
                    if (!this.validate.birthDate.month.valid) {
                        formValid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.year = this.functionsUtilService.validator(this.dateObject.year.value, year_birthdate_rules);
                    if (!this.validate.birthDate.year.valid) {
                        formValid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var country_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.country = this.functionsUtilService.validator(this.countryObject.code, country_rules);
                    if (!this.validate.country.valid) {
                        formValid = this.validate.country.valid;
                    }
                    var city_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.city = this.functionsUtilService.validator(this.form.city, city_rules);
                    if (!this.validate.city.valid) {
                        formValid = this.validate.city.valid;
                    }
                    return formValid;
                };
                ModalBornController.prototype._parseData = function () {
                    var dateFormatted = this.functionsUtilService.joinDate(this.dateObject.day.value, this.dateObject.month.code, this.dateObject.year.value);
                    var countryCode = this.countryObject.code;
                    this.form.country = countryCode;
                    this.$rootScope.profileData.BirthDate = dateFormatted;
                    this.$rootScope.profileData.BornCountry = this.form.country;
                    this.$rootScope.profileData.BornCity = this.form.city;
                };
                ModalBornController.prototype._goToNext = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._parseData();
                        this.userService.updateUserProfile(this.$rootScope.profileData)
                            .then(function (response) {
                            if (response.userId) {
                                self._openBasicInfoModal();
                            }
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                ModalBornController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalBornController.controllerId = 'mainApp.components.modal.ModalBornController';
                ModalBornController.$inject = [
                    'mainApp.models.user.UserService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$uibModalInstance',
                    'dataConfig',
                    '$filter',
                    '$uibModal',
                    '$rootScope'
                ];
                return ModalBornController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalBornController.controllerId, ModalBornController);
        })(modalBorn = modal.modalBorn || (modal.modalBorn = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../../maps/components/modal/modalCreateUser/modalBorn/modalBorn.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalBasicInfo;
        (function (modalBasicInfo) {
            var ModalBasicInfoController = (function () {
                function ModalBasicInfoController(userService, getDataFromJson, functionsUtilService, $uibModalInstance, dataConfig, $filter, $uibModal, $rootScope) {
                    this.userService = userService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.$filter = $filter;
                    this.$uibModal = $uibModal;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                ModalBasicInfoController.prototype._init = function () {
                    var PHONE_NUMBER_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.phone_number.text');
                    var GENDER_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.gender.text');
                    var ABOUT_TOOLTIP = this.$filter('translate')('%tooltip.modal_basic_info.about.text');
                    var self = this;
                    this.genderObject = { gender: { code: '', value: '' } };
                    this.listGenders = this.getDataFromJson.getSexi18n();
                    this.tooltip = {
                        phoneNumber: PHONE_NUMBER_TOOLTIP,
                        gender: GENDER_TOOLTIP,
                        about: ABOUT_TOOLTIP
                    };
                    this.form = {
                        phoneNumber: '',
                        gender: '',
                        about: ''
                    };
                    this.validate = {
                        phoneNumber: { valid: true, message: '' },
                        gender: { valid: true, message: '' },
                        about: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalBasicInfoController.prototype.activate = function () {
                    DEBUG && console.log('modalBasicInfo controller actived');
                };
                ModalBasicInfoController.prototype._openFinishModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalFinishTmpl,
                        controller: 'mainApp.components.modal.ModalFinishController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalBasicInfoController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
                    var phoneNumber_rules = [NUMBER_ENUM];
                    var onlyNum = this.form.phoneNumber.replace(/\D+/g, "");
                    onlyNum = parseInt(onlyNum) || NaN;
                    this.validate.phoneNumber = this.functionsUtilService.validator(onlyNum, phoneNumber_rules);
                    if (!this.validate.phoneNumber.valid) {
                        formValid = this.validate.phoneNumber.valid;
                    }
                    var gender_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.gender = this.functionsUtilService.validator(this.genderObject.gender.code, gender_rules);
                    if (!this.validate.gender.valid) {
                        formValid = this.validate.gender.valid;
                    }
                    return formValid;
                };
                ModalBasicInfoController.prototype._parseData = function () {
                    var genderCode = this.genderObject.gender.code;
                    this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
                    this.$rootScope.profileData.Gender = genderCode;
                    this.$rootScope.profileData.About = this.form.about;
                };
                ModalBasicInfoController.prototype._goToNext = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._parseData();
                        this.userService.updateUserProfile(this.$rootScope.profileData)
                            .then(function (response) {
                            if (response.userId) {
                                self._openFinishModal();
                            }
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                ModalBasicInfoController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalBasicInfoController.controllerId = 'mainApp.components.modal.ModalBasicInfoController';
                ModalBasicInfoController.$inject = [
                    'mainApp.models.user.UserService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$uibModalInstance',
                    'dataConfig',
                    '$filter',
                    '$uibModal',
                    '$rootScope'
                ];
                return ModalBasicInfoController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalBasicInfoController.controllerId, ModalBasicInfoController);
        })(modalBasicInfo = modal.modalBasicInfo || (modal.modalBasicInfo = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../../maps/components/modal/modalCreateUser/modalBasicInfo/modalBasicInfo.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalFinish;
        (function (modalFinish) {
            var ModalFinishController = (function () {
                function ModalFinishController($uibModalInstance, dataConfig, $uibModal) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                ModalFinishController.prototype._init = function () {
                    var self = this;
                    this.activate();
                };
                ModalFinishController.prototype.activate = function () {
                    DEBUG && console.log('modalFinish controller actived');
                };
                ModalFinishController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalFinishController.controllerId = 'mainApp.components.modal.ModalFinishController';
                ModalFinishController.$inject = [
                    '$uibModalInstance',
                    'dataConfig',
                    '$uibModal'
                ];
                return ModalFinishController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalFinishController.controllerId, ModalFinishController);
        })(modalFinish = modal.modalFinish || (modal.modalFinish = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../../maps/components/modal/modalCreateUser/modalFinish/modalFinish.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalMeetingPoint;
        (function (modalMeetingPoint) {
            var ModalMeetingPointController = (function () {
                function ModalMeetingPointController($uibModalInstance, dataSetModal) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this._init();
                }
                ModalMeetingPointController.prototype._init = function () {
                    this.form = {};
                    this.error = {
                        message: ''
                    };
                    this.mapConfigModal = {
                        type: 'modal-assign-marker-map',
                        data: null
                    };
                    this.activate();
                };
                ModalMeetingPointController.prototype.activate = function () {
                    console.log('modalMeetingPoint controller actived');
                };
                ModalMeetingPointController.prototype.close = function () {
                    this.$uibModalInstance.close();
                    event.preventDefault();
                };
                ModalMeetingPointController.controllerId = 'mainApp.components.modal.ModalMeetingPointController';
                ModalMeetingPointController.$inject = [
                    '$uibModalInstance',
                    'dataSetModal'
                ];
                return ModalMeetingPointController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalMeetingPointController.controllerId, ModalMeetingPointController);
        })(modalMeetingPoint = modal.modalMeetingPoint || (modal.modalMeetingPoint = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalMeetingPoint/modalMeetingPoint.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalLanguages;
        (function (modalLanguages) {
            var ModalLanguagesController = (function () {
                function ModalLanguagesController($uibModalInstance, dataSetModal, $timeout) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.$timeout = $timeout;
                    this._init();
                }
                ModalLanguagesController.prototype._init = function () {
                    var self = this;
                    console.log('Title');
                    this.form = {
                        options: this.dataSetModal.list || []
                    };
                    this.$timeout(function () {
                        self._buildLanguagesChecked();
                    });
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                ModalLanguagesController.prototype.activate = function () {
                    console.log('modalLanguages controller actived');
                };
                ModalLanguagesController.prototype.addLanguages = function (key) {
                    var check = document.getElementById('language-' + key);
                    var checkClasses = check.classList;
                    var checked = check.getAttribute('data-checked');
                    var value = check.innerText;
                    if (checked == 'true') {
                        this._removeLanguage(key);
                        checkClasses.remove('ma-label--box--check--active');
                        check.setAttribute('data-checked', 'false');
                    }
                    else {
                        var option = {
                            key: key,
                            value: value
                        };
                        this.form.options.push(option);
                        checkClasses.add('ma-label--box--check--active');
                        check.setAttribute('data-checked', 'true');
                    }
                };
                ModalLanguagesController.prototype._removeLanguage = function (key) {
                    this.form.options = this.form.options.filter(function (el) {
                        return el.key !== key;
                    });
                };
                ModalLanguagesController.prototype._buildLanguagesChecked = function () {
                    if (this.form.options.length > 0) {
                        for (var i = 0; i < this.form.options.length; i++) {
                            var language = this.form.options[i];
                            var check = document.getElementById('language-' + language.key);
                            var checkClasses = check.classList;
                            checkClasses.add('ma-label--box--check--active');
                            check.setAttribute('data-checked', 'true');
                        }
                    }
                };
                ModalLanguagesController.prototype._save = function () {
                    this.$uibModalInstance.close(this.form.options);
                };
                ModalLanguagesController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalLanguagesController.controllerId = 'mainApp.components.modal.ModalLanguageController';
                ModalLanguagesController.$inject = [
                    '$uibModalInstance',
                    'dataSetModal',
                    '$timeout'
                ];
                return ModalLanguagesController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalLanguagesController.controllerId, ModalLanguagesController);
        })(modalLanguages = modal.modalLanguages || (modal.modalLanguages = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalLanguages/modalLanguages.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalExperience;
        (function (modalExperience) {
            var ModalExperienceController = (function () {
                function ModalExperienceController($uibModalInstance, dataSetModal, getDataFromJson, functionsUtilService, teacherService, $timeout, $filter) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this._init();
                }
                ModalExperienceController.prototype._init = function () {
                    var self = this;
                    this.experience = this.dataSetModal.experience || new app.models.teacher.Experience();
                    this.countryObject = { code: this.experience.Country || '', value: '' };
                    this.startYearObject = { value: this.experience.DateStart || '' };
                    this.finishYearObject = { value: this.experience.DateFinish || '' };
                    this.form = {
                        position: this.experience.Position || '',
                        company: this.experience.Company || '',
                        country: this.experience.Country || '',
                        city: this.experience.City || '',
                        dateStart: this.experience.DateStart || '',
                        dateFinish: this.experience.DateFinish || '',
                        description: this.experience.Description || ''
                    };
                    this.listStartYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.listFinishYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.validate = {
                        position: { valid: true, message: '' },
                        company: { valid: true, message: '' },
                        country: { valid: true, message: '' },
                        city: { valid: true, message: '' },
                        dateStart: { valid: true, message: '' },
                        dateFinish: { valid: true, message: '' },
                        description: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalExperienceController.prototype.activate = function () {
                    console.log('modalExperience controller actived');
                };
                ModalExperienceController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var position_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.position = this.functionsUtilService.validator(this.form.position, position_rules);
                    if (!this.validate.position.valid) {
                        formValid = this.validate.position.valid;
                    }
                    var company_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.company = this.functionsUtilService.validator(this.form.company, company_rules);
                    if (!this.validate.company.valid) {
                        formValid = this.validate.company.valid;
                    }
                    var country_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.country = this.functionsUtilService.validator(this.countryObject.code, country_rules);
                    if (!this.validate.country.valid) {
                        formValid = this.validate.country.valid;
                    }
                    var city_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.city = this.functionsUtilService.validator(this.form.city, city_rules);
                    if (!this.validate.city.valid) {
                        formValid = this.validate.city.valid;
                    }
                    var start_year_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.dateStart = this.functionsUtilService.validator(this.startYearObject.value, start_year_rules);
                    if (!this.validate.dateStart.valid) {
                        formValid = this.validate.dateStart.valid;
                    }
                    var finish_year_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.dateFinish = this.functionsUtilService.validator(this.finishYearObject.value, finish_year_rules);
                    if (!this.validate.dateFinish.valid) {
                        formValid = this.validate.dateFinish.valid;
                    }
                    return formValid;
                };
                ModalExperienceController.prototype.save = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        var self_1 = this;
                        var countryCode = this.countryObject.code;
                        var startYear = this.startYearObject.value;
                        var finishYear = this.finishYearObject.value;
                        this.form.country = countryCode;
                        this.form.dateStart = startYear;
                        this.form.dateFinish = finishYear;
                        this.experience.Position = this.form.position;
                        this.experience.Country = this.form.country;
                        this.experience.City = this.form.city;
                        this.experience.Company = this.form.company;
                        this.experience.DateStart = this.form.dateStart;
                        this.experience.DateFinish = this.form.dateFinish;
                        this.experience.Description = this.form.description;
                        if (this.experience.Id) {
                            this.teacherService.updateExperience(this.dataSetModal.teacherId, this.experience)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.$uibModalInstance.close();
                                }
                                else {
                                }
                            });
                        }
                        else {
                            this.teacherService.createExperience(this.dataSetModal.teacherId, this.experience)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.experience.Id = response.id;
                                    self_1.$uibModalInstance.close(self_1.experience);
                                }
                                else {
                                }
                            });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                ModalExperienceController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalExperienceController.controllerId = 'mainApp.components.modal.ModalExperienceController';
                ModalExperienceController.$inject = [
                    '$uibModalInstance',
                    'dataSetModal',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.teacher.TeacherService',
                    '$timeout',
                    '$filter'
                ];
                return ModalExperienceController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalExperienceController.controllerId, ModalExperienceController);
        })(modalExperience = modal.modalExperience || (modal.modalExperience = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalExperience/modalExperience.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalEducation;
        (function (modalEducation) {
            var ModalEducationController = (function () {
                function ModalEducationController($uibModalInstance, dataSetModal, getDataFromJson, functionsUtilService, teacherService, $timeout, $filter) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this._init();
                }
                ModalEducationController.prototype._init = function () {
                    var self = this;
                    this.education = this.dataSetModal.education || new app.models.teacher.Education();
                    this.degreeObject = { code: this.education.Degree || '', value: '' };
                    this.startYearObject = { value: this.education.DateStart || '' };
                    this.finishYearObject = { value: this.education.DateFinish || '' };
                    this.form = {
                        school: this.education.School || '',
                        degree: this.education.Degree || '',
                        fieldStudy: this.education.FieldStudy || '',
                        dateStart: this.education.DateStart || '',
                        dateFinish: this.education.DateFinish || '',
                        description: this.education.Description || ''
                    };
                    this.listStartYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.listFinishYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.listDegrees = this.getDataFromJson.getDegreei18n();
                    this.validate = {
                        school: { valid: true, message: '' },
                        degree: { valid: true, message: '' },
                        fieldStudy: { valid: true, message: '' },
                        dateStart: { valid: true, message: '' },
                        dateFinish: { valid: true, message: '' },
                        description: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalEducationController.prototype.activate = function () {
                    console.log('modalEducation controller actived');
                };
                ModalEducationController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var school_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.school = this.functionsUtilService.validator(this.form.school, school_rules);
                    if (!this.validate.school.valid) {
                        formValid = this.validate.school.valid;
                    }
                    var degree_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.degree = this.functionsUtilService.validator(this.degreeObject.code, degree_rules);
                    if (!this.validate.degree.valid) {
                        formValid = this.validate.degree.valid;
                    }
                    var field_study_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.fieldStudy = this.functionsUtilService.validator(this.form.fieldStudy, field_study_rules);
                    if (!this.validate.fieldStudy.valid) {
                        formValid = this.validate.fieldStudy.valid;
                    }
                    var start_year_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.dateStart = this.functionsUtilService.validator(this.startYearObject.value, start_year_rules);
                    if (!this.validate.dateStart.valid) {
                        formValid = this.validate.dateStart.valid;
                    }
                    var finish_year_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.dateFinish = this.functionsUtilService.validator(this.finishYearObject.value, finish_year_rules);
                    if (!this.validate.dateFinish.valid) {
                        formValid = this.validate.dateFinish.valid;
                    }
                    return formValid;
                };
                ModalEducationController.prototype.save = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        var self_1 = this;
                        var degreeCode = this.degreeObject.code;
                        var startYear = this.startYearObject.value;
                        var finishYear = this.finishYearObject.value;
                        this.form.degree = degreeCode;
                        this.form.dateStart = startYear;
                        this.form.dateFinish = finishYear;
                        this.education.School = this.form.school;
                        this.education.Degree = this.form.degree;
                        this.education.FieldStudy = this.form.fieldStudy;
                        this.education.DateStart = this.form.dateStart;
                        this.education.DateFinish = this.form.dateFinish;
                        this.education.Description = this.form.description;
                        if (this.education.Id) {
                            this.teacherService.updateEducation(this.dataSetModal.teacherId, this.education)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.$uibModalInstance.close();
                                }
                                else {
                                }
                            });
                        }
                        else {
                            this.teacherService.createEducation(this.dataSetModal.teacherId, this.education)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.education.Id = response.id;
                                    self_1.$uibModalInstance.close(self_1.education);
                                }
                                else {
                                }
                            });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                ModalEducationController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalEducationController.controllerId = 'mainApp.components.modal.ModalEducationController';
                ModalEducationController.$inject = [
                    '$uibModalInstance',
                    'dataSetModal',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.teacher.TeacherService',
                    '$timeout',
                    '$filter'
                ];
                return ModalEducationController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalEducationController.controllerId, ModalEducationController);
        })(modalEducation = modal.modalEducation || (modal.modalEducation = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalEducation/modalEducation.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalCertificate;
        (function (modalCertificate) {
            var ModalCertificateController = (function () {
                function ModalCertificateController($uibModalInstance, dataSetModal, getDataFromJson, functionsUtilService, teacherService, $timeout, $filter) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.teacherService = teacherService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this._init();
                }
                ModalCertificateController.prototype._init = function () {
                    var self = this;
                    this.certificate = this.dataSetModal.certificate || new app.models.teacher.Certificate();
                    this.receivedYearObject = { value: this.certificate.DateReceived || '' };
                    this.form = {
                        name: this.certificate.Name || '',
                        institution: this.certificate.Institution || '',
                        dateReceived: this.certificate.DateReceived || '',
                        description: this.certificate.Description || ''
                    };
                    this.listReceivedYears = this.functionsUtilService.buildNumberSelectList(1957, 2017);
                    this.validate = {
                        name: { valid: true, message: '' },
                        institution: { valid: true, message: '' },
                        dateReceived: { valid: true, message: '' },
                        description: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalCertificateController.prototype.activate = function () {
                    console.log('modalCertificate controller actived');
                };
                ModalCertificateController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var formValid = true;
                    var name_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.name = this.functionsUtilService.validator(this.form.name, name_rules);
                    if (!this.validate.name.valid) {
                        formValid = this.validate.name.valid;
                    }
                    var institution_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.institution = this.functionsUtilService.validator(this.form.institution, institution_rules);
                    if (!this.validate.institution.valid) {
                        formValid = this.validate.institution.valid;
                    }
                    var received_year_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.dateReceived = this.functionsUtilService.validator(this.receivedYearObject.value, received_year_rules);
                    if (!this.validate.dateReceived.valid) {
                        formValid = this.validate.dateReceived.valid;
                    }
                    return formValid;
                };
                ModalCertificateController.prototype.save = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        var self_1 = this;
                        var receivedYear = this.receivedYearObject.value;
                        this.form.dateReceived = receivedYear;
                        this.certificate.Name = this.form.name;
                        this.certificate.Institution = this.form.institution;
                        this.certificate.DateReceived = this.form.dateReceived;
                        this.certificate.Description = this.form.description;
                        if (this.certificate.Id) {
                            this.teacherService.updateCertificate(this.dataSetModal.teacherId, this.certificate)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.$uibModalInstance.close();
                                }
                                else {
                                }
                            });
                        }
                        else {
                            this.teacherService.createCertificate(this.dataSetModal.teacherId, this.certificate)
                                .then(function (response) {
                                if (response.id) {
                                    self_1.certificate.Id = response.id;
                                    self_1.$uibModalInstance.close(self_1.certificate);
                                }
                                else {
                                }
                            });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                ModalCertificateController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalCertificateController.controllerId = 'mainApp.components.modal.ModalCertificateController';
                ModalCertificateController.$inject = [
                    '$uibModalInstance',
                    'dataSetModal',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.teacher.TeacherService',
                    '$timeout',
                    '$filter'
                ];
                return ModalCertificateController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalCertificateController.controllerId, ModalCertificateController);
        })(modalCertificate = modal.modalCertificate || (modal.modalCertificate = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalCertificate/modalCertificate.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalSignUp;
        (function (modalSignUp) {
            var ModalSignUpController = (function () {
                function ModalSignUpController($rootScope, AuthService, AccountService, RegisterService, functionsUtil, messageUtil, $filter, localStorage, dataSetModal, dataConfig, $uibModal, $uibModalInstance) {
                    this.$rootScope = $rootScope;
                    this.AuthService = AuthService;
                    this.AccountService = AccountService;
                    this.RegisterService = RegisterService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this.$filter = $filter;
                    this.localStorage = localStorage;
                    this.dataSetModal = dataSetModal;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.$uibModalInstance = $uibModalInstance;
                    this._init();
                }
                ModalSignUpController.prototype._init = function () {
                    var self = this;
                    this.form = {
                        username: '',
                        email: '',
                        first_name: '',
                        last_name: '',
                        password: ''
                    };
                    this.saving = false;
                    this.passwordMinLength = this.dataConfig.passwordMinLength;
                    this.passwordMaxLength = this.dataConfig.passwordMaxLength;
                    this.validate = {
                        username: { valid: true, message: '' },
                        email: { valid: true, message: '' },
                        first_name: { valid: true, message: '' },
                        last_name: { valid: true, message: '' },
                        password: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalSignUpController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Sign up modal';
                    DEBUG && console.log('modalSignUp controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                };
                ModalSignUpController.prototype.registerUser = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this.form.username = this.functionsUtil.generateUsername(this.form.first_name, this.form.last_name);
                        this.RegisterService.register(this.form).then(function (response) {
                            DEBUG && console.log('Welcome!, Your new account has been successfuly created.');
                            self._loginAfterRegister(response.username, response.email, response.password);
                        }, function (error) {
                            DEBUG && console.log(JSON.stringify(error));
                            self.saving = false;
                            var errortext = [];
                            for (var key in error.data) {
                                var line = key;
                                line += ': ';
                                line += error.data[key];
                                errortext.push(line);
                            }
                            DEBUG && console.error(errortext);
                            self.validate.globalValidate.valid = false;
                            self.validate.globalValidate.message = errortext[0];
                        });
                    }
                };
                ModalSignUpController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var PASSWORD_MESSAGE = this.$filter('translate')('%modal.signup.error.short_password.text');
                    var formValid = true;
                    var firstName_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.first_name = this.functionsUtil.validator(this.form.first_name, firstName_rules);
                    if (!this.validate.first_name.valid) {
                        formValid = this.validate.first_name.valid;
                    }
                    var lastName_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.last_name = this.functionsUtil.validator(this.form.last_name, lastName_rules);
                    if (!this.validate.last_name.valid) {
                        formValid = this.validate.last_name.valid;
                    }
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
                    if (!this.validate.email.valid) {
                        formValid = this.validate.email.valid;
                    }
                    var password_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.password = this.functionsUtil.validator(this.form.password, password_rules);
                    if (!this.validate.password.valid) {
                        formValid = this.validate.password.valid;
                        this.validate.password.message = PASSWORD_MESSAGE;
                    }
                    return formValid;
                };
                ModalSignUpController.prototype._checkIfEmailExist = function () {
                    var EMAIL_TAKEN_MESSAGE = this.$filter('translate')('%modal.signup.error.email_taken.text');
                    var self = this;
                    if (this.form.email) {
                        this.RegisterService.checkEmail(this.form.email).then(function (response) {
                            if (response.data) {
                                if (!response.data.emailExist) {
                                    self.validate.email.valid = true;
                                }
                                else {
                                    self.validate.email.valid = false;
                                    self.validate.email.message = EMAIL_TAKEN_MESSAGE;
                                }
                            }
                            else if (response.email) {
                                self.validate.email.valid = true;
                            }
                        });
                    }
                };
                ModalSignUpController.prototype._openLogInModal = function () {
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
                                    hasNextStep: self.dataSetModal.hasNextStep
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function () {
                        self.$rootScope.$broadcast('Is Authenticated', self.dataSetModal.hasNextStep);
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                    this.$uibModalInstance.close();
                };
                ModalSignUpController.prototype._loginAfterRegister = function (username, email, password) {
                    var USERNAME_PASSWORD_WRONG = this.$filter('translate')('%error.username_password_wrong.text');
                    var SERVER_ERROR = this.$filter('translate')('%error.server_error.text');
                    var SERVER_CODE_ERROR = this.$filter('translate')('%error.server_error_code.text');
                    var self = this;
                    var userData = {
                        username: username,
                        email: email,
                        password: password
                    };
                    this.AuthService.login(userData).then(function (response) {
                        self.AccountService.getAccount().then(function (response) {
                            DEBUG && console.log('Data User: ', response);
                            self.saving = false;
                            self.localStorage.setItem(self.dataConfig.userDataLocalStorage, JSON.stringify(response));
                            self.$rootScope.userData = response;
                            response.userId = response.id;
                            self.$rootScope.profileData = new app.models.user.Profile(response);
                            self.functionsUtil.addUserIndentifyMixpanel(self.$rootScope.profileData.UserId);
                            self.functionsUtil.setUserMixpanel(self.$rootScope.profileData);
                            self.$rootScope.$broadcast('Is Authenticated', self.dataSetModal.hasNextStep);
                            if (!self.dataSetModal.hasNextStep) {
                                self._openWelcomeModal();
                            }
                            self.$uibModalInstance.close();
                        });
                    }, function (response) {
                        self.saving = false;
                        if (response.status == 401) {
                            DEBUG && console.log(USERNAME_PASSWORD_WRONG);
                            self.validate.globalValidate.valid = false;
                            self.validate.globalValidate.message = USERNAME_PASSWORD_WRONG;
                        }
                        else if (response.status == -1) {
                            DEBUG && console.log(SERVER_ERROR);
                            self.messageUtil.error(SERVER_ERROR);
                        }
                        else {
                            DEBUG && console.log(SERVER_CODE_ERROR + response.status);
                            self.messageUtil.error(SERVER_CODE_ERROR + response.status);
                        }
                    });
                };
                ModalSignUpController.prototype._openWelcomeModal = function () {
                    var self = this;
                    var options = {
                        animation: true,
                        backdrop: 'static',
                        keyboard: false,
                        size: 'sm',
                        templateUrl: this.dataConfig.modalWelcomeTmpl,
                        controller: 'mainApp.components.modal.ModalWelcomeController as vm'
                    };
                    var modalInstance = this.$uibModal.open(options);
                };
                ModalSignUpController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalSignUpController.controllerId = 'mainApp.components.modal.ModalSignUpController';
                ModalSignUpController.$inject = [
                    '$rootScope',
                    'mainApp.auth.AuthService',
                    'mainApp.account.AccountService',
                    'mainApp.register.RegisterService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.util.messageUtilService',
                    '$filter',
                    'mainApp.localStorageService',
                    'dataSetModal',
                    'dataConfig',
                    '$uibModal',
                    '$uibModalInstance'
                ];
                return ModalSignUpController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalSignUpController.controllerId, ModalSignUpController);
        })(modalSignUp = modal.modalSignUp || (modal.modalSignUp = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalSignUp/modalSignUp.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalLogIn;
        (function (modalLogIn) {
            var ModalLogInController = (function () {
                function ModalLogInController($rootScope, $state, AuthService, AccountService, userService, functionsUtil, messageUtil, $filter, localStorage, dataSetModal, dataConfig, $uibModal, $uibModalInstance) {
                    this.$rootScope = $rootScope;
                    this.$state = $state;
                    this.AuthService = AuthService;
                    this.AccountService = AccountService;
                    this.userService = userService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this.$filter = $filter;
                    this.localStorage = localStorage;
                    this.dataSetModal = dataSetModal;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.$uibModalInstance = $uibModalInstance;
                    this._init();
                }
                ModalLogInController.prototype._init = function () {
                    var self = this;
                    this.saving = false;
                    this.form = {
                        username: '',
                        email: '',
                        password: ''
                    };
                    this.validate = {
                        username: { valid: true, message: '' },
                        email: { valid: true, message: '' },
                        password: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalLogInController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Log in modal';
                    DEBUG && console.log('modalLogIn controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                };
                ModalLogInController.prototype.login = function () {
                    var USERNAME_PASSWORD_WRONG = this.$filter('translate')('%error.username_password_wrong.text');
                    var SERVER_ERROR = this.$filter('translate')('%error.server_error.text');
                    var SERVER_CODE_ERROR = this.$filter('translate')('%error.server_error_code.text');
                    var self = this;
                    this.saving = true;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.AccountService.getUsername(this.form.email).then(function (response) {
                            if (response.userExist) {
                                self.form.username = response.username;
                            }
                            else {
                                self.form.username = self.form.email;
                            }
                            self.AuthService.login(self.form).then(function (response) {
                                self.AccountService.getAccount().then(function (response) {
                                    DEBUG && console.log('Data User: ', response);
                                    self.saving = false;
                                    self.localStorage.setItem(self.dataConfig.userDataLocalStorage, JSON.stringify(response));
                                    self.$rootScope.userData = response;
                                    self.userService.getUserProfileById(response.id).then(function (response) {
                                        if (response.userId) {
                                            self.$rootScope.profileData = new app.models.user.Profile(response);
                                            self.functionsUtil.addUserIndentifyMixpanel(self.$rootScope.profileData.UserId);
                                        }
                                        self.$uibModalInstance.close();
                                    });
                                });
                            }, function (response) {
                                self.saving = false;
                                if (response.status == 401) {
                                    DEBUG && console.log(USERNAME_PASSWORD_WRONG);
                                    self.validate.globalValidate.valid = false;
                                    self.validate.globalValidate.message = USERNAME_PASSWORD_WRONG;
                                }
                                else if (response.status == -1) {
                                    DEBUG && console.log(SERVER_ERROR);
                                    self.messageUtil.error(SERVER_ERROR);
                                }
                                else {
                                    DEBUG && console.log(SERVER_CODE_ERROR + response.status);
                                    self.messageUtil.error(SERVER_CODE_ERROR + response.status);
                                }
                            });
                        });
                    }
                    else {
                        this.saving = false;
                    }
                };
                ModalLogInController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var formValid = true;
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
                    if (!this.validate.email.valid) {
                        formValid = this.validate.email.valid;
                    }
                    var password_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.password = this.functionsUtil.validator(this.form.password, password_rules);
                    if (!this.validate.password.valid) {
                        formValid = this.validate.password.valid;
                    }
                    return formValid;
                };
                ModalLogInController.prototype._openForgotPasswordModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalForgotPasswordTmpl,
                        controller: 'mainApp.components.modal.ModalForgotPasswordController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: self.dataSetModal.hasNextStep
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalLogInController.prototype._openSignUpModal = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        size: 'sm',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalSignUpTmpl,
                        controller: 'mainApp.components.modal.ModalSignUpController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    hasNextStep: self.dataSetModal.hasNextStep
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    this.$uibModalInstance.close();
                };
                ModalLogInController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalLogInController.controllerId = 'mainApp.components.modal.ModalLogInController';
                ModalLogInController.$inject = [
                    '$rootScope',
                    '$state',
                    'mainApp.auth.AuthService',
                    'mainApp.account.AccountService',
                    'mainApp.models.user.UserService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.util.messageUtilService',
                    '$filter',
                    'mainApp.localStorageService',
                    'dataSetModal',
                    'dataConfig',
                    '$uibModal',
                    '$uibModalInstance'
                ];
                return ModalLogInController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalLogInController.controllerId, ModalLogInController);
        })(modalLogIn = modal.modalLogIn || (modal.modalLogIn = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalLogIn/modalLogIn.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalForgotPassword;
        (function (modalForgotPassword) {
            var ModalForgotPasswordController = (function () {
                function ModalForgotPasswordController($rootScope, AuthService, functionsUtil, messageUtil, RegisterService, $filter, $uibModal, $uibModalInstance, dataConfig) {
                    this.$rootScope = $rootScope;
                    this.AuthService = AuthService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this.RegisterService = RegisterService;
                    this.$filter = $filter;
                    this.$uibModal = $uibModal;
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataConfig = dataConfig;
                    this._init();
                }
                ModalForgotPasswordController.prototype._init = function () {
                    var self = this;
                    this.sending = false;
                    this.form = {
                        email: ''
                    };
                    this.validate = {
                        email: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ModalForgotPasswordController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Forgot Passwod Modal';
                    DEBUG && console.log('modalForgotPassword controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                };
                ModalForgotPasswordController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var formValid = true;
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.email, email_rules);
                    if (!this.validate.email.valid) {
                        formValid = this.validate.email.valid;
                    }
                    return formValid;
                };
                ModalForgotPasswordController.prototype._sendInstructions = function () {
                    var CLICK_MIXPANEL = 'Click: Send instructions from Forgot Password';
                    var NO_ACCOUNT_EXISTS_1 = this.$filter('translate')('%modal.forgot_password.no_account_exists.part1.text');
                    var NO_ACCOUNT_EXISTS_2 = this.$filter('translate')('%modal.forgot_password.no_account_exists.part2.text');
                    var SENT_LINK = this.$filter('translate')('%modal.forgot_password.sent_link.text');
                    mixpanel.track(CLICK_MIXPANEL, {
                        "email": this.form.email || '*'
                    });
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.sending = true;
                        this.RegisterService.checkEmail(this.form.email).then(function (response) {
                            var emailExist = true;
                            if (response.data) {
                                emailExist = response.data.emailExist || true;
                            }
                            else {
                                emailExist = false;
                            }
                            self.validate.globalValidate.valid = emailExist;
                            if (!emailExist) {
                                self.sending = false;
                                self.validate.globalValidate.message = NO_ACCOUNT_EXISTS_1 + self.form.email + NO_ACCOUNT_EXISTS_2;
                            }
                            else {
                                self.AuthService.resetPassword(self.form.email).then(function (response) {
                                    self.sending = false;
                                    self.messageUtil.info(SENT_LINK + self.form.email);
                                    self._openLogInModal();
                                }, function (error) {
                                    self.sending = false;
                                    DEBUG && console.error(error);
                                    self.messageUtil.error('');
                                });
                            }
                        });
                    }
                };
                ModalForgotPasswordController.prototype._openLogInModal = function () {
                    mixpanel.track("Click on 'Log in' from signUp modal");
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
                    this.$uibModalInstance.close();
                };
                ModalForgotPasswordController.prototype.close = function () {
                    this.$uibModalInstance.close();
                };
                ModalForgotPasswordController.controllerId = 'mainApp.components.modal.ModalForgotPasswordController';
                ModalForgotPasswordController.$inject = [
                    '$rootScope',
                    'mainApp.auth.AuthService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.util.messageUtilService',
                    'mainApp.register.RegisterService',
                    '$filter',
                    '$uibModal',
                    '$uibModalInstance',
                    'dataConfig'
                ];
                return ModalForgotPasswordController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalForgotPasswordController.controllerId, ModalForgotPasswordController);
        })(modalForgotPassword = modal.modalForgotPassword || (modal.modalForgotPassword = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalForgotPassword/modalForgotPassword.controller.js.map

var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalRecommendTeacher;
        (function (modalRecommendTeacher) {
            var ModalRecommendTeacherController = (function () {
                function ModalRecommendTeacherController($uibModalInstance, dataSetModal, localStorage, StudentService, $state, dataConfig, $timeout, $filter, $rootScope) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.localStorage = localStorage;
                    this.StudentService = StudentService;
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                ModalRecommendTeacherController.prototype._init = function () {
                    var self = this;
                    this.activate();
                };
                ModalRecommendTeacherController.prototype.activate = function () {
                    var self = this;
                    console.log('modalRecommendTeacher controller actived');
                    this.StudentService.getRatingByEarlyid(this.dataSetModal.earlyId).then(function (response) {
                        if (response.id) {
                            self.rating = new app.models.teacher.Rating(response);
                        }
                    });
                };
                ModalRecommendTeacherController.prototype._join = function () {
                    var CREATE_TEACHER = 'page.createTeacherPage.start';
                    var CLICK_MIXPANEL = 'Click: Join as a Teacher from recommendation modal';
                    mixpanel.track(CLICK_MIXPANEL);
                    this.localStorage.setItem(this.dataConfig.earlyIdLocalStorage, this.dataSetModal.earlyId);
                    this.$uibModalInstance.close();
                    this.$state.go(CREATE_TEACHER, { reload: true });
                };
                ModalRecommendTeacherController.prototype.close = function () {
                    var CLICK_MIXPANEL = 'Click on Close recommend teacher modal button';
                    mixpanel.track(CLICK_MIXPANEL);
                    this.localStorage.setItem(this.dataConfig.earlyIdLocalStorage, this.dataSetModal.earlyId);
                    this.$rootScope.activeMessageBar = true;
                    this.$uibModalInstance.close();
                };
                ModalRecommendTeacherController.controllerId = 'mainApp.components.modal.ModalRecommendTeacherController';
                ModalRecommendTeacherController.$inject = [
                    '$uibModalInstance',
                    'dataSetModal',
                    'mainApp.localStorageService',
                    'mainApp.models.student.StudentService',
                    '$state',
                    'dataConfig',
                    '$timeout',
                    '$filter',
                    '$rootScope'
                ];
                return ModalRecommendTeacherController;
            }());
            angular.module('mainApp.components.modal')
                .controller(ModalRecommendTeacherController.controllerId, ModalRecommendTeacherController);
        })(modalRecommendTeacher = modal.modalRecommendTeacher || (modal.modalRecommendTeacher = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));

//# sourceMappingURL=../../../../maps/components/modal/modalRecommendTeacher/modalRecommendTeacher.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.main', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page', {
            url: '/page',
            abstract: true,
            templateUrl: 'app/pages/main/main.html',
            controller: 'mainApp.pages.main.MainController',
            controllerAs: 'vm'
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/main/main.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var main;
        (function (main) {
            var MainController = (function () {
                function MainController($state, $rootScope, localStorage, dataConfig) {
                    this.$state = $state;
                    this.$rootScope = $rootScope;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.init();
                }
                MainController.prototype.init = function () {
                    this.activate();
                };
                MainController.prototype.activate = function () {
                    var self = this;
                    var earlyId = this.localStorage.getItem(this.dataConfig.earlyIdLocalStorage);
                    var currentState = this.$state.current.name;
                    if (currentState.indexOf('page.createTeacherPage') !== -1) {
                        this.$rootScope.activeMessageBar = false;
                    }
                    else {
                        this.$rootScope.activeMessageBar = earlyId ? true : false;
                    }
                    console.log('main controller actived');
                };
                MainController.controllerId = 'mainApp.pages.main.MainController';
                MainController.$inject = [
                    '$state',
                    '$rootScope',
                    'mainApp.localStorageService',
                    'dataConfig'
                ];
                return MainController;
            }());
            main.MainController = MainController;
            angular
                .module('mainApp.pages.main')
                .controller(MainController.controllerId, MainController);
        })(main = pages.main || (pages.main = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/main/main.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.studentLandingPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.studentLandingPage', {
            url: '/landing/student',
            views: {
                'container': {
                    templateUrl: 'app/pages/studentLandingPage/studentLandingPage.html',
                    controller: 'mainApp.pages.studentLandingPage.StudentLandingPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: true
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }],
            params: {
                user: null,
                id: null
            }
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/studentLandingPage/studentLandingPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var studentLandingPage;
        (function (studentLandingPage) {
            var StudentLandingPageController = (function () {
                function StudentLandingPageController($state, functionsUtil, StudentLandingPageService) {
                    this.$state = $state;
                    this.functionsUtil = functionsUtil;
                    this.StudentLandingPageService = StudentLandingPageService;
                    this._init();
                }
                StudentLandingPageController.prototype._init = function () {
                    this.form = {
                        userData: {
                            name: '',
                            email: '',
                            comment: ''
                        },
                        language: this.functionsUtil.getCurrentLanguage() || 'en'
                    };
                    this.success = false;
                    this.sending = false;
                    this.error = {
                        message: ''
                    };
                    this.addComment = false;
                    this.activate();
                };
                StudentLandingPageController.prototype.activate = function () {
                    var self = this;
                    console.log('studentLandingPage controller actived');
                };
                StudentLandingPageController.prototype.changeLanguage = function () {
                    this.functionsUtil.changeLanguage(this.form.language);
                };
                StudentLandingPageController.prototype.goToEarlyAccessForm = function () {
                    document.querySelector('.studentLandingPage__early-access-block').scrollIntoView({ behavior: 'smooth' });
                };
                StudentLandingPageController.prototype.goDown = function () {
                    document.querySelector('.studentLandingPage__title-block').scrollIntoView({ behavior: 'smooth' });
                };
                StudentLandingPageController.prototype.showCommentsTextarea = function () {
                    event.preventDefault();
                    this.addComment = true;
                };
                StudentLandingPageController.prototype.createEarlyAdopter = function () {
                    var self = this;
                    this.sending = true;
                    var userData = {
                        name: this.form.userData.name || '*',
                        email: this.form.userData.email,
                        comment: this.form.userData.comment || '*'
                    };
                    this.StudentLandingPageService.createEarlyAdopter(userData).then(function (response) {
                        if (response.createdAt) {
                            self.success = true;
                        }
                        else {
                            self.sending = false;
                        }
                    });
                };
                StudentLandingPageController.controllerId = 'mainApp.pages.studentLandingPage.StudentLandingPageController';
                StudentLandingPageController.$inject = ['$state',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.pages.studentLandingPage.StudentLandingPageService'];
                return StudentLandingPageController;
            }());
            studentLandingPage.StudentLandingPageController = StudentLandingPageController;
            angular
                .module('mainApp.pages.studentLandingPage')
                .controller(StudentLandingPageController.controllerId, StudentLandingPageController);
        })(studentLandingPage = pages.studentLandingPage || (pages.studentLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/studentLandingPage/studentLandingPage.controller.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var studentLandingPage;
        (function (studentLandingPage) {
            'use strict';
            var StudentLandingPageService = (function () {
                function StudentLandingPageService(restApi) {
                    this.restApi = restApi;
                }
                StudentLandingPageService.prototype.createEarlyAdopter = function (userData) {
                    var url = 'early';
                    return this.restApi.create({ url: url }, userData).$promise
                        .then(function (data) {
                        return data;
                    }).catch(function (err) {
                        console.log(err);
                        return err;
                    });
                };
                StudentLandingPageService.serviceId = 'mainApp.pages.studentLandingPage.StudentLandingPageService';
                StudentLandingPageService.$inject = [
                    'mainApp.core.restApi.restApiService'
                ];
                return StudentLandingPageService;
            }());
            studentLandingPage.StudentLandingPageService = StudentLandingPageService;
            angular
                .module('mainApp.pages.studentLandingPage')
                .service(StudentLandingPageService.serviceId, StudentLandingPageService);
        })(studentLandingPage = pages.studentLandingPage || (pages.studentLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/studentLandingPage/studentLandingPage.service.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.teacherLandingPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.teacherLandingPage', {
            url: '/main/teacher',
            views: {
                'container': {
                    templateUrl: 'app/pages/teacherLandingPage/teacherLandingPage.html',
                    controller: 'mainApp.pages.teacherLandingPage.TeacherLandingPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: false
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/teacherLandingPage/teacherLandingPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var teacherLandingPage;
        (function (teacherLandingPage) {
            var TeacherLandingPageController = (function () {
                function TeacherLandingPageController($scope, functionsUtil, AuthService, $state, dataConfig, $uibModal, $rootScope, localStorage) {
                    this.$scope = $scope;
                    this.functionsUtil = functionsUtil;
                    this.AuthService = AuthService;
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.$rootScope = $rootScope;
                    this.localStorage = localStorage;
                    this._init();
                }
                TeacherLandingPageController.prototype._init = function () {
                    this.isAuthenticated = this.AuthService.isAuthenticated();
                    this.form = {
                        language: this.functionsUtil.getCurrentLanguage() || 'en'
                    };
                    this._hoverDetail = [];
                    this._buildFakeTeacher();
                    this.activate();
                };
                TeacherLandingPageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Teacher Landing Page';
                    this.TEACHER_FAKE_TMPL = 'app/pages/teacherLandingPage/teacherContainerExample/teacherContainerExample.html';
                    var self = this;
                    console.log('teacherLandingPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this._subscribeToEvents();
                };
                TeacherLandingPageController.prototype.changeLanguage = function () {
                    this.functionsUtil.changeLanguage(this.form.language);
                };
                TeacherLandingPageController.prototype._openSignUpModal = function (event) {
                    var self = this;
                    var hasNextStep = false;
                    if (this.isAuthenticated) {
                        this.goToCreate();
                        return;
                    }
                    if (event.target.id === 'hero-go-to-button') {
                        hasNextStep = true;
                    }
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
                                    hasNextStep: hasNextStep
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                };
                TeacherLandingPageController.prototype._openLogInModal = function () {
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
                        self.$rootScope.$broadcast('Is Authenticated', false);
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                };
                TeacherLandingPageController.prototype.logout = function () {
                    var self = this;
                    this.AuthService.logout().then(function (response) {
                        window.location.reload();
                    }, function (response) {
                        DEBUG && console.log('A problem occured while logging you out.');
                    });
                };
                TeacherLandingPageController.prototype._buildFakeTeacher = function () {
                    this.profileFake = new app.models.user.Profile();
                    this.teacherFake = new app.models.teacher.Teacher();
                    this.profileFake.UserId = '1';
                    this.profileFake.FirstName = 'Dianne';
                    this.profileFake.BornCity = 'New York';
                    this.profileFake.BornCountry = 'United States';
                    this.profileFake.Avatar = 'https://waysily-img.s3.amazonaws.com/b3605bad-0924-4bc1-98c8-676c664acd9d-example.jpeg';
                    this.profileFake.Languages.Native = ['6'];
                    this.profileFake.Languages.Teach = ['6', '8'];
                    this.profileFake.Languages.Learn = ['8', '7'];
                    this.teacherFake.Methodology = 'I can customize the lessons to fit your needs. I teach conversational English to intermediate and advanced students with a focus on grammar, pronunciation, vocabulary and clear fluency and Business English with a focus on formal English in a business setting (role-play), business journal articles, and technical, industry based vocabulary';
                    this.teacherFake.TeacherSince = '2013';
                    this.teacherFake.Type = 'H';
                    this.teacherFake.Immersion.Active = true;
                    this.teacherFake.Price.PrivateClass.Active = true;
                    this.teacherFake.Price.PrivateClass.HourPrice = 20.00;
                    this.teacherFake.Price.GroupClass.Active = true;
                    this.teacherFake.Price.GroupClass.HourPrice = 15.00;
                };
                TeacherLandingPageController.prototype._hoverEvent = function (id, status) {
                    var args = { id: id, status: status };
                    this._hoverDetail[id] = status;
                };
                TeacherLandingPageController.prototype._assignNativeClass = function (languages) {
                    var native = languages.native;
                    var teach = languages.teach;
                    var isNative = false;
                    for (var i = 0; i < native.length; i++) {
                        for (var j = 0; j < teach.length; j++) {
                            if (teach[j] === native[i]) {
                                isNative = true;
                            }
                        }
                    }
                    return isNative;
                };
                TeacherLandingPageController.prototype.goToCreate = function () {
                    var params = {
                        type: 'new'
                    };
                    this.$state.go('page.createTeacherPage.start', params, { reload: true });
                };
                TeacherLandingPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Is Authenticated', function (event, args) {
                        self.isAuthenticated = self.AuthService.isAuthenticated();
                        if (self.isAuthenticated && args) {
                            self.goToCreate();
                        }
                    });
                };
                TeacherLandingPageController.controllerId = 'mainApp.pages.teacherLandingPage.TeacherLandingPageController';
                TeacherLandingPageController.$inject = ['$scope',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.auth.AuthService',
                    '$state',
                    'dataConfig',
                    '$uibModal',
                    '$rootScope',
                    'mainApp.localStorageService'];
                return TeacherLandingPageController;
            }());
            teacherLandingPage.TeacherLandingPageController = TeacherLandingPageController;
            angular
                .module('mainApp.pages.teacherLandingPage')
                .controller(TeacherLandingPageController.controllerId, TeacherLandingPageController);
        })(teacherLandingPage = pages.teacherLandingPage || (pages.teacherLandingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/teacherLandingPage/teacherLandingPage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.resetPasswordPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.resetPasswordPage', {
            url: '/users/password/edit/:uid/:token',
            views: {
                'container': {
                    templateUrl: 'app/pages/resetPasswordPage/resetPasswordPage.html',
                    controller: 'mainApp.pages.resetPasswordPage.ResetPasswordPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: false
            },
            params: {
                uid: null,
                token: null
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/resetPasswordPage/resetPasswordPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var resetPasswordPage;
        (function (resetPasswordPage) {
            var ResetPasswordPageController = (function () {
                function ResetPasswordPageController($state, dataConfig, $filter, $stateParams, AuthService, functionsUtil, messageUtil) {
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.$filter = $filter;
                    this.$stateParams = $stateParams;
                    this.AuthService = AuthService;
                    this.functionsUtil = functionsUtil;
                    this.messageUtil = messageUtil;
                    this._init();
                }
                ResetPasswordPageController.prototype._init = function () {
                    var self = this;
                    this.saving = false;
                    this.uid = this.$stateParams.uid;
                    this.token = this.$stateParams.token;
                    this.passwordMinLength = this.dataConfig.passwordMinLength;
                    this.passwordMaxLength = this.dataConfig.passwordMaxLength;
                    this.form = {
                        newPassword1: '',
                        newPassword2: ''
                    };
                    this.validate = {
                        newPassword1: { valid: true, message: '' },
                        newPassword2: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                ResetPasswordPageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Reset Password Page';
                    var self = this;
                    console.log('resetPasswordPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL, {
                        "uid": this.uid || '*',
                        "token": this.token || '*'
                    });
                };
                ResetPasswordPageController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var PASSWORD_MESSAGE = this.$filter('translate')('%recover.password.not_match.text');
                    var formValid = true;
                    var password_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.newPassword1 = this.functionsUtil.validator(this.form.newPassword1, password_rules);
                    if (!this.validate.newPassword1.valid) {
                        formValid = this.validate.newPassword1.valid;
                    }
                    this.validate.newPassword2 = this.functionsUtil.validator(this.form.newPassword2, password_rules);
                    if (!this.validate.newPassword2.valid) {
                        formValid = this.validate.newPassword2.valid;
                    }
                    if (this.form.newPassword1 !== this.form.newPassword2) {
                        formValid = false;
                        this.validate.globalValidate.valid = false;
                        this.validate.globalValidate.message = PASSWORD_MESSAGE;
                    }
                    return formValid;
                };
                ResetPasswordPageController.prototype._changePassword = function () {
                    var SUCCESS_CHANGE_PROCESS = this.$filter('translate')('%recover.password.success.text');
                    var LINK_EXPIRED = this.$filter('translate')('%recover.password.link_expired.text');
                    var PASSWORD_COMMON = this.$filter('translate')('%recover.password.password_common.text');
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.validate.globalValidate.valid = true;
                        this.saving = true;
                        this.AuthService.confirmResetPassword(self.uid, self.token, self.form.newPassword1, self.form.newPassword2).then(function (response) {
                            self.saving = false;
                            self.messageUtil.success(SUCCESS_CHANGE_PROCESS);
                            self.$state.go('page.landingPage', { showLogin: true }, { reload: true });
                        }, function (error) {
                            self.saving = false;
                            self.validate.globalValidate.valid = false;
                            if (error.data) {
                                if (error.data.token) {
                                    if (error.data.token[0] === 'Invalid value') {
                                        self.validate.globalValidate.message = LINK_EXPIRED;
                                    }
                                    else {
                                        self.messageUtil.error('');
                                    }
                                }
                                else if (error.data.newPassword2) {
                                    self.validate.globalValidate.message = PASSWORD_COMMON;
                                }
                                else {
                                    self.messageUtil.error('');
                                }
                            }
                        });
                    }
                };
                ResetPasswordPageController.controllerId = 'mainApp.pages.resetPasswordPage.ResetPasswordPageController';
                ResetPasswordPageController.$inject = [
                    '$state',
                    'dataConfig',
                    '$filter',
                    '$stateParams',
                    'mainApp.auth.AuthService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.util.messageUtilService'
                ];
                return ResetPasswordPageController;
            }());
            resetPasswordPage.ResetPasswordPageController = ResetPasswordPageController;
            angular
                .module('mainApp.pages.resetPasswordPage')
                .controller(ResetPasswordPageController.controllerId, ResetPasswordPageController);
        })(resetPasswordPage = pages.resetPasswordPage || (pages.resetPasswordPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/resetPasswordPage/resetPasswordPage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.landingPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.landingPage', {
            url: '/main',
            views: {
                'container': {
                    templateUrl: 'app/pages/landingPage/landingPage.html',
                    controller: 'mainApp.pages.landingPage.LandingPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: false
            },
            params: {
                showLogin: false,
            },
            cache: false,
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
        })
            .state('page.landingPage.recommendation', {
            url: '/main/recommendation/:id',
            views: {
                'container': {
                    templateUrl: 'app/pages/landingPage/landingPage.html',
                    controller: 'mainApp.pages.landingPage.LandingPageController',
                    controllerAs: 'vm'
                }
            },
            params: {
                id: null
            },
            parent: 'page',
            cache: false,
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/landingPage/landingPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var landingPage;
        (function (landingPage) {
            var LandingPageController = (function () {
                function LandingPageController($scope, $state, $stateParams, dataConfig, $uibModal, AuthService, messageUtil, functionsUtil, LandingPageService, FeedbackService, getDataFromJson, $rootScope, localStorage) {
                    this.$scope = $scope;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.dataConfig = dataConfig;
                    this.$uibModal = $uibModal;
                    this.AuthService = AuthService;
                    this.messageUtil = messageUtil;
                    this.functionsUtil = functionsUtil;
                    this.LandingPageService = LandingPageService;
                    this.FeedbackService = FeedbackService;
                    this.getDataFromJson = getDataFromJson;
                    this.$rootScope = $rootScope;
                    this.localStorage = localStorage;
                    this._init();
                }
                LandingPageController.prototype._init = function () {
                    this.isAuthenticated = this.AuthService.isAuthenticated();
                    if (this.$rootScope.profileData) {
                        this.isTeacher = this.$rootScope.profileData.IsTeacher;
                    }
                    this.form = {
                        userData: {
                            name: '',
                            email: '',
                            comment: ''
                        },
                        language: this.functionsUtil.getCurrentLanguage() || 'en',
                        feedback: new app.models.feedback.Feedback()
                    };
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.countryObject = { code: '', value: '' };
                    this.infoCountry = {
                        success: false,
                        sending: false,
                        sent: true,
                        disabled: false
                    };
                    this.infoNewUser = {
                        success: false,
                        sending: false,
                        sent: true,
                        disabled: false
                    };
                    this.validate = {
                        country: { valid: true, message: '' },
                        email: { valid: true, message: '' }
                    };
                    this.activate();
                };
                LandingPageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Main Landing Page';
                    var self = this;
                    console.log('landingPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    if (this.$stateParams.id) {
                        var options = {
                            animation: false,
                            backdrop: 'static',
                            keyboard: false,
                            templateUrl: this.dataConfig.modalRecommendTeacherTmpl,
                            controller: 'mainApp.components.modal.ModalRecommendTeacherController as vm',
                            resolve: {
                                dataSetModal: function () {
                                    return {
                                        earlyId: self.$stateParams.id
                                    };
                                }
                            }
                        };
                        var modalInstance = this.$uibModal.open(options);
                    }
                    if (this.$stateParams.showLogin) {
                        this._openLogInModal();
                    }
                    this._subscribeToEvents();
                };
                LandingPageController.prototype.changeLanguage = function () {
                    this.functionsUtil.changeLanguage(this.form.language);
                };
                LandingPageController.prototype.logout = function () {
                    var self = this;
                    this.AuthService.logout().then(function (response) {
                        window.location.reload();
                    }, function (response) {
                        DEBUG && console.log('A problem occured while logging you out.');
                    });
                };
                LandingPageController.prototype.goToSearch = function (target) {
                    var SEARCH_PAGE_STATE = 'page.searchPage';
                    var GOTO_MIXPANEL = 'Go to Search from: ' + target;
                    mixpanel.track(GOTO_MIXPANEL);
                    this.$state.go(SEARCH_PAGE_STATE, { reload: true });
                };
                LandingPageController.prototype._sendCountryFeedback = function () {
                    var ENTER_MIXPANEL = 'Click: Send Country Feedback';
                    var FEEDBACK_SUCCESS_MESSAGE = '¡Gracias por tu recomendación!. La revisaremos y pondremos manos a la obra.';
                    var self = this;
                    this.form.feedback.NextCountry = this.countryObject.code;
                    mixpanel.track(ENTER_MIXPANEL);
                    if (this.form.feedback.NextCountry) {
                        this.infoCountry.sending = true;
                        this.infoCountry.sent = false;
                        this.infoCountry.disabled = true;
                        this.FeedbackService.createFeedback(this.form.feedback).then(function (response) {
                            if (response.createdAt) {
                                self.infoCountry.success = true;
                                self.messageUtil.success(FEEDBACK_SUCCESS_MESSAGE);
                                self.infoCountry.sent = true;
                                self.infoCountry.sending = false;
                                self.infoCountry.disabled = true;
                                self.validate.country.valid = true;
                                self.form.userData.email = '';
                            }
                            else {
                                self.infoCountry.sending = false;
                                self.infoCountry.disabled = false;
                                self.validate.country.valid = true;
                            }
                        });
                    }
                    else {
                        this.validate.country.valid = false;
                    }
                };
                LandingPageController.prototype._recommendTeacher = function () {
                    var CLICK_MIXPANEL = 'Click: Recommend Teacher';
                    var url = 'https://waysily.typeform.com/to/iAWFeg';
                    mixpanel.track(CLICK_MIXPANEL);
                    window.open(url, '_blank');
                };
                LandingPageController.prototype._recommendSchool = function () {
                    var CLICK_MIXPANEL = 'Click: Recommend School';
                    var url = 'https://waysily.typeform.com/to/q5uT0P';
                    mixpanel.track(CLICK_MIXPANEL);
                    window.open(url, '_blank');
                };
                LandingPageController.prototype._createEarlyAdopter = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NEW_MIXPANEL = 'New Early Adopter data';
                    var self = this;
                    var email_rules = [NULL_ENUM, EMPTY_ENUM, EMAIL_ENUM];
                    this.validate.email = this.functionsUtil.validator(this.form.userData.email, email_rules);
                    if (this.validate.email.valid) {
                        this.infoNewUser.sending = true;
                        mixpanel.track(NEW_MIXPANEL, {
                            "name": this.form.userData.name || '*',
                            "email": this.form.userData.email,
                            "comment": this.form.userData.comment || '*'
                        });
                        var userData = {
                            uid: app.core.util.functionsUtil.FunctionsUtilService.generateGuid(),
                            name: this.form.userData.name || '*',
                            email: this.form.userData.email,
                            comment: this.form.userData.comment || '*'
                        };
                        this.LandingPageService.createEarlyAdopter(userData).then(function (response) {
                            if (response.createdAt) {
                                self.infoNewUser.sent = true;
                                self.infoNewUser.sending = false;
                                self.infoNewUser.disabled = true;
                                self.infoNewUser.success = true;
                                self.validate.country.valid = true;
                            }
                            else {
                                self.infoNewUser.sending = false;
                                self.infoNewUser.disabled = false;
                                self.infoNewUser.success = false;
                                self.validate.email.valid = true;
                            }
                        });
                    }
                    else {
                        this.validate.email.valid = false;
                    }
                };
                LandingPageController.prototype._openSignUpModal = function () {
                    var CLICK_MIXPANEL = 'Click on Sign up: main landing page';
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
                    mixpanel.track(CLICK_MIXPANEL);
                };
                LandingPageController.prototype._openLogInModal = function () {
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
                LandingPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Is Authenticated', function (event, args) {
                        self.isAuthenticated = self.AuthService.isAuthenticated();
                        if (self.$rootScope.profileData) {
                            self.isTeacher = self.$rootScope.profileData.IsTeacher;
                        }
                    });
                };
                LandingPageController.controllerId = 'mainApp.pages.landingPage.LandingPageController';
                LandingPageController.$inject = ['$scope',
                    '$state',
                    '$stateParams',
                    'dataConfig',
                    '$uibModal',
                    'mainApp.auth.AuthService',
                    'mainApp.core.util.messageUtilService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.pages.landingPage.LandingPageService',
                    'mainApp.models.feedback.FeedbackService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    '$rootScope',
                    'mainApp.localStorageService'];
                return LandingPageController;
            }());
            landingPage.LandingPageController = LandingPageController;
            angular
                .module('mainApp.pages.landingPage')
                .controller(LandingPageController.controllerId, LandingPageController);
        })(landingPage = pages.landingPage || (pages.landingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/landingPage/landingPage.controller.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var landingPage;
        (function (landingPage) {
            'use strict';
            var LandingPageService = (function () {
                function LandingPageService(restApi, $q) {
                    this.restApi = restApi;
                    this.$q = $q;
                    this.EARLY_URI = 'early';
                }
                LandingPageService.prototype.createEarlyAdopter = function (userData) {
                    var url = this.EARLY_URI;
                    var deferred = this.$q.defer();
                    this.restApi.create({ url: url }, userData).$promise
                        .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        DEBUG && console.error(error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };
                LandingPageService.serviceId = 'mainApp.pages.landingPage.LandingPageService';
                LandingPageService.$inject = [
                    'mainApp.core.restApi.restApiService',
                    '$q'
                ];
                return LandingPageService;
            }());
            landingPage.LandingPageService = LandingPageService;
            angular
                .module('mainApp.pages.landingPage')
                .service(LandingPageService.serviceId, LandingPageService);
        })(landingPage = pages.landingPage || (pages.landingPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/landingPage/landingPage.service.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.searchPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.searchPage', {
            url: '/search',
            views: {
                'container': {
                    templateUrl: 'app/pages/searchPage/searchPage.html',
                    controller: 'mainApp.pages.searchPage.SearchPageController',
                    controllerAs: 'vm'
                }
            },
            data: {
                requireLogin: false
            },
            parent: 'page',
            params: {
                country: null
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = false;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/searchPage/searchPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var searchPage;
        (function (searchPage) {
            var SearchPageController = (function () {
                function SearchPageController(StudentService, TeacherService, SchoolService, FunctionsUtilService, $state, $stateParams, $filter, $scope, $rootScope, $timeout) {
                    this.StudentService = StudentService;
                    this.TeacherService = TeacherService;
                    this.SchoolService = SchoolService;
                    this.FunctionsUtilService = FunctionsUtilService;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$timeout = $timeout;
                    this._init();
                }
                SearchPageController.prototype._init = function () {
                    this.VALIDATED = 'VA';
                    this.data = [];
                    this.type = 'teacher';
                    this.loading = true;
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                SearchPageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Search Page';
                    var self = this;
                    console.log('searchPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this._subscribeToEvents();
                    this.TeacherService.getAllTeachersByStatus(this.VALIDATED).then(function (response) {
                        self.type = 'teacher';
                        self.mapConfig = self.FunctionsUtilService.buildMapConfig(response.results, 'search-map', null, 6);
                        self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                        self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                        self.$timeout(function () {
                            self.loading = false;
                        });
                        if (self.$stateParams.country) {
                            self.$timeout(function () {
                                self._searchByCountry(self.$stateParams.country);
                            });
                        }
                    });
                };
                SearchPageController.prototype._getResultLoading = function (type) {
                    var STUDENT_TYPE = 'student';
                    var TEACHER_TYPE = 'teacher';
                    var SCHOOL_TYPE = 'school';
                    switch (type) {
                        case STUDENT_TYPE:
                            return 'app/pages/searchPage/studentResult/studentResult.html';
                        case TEACHER_TYPE:
                            return 'app/pages/searchPage/teacherLoading/teacherLoading.html';
                        case SCHOOL_TYPE:
                            return 'app/pages/searchPage/schoolResult/schoolResult.html';
                    }
                };
                SearchPageController.prototype._searchByCountry = function (country) {
                    var self = this;
                    if (country == 'Colombia') {
                        var location_1 = {
                            country: country,
                            city: 'Medellin',
                            address: 'Transversal 31Sur #32B-64'
                        };
                        this.$timeout(function () {
                            self.$rootScope.$broadcast('PositionCountry', location_1);
                        });
                    }
                };
                SearchPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Students', function (event, args) {
                        self.StudentService.getAllStudents().then(function (response) {
                            self.type = 'student';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response, 'search-map', { lat: 6.175434, lng: -75.583329 }, 6);
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                        });
                    });
                    this.$scope.$on('Teachers', function (event, args) {
                        self.TeacherService.getAllTeachersByStatus(self.VALIDATED).then(function (response) {
                            self.type = 'teacher';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response.results, 'search-map', null, 6);
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                        });
                    });
                    this.$scope.$on('Schools', function (event, args) {
                        self.SchoolService.getAllSchools().then(function (response) {
                            self.type = 'school';
                            self.mapConfig = self.FunctionsUtilService.buildMapConfig(response, 'search-map', { lat: 6.175434, lng: -75.583329 }, 6);
                            self.$scope.$broadcast('BuildMarkers', self.mapConfig);
                            self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                        });
                    });
                    this.$scope.$on('SelectContainer', function (event, args) {
                        var containerId = '#container-' + args;
                        var containerClasses = document.querySelector(containerId).classList;
                        containerClasses.add('search-result__teacher__block--selected');
                        document.querySelector(containerId).scrollIntoView({ behavior: 'smooth' });
                    });
                    this.$scope.$on('SearchCountry', function (event, args) {
                        self._searchByCountry(args);
                    });
                };
                SearchPageController.controllerId = 'mainApp.pages.searchPage.SearchPageController';
                SearchPageController.$inject = [
                    'mainApp.models.student.StudentService',
                    'mainApp.models.teacher.TeacherService',
                    'mainApp.models.school.SchoolService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$stateParams',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$timeout'];
                return SearchPageController;
            }());
            searchPage.SearchPageController = SearchPageController;
            angular
                .module('mainApp.pages.searchPage')
                .controller(SearchPageController.controllerId, SearchPageController);
        })(searchPage = pages.searchPage || (pages.searchPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/searchPage/searchPage.controller.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var searchPage;
        (function (searchPage) {
            'use strict';
            var MaTeacherResult = (function () {
                function MaTeacherResult() {
                    this.bindToController = true;
                    this.controller = TeacherResultController.controllerId;
                    this.controllerAs = 'vm';
                    this.restrict = 'E';
                    this.templateUrl = 'app/pages/searchPage/teacherResult/teacherResult.html';
                    console.log('maTeacherResult directive constructor');
                }
                MaTeacherResult.prototype.link = function ($scope, elm, attr) {
                    console.log('maTeacherResult link function');
                };
                MaTeacherResult.instance = function () {
                    return new MaTeacherResult();
                };
                MaTeacherResult.directiveId = 'maTeacherResult';
                return MaTeacherResult;
            }());
            angular
                .module('mainApp.pages.searchPage')
                .directive(MaTeacherResult.directiveId, MaTeacherResult.instance);
            var TeacherResultController = (function () {
                function TeacherResultController(functionsUtil, $uibModal, dataConfig, $filter, $state, $rootScope) {
                    this.functionsUtil = functionsUtil;
                    this.$uibModal = $uibModal;
                    this.dataConfig = dataConfig;
                    this.$filter = $filter;
                    this.$state = $state;
                    this.$rootScope = $rootScope;
                    this.init();
                }
                TeacherResultController.prototype.init = function () {
                    this.form = {};
                    this._hoverDetail = [];
                    this.activate();
                };
                TeacherResultController.prototype.activate = function () {
                    console.log('teacherResult controller actived');
                };
                TeacherResultController.prototype.goToDetails = function (containerId) {
                    var url = this.$state.href('page.teacherProfilePage', { id: containerId });
                    window.open(url, '_blank');
                };
                TeacherResultController.prototype._assignNativeClass = function (languages) {
                    var native = languages.native;
                    var teach = languages.teach;
                    var isNative = false;
                    for (var i = 0; i < native.length; i++) {
                        for (var j = 0; j < teach.length; j++) {
                            if (teach[j] === native[i]) {
                                isNative = true;
                            }
                        }
                    }
                    return isNative;
                };
                TeacherResultController.prototype._ratingAverage = function (ratingsArr) {
                    return this.functionsUtil.teacherRatingAverage(ratingsArr);
                };
                TeacherResultController.prototype._hoverEvent = function (id, status) {
                    var args = { id: id, status: status };
                    this._hoverDetail[id] = status;
                    this.$rootScope.$broadcast('ChangeMarker', args);
                };
                TeacherResultController.controllerId = 'mainApp.pages.searchPage.TeacherResultController';
                TeacherResultController.$inject = [
                    'mainApp.core.util.FunctionsUtilService',
                    '$uibModal',
                    'dataConfig',
                    '$filter',
                    '$state',
                    '$rootScope'
                ];
                return TeacherResultController;
            }());
            searchPage.TeacherResultController = TeacherResultController;
            angular.module('mainApp.pages.searchPage')
                .controller(TeacherResultController.controllerId, TeacherResultController);
        })(searchPage = pages.searchPage || (pages.searchPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/searchPage/teacherResult/teacherResult.directive.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.userProfilePage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.userProfilePage', {
            url: '/users/show/:id',
            views: {
                'container': {
                    templateUrl: 'app/pages/userProfilePage/userProfilePage.html',
                    controller: 'mainApp.pages.userProfilePage.UserProfilePageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            params: {
                user: null,
                id: null
            }
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/userProfilePage/userProfilePage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var userProfilePage;
        (function (userProfilePage) {
            var UserProfilePageController = (function () {
                function UserProfilePageController(UserService, $state, $stateParams, $filter, $scope) {
                    this.UserService = UserService;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this._init();
                }
                UserProfilePageController.prototype._init = function () {
                    this.data = null;
                    this.form = {
                        username: '',
                        email: ''
                    };
                    this.error = {
                        message: ''
                    };
                    this.mapConfig = {
                        type: 'location-map',
                        data: null
                    };
                    this.$scope.date;
                    this.$scope.datetimepickerConfig = {
                        minView: 'hour',
                        dropdownSelector: '.my-toggle-select'
                    };
                    this.activate();
                };
                UserProfilePageController.prototype.activate = function () {
                    var self = this;
                    console.log('userProfilePage controller actived');
                    this.UserService.getUserProfileById(this.$stateParams.id).then(function (response) {
                        self.data = new app.models.user.Profile(response);
                    });
                };
                UserProfilePageController.prototype.onTimeSet = function (newDate, oldDate) {
                    console.log(newDate);
                    console.log(oldDate);
                };
                UserProfilePageController.prototype.beforeRender = function ($view, $dates, $leftDate, $upDate, $rightDate) {
                    var index = Math.floor(Math.random() * $dates.length);
                    $dates[index].selectable = false;
                };
                UserProfilePageController.prototype.goToConfirm = function () {
                    this.$state.go('page.meetingConfirmationPage');
                };
                UserProfilePageController.controllerId = 'mainApp.pages.userProfilePage.UserProfilePageController';
                UserProfilePageController.$inject = [
                    'mainApp.models.user.UserService',
                    '$state',
                    '$stateParams',
                    '$filter',
                    '$scope'];
                return UserProfilePageController;
            }());
            userProfilePage.UserProfilePageController = UserProfilePageController;
            angular
                .module('mainApp.pages.userProfilePage')
                .controller(UserProfilePageController.controllerId, UserProfilePageController);
        })(userProfilePage = pages.userProfilePage || (pages.userProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/userProfilePage/userProfilePage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editProfile', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editProfile', {
            url: '/users/edit',
            views: {
                'container': {
                    templateUrl: 'app/pages/editProfile/editProfile.html',
                    controller: 'mainApp.pages.editProfile.EditProfileController',
                    controllerAs: 'vm',
                    resolve: {
                        waitForAuth: ['mainApp.auth.AuthService', function (AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                    }
                }
            },
            cache: false,
            data: {
                requireLogin: true
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/editProfile/editProfile.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editProfile;
        (function (editProfile) {
            var EditProfileController = (function () {
                function EditProfileController(getDataFromJson, functionsUtilService, userService, teacherService, messageUtil, dataConfig, $state, $stateParams, $filter, $scope, $window, $rootScope, $uibModal, waitForAuth) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.userService = userService;
                    this.teacherService = teacherService;
                    this.messageUtil = messageUtil;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$window = $window;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditProfileController.prototype._init = function () {
                    var self = this;
                    var loggedUserId = this.$rootScope.userData.id;
                    var currentState = this.$state.current.name;
                    if (this.$rootScope.profileData) {
                        this.isTeacher = this.$rootScope.profileData.IsTeacher;
                    }
                    this.activate();
                };
                EditProfileController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Edit Profile Page';
                    var self = this;
                    DEBUG && console.log('editProfile controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this._subscribeToEvents();
                    this.fillFormWithProfileData();
                };
                EditProfileController.prototype.fillFormWithProfileData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    if (userId) {
                        this.userService.getUserProfileById(userId)
                            .then(function (response) {
                            if (response.userId) {
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                            }
                        });
                    }
                };
                EditProfileController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Save Profile Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        var userId = self.$rootScope.profileData.UserId;
                        if (userId) {
                            self.userService.updateUserProfile(self.$rootScope.profileData)
                                .then(function (response) {
                                if (response.userId) {
                                    self.$rootScope.profileData = new app.models.user.Profile(response);
                                    self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                                    self.$scope.$broadcast('Saved');
                                }
                            }, function (error) {
                                self.messageUtil.error('');
                                self.$scope.$broadcast('Fill User Profile Form', 'error');
                            });
                        }
                    });
                };
                EditProfileController.controllerId = 'mainApp.pages.editProfile.EditProfileController';
                EditProfileController.$inject = [
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.user.UserService',
                    'mainApp.models.teacher.TeacherService',
                    'mainApp.core.util.messageUtilService',
                    'dataConfig',
                    '$state',
                    '$stateParams',
                    '$filter',
                    '$scope',
                    '$window',
                    '$rootScope',
                    '$uibModal',
                    'waitForAuth'];
                return EditProfileController;
            }());
            editProfile.EditProfileController = EditProfileController;
            angular
                .module('mainApp.pages.editProfile')
                .controller(EditProfileController.controllerId, EditProfileController);
        })(editProfile = pages.editProfile || (pages.editProfile = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/editProfile/editProfile.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editProfile')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editProfile.basicInfo', {
            url: '/info',
            views: {
                'section': {
                    templateUrl: 'app/pages/editProfile/editProfileBasicInfo/editProfileBasicInfo.html',
                    controller: 'mainApp.pages.editProfile.EditProfileBasicInfoController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/editProfileBasicInfo/editProfileBasicInfo.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editProfileBasicInfo;
        (function (editProfileBasicInfo) {
            var EditProfileBasicInfoController = (function () {
                function EditProfileBasicInfoController(dataConfig, userService, getDataFromJson, functionsUtil, $state, $filter, $timeout, $uibModal, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.userService = userService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$uibModal = $uibModal;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                EditProfileBasicInfoController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.countryObject = { code: '', value: '' };
                    this.genderObject = { gender: { code: '', value: '' } };
                    this.dateObject = { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } };
                    this.form = {
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        gender: '',
                        birthDate: null,
                        countryBirth: '',
                        cityBirth: '',
                        about: '',
                        native: [],
                        learn: [],
                        teach: []
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listGenders = this.getDataFromJson.getSexi18n();
                    this.listDays = this.functionsUtil.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtil.buildNumberSelectList(1916, 2017);
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.validate = {
                        firstName: { valid: true, message: '' },
                        lastName: { valid: true, message: '' },
                        phoneNumber: { valid: true, message: '' },
                        gender: { valid: true, message: '' },
                        birthDate: {
                            day: { valid: true, message: '' },
                            month: { valid: true, message: '' },
                            year: { valid: true, message: '' },
                            valid: true,
                            message: ''
                        },
                        countryBirth: { valid: true, message: '' },
                        cityBirth: { valid: true, message: '' },
                        about: { valid: true, message: '' },
                        native: { valid: true, message: '' },
                        teach: { valid: true, message: '' },
                        learn: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditProfileBasicInfoController.prototype.activate = function () {
                    DEBUG && console.log('EditProfileBasicInfo controller actived');
                    this._subscribeToEvents();
                    this._fillForm(this.$rootScope.profileData);
                };
                EditProfileBasicInfoController.prototype.goToEditMedia = function () {
                    this.$state.go('page.editProfile.media');
                };
                EditProfileBasicInfoController.prototype.goToEditLocation = function () {
                    this.$state.go('page.editProfile.location');
                };
                EditProfileBasicInfoController.prototype._fillForm = function (data) {
                    this.form.firstName = data.FirstName;
                    this.form.lastName = data.LastName;
                    this.form.phoneNumber = data.PhoneNumber;
                    this.genderObject.gender.code = data.Gender;
                    var date = this.functionsUtil.splitDate(data.BirthDate);
                    this.dateObject.day.value = date.day ? parseInt(date.day) : '';
                    this.dateObject.month.code = date.month !== 'Invalid date' ? date.month : '';
                    this.dateObject.year.value = date.year ? parseInt(date.year) : '';
                    this.countryObject.code = data.BornCountry;
                    this.form.cityBirth = data.BornCity;
                    this.form.about = data.About;
                    if (this.form.native.length === 0) {
                        var languageArray = this.getDataFromJson.getLanguagei18n();
                        for (var i = 0; i < languageArray.length; i++) {
                            if (data.Languages.Native) {
                                for (var j = 0; j < data.Languages.Native.length; j++) {
                                    if (data.Languages.Native[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.native == null) {
                                            this.form.native = [];
                                            this.form.native.push(obj);
                                        }
                                        else {
                                            this.form.native.push(obj);
                                        }
                                    }
                                }
                            }
                            if (data.Languages.Learn) {
                                for (var j = 0; j < data.Languages.Learn.length; j++) {
                                    if (data.Languages.Learn[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.learn == null) {
                                            this.form.learn = [];
                                            this.form.learn.push(obj);
                                        }
                                        else {
                                            this.form.learn.push(obj);
                                        }
                                    }
                                }
                            }
                            if (data.Languages.Teach) {
                                for (var j = 0; j < data.Languages.Teach.length; j++) {
                                    if (data.Languages.Teach[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.teach == null) {
                                            this.form.teach = [];
                                            this.form.teach.push(obj);
                                        }
                                        else {
                                            this.form.teach.push(obj);
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                EditProfileBasicInfoController.prototype._validateBasicInfoForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
                    var first_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.firstName = this.functionsUtil.validator(this.form.firstName, first_rules);
                    if (!this.validate.firstName.valid) {
                        formValid = this.validate.firstName.valid;
                    }
                    var last_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.lastName = this.functionsUtil.validator(this.form.lastName, last_rules);
                    if (!this.validate.lastName.valid) {
                        formValid = this.validate.lastName.valid;
                    }
                    var phoneNumber_rules = [NULL_ENUM, EMPTY_ENUM, NUMBER_ENUM];
                    var onlyNum = this.form.phoneNumber.replace(/\D+/g, "");
                    onlyNum = parseInt(onlyNum) || '';
                    this.validate.phoneNumber = this.functionsUtil.validator(onlyNum, phoneNumber_rules);
                    if (!this.validate.phoneNumber.valid) {
                        formValid = this.validate.phoneNumber.valid;
                    }
                    var gender_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.gender = this.functionsUtil.validator(this.genderObject.gender.code, gender_rules);
                    if (!this.validate.gender.valid) {
                        formValid = this.validate.gender.valid;
                    }
                    var day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.day = this.functionsUtil.validator(this.dateObject.day.value, day_birthdate_rules);
                    if (!this.validate.birthDate.day.valid) {
                        formValid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.birthDate.month = this.functionsUtil.validator(this.dateObject.month.code, month_birthdate_rules);
                    if (!this.validate.birthDate.month.valid) {
                        formValid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.year = this.functionsUtil.validator(this.dateObject.year.value, year_birthdate_rules);
                    if (!this.validate.birthDate.year.valid) {
                        formValid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    if (this.validate.birthDate.day.valid &&
                        this.validate.birthDate.month.valid &&
                        this.validate.birthDate.year.valid) {
                        this.validate.birthDate.valid = true;
                        this.validate.birthDate.message = '';
                    }
                    var country_birth_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.countryBirth = this.functionsUtil.validator(this.countryObject.code, country_birth_rules);
                    if (!this.validate.countryBirth.valid) {
                        formValid = this.validate.countryBirth.valid;
                    }
                    var city_birth_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.cityBirth = this.functionsUtil.validator(this.form.cityBirth, city_birth_rules);
                    if (!this.validate.cityBirth.valid) {
                        formValid = this.validate.cityBirth.valid;
                    }
                    var about_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.about = this.functionsUtil.validator(this.form.about, about_rules);
                    if (!this.validate.about.valid) {
                        formValid = this.validate.about.valid;
                    }
                    return formValid;
                };
                EditProfileBasicInfoController.prototype._validateLanguagesForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
                    var native_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.native = this.functionsUtil.validator(this.form.native, native_rules);
                    if (!this.validate.native.valid) {
                        formValid = this.validate.native.valid;
                    }
                    var learn_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.learn = this.functionsUtil.validator(this.form.learn, learn_rules);
                    if (!this.validate.learn.valid) {
                        formValid = this.validate.learn.valid;
                    }
                    return formValid;
                };
                EditProfileBasicInfoController.prototype._addNewLanguages = function (type, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalLanguagesTmpl,
                        controller: 'mainApp.components.modal.ModalLanguageController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    type: type,
                                    list: self.form[type]
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newLanguagesList) {
                        self.form[type] = newLanguagesList;
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditProfileBasicInfoController.prototype._removeLanguage = function (key, type) {
                    var newArray = this.form[type].filter(function (el) {
                        return el.key !== key;
                    });
                    this.form[type] = newArray;
                };
                EditProfileBasicInfoController.prototype._setBasicInfoFromForm = function () {
                    var dateFormatted = this.functionsUtil.joinDate(this.dateObject.day.value, this.dateObject.month.code, this.dateObject.year.value);
                    var genderCode = this.genderObject.gender.code;
                    var countryCode = this.countryObject.code;
                    this.form.countryBirth = countryCode;
                    this.$rootScope.profileData.FirstName = this.form.firstName;
                    this.$rootScope.profileData.LastName = this.form.lastName;
                    this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
                    this.$rootScope.profileData.Gender = genderCode;
                    this.$rootScope.profileData.BirthDate = dateFormatted;
                    this.$rootScope.profileData.BornCountry = this.form.countryBirth;
                    this.$rootScope.profileData.BornCity = this.form.cityBirth;
                    this.$rootScope.profileData.About = this.form.about;
                };
                EditProfileBasicInfoController.prototype._setLanguageFromForm = function () {
                    if (this.form.native) {
                        var native = [];
                        for (var i = 0; i < this.form.native.length; i++) {
                            native.push(this.form.native[i].key);
                        }
                        this.$rootScope.profileData.Languages.Native = native;
                    }
                    if (this.form.learn) {
                        var learn = [];
                        for (var i = 0; i < this.form.learn.length; i++) {
                            learn.push(this.form.learn[i].key);
                        }
                        this.$rootScope.profileData.Languages.Learn = learn;
                    }
                    if (this.form.teach) {
                        var teach = [];
                        for (var i = 0; i < this.form.teach.length; i++) {
                            teach.push(this.form.teach[i].key);
                        }
                        this.$rootScope.profileData.Languages.Teach = teach;
                    }
                };
                EditProfileBasicInfoController.prototype.saveBasicInfoSection = function () {
                    var self = this;
                    var formValid = this._validateBasicInfoForm();
                    if (formValid) {
                        this.saving = true;
                        this._setBasicInfoFromForm();
                        this.$scope.$emit('Save Profile Data');
                    }
                };
                EditProfileBasicInfoController.prototype.saveLanguagesSection = function () {
                    var self = this;
                    var formValid = this._validateLanguagesForm();
                    if (formValid) {
                        this.saving = true;
                        this._setLanguageFromForm();
                        this.$scope.$emit('Save Profile Data');
                    }
                };
                EditProfileBasicInfoController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditProfileBasicInfoController.controllerId = 'mainApp.pages.editProfile.EditProfileBasicInfoController';
                EditProfileBasicInfoController.$inject = [
                    'dataConfig',
                    'mainApp.models.user.UserService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$timeout',
                    '$uibModal',
                    '$scope',
                    '$rootScope'
                ];
                return EditProfileBasicInfoController;
            }());
            editProfileBasicInfo.EditProfileBasicInfoController = EditProfileBasicInfoController;
            angular
                .module('mainApp.pages.editProfile')
                .controller(EditProfileBasicInfoController.controllerId, EditProfileBasicInfoController);
        })(editProfileBasicInfo = pages.editProfileBasicInfo || (pages.editProfileBasicInfo = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/editProfileBasicInfo/editProfileBasicInfo.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editProfile')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editProfile.media', {
            url: '/media',
            views: {
                'section': {
                    templateUrl: 'app/pages/editProfile/editProfileMedia/editProfileMedia.html',
                    controller: 'mainApp.pages.editProfile.EditProfileMediaController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/editProfileMedia/editProfileMedia.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editProfileMedia;
        (function (editProfileMedia) {
            var EditProfileMediaController = (function () {
                function EditProfileMediaController(dataConfig, userService, S3UploadService, getDataFromJson, functionsUtil, Upload, $state, $filter, $timeout, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.userService = userService;
                    this.S3UploadService = S3UploadService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.Upload = Upload;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                EditProfileMediaController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.form = {
                        avatar: null,
                        croppedDataUrl: '',
                        thumbnail: ''
                    };
                    this.validate = {
                        avatar: { valid: true, message: '' },
                        thumbnail: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditProfileMediaController.prototype.activate = function () {
                    DEBUG && console.log('EditProfileMedia controller actived');
                    this._subscribeToEvents();
                };
                EditProfileMediaController.prototype.goToEditProfile = function () {
                    this.$state.go('page.editProfile.basicInfo');
                };
                EditProfileMediaController.prototype.goToEditLocation = function () {
                    this.$state.go('page.editProfile.location');
                };
                EditProfileMediaController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var DEFINED_ENUM = 6;
                    var PHOTO_MESSAGE = this.$filter('translate')('%create.teacher.photo.validation.message.text');
                    var formValid = true;
                    this.validate.globalValidate.valid = true;
                    this.validate.globalValidate.message = '';
                    var avatar_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.avatar = this.functionsUtil.validator(this.form.avatar, avatar_rules);
                    var thumbnail_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.thumbnail = this.functionsUtil.validator(this.form.thumbnail, thumbnail_rules);
                    if (!this.validate.avatar.valid) {
                        if (!this.validate.thumbnail.valid) {
                            this.validate.globalValidate.valid = false;
                            this.validate.globalValidate.message = PHOTO_MESSAGE;
                            formValid = this.validate.globalValidate.valid;
                        }
                        else {
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                    }
                    return formValid;
                };
                EditProfileMediaController.prototype._resizeImage = function () {
                    var self = this;
                    var newName = app.core.util.functionsUtil.FunctionsUtilService.generateGuid() + '.jpeg';
                    var options = {
                        width: 250,
                        height: 250,
                        quality: 1.0,
                        type: 'image/jpeg',
                        pattern: '.jpg',
                        restoreExif: false
                    };
                    var file = this.Upload.dataUrltoBlob(this.form.croppedDataUrl, newName);
                    return this.Upload.resize(file, options).then(function (resizedFile) {
                        return self._uploadImage(resizedFile).then(function (result) {
                            return result;
                        });
                    });
                };
                EditProfileMediaController.prototype._uploadImage = function (resizedFile) {
                    var self = this;
                    return this.S3UploadService.upload(resizedFile).then(function (result) {
                        return result;
                    }, function (error) {
                        DEBUG && console.error('error', error);
                        return error;
                    });
                };
                EditProfileMediaController.prototype._setDataModelFromForm = function (avatar) {
                    this.$rootScope.profileData.Avatar = avatar;
                };
                EditProfileMediaController.prototype.saveImageSection = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this._resizeImage().then(function (result) {
                            if (result.Location) {
                                self._setDataModelFromForm(result.Location);
                                self.$scope.$emit('Save Profile Data');
                            }
                            else {
                                self.error = true;
                            }
                        });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditProfileMediaController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.form.avatar = self.saved ? null : self.form.avatar;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditProfileMediaController.controllerId = 'mainApp.pages.editProfile.EditProfileMediaController';
                EditProfileMediaController.$inject = [
                    'dataConfig',
                    'mainApp.models.user.UserService',
                    'mainApp.core.s3Upload.S3UploadService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'Upload',
                    '$state',
                    '$filter',
                    '$timeout',
                    '$scope',
                    '$rootScope'
                ];
                return EditProfileMediaController;
            }());
            editProfileMedia.EditProfileMediaController = EditProfileMediaController;
            angular
                .module('mainApp.pages.editProfile')
                .controller(EditProfileMediaController.controllerId, EditProfileMediaController);
        })(editProfileMedia = pages.editProfileMedia || (pages.editProfileMedia = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/editProfileMedia/editProfileMedia.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editProfile')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editProfile.location', {
            url: '/location',
            views: {
                'section': {
                    templateUrl: 'app/pages/editProfile/editProfileLocation/editProfileLocation.html',
                    controller: 'mainApp.pages.editProfile.EditProfileLocationController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/editProfileLocation/editProfileLocation.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editProfileLocation;
        (function (editProfileLocation) {
            var EditProfileLocationController = (function () {
                function EditProfileLocationController(dataConfig, userService, getDataFromJson, functionsUtil, $state, $filter, $timeout, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.userService = userService;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                EditProfileLocationController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.countryObject = { code: '', value: '' };
                    this.form = {
                        countryLocation: '',
                        cityLocation: '',
                        stateLocation: '',
                        addressLocation: '',
                        zipCodeLocation: '',
                        positionLocation: new app.models.user.Position()
                    };
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.mapConfig = this.functionsUtil.buildMapConfig(null, 'drag-maker-map', null, null);
                    this.validate = {
                        countryLocation: { valid: true, message: '' },
                        cityLocation: { valid: true, message: '' },
                        stateLocation: { valid: true, message: '' },
                        addressLocation: { valid: true, message: '' },
                        zipCodeLocation: { valid: true, message: '' },
                        positionLocation: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditProfileLocationController.prototype.activate = function () {
                    DEBUG && console.log('EditProfileLocation controller actived');
                    this._subscribeToEvents();
                    this._fillForm(this.$rootScope.profileData);
                };
                EditProfileLocationController.prototype.goToEditMedia = function () {
                    this.$state.go('page.editProfile.media');
                };
                EditProfileLocationController.prototype.goToEditProfile = function () {
                    this.$state.go('page.editProfile.basicInfo');
                };
                EditProfileLocationController.prototype._fillForm = function (data) {
                    this.form.addressLocation = data.Location.Address;
                    this.form.cityLocation = data.Location.City;
                    this.form.stateLocation = data.Location.State;
                    this.form.zipCodeLocation = data.Location.ZipCode;
                    this.countryObject.code = data.Location.Country;
                    this.form.positionLocation = new app.models.user.Position(data.Location.Position);
                    this.mapConfig = this.functionsUtil.buildMapConfig([
                        {
                            id: this.form.positionLocation.Id,
                            location: {
                                position: {
                                    lat: parseFloat(this.form.positionLocation.Lat),
                                    lng: parseFloat(this.form.positionLocation.Lng)
                                }
                            }
                        }
                    ], 'drag-maker-map', { lat: parseFloat(this.form.positionLocation.Lat), lng: parseFloat(this.form.positionLocation.Lng) }, null);
                    this.$scope.$broadcast('BuildMarkers', this.mapConfig);
                };
                EditProfileLocationController.prototype._validateLocationForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var NUMBER_ENUM = 4;
                    var formValid = true;
                    var country_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.countryLocation = this.functionsUtil.validator(this.countryObject.code, country_rules);
                    if (!this.validate.countryLocation.valid) {
                        formValid = this.validate.countryLocation.valid;
                    }
                    var city_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.cityLocation = this.functionsUtil.validator(this.form.cityLocation, city_rules);
                    if (!this.validate.cityLocation.valid) {
                        formValid = this.validate.cityLocation.valid;
                    }
                    var state_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.stateLocation = this.functionsUtil.validator(this.form.stateLocation, state_rules);
                    if (!this.validate.stateLocation.valid) {
                        formValid = this.validate.stateLocation.valid;
                    }
                    var address_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.addressLocation = this.functionsUtil.validator(this.form.addressLocation, address_rules);
                    if (!this.validate.addressLocation.valid) {
                        formValid = this.validate.addressLocation.valid;
                    }
                    var position_rules = [NULL_ENUM, EMPTY_ENUM];
                    var latValidate = this.functionsUtil.validator(this.form.positionLocation.Lat, position_rules);
                    var lngValidate = this.functionsUtil.validator(this.form.positionLocation.Lng, position_rules);
                    if (!latValidate.valid || !lngValidate.valid) {
                        if (!latValidate.valid) {
                            this.validate.positionLocation = latValidate;
                            formValid = this.validate.positionLocation.valid;
                        }
                        else if (!lngValidate.valid) {
                            this.validate.positionLocation = lngValidate;
                            formValid = this.validate.positionLocation.valid;
                        }
                    }
                    return formValid;
                };
                EditProfileLocationController.prototype.changeMapPosition = function () {
                    var self = this;
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    var location = {
                        country: this.form.countryLocation,
                        city: this.form.cityLocation,
                        address: this.form.addressLocation
                    };
                    this.$timeout(function () {
                        self.$scope.$broadcast('CodeAddress', location);
                    });
                };
                EditProfileLocationController.prototype._setLocationFromForm = function () {
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    this.$rootScope.profileData.Location.Country = this.form.countryLocation;
                    this.$rootScope.profileData.Location.Address = this.form.addressLocation;
                    this.$rootScope.profileData.Location.City = this.form.cityLocation;
                    this.$rootScope.profileData.Location.State = this.form.stateLocation;
                    this.$rootScope.profileData.Location.ZipCode = this.form.zipCodeLocation;
                    this.$rootScope.profileData.Location.Position = this.form.positionLocation;
                };
                EditProfileLocationController.prototype.saveLocationSection = function () {
                    var self = this;
                    var formValid = this._validateLocationForm();
                    if (formValid) {
                        this.saving = true;
                        this._setLocationFromForm();
                        this.$scope.$emit('Save Profile Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditProfileLocationController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Position', function (event, args) {
                        self.form.positionLocation.Lng = args.lng;
                        self.form.positionLocation.Lat = args.lat;
                    });
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditProfileLocationController.controllerId = 'mainApp.pages.editProfile.EditProfileLocationController';
                EditProfileLocationController.$inject = [
                    'dataConfig',
                    'mainApp.models.user.UserService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$timeout',
                    '$scope',
                    '$rootScope'
                ];
                return EditProfileLocationController;
            }());
            editProfileLocation.EditProfileLocationController = EditProfileLocationController;
            angular
                .module('mainApp.pages.editProfile')
                .controller(EditProfileLocationController.controllerId, EditProfileLocationController);
        })(editProfileLocation = pages.editProfileLocation || (pages.editProfileLocation = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/editProfileLocation/editProfileLocation.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.userEditAgendaPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.userEditAgendaPage', {
            url: '/users/edit/:id/agenda',
            views: {
                'container': {
                    templateUrl: 'app/pages/userEditAgendaPage/userEditAgendaPage.html',
                    controller: 'mainApp.pages.userEditAgendaPage.UserEditAgendaPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page'
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/userEditAgendaPage/userEditAgendaPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var userEditAgendaPage;
        (function (userEditAgendaPage) {
            var UserEditAgendaPageController = (function () {
                function UserEditAgendaPageController($state, $filter, $scope, uiCalendarConfig) {
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.uiCalendarConfig = uiCalendarConfig;
                    this._init();
                }
                UserEditAgendaPageController.prototype._init = function () {
                    var self = this;
                    this.form = {
                        username: '',
                        email: ''
                    };
                    this.error = {
                        message: ''
                    };
                    this.$scope.calendarConfig = {
                        calendar: {
                            editable: true,
                            header: {
                                left: 'prev',
                                center: 'title',
                                right: 'month, agendaDay, next'
                            },
                            slotDuration: '01:00:00',
                            slotLabelFormat: 'h(:mm) a',
                            navLinks: true,
                            allDaySlot: false,
                            events: [
                                {
                                    title: 'Rosa',
                                    start: '2016-10-12T17:00:00',
                                    end: '2016-10-12T18:00:00',
                                    editable: false
                                },
                                {
                                    title: 'Carlos',
                                    start: '2016-10-20T20:00:00',
                                    end: '2016-10-20T21:00:00',
                                    editable: false
                                },
                                {
                                    title: 'Michaelson',
                                    start: '2016-10-23T07:00:00',
                                    end: '2016-10-23T08:00:00',
                                    editable: false
                                }
                            ],
                            timeFormat: 'h:mm a',
                            buttonText: {
                                month: 'view calendar'
                            }
                        }
                    };
                    this.$scope.changeView = function (view, calendar) {
                        self.uiCalendarConfig.calendars['userAgenda'].fullCalendar('changeView', 'agendaDay');
                    };
                    this.$scope.eventSources = [];
                    this.activate();
                };
                UserEditAgendaPageController.prototype.activate = function () {
                    console.log('userEditAgendaPage controller actived');
                };
                UserEditAgendaPageController.prototype.goToEditProfile = function () {
                    this.$state.go('page.userEditProfilePage');
                };
                UserEditAgendaPageController.prototype.goToEditMedia = function () {
                    this.$state.go('page.userEditMediaPage');
                };
                UserEditAgendaPageController.controllerId = 'mainApp.pages.userEditAgendaPage.UserEditAgendaPageController';
                UserEditAgendaPageController.$inject = [
                    '$state',
                    '$filter',
                    '$scope',
                    'uiCalendarConfig'];
                return UserEditAgendaPageController;
            }());
            userEditAgendaPage.UserEditAgendaPageController = UserEditAgendaPageController;
            angular
                .module('mainApp.pages.userEditAgendaPage')
                .controller(UserEditAgendaPageController.controllerId, UserEditAgendaPageController);
        })(userEditAgendaPage = pages.userEditAgendaPage || (pages.userEditAgendaPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editProfile/userEditAgendaPage/userEditAgendaPage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher', {
            url: '/teachers/edit',
            views: {
                'container': {
                    templateUrl: 'app/pages/editTeacher/editTeacher.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherController',
                    controllerAs: 'vm',
                    resolve: {
                        waitForAuth: ['mainApp.auth.AuthService', function (AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                    }
                }
            },
            cache: false,
            data: {
                requireLogin: true
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/editTeacher/editTeacher.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherController = (function () {
                function EditTeacherController(getDataFromJson, functionsUtilService, userService, teacherService, messageUtil, dataConfig, $state, $stateParams, $filter, $scope, $window, $rootScope, $uibModal, waitForAuth) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.userService = userService;
                    this.teacherService = teacherService;
                    this.messageUtil = messageUtil;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$window = $window;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditTeacherController.prototype._init = function () {
                    var self = this;
                    var loggedUserId = this.$rootScope.userData.id;
                    var currentState = this.$state.current.name;
                    this.$rootScope.teacherData = new app.models.teacher.Teacher();
                    this.$rootScope.teacherData.Profile.UserId = loggedUserId;
                    this.activate();
                };
                EditTeacherController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Edit Teacher Page';
                    var self = this;
                    DEBUG && console.log('editTeacher controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this._subscribeToEvents();
                    this.fillFormWithProfileData();
                    this.fillFormWithTeacherData();
                };
                EditTeacherController.prototype.fillFormWithProfileData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    if (userId) {
                        this.userService.getUserProfileById(userId)
                            .then(function (response) {
                            if (response.userId) {
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                            }
                        });
                    }
                };
                EditTeacherController.prototype.fillFormWithTeacherData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    this.teacherService.getTeacherByProfileId(userId).then(function (response) {
                        if (response.id) {
                            self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                            self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                        }
                    });
                };
                EditTeacherController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Save Profile Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        var userId = self.$rootScope.profileData.UserId;
                        if (userId) {
                            self.userService.updateUserProfile(self.$rootScope.profileData)
                                .then(function (response) {
                                if (response.userId) {
                                    self.$rootScope.profileData = new app.models.user.Profile(response);
                                    self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                                    self.$scope.$broadcast('Saved');
                                }
                            }, function (error) {
                                self.messageUtil.error('');
                                self.$scope.$broadcast('Fill User Profile Form', 'error');
                            });
                        }
                    });
                    this.$scope.$on('Save Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        if (self.$rootScope.teacherData.Id) {
                            self.teacherService.updateTeacher(self.$rootScope.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                    self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                                    self.$scope.$broadcast('Saved');
                                }
                            }, function (error) {
                                self.messageUtil.error('');
                                self.$scope.$broadcast('Fill Form', 'error');
                            });
                        }
                        else {
                            DEBUG && console.log('self.$rootScope.teacherData.Id doesn´t exist');
                        }
                    });
                };
                EditTeacherController.controllerId = 'mainApp.pages.editTeacher.EditTeacherController';
                EditTeacherController.$inject = [
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.user.UserService',
                    'mainApp.models.teacher.TeacherService',
                    'mainApp.core.util.messageUtilService',
                    'dataConfig',
                    '$state',
                    '$stateParams',
                    '$filter',
                    '$scope',
                    '$window',
                    '$rootScope',
                    '$uibModal',
                    'waitForAuth'];
                return EditTeacherController;
            }());
            editTeacher.EditTeacherController = EditTeacherController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherController.controllerId, EditTeacherController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/editTeacher/editTeacher.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher.experience', {
            url: '/experience',
            views: {
                'section': {
                    templateUrl: 'app/pages/editTeacher/editTeacherExperience/editTeacherExperience.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherExperienceController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherExperience/editTeacherExperience.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherExperienceController = (function () {
                function EditTeacherExperienceController(dataConfig, getDataFromJson, functionsUtilService, $timeout, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditTeacherExperienceController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.description.text');
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        type: 'H',
                        experiences: []
                    };
                    var currentYear = parseInt(this.dataConfig.currentYear);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1957, currentYear);
                    this.yearObject = { value: '' };
                    this._hobbyChecked = { type: 'H', checked: true };
                    this._professionalChecked = { type: 'P', checked: false };
                    this.validate = {
                        type: { valid: true, message: '' },
                        teacherSince: { valid: true, message: '' },
                        experiences: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherExperienceController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherExperienceController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                EditTeacherExperienceController.prototype.saveExperienceSection = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditTeacherExperienceController.prototype._checkType = function (key) {
                    var type = key.type;
                    if (type === 'H') {
                        this._professionalChecked.checked = false;
                        this._hobbyChecked.checked = true;
                        this.form.type = this._hobbyChecked.type;
                    }
                    else {
                        this._professionalChecked.checked = true;
                        this._hobbyChecked.checked = false;
                        this.form.type = this._professionalChecked.type;
                    }
                };
                EditTeacherExperienceController.prototype._fillForm = function (data) {
                    this.form.type = data.Type || 'H';
                    if (this.form.type === 'H') {
                        this._professionalChecked.checked = false;
                        this._hobbyChecked.checked = true;
                    }
                    else {
                        this._professionalChecked.checked = true;
                        this._hobbyChecked.checked = false;
                    }
                    this.yearObject.value = data.TeacherSince;
                    this.form.experiences = data.Experiences;
                };
                EditTeacherExperienceController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var teacher_since_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.teacherSince = this.functionsUtilService.validator(this.yearObject.value, teacher_since_rules);
                    if (!this.validate.teacherSince.valid) {
                        formValid = this.validate.teacherSince.valid;
                    }
                    return formValid;
                };
                EditTeacherExperienceController.prototype.changeHelpText = function (type) {
                    var TYPE_HOBBY_TITLE = this.$filter('translate')('%global.teacher.type.hobby.text');
                    var TYPE_HOBBY_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.hobby.description.text');
                    var TYPE_PROFESSIONAL_TITLE = this.$filter('translate')('%global.teacher.type.professional.text');
                    var TYPE_PROFESSIONAL_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.professional.description.text');
                    var SINCE_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.title.text');
                    var SINCE_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.description.text');
                    var EXPERIENCES_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.experiences.title.text');
                    var EXPERIENCES_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.experiences.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'hobby':
                            this.helpText.title = TYPE_HOBBY_TITLE;
                            this.helpText.description = TYPE_HOBBY_DESCRIPTION;
                            break;
                        case 'professional':
                            this.helpText.title = TYPE_PROFESSIONAL_TITLE;
                            this.helpText.description = TYPE_PROFESSIONAL_DESCRIPTION;
                            break;
                        case 'teacherSince':
                            this.helpText.title = SINCE_TITLE;
                            this.helpText.description = SINCE_DESCRIPTION;
                            break;
                        case 'experiences':
                            this.helpText.title = EXPERIENCES_TITLE;
                            this.helpText.description = EXPERIENCES_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherExperienceController.prototype._addEditExperience = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalExperienceTmpl,
                        controller: 'mainApp.components.modal.ModalExperienceController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    experience: self.form.experiences[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newExperience) {
                        if (newExperience) {
                            self.form.experiences.push(newExperience);
                        }
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditTeacherExperienceController.prototype._setDataModelFromForm = function () {
                    this.$rootScope.teacherData.Type = this.form.type;
                    this.$rootScope.teacherData.TeacherSince = this.yearObject.value;
                };
                EditTeacherExperienceController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditTeacherExperienceController.controllerId = 'mainApp.pages.editTeacher.EditTeacherExperienceController';
                EditTeacherExperienceController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$timeout',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return EditTeacherExperienceController;
            }());
            editTeacher.EditTeacherExperienceController = EditTeacherExperienceController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherExperienceController.controllerId, EditTeacherExperienceController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherExperience/editTeacherExperience.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher.education', {
            url: '/education',
            views: {
                'section': {
                    templateUrl: 'app/pages/editTeacher/editTeacherEducation/editTeacherEducation.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherEducationController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherEducation/editTeacherEducation.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherEducationController = (function () {
                function EditTeacherEducationController(dataConfig, getDataFromJson, functionsUtilService, $timeout, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditTeacherEducationController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.education.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.description.text');
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        educations: [],
                        certificates: []
                    };
                    this.validate = {
                        educations: { valid: true, message: '' },
                        certificates: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherEducationController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherEducationController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                EditTeacherEducationController.prototype.saveEducationSection = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this.$scope.$emit('Save Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditTeacherEducationController.prototype._fillForm = function (data) {
                    this.form.educations = data.Educations;
                    this.form.certificates = data.Certificates;
                };
                EditTeacherEducationController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.education.validation.message.text');
                    var formValid = true;
                    var education_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.educations = this.functionsUtilService.validator(this.form.educations, education_rules);
                    var certificates_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.certificates = this.functionsUtilService.validator(this.form.certificates, certificates_rules);
                    if (this.validate.educations.valid) {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    else if (this.validate.certificates.valid) {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    else {
                        this.validate.globalValidate.valid = false;
                        this.validate.globalValidate.message = GLOBAL_MESSAGE;
                        formValid = this.validate.globalValidate.valid;
                    }
                    return formValid;
                };
                EditTeacherEducationController.prototype.changeHelpText = function (type) {
                    var EDUCATIONS_TITLE = this.$filter('translate')('%create.teacher.education.help_text.educations.title.text');
                    var EDUCATIONS_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.educations.description.text');
                    var CERTIFICATES_TITLE = this.$filter('translate')('%create.teacher.education.help_text.certificates.title.text');
                    var CERTIFICATES_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.certificates.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'educations':
                            this.helpText.title = EDUCATIONS_TITLE;
                            this.helpText.description = EDUCATIONS_DESCRIPTION;
                            break;
                        case 'certificates':
                            this.helpText.title = CERTIFICATES_TITLE;
                            this.helpText.description = CERTIFICATES_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherEducationController.prototype._addEditEducation = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalEducationTmpl,
                        controller: 'mainApp.components.modal.ModalEducationController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    education: self.form.educations[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newEducation) {
                        if (newEducation) {
                            self.form.educations.push(newEducation);
                        }
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditTeacherEducationController.prototype._addEditCertificate = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalCertificateTmpl,
                        controller: 'mainApp.components.modal.ModalCertificateController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    certificate: self.form.certificates[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newCertificate) {
                        if (newCertificate) {
                            self.form.certificates.push(newCertificate);
                        }
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditTeacherEducationController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditTeacherEducationController.controllerId = 'mainApp.pages.editTeacher.EditTeacherEducationController';
                EditTeacherEducationController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$timeout',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return EditTeacherEducationController;
            }());
            editTeacher.EditTeacherEducationController = EditTeacherEducationController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherEducationController.controllerId, EditTeacherEducationController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherEducation/editTeacherEducation.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher.teach', {
            url: '/teach',
            views: {
                'section': {
                    templateUrl: 'app/pages/editTeacher/editTeacherTeach/editTeacherTeach.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherTeachController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherTeach/editTeacherTeach.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherTeachController = (function () {
                function EditTeacherTeachController(dataConfig, functionsUtil, getDataFromJson, $state, $filter, $timeout, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.functionsUtil = functionsUtil;
                    this.getDataFromJson = getDataFromJson;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$timeout = $timeout;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditTeacherTeachController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        teach: []
                    };
                    this.validate = {
                        teach: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherTeachController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherTeachController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.profileData) {
                        this._fillForm(this.$rootScope.profileData);
                    }
                };
                EditTeacherTeachController.prototype.saveTeachSection = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Profile Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditTeacherTeachController.prototype._fillForm = function (data) {
                    if (this.form.teach.length === 0) {
                        var languageArray = this.getDataFromJson.getLanguagei18n();
                        for (var i = 0; i < languageArray.length; i++) {
                            if (data.Languages.Teach) {
                                for (var j = 0; j < data.Languages.Teach.length; j++) {
                                    if (data.Languages.Teach[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.teach == null) {
                                            this.form.teach = [];
                                            this.form.teach.push(obj);
                                        }
                                        else {
                                            this.form.teach.push(obj);
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                EditTeacherTeachController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var teach_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.teach = this.functionsUtil.validator(this.form.teach, teach_rules);
                    if (!this.validate.teach.valid) {
                        formValid = this.validate.teach.valid;
                    }
                    return formValid;
                };
                EditTeacherTeachController.prototype.changeHelpText = function (type) {
                    var TEACH_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
                    var TEACH_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'teach':
                            this.helpText.title = TEACH_TITLE;
                            this.helpText.description = TEACH_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherTeachController.prototype._addNewLanguages = function (type, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalLanguagesTmpl,
                        controller: 'mainApp.components.modal.ModalLanguageController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    type: type,
                                    list: self.form[type]
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newLanguagesList) {
                        self.form[type] = newLanguagesList;
                    }, function () {
                        DEBUG && console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                EditTeacherTeachController.prototype._removeLanguage = function (key, type) {
                    var newArray = this.form[type].filter(function (el) {
                        return el.key !== key;
                    });
                    this.form[type] = newArray;
                };
                EditTeacherTeachController.prototype._setDataModelFromForm = function () {
                    if (this.form.teach) {
                        var teach = [];
                        for (var i = 0; i < this.form.teach.length; i++) {
                            teach.push(this.form.teach[i].key);
                        }
                        this.$rootScope.profileData.Languages.Teach = teach;
                    }
                };
                EditTeacherTeachController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditTeacherTeachController.controllerId = 'mainApp.pages.editTeacher.EditTeacherTeachController';
                EditTeacherTeachController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    '$state',
                    '$filter',
                    '$timeout',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return EditTeacherTeachController;
            }());
            editTeacher.EditTeacherTeachController = EditTeacherTeachController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherTeachController.controllerId, EditTeacherTeachController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherTeach/editTeacherTeach.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher.methodology', {
            url: '/methodology',
            views: {
                'section': {
                    templateUrl: 'app/pages/editTeacher/editTeacherMethodology/editTeacherMethodology.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherMethodologyController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherMethodology/editTeacherMethodology.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherMethodologyController = (function () {
                function EditTeacherMethodologyController(dataConfig, getDataFromJson, functionsUtil, $timeout, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditTeacherMethodologyController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.method.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.description.text');
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        methodology: '',
                        immersion: new app.models.teacher.Immersion
                    };
                    this.typeOfImmersionList = this.getDataFromJson.getTypeOfImmersioni18n();
                    this.typeOfImmersionOptionBox = [];
                    this.validate = {
                        methodology: { valid: true, message: '' },
                        immersionActive: { valid: true, message: '' },
                        typeOfImmersionList: { valid: true, message: '' },
                        otherCategory: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherMethodologyController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherMethodologyController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                EditTeacherMethodologyController.prototype.changeStatus = function () {
                    this.form.immersion.Active = !this.form.immersion.Active;
                };
                EditTeacherMethodologyController.prototype.saveMethodologySection = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditTeacherMethodologyController.prototype._fillForm = function (data) {
                    this.form.methodology = data.Methodology;
                    this.form.immersion = data.Immersion;
                    if (this.form.immersion.Active) {
                        if (this.typeOfImmersionOptionBox.length === 0) {
                            var immersionArray = this.getDataFromJson.getTypeOfImmersioni18n();
                            var newArray = [];
                            for (var i = 0; i < immersionArray.length; i++) {
                                for (var j = 0; j < this.form.immersion.Category.length; j++) {
                                    if (this.form.immersion.Category[j] === immersionArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = immersionArray[i].code;
                                        obj.value = immersionArray[i].value;
                                        this._disableEnableOption(true, obj.key);
                                        this.typeOfImmersionOptionBox.push(obj);
                                    }
                                }
                            }
                        }
                    }
                };
                EditTeacherMethodologyController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.method.validation.message.text');
                    var formValid = true;
                    var methodology_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.methodology = this.functionsUtil.validator(this.form.methodology, methodology_rules);
                    if (!this.validate.methodology.valid) {
                        formValid = this.validate.methodology.valid;
                    }
                    if (this.form.immersion.Active) {
                        var typeOfImmersion_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.typeOfImmersionList = this.functionsUtil.validator(this.form.immersion.Category, typeOfImmersion_rules);
                        var otherCategory_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.otherCategory = this.functionsUtil.validator(this.form.immersion.OtherCategory, otherCategory_rules);
                        if (this.validate.typeOfImmersionList.valid) {
                            this.validate.typeOfImmersionList.valid = true;
                            this.validate.otherCategory.valid = true;
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                        else if (this.validate.otherCategory.valid) {
                            this.validate.typeOfImmersionList.valid = true;
                            this.validate.otherCategory.valid = true;
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                        else {
                            this.validate.globalValidate.valid = false;
                            this.validate.globalValidate.message = GLOBAL_MESSAGE;
                            formValid = this.validate.globalValidate.valid;
                        }
                    }
                    return formValid;
                };
                EditTeacherMethodologyController.prototype.changeHelpText = function (type) {
                    var METHODOLOGY_TITLE = this.$filter('translate')('%create.teacher.method.help_text.methodology.title.text');
                    var METHODOLOGY_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.methodology.description.text');
                    var IMMERSION_TITLE = this.$filter('translate')('%create.teacher.method.help_text.imm.title.text');
                    var IMMERSION_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.imm.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'methodology':
                            this.helpText.title = METHODOLOGY_TITLE;
                            this.helpText.description = METHODOLOGY_DESCRIPTION;
                            break;
                        case 'immersion':
                            this.helpText.title = IMMERSION_TITLE;
                            this.helpText.description = IMMERSION_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherMethodologyController.prototype._addNewImmersion = function () {
                    var self = this;
                    this._disableEnableOption(true, this.typeObject.code);
                    this.typeOfImmersionOptionBox.push({ key: this.typeObject.code, value: this.typeObject.value });
                    this.form.immersion.Category = [];
                    for (var i = 0; i < this.typeOfImmersionOptionBox.length; i++) {
                        this.form.immersion.Category.push(this.typeOfImmersionOptionBox[i].key);
                    }
                };
                EditTeacherMethodologyController.prototype._removeImmersion = function (key) {
                    this._disableEnableOption(false, key);
                    var newArray = this.typeOfImmersionOptionBox.filter(function (el) {
                        return el.key !== key;
                    });
                    this.typeOfImmersionOptionBox = newArray;
                    this.form.immersion.Category = [];
                    for (var i = 0; i < this.typeOfImmersionOptionBox.length; i++) {
                        this.form.immersion.Category.push(this.typeOfImmersionOptionBox[i].key);
                    }
                };
                EditTeacherMethodologyController.prototype._setDataModelFromForm = function () {
                    var immersionOptions = this.typeOfImmersionOptionBox;
                    this.$rootScope.teacherData.Methodology = this.form.methodology;
                    this.$rootScope.teacherData.Immersion = this.form.immersion;
                    this.$rootScope.teacherData.Immersion.Category = this.form.immersion.Category;
                };
                EditTeacherMethodologyController.prototype._disableEnableOption = function (action, key) {
                    for (var i = 0; i < this.typeOfImmersionList.length; i++) {
                        if (this.typeOfImmersionList[i].code === key) {
                            this.typeOfImmersionList[i].disabled = action;
                        }
                    }
                };
                EditTeacherMethodologyController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditTeacherMethodologyController.controllerId = 'mainApp.pages.editTeacher.EditTeacherMethodologyController';
                EditTeacherMethodologyController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$timeout',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return EditTeacherMethodologyController;
            }());
            editTeacher.EditTeacherMethodologyController = EditTeacherMethodologyController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherMethodologyController.controllerId, EditTeacherMethodologyController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherMethodology/editTeacherMethodology.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.editTeacher')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.editTeacher.price', {
            url: '/price',
            views: {
                'section': {
                    templateUrl: 'app/pages/editTeacher/editTeacherPrice/editTeacherPrice.html',
                    controller: 'mainApp.pages.editTeacher.EditTeacherPriceController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherPrice/editTeacherPrice.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var editTeacher;
        (function (editTeacher) {
            var EditTeacherPriceController = (function () {
                function EditTeacherPriceController(dataConfig, getDataFromJson, functionsUtilService, $timeout, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                EditTeacherPriceController.prototype._init = function () {
                    this.TIME_SHOW_MESSAGE = 6000;
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.price.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.description.text');
                    this.saving = false;
                    this.saved = false;
                    this.error = false;
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        privateClass: new app.models.teacher.TypeOfPrice,
                        groupClass: new app.models.teacher.TypeOfPrice
                    };
                    this.validate = {
                        privateClassPrice: { valid: true, message: '' },
                        privateClassActive: { valid: true, message: '' },
                        groupClassPrice: { valid: true, message: '' },
                        groupClassActive: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                EditTeacherPriceController.prototype.activate = function () {
                    DEBUG && console.log('EditTeacherPriceController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                EditTeacherPriceController.prototype.changeStatus = function (type) {
                    this.form[type].Active = !this.form[type].Active;
                };
                EditTeacherPriceController.prototype.savePriceSection = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.saving = true;
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                EditTeacherPriceController.prototype._fillForm = function (data) {
                    this.form.privateClass = data.Price.PrivateClass;
                    this.form.groupClass = data.Price.GroupClass;
                };
                EditTeacherPriceController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var IS_NOT_ZERO_ENUM = 5;
                    var EMPTY_ENUM = 3;
                    var TRUE_ENUM = 7;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.price.validation.message.text');
                    var formValid = true;
                    if (this.form.privateClass.Active) {
                        var privateClassPrice_rules = [NULL_ENUM, EMPTY_ENUM, IS_NOT_ZERO_ENUM];
                        this.validate.privateClassPrice = this.functionsUtilService.validator(this.form.privateClass.HourPrice, privateClassPrice_rules);
                        if (!this.validate.privateClassPrice.valid) {
                            formValid = this.validate.privateClassPrice.valid;
                        }
                    }
                    if (this.form.groupClass.Active) {
                        var groupClassPrice_rules = [NULL_ENUM, EMPTY_ENUM, IS_NOT_ZERO_ENUM];
                        this.validate.groupClassPrice = this.functionsUtilService.validator(this.form.groupClass.HourPrice, groupClassPrice_rules);
                        if (!this.validate.groupClassPrice.valid) {
                            formValid = this.validate.groupClassPrice.valid;
                        }
                    }
                    var privateClassActive_rules = [TRUE_ENUM];
                    this.validate.privateClassActive = this.functionsUtilService.validator(this.form.privateClass.Active, privateClassActive_rules);
                    var groupClassActive_rules = [TRUE_ENUM];
                    this.validate.groupClassActive = this.functionsUtilService.validator(this.form.groupClass.Active, groupClassActive_rules);
                    if (!this.validate.privateClassActive.valid && !this.validate.groupClassActive.valid) {
                        this.validate.globalValidate.valid = false;
                        this.validate.globalValidate.message = GLOBAL_MESSAGE;
                        formValid = this.validate.globalValidate.valid;
                    }
                    else {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    return formValid;
                };
                EditTeacherPriceController.prototype.changeHelpText = function (type) {
                    var PRIVATE_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.private_class.title.text');
                    var PRIVATE_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.private_class.description.text');
                    var GROUP_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.group_class.title.text');
                    var GROUP_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.group_class.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'privateClass':
                            this.helpText.title = PRIVATE_CLASS_TITLE;
                            this.helpText.description = PRIVATE_CLASS_DESCRIPTION;
                            break;
                        case 'groupClass':
                            this.helpText.title = GROUP_CLASS_TITLE;
                            this.helpText.description = GROUP_CLASS_DESCRIPTION;
                            break;
                    }
                };
                EditTeacherPriceController.prototype._setDataModelFromForm = function () {
                    this.$rootScope.teacherData.Price.PrivateClass = this.form.privateClass;
                    this.$rootScope.teacherData.Price.GroupClass = this.form.groupClass;
                };
                EditTeacherPriceController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self.error = false;
                        if (args !== 'error') {
                            self._fillForm(args);
                        }
                        else {
                            self.error = true;
                        }
                    });
                    this.$scope.$on('Saved', function (event, args) {
                        self.saving = false;
                        self.error = false;
                        self.saved = true;
                        self.$timeout(function () {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    });
                };
                EditTeacherPriceController.controllerId = 'mainApp.pages.editTeacher.EditTeacherPriceController';
                EditTeacherPriceController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$timeout',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return EditTeacherPriceController;
            }());
            editTeacher.EditTeacherPriceController = EditTeacherPriceController;
            angular
                .module('mainApp.pages.editTeacher')
                .controller(EditTeacherPriceController.controllerId, EditTeacherPriceController);
        })(editTeacher = pages.editTeacher || (pages.editTeacher = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/editTeacher/editTeacherPrice/editTeacherPrice.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.meetingConfirmationPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.meetingConfirmationPage', {
            url: '/meeting/confirmation',
            views: {
                'container': {
                    templateUrl: 'app/pages/meetingConfirmationPage/meetingConfirmationPage.html',
                    controller: 'mainApp.pages.meetingConfirmationPage.MeetingConfirmationPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            params: {
                user: null
            }
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/meetingConfirmationPage/meetingConfirmationPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var meetingConfirmationPage;
        (function (meetingConfirmationPage) {
            var MeetingConfirmationPageController = (function () {
                function MeetingConfirmationPageController(dataConfig, $state, $filter, $scope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                MeetingConfirmationPageController.prototype._init = function () {
                    this.form = {
                        helloText: '',
                        meetingPoint: {
                            name: 'Escoge un punto de encuentro',
                            category: '',
                            address: '',
                            prices: { min: 0, max: 0 },
                            position: { lat: null, lng: null }
                        }
                    };
                    this.error = {
                        message: ''
                    };
                    this.mapConfig = {
                        type: 'location-map',
                        data: null
                    };
                    this.activate();
                };
                MeetingConfirmationPageController.prototype.activate = function () {
                    console.log('meetingConfirmationPage controller actived');
                };
                MeetingConfirmationPageController.prototype.addNewMeetingPoint = function () {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalMeetingPointTmpl,
                        controller: 'mainApp.components.modal.ModalMeetingPointController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    model: { test: 'data' }
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newMeetingPoint) {
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    event.preventDefault();
                };
                MeetingConfirmationPageController.prototype.chooseMeetingPoint = function () {
                    var meetingPoint = {
                        name: 'Café Vervlet',
                        category: 'Café',
                        address: 'Trans 33 Sur',
                        prices: { min: 23000, max: 30000 },
                        position: { lat: 6.1739743, lng: -75.5822414 }
                    };
                    this.form.meetingPoint = meetingPoint;
                    if (this.form.helloText != '' &&
                        this.form.meetingPoint.position.lat != null &&
                        this.form.meetingPoint.position.lng != null) {
                        this.processCompleted = true;
                    }
                };
                MeetingConfirmationPageController.prototype.saveMessage = function () {
                    if (this.form.helloText != '' &&
                        this.form.meetingPoint.position.lat != null &&
                        this.form.meetingPoint.position.lng != null) {
                        this.processCompleted = true;
                    }
                };
                MeetingConfirmationPageController.prototype.edit = function () {
                    this.processCompleted = false;
                };
                MeetingConfirmationPageController.controllerId = 'mainApp.pages.meetingConfirmationPage.MeetingConfirmationPageController';
                MeetingConfirmationPageController.$inject = [
                    'dataConfig',
                    '$state',
                    '$filter',
                    '$scope',
                    '$uibModal'];
                return MeetingConfirmationPageController;
            }());
            meetingConfirmationPage.MeetingConfirmationPageController = MeetingConfirmationPageController;
            angular
                .module('mainApp.pages.meetingConfirmationPage')
                .controller(MeetingConfirmationPageController.controllerId, MeetingConfirmationPageController);
        })(meetingConfirmationPage = pages.meetingConfirmationPage || (pages.meetingConfirmationPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/meetingConfirmationPage/meetingConfirmationPage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.userInboxPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.userInboxPage', {
            url: '/users/:userId/inbox',
            views: {
                'container': {
                    templateUrl: 'app/pages/userInboxPage/userInboxPage.html',
                    controller: 'mainApp.pages.userInboxPage.UserInboxPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            params: {
                userId: '123'
            }
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/userInboxPage/userInboxPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var userInboxPage;
        (function (userInboxPage) {
            var UserInboxPageController = (function () {
                function UserInboxPageController($state, $scope) {
                    this.$state = $state;
                    this.$scope = $scope;
                    this._init();
                }
                UserInboxPageController.prototype._init = function () {
                    this.form = {};
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                UserInboxPageController.prototype.activate = function () {
                    console.log('userInboxPage controller actived');
                };
                UserInboxPageController.prototype.goToDetail = function () {
                    this.$state.go('page.userInboxDetailsPage');
                };
                UserInboxPageController.controllerId = 'mainApp.pages.userInboxPage.UserInboxPageController';
                UserInboxPageController.$inject = [
                    '$state',
                    '$scope'];
                return UserInboxPageController;
            }());
            userInboxPage.UserInboxPageController = UserInboxPageController;
            angular
                .module('mainApp.pages.userInboxPage')
                .controller(UserInboxPageController.controllerId, UserInboxPageController);
        })(userInboxPage = pages.userInboxPage || (pages.userInboxPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/userInboxPage/userInboxPage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.userInboxDetailsPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.userInboxDetailsPage', {
            url: '/users/:userId/inbox/:messageId',
            views: {
                'container': {
                    templateUrl: 'app/pages/userInboxDetailsPage/userInboxDetailsPage.html',
                    controller: 'mainApp.pages.userInboxDetailsPage.UserInboxDetailsPageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            params: {
                userId: '123',
                messageId: '1234'
            }
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/userInboxDetailsPage/userInboxDetailsPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var userInboxDetailsPage;
        (function (userInboxDetailsPage) {
            var UserInboxDetailsPageController = (function () {
                function UserInboxDetailsPageController($state, $scope) {
                    this.$state = $state;
                    this.$scope = $scope;
                    this._init();
                }
                UserInboxDetailsPageController.prototype._init = function () {
                    this.form = {};
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                UserInboxDetailsPageController.prototype.activate = function () {
                    console.log('userInboxDetailsPage controller actived');
                };
                UserInboxDetailsPageController.controllerId = 'mainApp.pages.userInboxDetailsPage.UserInboxDetailsPageController';
                UserInboxDetailsPageController.$inject = [
                    '$state',
                    '$scope'];
                return UserInboxDetailsPageController;
            }());
            userInboxDetailsPage.UserInboxDetailsPageController = UserInboxDetailsPageController;
            angular
                .module('mainApp.pages.userInboxDetailsPage')
                .controller(UserInboxDetailsPageController.controllerId, UserInboxDetailsPageController);
        })(userInboxDetailsPage = pages.userInboxDetailsPage || (pages.userInboxDetailsPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/userInboxDetailsPage/userInboxDetailsPage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage', {
            url: '/create/teacher',
            views: {
                'container': {
                    templateUrl: 'app/pages/createTeacherPage/createTeacherPage.html',
                    controller: 'mainApp.pages.createTeacherPage.CreateTeacherPageController',
                    controllerAs: 'vm',
                    resolve: {
                        waitForAuth: ['mainApp.auth.AuthService', function (AuthService) {
                                return AuthService.autoRefreshToken();
                            }]
                    }
                }
            },
            cache: false,
            params: {
                type: '',
            },
            data: {
                requireLogin: true
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = false;
                    $rootScope.activeFooter = true;
                    $rootScope.activeMessageBar = false;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/createTeacherPage/createTeacherPage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var CreateTeacherPageController = (function () {
                function CreateTeacherPageController(getDataFromJson, functionsUtilService, userService, teacherService, messageUtil, localStorage, dataConfig, $state, $stateParams, $filter, $scope, $window, $rootScope, $uibModal, waitForAuth) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.userService = userService;
                    this.teacherService = teacherService;
                    this.messageUtil = messageUtil;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$window = $window;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                CreateTeacherPageController.prototype._init = function () {
                    var self = this;
                    var loggedUserId = this.$rootScope.userData.id;
                    var currentState = this.$state.current.name;
                    this.$rootScope.teacherData = new app.models.teacher.Teacher();
                    this.$rootScope.teacherData.Profile.UserId = loggedUserId;
                    angular.element(this.$window).bind("scroll", function () {
                        var floatHeader = document.getElementById('header-float');
                        if (floatHeader) {
                            var floatHeaderClasses = floatHeader.classList;
                            if (this.pageYOffset >= 30) {
                                floatHeaderClasses.remove('hidden');
                            }
                            else {
                                floatHeaderClasses.add('hidden');
                            }
                        }
                    });
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                CreateTeacherPageController.prototype.activate = function () {
                    var self = this;
                    var ENTER_MIXPANEL = "Enter: Create Teacher Page";
                    console.log('createTeacherPage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this._subscribeToEvents();
                    if (this.$stateParams.type === 'new') {
                        this.localStorage.removeItem(this.dataConfig.teacherDataLocalStorage);
                    }
                    this.fillFormWithProfileData();
                    this.fillFormWithTeacherData();
                };
                CreateTeacherPageController.prototype.fillFormWithProfileData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    if (userId) {
                        this.userService.getUserProfileById(userId)
                            .then(function (response) {
                            if (response.userId) {
                                self.$rootScope.profileData = new app.models.user.Profile(response);
                                self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                            }
                        });
                    }
                };
                CreateTeacherPageController.prototype.fillFormWithTeacherData = function () {
                    var self = this;
                    var userId = this.$rootScope.userData.id;
                    this.teacherService.getTeacherByProfileId(userId).then(function (response) {
                        if (response.id) {
                            self.localStorage.setItem(self.dataConfig.teacherDataLocalStorage, JSON.stringify(response));
                            self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                            self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                        }
                        else {
                            self.localStorage.removeItem(self.dataConfig.teacherDataLocalStorage);
                        }
                    });
                };
                CreateTeacherPageController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Save Profile Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        var userId = self.$rootScope.profileData.UserId;
                        if (userId) {
                            self.userService.updateUserProfile(self.$rootScope.profileData)
                                .then(function (response) {
                                if (response.userId) {
                                    window.scrollTo(0, 0);
                                    self.messageUtil.success(SUCCESS_MESSAGE);
                                    self.$rootScope.profileData = new app.models.user.Profile(response);
                                    self.$scope.$broadcast('Fill User Profile Form', self.$rootScope.profileData);
                                }
                            }, function (error) {
                                DEBUG && console.error(error);
                            });
                        }
                    });
                    this.$scope.$on('Save Data', function (event, args) {
                        var SUCCESS_MESSAGE = self.$filter('translate')('%notification.success.text');
                        if (self.$rootScope.teacherData.Id) {
                            self.teacherService.updateTeacher(self.$rootScope.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    window.scrollTo(0, 0);
                                    self.messageUtil.success(SUCCESS_MESSAGE);
                                    self.localStorage.setItem(self.dataConfig.teacherDataLocalStorage, JSON.stringify(response));
                                    self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                    self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                                }
                            });
                        }
                        else {
                            self.teacherService.createTeacher(self.$rootScope.teacherData)
                                .then(function (response) {
                                if (response.id) {
                                    window.scrollTo(0, 0);
                                    self.messageUtil.success(SUCCESS_MESSAGE);
                                    self.localStorage.setItem(self.dataConfig.teacherDataLocalStorage, JSON.stringify(response));
                                    self.$rootScope.teacherData = new app.models.teacher.Teacher(response);
                                    self.$rootScope.profileData.IsTeacher = response.profile.isTeacher;
                                    self.$scope.$broadcast('Fill Form', self.$rootScope.teacherData);
                                }
                            });
                        }
                    });
                };
                CreateTeacherPageController.controllerId = 'mainApp.pages.createTeacherPage.CreateTeacherPageController';
                CreateTeacherPageController.$inject = [
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.models.user.UserService',
                    'mainApp.models.teacher.TeacherService',
                    'mainApp.core.util.messageUtilService',
                    'mainApp.localStorageService',
                    'dataConfig',
                    '$state',
                    '$stateParams',
                    '$filter',
                    '$scope',
                    '$window',
                    '$rootScope',
                    '$uibModal',
                    'waitForAuth'];
                return CreateTeacherPageController;
            }());
            createTeacherPage.CreateTeacherPageController = CreateTeacherPageController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(CreateTeacherPageController.controllerId, CreateTeacherPageController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/createTeacherPage/createTeacherPage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.start', {
            url: '/start',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherWelcomeSection/teacherWelcomeSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherWelcomeSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherWelcomeSection/teacherWelcomeSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherWelcomeSectionController = (function () {
                function TeacherWelcomeSectionController($state, $scope, $rootScope, functionsUtilService) {
                    this.$state = $state;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.functionsUtilService = functionsUtilService;
                    this._init();
                }
                TeacherWelcomeSectionController.prototype._init = function () {
                    this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    this.INITIAL_PROGRESS_WIDTH = '2%';
                    this.$scope.$parent.vm.progressWidth = this.INITIAL_PROGRESS_WIDTH;
                    this.activate();
                };
                TeacherWelcomeSectionController.prototype.activate = function () {
                    var ENTER_MIXPANEL = "Enter: Start Create Teacher Process";
                    console.log('TeacherWelcomeSectionController controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                };
                TeacherWelcomeSectionController.prototype.goToStart = function () {
                    this.$rootScope.teacherData.Profile = this.$rootScope.profileData;
                    this.$scope.$emit('Save Data');
                    this.$state.go(this.STEP1_STATE, { reload: true });
                };
                TeacherWelcomeSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherWelcomeSectionController';
                TeacherWelcomeSectionController.$inject = [
                    '$state',
                    '$scope',
                    '$rootScope',
                    'mainApp.core.util.FunctionsUtilService'
                ];
                return TeacherWelcomeSectionController;
            }());
            createTeacherPage.TeacherWelcomeSectionController = TeacherWelcomeSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherWelcomeSectionController.controllerId, TeacherWelcomeSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherWelcomeSection/teacherWelcomeSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.basicInfo', {
            url: '/basicInfo',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherInfoSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherInfoSectionController = (function () {
                function TeacherInfoSectionController(getDataFromJson, functionsUtilService, localStorage, dataConfig, $state, $filter, $scope, $rootScope) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.localStorage = localStorage;
                    this.dataConfig = dataConfig;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                TeacherInfoSectionController.prototype._init = function () {
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(1, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.countryObject = { code: '', value: '' };
                    this.sexObject = { sex: { code: '', value: '' } };
                    this.dateObject = { day: { value: '' }, month: { code: '', value: '' }, year: { value: '' } };
                    this.form = {
                        phoneNumber: '',
                        sex: '',
                        birthDate: null,
                        bornCountry: '',
                        bornCity: '',
                        about: ''
                    };
                    this.listMonths = this.getDataFromJson.getMonthi18n();
                    this.listSexs = this.getDataFromJson.getSexi18n();
                    this.listDays = this.functionsUtilService.buildNumberSelectList(1, 31);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1916, 2017);
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.validate = {
                        phoneNumber: { valid: true, message: '' },
                        sex: { valid: true, message: '' },
                        birthDate: {
                            day: { valid: true, message: '' },
                            month: { valid: true, message: '' },
                            year: { valid: true, message: '' },
                            valid: true,
                            message: ''
                        },
                        bornCountry: { valid: true, message: '' },
                        bornCity: { valid: true, message: '' },
                        about: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherInfoSectionController.prototype.activate = function () {
                    DEBUG && console.log('TeacherInfoSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.profileData) {
                        this._fillForm(this.$rootScope.profileData);
                    }
                };
                TeacherInfoSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Profile Data');
                        this.$state.go(this.STEP2_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherInfoSectionController.prototype._fillForm = function (data) {
                    this.form.phoneNumber = data.PhoneNumber;
                    this.sexObject.sex.code = data.Gender;
                    var date = this.functionsUtilService.splitDate(data.BirthDate);
                    this.dateObject.day.value = date.day ? parseInt(date.day) : '';
                    this.dateObject.month.code = date.month !== 'Invalid date' ? date.month : '';
                    this.dateObject.year.value = date.year ? parseInt(date.year) : '';
                    this.countryObject.code = data.BornCountry;
                    this.form.bornCity = data.BornCity;
                    this.form.about = data.About;
                };
                TeacherInfoSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var NAN_ENUM = 8;
                    var EMPTY_ENUM = 3;
                    var EMAIL_ENUM = 0;
                    var NUMBER_ENUM = 4;
                    var BIRTHDATE_MESSAGE = this.$filter('translate')('%create.teacher.basic_info.form.birthdate.validation.message.text');
                    var formValid = true;
                    var phoneNumber_rules = [NULL_ENUM, EMPTY_ENUM, NUMBER_ENUM];
                    var onlyNum = this.form.phoneNumber.replace(/\D+/g, "");
                    onlyNum = parseInt(onlyNum) || '';
                    this.validate.phoneNumber = this.functionsUtilService.validator(onlyNum, phoneNumber_rules);
                    if (!this.validate.phoneNumber.valid) {
                        formValid = this.validate.phoneNumber.valid;
                    }
                    var sex_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.sex = this.functionsUtilService.validator(this.sexObject.sex.code, sex_rules);
                    if (!this.validate.sex.valid) {
                        formValid = this.validate.sex.valid;
                    }
                    var day_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.day = this.functionsUtilService.validator(this.dateObject.day.value, day_birthdate_rules);
                    if (!this.validate.birthDate.day.valid) {
                        formValid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.day.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var month_birthdate_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.birthDate.month = this.functionsUtilService.validator(this.dateObject.month.code, month_birthdate_rules);
                    if (!this.validate.birthDate.month.valid) {
                        formValid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.month.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    var year_birthdate_rules = [NULL_ENUM, EMPTY_ENUM, NAN_ENUM];
                    this.validate.birthDate.year = this.functionsUtilService.validator(this.dateObject.year.value, year_birthdate_rules);
                    if (!this.validate.birthDate.year.valid) {
                        formValid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.valid = this.validate.birthDate.year.valid;
                        this.validate.birthDate.message = BIRTHDATE_MESSAGE;
                    }
                    if (this.validate.birthDate.day.valid &&
                        this.validate.birthDate.month.valid &&
                        this.validate.birthDate.year.valid) {
                        this.validate.birthDate.valid = true;
                        this.validate.birthDate.message = '';
                    }
                    var country_born_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.bornCountry = this.functionsUtilService.validator(this.countryObject.code, country_born_rules);
                    if (!this.validate.bornCountry.valid) {
                        formValid = this.validate.bornCountry.valid;
                    }
                    var city_born_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.bornCity = this.functionsUtilService.validator(this.form.bornCity, city_born_rules);
                    if (!this.validate.bornCity.valid) {
                        formValid = this.validate.bornCity.valid;
                    }
                    var about_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.about = this.functionsUtilService.validator(this.form.about, about_rules);
                    if (!this.validate.about.valid) {
                        formValid = this.validate.about.valid;
                    }
                    return formValid;
                };
                TeacherInfoSectionController.prototype.changeHelpText = function (type) {
                    var NAME_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.name.title.text');
                    var NAME_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.name.description.text');
                    var EMAIL_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.email.title.text');
                    var EMAIL_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.email.description.text');
                    var PHONE_NUMBER_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.phone_number.title.text');
                    var PHONE_NUMBER_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.phone_number.description.text');
                    var SEX_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.gender.title.text');
                    var SEX_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.gender.description.text');
                    var BIRTHDATE_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.birthdate.title.text');
                    var BIRTHDATE_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.birthdate.description.text');
                    var BORN_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.born.title.text');
                    var BORN_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.born.description.text');
                    var ABOUT_TITLE = this.$filter('translate')('%create.teacher.basic_info.help_text.about.title.text');
                    var ABOUT_DESCRIPTION = this.$filter('translate')('%create.teacher.basic_info.help_text.about.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'firstName':
                        case 'lastName':
                            this.helpText.title = NAME_TITLE;
                            this.helpText.description = NAME_DESCRIPTION;
                            break;
                        case 'email':
                            this.helpText.title = EMAIL_TITLE;
                            this.helpText.description = EMAIL_DESCRIPTION;
                            break;
                        case 'phoneNumber':
                            this.helpText.title = PHONE_NUMBER_TITLE;
                            this.helpText.description = PHONE_NUMBER_DESCRIPTION;
                            break;
                        case 'sex':
                            this.helpText.title = SEX_TITLE;
                            this.helpText.description = SEX_DESCRIPTION;
                            break;
                        case 'birthDate':
                            this.helpText.title = BIRTHDATE_TITLE;
                            this.helpText.description = BIRTHDATE_DESCRIPTION;
                            break;
                        case 'born':
                            this.helpText.title = BORN_TITLE;
                            this.helpText.description = BORN_DESCRIPTION;
                            break;
                        case 'about':
                            this.helpText.title = ABOUT_TITLE;
                            this.helpText.description = ABOUT_DESCRIPTION;
                            break;
                    }
                };
                TeacherInfoSectionController.prototype._setDataModelFromForm = function () {
                    var dateFormatted = this.functionsUtilService.joinDate(this.dateObject.day.value, this.dateObject.month.code, this.dateObject.year.value);
                    var genderCode = this.sexObject.sex.code;
                    var countryCode = this.countryObject.code;
                    var recommended = this.localStorage.getItem(this.dataConfig.earlyIdLocalStorage);
                    this.form.bornCountry = countryCode;
                    this.$rootScope.profileData.PhoneNumber = this.form.phoneNumber;
                    this.$rootScope.profileData.Gender = genderCode;
                    this.$rootScope.profileData.BirthDate = dateFormatted;
                    this.$rootScope.profileData.BornCountry = this.form.bornCountry;
                    this.$rootScope.profileData.BornCity = this.form.bornCity;
                    this.$rootScope.profileData.About = this.form.about;
                    this.$rootScope.teacherData.Profile = this.$rootScope.profileData;
                    this.$rootScope.teacherData.Recommended = recommended ? recommended : null;
                };
                TeacherInfoSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherInfoSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherInfoSectionController';
                TeacherInfoSectionController.$inject = [
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.localStorageService',
                    'dataConfig',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope'
                ];
                return TeacherInfoSectionController;
            }());
            createTeacherPage.TeacherInfoSectionController = TeacherInfoSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherInfoSectionController.controllerId, TeacherInfoSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherInfoSection/teacherInfoSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.location', {
            url: '/location',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherLocationSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherLocationSectionController = (function () {
                function TeacherLocationSectionController(getDataFromJson, functionsUtilService, $state, $filter, $scope, $rootScope, $timeout) {
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$timeout = $timeout;
                    this._init();
                }
                TeacherLocationSectionController.prototype._init = function () {
                    this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
                    this.STEP3_STATE = 'page.createTeacherPage.language';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.location.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(2, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.countryObject = { code: '', value: '' };
                    this.form = {
                        countryLocation: '',
                        cityLocation: '',
                        stateLocation: '',
                        addressLocation: '',
                        zipCodeLocation: '',
                        positionLocation: new app.models.user.Position()
                    };
                    this.listCountries = this.getDataFromJson.getCountryi18n();
                    this.mapConfig = this.functionsUtilService.buildMapConfig(null, 'drag-maker-map', null, null);
                    this.validate = {
                        countryLocation: { valid: true, message: '' },
                        cityLocation: { valid: true, message: '' },
                        stateLocation: { valid: true, message: '' },
                        addressLocation: { valid: true, message: '' },
                        zipCodeLocation: { valid: true, message: '' },
                        positionLocation: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherLocationSectionController.prototype.activate = function () {
                    DEBUG && console.log('TeacherLocationSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.profileData) {
                        this._fillForm(this.$rootScope.profileData);
                    }
                };
                TeacherLocationSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Profile Data');
                        this.$state.go(this.STEP3_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherLocationSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP1_STATE, { reload: true });
                };
                TeacherLocationSectionController.prototype._fillForm = function (data) {
                    this.form.addressLocation = data.Location.Address;
                    this.form.cityLocation = data.Location.City;
                    this.form.stateLocation = data.Location.State;
                    this.form.zipCodeLocation = data.Location.ZipCode;
                    this.countryObject.code = data.Location.Country;
                    this.form.positionLocation = new app.models.user.Position(data.Location.Position);
                    this.mapConfig = this.functionsUtilService.buildMapConfig([
                        {
                            id: this.form.positionLocation.Id,
                            location: {
                                position: {
                                    lat: parseFloat(this.form.positionLocation.Lat),
                                    lng: parseFloat(this.form.positionLocation.Lng)
                                }
                            }
                        }
                    ], 'drag-maker-map', { lat: parseFloat(this.form.positionLocation.Lat), lng: parseFloat(this.form.positionLocation.Lng) }, null);
                    this.$scope.$broadcast('BuildMarkers', this.mapConfig);
                };
                TeacherLocationSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var NUMBER_ENUM = 4;
                    var formValid = true;
                    var country_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.countryLocation = this.functionsUtilService.validator(this.countryObject.code, country_rules);
                    if (!this.validate.countryLocation.valid) {
                        formValid = this.validate.countryLocation.valid;
                    }
                    var city_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.cityLocation = this.functionsUtilService.validator(this.form.cityLocation, city_rules);
                    if (!this.validate.cityLocation.valid) {
                        formValid = this.validate.cityLocation.valid;
                    }
                    var state_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.stateLocation = this.functionsUtilService.validator(this.form.stateLocation, state_rules);
                    if (!this.validate.stateLocation.valid) {
                        formValid = this.validate.stateLocation.valid;
                    }
                    var address_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.addressLocation = this.functionsUtilService.validator(this.form.addressLocation, address_rules);
                    if (!this.validate.addressLocation.valid) {
                        formValid = this.validate.addressLocation.valid;
                    }
                    var position_rules = [NULL_ENUM, EMPTY_ENUM];
                    var latValidate = this.functionsUtilService.validator(this.form.positionLocation.Lat, position_rules);
                    var lngValidate = this.functionsUtilService.validator(this.form.positionLocation.Lng, position_rules);
                    if (!latValidate.valid || !lngValidate.valid) {
                        if (!latValidate.valid) {
                            this.validate.positionLocation = latValidate;
                            formValid = this.validate.positionLocation.valid;
                        }
                        else if (!lngValidate.valid) {
                            this.validate.positionLocation = lngValidate;
                            formValid = this.validate.positionLocation.valid;
                        }
                    }
                    return formValid;
                };
                TeacherLocationSectionController.prototype.changeHelpText = function (type) {
                    var COUNTRY_TITLE = this.$filter('translate')('%create.teacher.location.help_text.cntry.title.text');
                    var COUNTRY_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.cntry.description.text');
                    var CITY_TITLE = this.$filter('translate')('%create.teacher.location.help_text.city.title.text');
                    var CITY_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.city.description.text');
                    var STATE_TITLE = this.$filter('translate')('%create.teacher.location.help_text.state.title.text');
                    var STATE_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.state.description.text');
                    var ADDRESS_TITLE = this.$filter('translate')('%create.teacher.location.help_text.address.title.text');
                    var ADDRESS_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.address.description.text');
                    var ZIP_CODE_TITLE = this.$filter('translate')('%create.teacher.location.help_text.zip_code.title.text');
                    var ZIP_CODE_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.zip_code.description.text');
                    var POSITION_TITLE = this.$filter('translate')('%create.teacher.location.help_text.position.title.text');
                    var POSITION_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.position.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'country':
                            this.helpText.title = COUNTRY_TITLE;
                            this.helpText.description = COUNTRY_DESCRIPTION;
                            break;
                        case 'city':
                            this.helpText.title = CITY_TITLE;
                            this.helpText.description = CITY_DESCRIPTION;
                            break;
                        case 'state':
                            this.helpText.title = STATE_TITLE;
                            this.helpText.description = STATE_DESCRIPTION;
                            break;
                        case 'address':
                            this.helpText.title = ADDRESS_TITLE;
                            this.helpText.description = ADDRESS_DESCRIPTION;
                            break;
                        case 'zipCode':
                            this.helpText.title = ZIP_CODE_TITLE;
                            this.helpText.description = ZIP_CODE_DESCRIPTION;
                            break;
                        case 'position':
                            this.helpText.title = POSITION_TITLE;
                            this.helpText.description = POSITION_DESCRIPTION;
                            break;
                    }
                };
                TeacherLocationSectionController.prototype.changeMapPosition = function () {
                    var self = this;
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    var location = {
                        country: this.form.countryLocation,
                        city: this.form.cityLocation,
                        address: this.form.addressLocation
                    };
                    this.$timeout(function () {
                        self.$scope.$broadcast('CodeAddress', location);
                    });
                };
                TeacherLocationSectionController.prototype._setDataModelFromForm = function () {
                    var countryCode = this.countryObject.code;
                    this.form.countryLocation = countryCode;
                    this.$rootScope.profileData.Location.Country = this.form.countryLocation;
                    this.$rootScope.profileData.Location.Address = this.form.addressLocation;
                    this.$rootScope.profileData.Location.City = this.form.cityLocation;
                    this.$rootScope.profileData.Location.State = this.form.stateLocation;
                    this.$rootScope.profileData.Location.ZipCode = this.form.zipCodeLocation;
                    this.$rootScope.profileData.Location.Position = this.form.positionLocation;
                    this.changeMapPosition();
                };
                TeacherLocationSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                    this.$scope.$on('Position', function (event, args) {
                        self.form.positionLocation.Lng = args.lng;
                        self.form.positionLocation.Lat = args.lat;
                    });
                };
                TeacherLocationSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherLocationSectionController';
                TeacherLocationSectionController.$inject = [
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$timeout'
                ];
                return TeacherLocationSectionController;
            }());
            createTeacherPage.TeacherLocationSectionController = TeacherLocationSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherLocationSectionController.controllerId, TeacherLocationSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherLocationSection/teacherLocationSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.language', {
            url: '/language',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherLanguageSection/teacherLanguageSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherLanguageSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherLanguageSection/teacherLanguageSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherLanguageSectionController = (function () {
                function TeacherLanguageSectionController(dataConfig, functionsUtil, getDataFromJson, $state, $filter, $scope, $rootScope, $timeout, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.functionsUtil = functionsUtil;
                    this.getDataFromJson = getDataFromJson;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$timeout = $timeout;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherLanguageSectionController.prototype._init = function () {
                    var self = this;
                    this.STEP2_STATE = 'page.createTeacherPage.location';
                    this.STEP4_STATE = 'page.createTeacherPage.experience';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtil.progress(3, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        native: [],
                        learn: [],
                        teach: []
                    };
                    this.validate = {
                        native: { valid: true, message: '' },
                        teach: { valid: true, message: '' },
                        learn: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherLanguageSectionController.prototype.activate = function () {
                    DEBUG && console.log('TeacherLanguageSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.profileData) {
                        this._fillForm(this.$rootScope.profileData);
                    }
                };
                TeacherLanguageSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Profile Data');
                        this.$state.go(this.STEP4_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherLanguageSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP2_STATE, { reload: true });
                };
                TeacherLanguageSectionController.prototype._fillForm = function (data) {
                    if (this.form.native.length === 0) {
                        var languageArray = this.getDataFromJson.getLanguagei18n();
                        for (var i = 0; i < languageArray.length; i++) {
                            if (data.Languages.Native) {
                                for (var j = 0; j < data.Languages.Native.length; j++) {
                                    if (data.Languages.Native[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.native == null) {
                                            this.form.native = [];
                                            this.form.native.push(obj);
                                        }
                                        else {
                                            this.form.native.push(obj);
                                        }
                                    }
                                }
                            }
                            if (data.Languages.Learn) {
                                for (var j = 0; j < data.Languages.Learn.length; j++) {
                                    if (data.Languages.Learn[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.learn == null) {
                                            this.form.learn = [];
                                            this.form.learn.push(obj);
                                        }
                                        else {
                                            this.form.learn.push(obj);
                                        }
                                    }
                                }
                            }
                            if (data.Languages.Teach) {
                                for (var j = 0; j < data.Languages.Teach.length; j++) {
                                    if (data.Languages.Teach[j] == languageArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = parseInt(languageArray[i].code);
                                        obj.value = languageArray[i].value;
                                        if (this.form.teach == null) {
                                            this.form.teach = [];
                                            this.form.teach.push(obj);
                                        }
                                        else {
                                            this.form.teach.push(obj);
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                TeacherLanguageSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var native_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.native = this.functionsUtil.validator(this.form.native, native_rules);
                    if (!this.validate.native.valid) {
                        formValid = this.validate.native.valid;
                    }
                    var learn_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.learn = this.functionsUtil.validator(this.form.learn, learn_rules);
                    if (!this.validate.learn.valid) {
                        formValid = this.validate.learn.valid;
                    }
                    var teach_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.teach = this.functionsUtil.validator(this.form.teach, teach_rules);
                    if (!this.validate.teach.valid) {
                        formValid = this.validate.teach.valid;
                    }
                    return formValid;
                };
                TeacherLanguageSectionController.prototype.changeHelpText = function (type) {
                    var NATIVE_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.native.title.text');
                    var NATIVE_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.native.description.text');
                    var LEARN_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.learn.title.text');
                    var LEARN_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.learn.description.text');
                    var TEACH_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
                    var TEACH_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'native':
                            this.helpText.title = NATIVE_TITLE;
                            this.helpText.description = NATIVE_DESCRIPTION;
                            break;
                        case 'learn':
                            this.helpText.title = LEARN_TITLE;
                            this.helpText.description = LEARN_DESCRIPTION;
                            break;
                        case 'teach':
                            this.helpText.title = TEACH_TITLE;
                            this.helpText.description = TEACH_DESCRIPTION;
                            break;
                    }
                };
                TeacherLanguageSectionController.prototype._addNewLanguages = function (type, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalLanguagesTmpl,
                        controller: 'mainApp.components.modal.ModalLanguageController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    type: type,
                                    list: self.form[type]
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newLanguagesList) {
                        self.form[type] = newLanguagesList;
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                TeacherLanguageSectionController.prototype._removeLanguage = function (key, type) {
                    var newArray = this.form[type].filter(function (el) {
                        return el.key !== key;
                    });
                    this.form[type] = newArray;
                };
                TeacherLanguageSectionController.prototype._setDataModelFromForm = function () {
                    if (this.form.native) {
                        var native = [];
                        for (var i = 0; i < this.form.native.length; i++) {
                            native.push(this.form.native[i].key);
                        }
                        this.$rootScope.profileData.Languages.Native = native;
                    }
                    if (this.form.learn) {
                        var learn = [];
                        for (var i = 0; i < this.form.learn.length; i++) {
                            learn.push(this.form.learn[i].key);
                        }
                        this.$rootScope.profileData.Languages.Learn = learn;
                    }
                    if (this.form.teach) {
                        var teach = [];
                        for (var i = 0; i < this.form.teach.length; i++) {
                            teach.push(this.form.teach[i].key);
                        }
                        this.$rootScope.profileData.Languages.Teach = teach;
                    }
                };
                TeacherLanguageSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherLanguageSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherLanguageSectionController';
                TeacherLanguageSectionController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.util.GetDataStaticJsonService',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$timeout',
                    '$uibModal'
                ];
                return TeacherLanguageSectionController;
            }());
            createTeacherPage.TeacherLanguageSectionController = TeacherLanguageSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherLanguageSectionController.controllerId, TeacherLanguageSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherLanguageSection/teacherLanguageSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.experience', {
            url: '/experience',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherExperienceSection/teacherExperienceSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherExperienceSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherExperienceSection/teacherExperienceSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherExperienceSectionController = (function () {
                function TeacherExperienceSectionController(dataConfig, getDataFromJson, functionsUtilService, $state, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherExperienceSectionController.prototype._init = function () {
                    this.STEP3_STATE = 'page.createTeacherPage.language';
                    this.STEP5_STATE = 'page.createTeacherPage.method';
                    this.STEP_ALTER_STATE = 'page.createTeacherPage.education';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(4, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        type: 'H',
                        experiences: []
                    };
                    var currentYear = parseInt(this.dataConfig.currentYear);
                    this.listYears = this.functionsUtilService.buildNumberSelectList(1957, currentYear);
                    this.yearObject = { value: '' };
                    this._hobbyChecked = { type: 'H', checked: true };
                    this._professionalChecked = { type: 'P', checked: false };
                    this.validate = {
                        type: { valid: true, message: '' },
                        teacherSince: { valid: true, message: '' },
                        experiences: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherExperienceSectionController.prototype.activate = function () {
                    console.log('TeacherExperienceSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                TeacherExperienceSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        if (this.form.type === 'P') {
                            this.$state.go(this.STEP_ALTER_STATE, { reload: true });
                        }
                        else {
                            this.$state.go(this.STEP5_STATE, { reload: true });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherExperienceSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP3_STATE, { reload: true });
                };
                TeacherExperienceSectionController.prototype._checkType = function (key) {
                    var type = key.type;
                    if (type === 'H') {
                        this._professionalChecked.checked = false;
                        this._hobbyChecked.checked = true;
                        this.form.type = this._hobbyChecked.type;
                    }
                    else {
                        this._professionalChecked.checked = true;
                        this._hobbyChecked.checked = false;
                        this.form.type = this._professionalChecked.type;
                    }
                };
                TeacherExperienceSectionController.prototype._fillForm = function (data) {
                    this.form.type = data.Type || 'H';
                    if (this.form.type === 'H') {
                        this._professionalChecked.checked = false;
                        this._hobbyChecked.checked = true;
                    }
                    else {
                        this._professionalChecked.checked = true;
                        this._hobbyChecked.checked = false;
                    }
                    this.yearObject.value = data.TeacherSince;
                    this.form.experiences = data.Experiences;
                };
                TeacherExperienceSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var formValid = true;
                    var teacher_since_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.teacherSince = this.functionsUtilService.validator(this.yearObject.value, teacher_since_rules);
                    if (!this.validate.teacherSince.valid) {
                        formValid = this.validate.teacherSince.valid;
                    }
                    return formValid;
                };
                TeacherExperienceSectionController.prototype.changeHelpText = function (type) {
                    var TYPE_HOBBY_TITLE = this.$filter('translate')('%global.teacher.type.hobby.text');
                    var TYPE_HOBBY_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.hobby.description.text');
                    var TYPE_PROFESSIONAL_TITLE = this.$filter('translate')('%global.teacher.type.professional.text');
                    var TYPE_PROFESSIONAL_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.type.professional.description.text');
                    var SINCE_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.title.text');
                    var SINCE_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.teacher_since.description.text');
                    var EXPERIENCES_TITLE = this.$filter('translate')('%create.teacher.experience.help_text.experiences.title.text');
                    var EXPERIENCES_DESCRIPTION = this.$filter('translate')('%create.teacher.experience.help_text.experiences.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'hobby':
                            this.helpText.title = TYPE_HOBBY_TITLE;
                            this.helpText.description = TYPE_HOBBY_DESCRIPTION;
                            break;
                        case 'professional':
                            this.helpText.title = TYPE_PROFESSIONAL_TITLE;
                            this.helpText.description = TYPE_PROFESSIONAL_DESCRIPTION;
                            break;
                        case 'teacherSince':
                            this.helpText.title = SINCE_TITLE;
                            this.helpText.description = SINCE_DESCRIPTION;
                            break;
                        case 'experiences':
                            this.helpText.title = EXPERIENCES_TITLE;
                            this.helpText.description = EXPERIENCES_DESCRIPTION;
                            break;
                    }
                };
                TeacherExperienceSectionController.prototype._addEditExperience = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalExperienceTmpl,
                        controller: 'mainApp.components.modal.ModalExperienceController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    experience: self.form.experiences[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newExperience) {
                        if (newExperience) {
                            self.form.experiences.push(newExperience);
                        }
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                TeacherExperienceSectionController.prototype._setDataModelFromForm = function () {
                    this.$rootScope.teacherData.Type = this.form.type;
                    this.$rootScope.teacherData.TeacherSince = this.yearObject.value;
                };
                TeacherExperienceSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherExperienceSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherExperienceSectionController';
                TeacherExperienceSectionController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return TeacherExperienceSectionController;
            }());
            createTeacherPage.TeacherExperienceSectionController = TeacherExperienceSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherExperienceSectionController.controllerId, TeacherExperienceSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherExperienceSection/teacherExperienceSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.education', {
            url: '/education',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherEducationSection/teacherEducationSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherEducationSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherEducationSection/teacherEducationSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherEducationSectionController = (function () {
                function TeacherEducationSectionController(dataConfig, getDataFromJson, functionsUtilService, $state, $filter, $scope, $rootScope, $uibModal) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$uibModal = $uibModal;
                    this._init();
                }
                TeacherEducationSectionController.prototype._init = function () {
                    this.STEP4_STATE = 'page.createTeacherPage.experience';
                    this.STEP6_STATE = 'page.createTeacherPage.method';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.education.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(5, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        educations: [],
                        certificates: []
                    };
                    this.validate = {
                        educations: { valid: true, message: '' },
                        certificates: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherEducationSectionController.prototype.activate = function () {
                    DEBUG && console.log('TeacherEducationSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                TeacherEducationSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP6_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherEducationSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP4_STATE, { reload: true });
                };
                TeacherEducationSectionController.prototype._fillForm = function (data) {
                    this.form.educations = data.Educations;
                    this.form.certificates = data.Certificates;
                };
                TeacherEducationSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.education.validation.message.text');
                    var formValid = true;
                    var education_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.educations = this.functionsUtilService.validator(this.form.educations, education_rules);
                    var certificates_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.certificates = this.functionsUtilService.validator(this.form.certificates, certificates_rules);
                    if (this.validate.educations.valid) {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    else if (this.validate.certificates.valid) {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    else {
                        this.validate.globalValidate.valid = false;
                        this.validate.globalValidate.message = GLOBAL_MESSAGE;
                        formValid = this.validate.globalValidate.valid;
                    }
                    return formValid;
                };
                TeacherEducationSectionController.prototype.changeHelpText = function (type) {
                    var EDUCATIONS_TITLE = this.$filter('translate')('%create.teacher.education.help_text.educations.title.text');
                    var EDUCATIONS_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.educations.description.text');
                    var CERTIFICATES_TITLE = this.$filter('translate')('%create.teacher.education.help_text.certificates.title.text');
                    var CERTIFICATES_DESCRIPTION = this.$filter('translate')('%create.teacher.education.help_text.certificates.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'educations':
                            this.helpText.title = EDUCATIONS_TITLE;
                            this.helpText.description = EDUCATIONS_DESCRIPTION;
                            break;
                        case 'certificates':
                            this.helpText.title = CERTIFICATES_TITLE;
                            this.helpText.description = CERTIFICATES_DESCRIPTION;
                            break;
                    }
                };
                TeacherEducationSectionController.prototype._addEditEducation = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalEducationTmpl,
                        controller: 'mainApp.components.modal.ModalEducationController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    education: self.form.educations[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newEducation) {
                        if (newEducation) {
                            self.form.educations.push(newEducation);
                        }
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                TeacherEducationSectionController.prototype._addEditCertificate = function (index, $event) {
                    var self = this;
                    var options = {
                        animation: false,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: this.dataConfig.modalCertificateTmpl,
                        controller: 'mainApp.components.modal.ModalCertificateController as vm',
                        resolve: {
                            dataSetModal: function () {
                                return {
                                    certificate: self.form.certificates[index],
                                    teacherId: self.$rootScope.teacherData.Id
                                };
                            }
                        }
                    };
                    var modalInstance = this.$uibModal.open(options);
                    modalInstance.result.then(function (newCertificate) {
                        if (newCertificate) {
                            self.form.certificates.push(newCertificate);
                        }
                    }, function () {
                        console.info('Modal dismissed at: ' + new Date());
                    });
                    $event.preventDefault();
                };
                TeacherEducationSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherEducationSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherEducationSectionController';
                TeacherEducationSectionController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope',
                    '$uibModal'
                ];
                return TeacherEducationSectionController;
            }());
            createTeacherPage.TeacherEducationSectionController = TeacherEducationSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherEducationSectionController.controllerId, TeacherEducationSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherEducationSection/teacherEducationSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.method', {
            url: '/method',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherMethodSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherMethodSectionController = (function () {
                function TeacherMethodSectionController(dataConfig, getDataFromJson, functionsUtil, $state, $filter, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                TeacherMethodSectionController.prototype._init = function () {
                    this.step5State = '';
                    this.STEP7_STATE = 'page.createTeacherPage.price';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.method.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtil.progress(6, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        methodology: '',
                        immersion: new app.models.teacher.Immersion
                    };
                    this.typeOfImmersionList = this.getDataFromJson.getTypeOfImmersioni18n();
                    this.typeOfImmersionOptionBox = [];
                    this.validate = {
                        methodology: { valid: true, message: '' },
                        immersionActive: { valid: true, message: '' },
                        typeOfImmersionList: { valid: true, message: '' },
                        otherCategory: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherMethodSectionController.prototype.activate = function () {
                    console.log('TeacherMethodSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                TeacherMethodSectionController.prototype.changeStatus = function () {
                    this.form.immersion.Active = !this.form.immersion.Active;
                };
                TeacherMethodSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP7_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherMethodSectionController.prototype.goToBack = function () {
                    this.$state.go(this.step5State, { reload: true });
                };
                TeacherMethodSectionController.prototype._fillForm = function (data) {
                    if (data.Type === 'P') {
                        this.step5State = 'page.createTeacherPage.education';
                    }
                    else {
                        this.step5State = 'page.createTeacherPage.experience';
                    }
                    this.form.methodology = data.Methodology;
                    this.form.immersion = data.Immersion;
                    if (this.form.immersion.Active) {
                        if (this.typeOfImmersionOptionBox.length === 0) {
                            var immersionArray = this.getDataFromJson.getTypeOfImmersioni18n();
                            var newArray = [];
                            for (var i = 0; i < immersionArray.length; i++) {
                                for (var j = 0; j < this.form.immersion.Category.length; j++) {
                                    if (this.form.immersion.Category[j] === immersionArray[i].code) {
                                        var obj = { key: null, value: '' };
                                        obj.key = immersionArray[i].code;
                                        obj.value = immersionArray[i].value;
                                        this._disableEnableOption(true, obj.key);
                                        this.typeOfImmersionOptionBox.push(obj);
                                    }
                                }
                            }
                        }
                    }
                };
                TeacherMethodSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.method.validation.message.text');
                    var formValid = true;
                    var methodology_rules = [NULL_ENUM, EMPTY_ENUM];
                    this.validate.methodology = this.functionsUtil.validator(this.form.methodology, methodology_rules);
                    if (!this.validate.methodology.valid) {
                        formValid = this.validate.methodology.valid;
                    }
                    if (this.form.immersion.Active) {
                        var typeOfImmersion_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.typeOfImmersionList = this.functionsUtil.validator(this.form.immersion.Category, typeOfImmersion_rules);
                        var otherCategory_rules = [NULL_ENUM, EMPTY_ENUM];
                        this.validate.otherCategory = this.functionsUtil.validator(this.form.immersion.OtherCategory, otherCategory_rules);
                        if (this.validate.typeOfImmersionList.valid) {
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                        else if (this.validate.otherCategory.valid) {
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                        else {
                            this.validate.globalValidate.valid = false;
                            this.validate.globalValidate.message = GLOBAL_MESSAGE;
                            formValid = this.validate.globalValidate.valid;
                        }
                    }
                    return formValid;
                };
                TeacherMethodSectionController.prototype.changeHelpText = function (type) {
                    var METHODOLOGY_TITLE = this.$filter('translate')('%create.teacher.method.help_text.methodology.title.text');
                    var METHODOLOGY_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.methodology.description.text');
                    var IMMERSION_TITLE = this.$filter('translate')('%create.teacher.method.help_text.imm.title.text');
                    var IMMERSION_DESCRIPTION = this.$filter('translate')('%create.teacher.method.help_text.imm.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'methodology':
                            this.helpText.title = METHODOLOGY_TITLE;
                            this.helpText.description = METHODOLOGY_DESCRIPTION;
                            break;
                        case 'immersion':
                            this.helpText.title = IMMERSION_TITLE;
                            this.helpText.description = IMMERSION_DESCRIPTION;
                            break;
                    }
                };
                TeacherMethodSectionController.prototype._addNewImmersion = function () {
                    var self = this;
                    this._disableEnableOption(true, this.typeObject.code);
                    this.typeOfImmersionOptionBox.push({ key: this.typeObject.code, value: this.typeObject.value });
                    this.form.immersion.Category = [];
                    for (var i = 0; i < this.typeOfImmersionOptionBox.length; i++) {
                        this.form.immersion.Category.push(this.typeOfImmersionOptionBox[i].key);
                    }
                    event.preventDefault();
                };
                TeacherMethodSectionController.prototype._removeImmersion = function (key) {
                    this._disableEnableOption(false, key);
                    var newArray = this.typeOfImmersionOptionBox.filter(function (el) {
                        return el.key !== key;
                    });
                    this.typeOfImmersionOptionBox = newArray;
                    this.form.immersion.Category = [];
                    for (var i = 0; i < this.typeOfImmersionOptionBox.length; i++) {
                        this.form.immersion.Category.push(this.typeOfImmersionOptionBox[i].key);
                    }
                };
                TeacherMethodSectionController.prototype._setDataModelFromForm = function () {
                    var immersionOptions = this.typeOfImmersionOptionBox;
                    this.$rootScope.teacherData.Methodology = this.form.methodology;
                    this.$rootScope.teacherData.Immersion = this.form.immersion;
                    this.$rootScope.teacherData.Immersion.Category = this.form.immersion.Category;
                };
                TeacherMethodSectionController.prototype._disableEnableOption = function (action, key) {
                    for (var i = 0; i < this.typeOfImmersionList.length; i++) {
                        if (this.typeOfImmersionList[i].code === key) {
                            this.typeOfImmersionList[i].disabled = action;
                        }
                    }
                };
                TeacherMethodSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherMethodSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherMethodSectionController';
                TeacherMethodSectionController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope'
                ];
                return TeacherMethodSectionController;
            }());
            createTeacherPage.TeacherMethodSectionController = TeacherMethodSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherMethodSectionController.controllerId, TeacherMethodSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherMethodSection/teacherMethodSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.price', {
            url: '/price',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherPriceSection/teacherPriceSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherPriceSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherPriceSection/teacherPriceSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherPriceSectionController = (function () {
                function TeacherPriceSectionController(dataConfig, getDataFromJson, functionsUtilService, $state, $filter, $scope, $rootScope) {
                    this.dataConfig = dataConfig;
                    this.getDataFromJson = getDataFromJson;
                    this.functionsUtilService = functionsUtilService;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                TeacherPriceSectionController.prototype._init = function () {
                    this.STEP6_STATE = 'page.createTeacherPage.method';
                    this.STEP8_STATE = 'page.createTeacherPage.photo';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.price.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.description.text');
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(7, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        privateClass: new app.models.teacher.TypeOfPrice,
                        groupClass: new app.models.teacher.TypeOfPrice
                    };
                    this.validate = {
                        privateClassPrice: { valid: true, message: '' },
                        privateClassActive: { valid: true, message: '' },
                        groupClassPrice: { valid: true, message: '' },
                        groupClassActive: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherPriceSectionController.prototype.activate = function () {
                    DEBUG && console.log('TeacherPriceSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.teacherData) {
                        this._fillForm(this.$rootScope.teacherData);
                    }
                };
                TeacherPriceSectionController.prototype.changeStatus = function (type) {
                    this.form[type].Active = !this.form[type].Active;
                };
                TeacherPriceSectionController.prototype.goToNext = function () {
                    var formValid = this._validateForm();
                    if (formValid) {
                        this._setDataModelFromForm();
                        this.$scope.$emit('Save Data');
                        this.$state.go(this.STEP8_STATE, { reload: true });
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherPriceSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP6_STATE, { reload: true });
                };
                TeacherPriceSectionController.prototype._fillForm = function (data) {
                    this.form.privateClass = data.Price.PrivateClass;
                    this.form.groupClass = data.Price.GroupClass;
                };
                TeacherPriceSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var IS_NOT_ZERO_ENUM = 5;
                    var EMPTY_ENUM = 3;
                    var TRUE_ENUM = 7;
                    var GLOBAL_MESSAGE = this.$filter('translate')('%create.teacher.price.validation.message.text');
                    var formValid = true;
                    if (this.form.privateClass.Active) {
                        var privateClassPrice_rules = [NULL_ENUM, EMPTY_ENUM, IS_NOT_ZERO_ENUM];
                        this.validate.privateClassPrice = this.functionsUtilService.validator(this.form.privateClass.HourPrice, privateClassPrice_rules);
                        if (!this.validate.privateClassPrice.valid) {
                            formValid = this.validate.privateClassPrice.valid;
                        }
                    }
                    if (this.form.groupClass.Active) {
                        var groupClassPrice_rules = [NULL_ENUM, EMPTY_ENUM, IS_NOT_ZERO_ENUM];
                        this.validate.groupClassPrice = this.functionsUtilService.validator(this.form.groupClass.HourPrice, groupClassPrice_rules);
                        if (!this.validate.groupClassPrice.valid) {
                            formValid = this.validate.groupClassPrice.valid;
                        }
                    }
                    var privateClassActive_rules = [TRUE_ENUM];
                    this.validate.privateClassActive = this.functionsUtilService.validator(this.form.privateClass.Active, privateClassActive_rules);
                    var groupClassActive_rules = [TRUE_ENUM];
                    this.validate.groupClassActive = this.functionsUtilService.validator(this.form.groupClass.Active, groupClassActive_rules);
                    if (!this.validate.privateClassActive.valid && !this.validate.groupClassActive.valid) {
                        this.validate.globalValidate.valid = false;
                        this.validate.globalValidate.message = GLOBAL_MESSAGE;
                        formValid = this.validate.globalValidate.valid;
                    }
                    else {
                        this.validate.globalValidate.valid = true;
                        this.validate.globalValidate.message = '';
                    }
                    return formValid;
                };
                TeacherPriceSectionController.prototype.changeHelpText = function (type) {
                    var PRIVATE_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.private_class.title.text');
                    var PRIVATE_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.private_class.description.text');
                    var GROUP_CLASS_TITLE = this.$filter('translate')('%create.teacher.price.help_text.group_class.title.text');
                    var GROUP_CLASS_DESCRIPTION = this.$filter('translate')('%create.teacher.price.help_text.group_class.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'privateClass':
                            this.helpText.title = PRIVATE_CLASS_TITLE;
                            this.helpText.description = PRIVATE_CLASS_DESCRIPTION;
                            break;
                        case 'groupClass':
                            this.helpText.title = GROUP_CLASS_TITLE;
                            this.helpText.description = GROUP_CLASS_DESCRIPTION;
                            break;
                    }
                };
                TeacherPriceSectionController.prototype._setDataModelFromForm = function () {
                    this.$rootScope.teacherData.Price.PrivateClass = this.form.privateClass;
                    this.$rootScope.teacherData.Price.GroupClass = this.form.groupClass;
                };
                TeacherPriceSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherPriceSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherPriceSectionController';
                TeacherPriceSectionController.$inject = [
                    'dataConfig',
                    'mainApp.core.util.GetDataStaticJsonService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope'
                ];
                return TeacherPriceSectionController;
            }());
            createTeacherPage.TeacherPriceSectionController = TeacherPriceSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherPriceSectionController.controllerId, TeacherPriceSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherPriceSection/teacherPriceSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.photo', {
            url: '/photo',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherPhotoSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherPhotoSectionController = (function () {
                function TeacherPhotoSectionController(functionsUtilService, S3UploadService, messageUtil, Upload, $state, $filter, $scope, $rootScope) {
                    this.functionsUtilService = functionsUtilService;
                    this.S3UploadService = S3UploadService;
                    this.messageUtil = messageUtil;
                    this.Upload = Upload;
                    this.$state = $state;
                    this.$filter = $filter;
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                TeacherPhotoSectionController.prototype._init = function () {
                    this.STEP7_STATE = 'page.createTeacherPage.price';
                    this.FINAL_STEP_STATE = 'page.createTeacherPage.finish';
                    this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.photo.help_text.title.text');
                    this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.photo.teacher.help_text.description.text');
                    this.uploading = false;
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(8, 9);
                    this.helpText = {
                        title: this.HELP_TEXT_TITLE,
                        description: this.HELP_TEXT_DESCRIPTION
                    };
                    this.form = {
                        avatar: null,
                        croppedDataUrl: '',
                        thumbnail: ''
                    };
                    this.validate = {
                        avatar: { valid: true, message: '' },
                        thumbnail: { valid: true, message: '' },
                        globalValidate: { valid: true, message: '' }
                    };
                    this.activate();
                };
                TeacherPhotoSectionController.prototype.activate = function () {
                    DEBUG && console.log('TeacherPhotoSectionController controller actived');
                    this._subscribeToEvents();
                    if (this.$rootScope.profileData) {
                        this._fillForm(this.$rootScope.profileData);
                    }
                };
                TeacherPhotoSectionController.prototype.goToNext = function () {
                    var self = this;
                    var formValid = this._validateForm();
                    if (formValid) {
                        this.uploading = true;
                        if (this.form.avatar) {
                            this._resizeImage().then(function (result) {
                                self.uploading = false;
                                if (result.Location) {
                                    self._setDataModelFromForm(result.Location);
                                    self.$scope.$emit('Save Profile Data');
                                    self.$state.go(self.FINAL_STEP_STATE, { reload: true });
                                }
                                else {
                                    self.messageUtil.error('');
                                }
                            });
                        }
                        else {
                            this.$scope.$emit('Save Profile Data');
                            this.$state.go(this.FINAL_STEP_STATE, { reload: true });
                        }
                    }
                    else {
                        window.scrollTo(0, 0);
                    }
                };
                TeacherPhotoSectionController.prototype.goToBack = function () {
                    this.$state.go(this.STEP7_STATE, { reload: true });
                };
                TeacherPhotoSectionController.prototype._fillForm = function (data) {
                    this.form.thumbnail = data.Avatar;
                };
                TeacherPhotoSectionController.prototype._validateForm = function () {
                    var NULL_ENUM = 2;
                    var EMPTY_ENUM = 3;
                    var DEFINED_ENUM = 6;
                    var PHOTO_MESSAGE = this.$filter('translate')('%create.teacher.photo.validation.message.text');
                    var formValid = true;
                    var avatar_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.avatar = this.functionsUtilService.validator(this.form.avatar, avatar_rules);
                    var thumbnail_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
                    this.validate.thumbnail = this.functionsUtilService.validator(this.form.thumbnail, thumbnail_rules);
                    if (!this.validate.avatar.valid) {
                        if (!this.validate.thumbnail.valid) {
                            this.validate.globalValidate.valid = false;
                            this.validate.globalValidate.message = PHOTO_MESSAGE;
                            formValid = this.validate.globalValidate.valid;
                        }
                        else {
                            this.validate.globalValidate.valid = true;
                            this.validate.globalValidate.message = '';
                        }
                    }
                    return formValid;
                };
                TeacherPhotoSectionController.prototype.changeHelpText = function (type) {
                    var AVATAR_TITLE = this.$filter('translate')('%create.teacher.photo.help_text.avatar.title.text');
                    var AVATAR_DESCRIPTION = this.$filter('translate')('%create.teacher.photo.teacher.help_text.description.text');
                    switch (type) {
                        case 'default':
                            this.helpText.title = this.HELP_TEXT_TITLE;
                            this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                            break;
                        case 'avatar':
                            this.helpText.title = AVATAR_TITLE;
                            this.helpText.description = AVATAR_DESCRIPTION;
                            break;
                    }
                };
                TeacherPhotoSectionController.prototype._resizeImage = function () {
                    var self = this;
                    var newName = app.core.util.functionsUtil.FunctionsUtilService.generateGuid() + '.jpeg';
                    var options = {
                        width: 250,
                        height: 250,
                        quality: 1.0,
                        type: 'image/jpeg',
                        pattern: '.jpg',
                        restoreExif: false
                    };
                    var file = this.Upload.dataUrltoBlob(this.form.croppedDataUrl, newName);
                    return this.Upload.resize(file, options).then(function (resizedFile) {
                        return self._uploadImage(resizedFile).then(function (result) {
                            return result;
                        });
                    });
                };
                TeacherPhotoSectionController.prototype._uploadImage = function (resizedFile) {
                    var self = this;
                    return this.S3UploadService.upload(resizedFile).then(function (result) {
                        return result;
                    }, function (error) {
                        console.log('error', error);
                        return error;
                    });
                };
                TeacherPhotoSectionController.prototype._setDataModelFromForm = function (avatar) {
                    this.$rootScope.profileData.Avatar = avatar;
                };
                TeacherPhotoSectionController.prototype._subscribeToEvents = function () {
                    var self = this;
                    this.$scope.$on('Fill User Profile Form', function (event, args) {
                        self._fillForm(args);
                    });
                };
                TeacherPhotoSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherPhotoSectionController';
                TeacherPhotoSectionController.$inject = [
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.core.s3Upload.S3UploadService',
                    'mainApp.core.util.messageUtilService',
                    'Upload',
                    '$state',
                    '$filter',
                    '$scope',
                    '$rootScope'
                ];
                return TeacherPhotoSectionController;
            }());
            createTeacherPage.TeacherPhotoSectionController = TeacherPhotoSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherPhotoSectionController.controllerId, TeacherPhotoSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherPhotoSection/teacherPhotoSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.createTeacherPage')
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.createTeacherPage.finish', {
            url: '/finish',
            views: {
                'step': {
                    templateUrl: 'app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.html',
                    controller: 'mainApp.pages.createTeacherPage.TeacherFinishSectionController',
                    controllerAs: 'vm'
                }
            },
            cache: false
        });
    }
})();

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var createTeacherPage;
        (function (createTeacherPage) {
            var TeacherFinishSectionController = (function () {
                function TeacherFinishSectionController($scope, $rootScope, $state, dataConfig, functionsUtilService, localStorage) {
                    this.$scope = $scope;
                    this.$rootScope = $rootScope;
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.functionsUtilService = functionsUtilService;
                    this.localStorage = localStorage;
                    this._init();
                }
                TeacherFinishSectionController.prototype._init = function () {
                    this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(9, 9);
                    this.activate();
                };
                TeacherFinishSectionController.prototype.activate = function () {
                    var ENTER_MIXPANEL = "Enter: Finish Create Teacher Process";
                    console.log('TeacherFinishSectionController controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                };
                TeacherFinishSectionController.prototype._finishProcess = function () {
                    this.localStorage.removeItem(this.dataConfig.earlyIdLocalStorage);
                    this.localStorage.removeItem(this.dataConfig.teacherDataLocalStorage);
                    this.$state.go('page.landingPage');
                };
                TeacherFinishSectionController.controllerId = 'mainApp.pages.createTeacherPage.TeacherFinishSectionController';
                TeacherFinishSectionController.$inject = [
                    '$scope',
                    '$rootScope',
                    '$state',
                    'dataConfig',
                    'mainApp.core.util.FunctionsUtilService',
                    'mainApp.localStorageService'
                ];
                return TeacherFinishSectionController;
            }());
            createTeacherPage.TeacherFinishSectionController = TeacherFinishSectionController;
            angular
                .module('mainApp.pages.createTeacherPage')
                .controller(TeacherFinishSectionController.controllerId, TeacherFinishSectionController);
        })(createTeacherPage = pages.createTeacherPage || (pages.createTeacherPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../../maps/app/pages/createTeacherPage/teacherFinishSection/teacherFinishSection.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.teacherProfilePage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.teacherProfilePage', {
            url: '/teachers/show/:id',
            views: {
                'container': {
                    templateUrl: 'app/pages/teacherProfilePage/teacherProfilePage.html',
                    controller: 'mainApp.pages.teacherProfilePage.TeacherProfilePageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: false
            },
            params: {
                id: null
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/teacherProfilePage/teacherProfilePage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var teacherProfilePage;
        (function (teacherProfilePage) {
            var TeacherProfilePageController = (function () {
                function TeacherProfilePageController(TeacherService, functionsUtil, $state, $stateParams, $filter) {
                    this.TeacherService = TeacherService;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this._init();
                }
                TeacherProfilePageController.prototype._init = function () {
                    this.data = new app.models.teacher.Teacher();
                    this.loading = true;
                    this._initNativeTooltip();
                    this.activate();
                };
                TeacherProfilePageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: Teacher Profile Page';
                    var self = this;
                    console.log('teacherProfilePage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this.TeacherService.getTeacherById(this.$stateParams.id).then(function (response) {
                        self.data = new app.models.teacher.Teacher(response);
                        self.mapConfig = self.functionsUtil.buildMapConfig([
                            {
                                id: self.data.Profile.Location.Position.Id,
                                location: {
                                    position: {
                                        lat: parseFloat(self.data.Profile.Location.Position.Lat),
                                        lng: parseFloat(self.data.Profile.Location.Position.Lng)
                                    }
                                }
                            }
                        ], 'location-circle-map', { lat: parseFloat(self.data.Profile.Location.Position.Lat), lng: parseFloat(self.data.Profile.Location.Position.Lng) }, null);
                        self.loading = false;
                    });
                };
                TeacherProfilePageController.prototype._initNativeTooltip = function () {
                    this.nativeTooltipOptions = {
                        placement: 'top',
                        animation: false,
                        class: 'ma-tooltip ma-tooltip--primary ma-tooltip--default'
                    };
                };
                TeacherProfilePageController.prototype.goToConfirm = function () {
                    var CLICK_MIXPANEL = 'Click: Book a Class';
                    mixpanel.track(CLICK_MIXPANEL, {
                        "teacher_id": this.data.Id,
                        "teacher_name": this.data.Profile.FirstName + ' ' + this.data.Profile.LastName
                    });
                    var url = 'https://waysily.typeform.com/to/NDPRAb';
                    window.open(url, '_blank');
                };
                TeacherProfilePageController.prototype._assignNative = function (language) {
                    var native = this.data.Profile.Languages.Native;
                    var isNativeOfThisLanguage = false;
                    for (var i = 0; i < native.length; i++) {
                        if (language === native[i]) {
                            isNativeOfThisLanguage = true;
                            break;
                        }
                    }
                    return isNativeOfThisLanguage;
                };
                TeacherProfilePageController.prototype._assignNativeTooltip = function (language) {
                    var TOOLTIP_TEXT = this.$filter('translate')('%profile.teacher.native.lang.tooltip.text');
                    var firstName = this.data.Profile.FirstName;
                    var tooltipText = null;
                    var isNative = this._assignNative(language);
                    if (isNative) {
                        tooltipText = firstName + ' ' + TOOLTIP_TEXT;
                    }
                    return tooltipText;
                };
                TeacherProfilePageController.prototype._ratingTotalAverage = function (ratingsArr) {
                    return this.functionsUtil.teacherRatingAverage(ratingsArr);
                };
                TeacherProfilePageController.prototype._ratingUnitAverage = function (ratingsArr, type) {
                    var average = 0;
                    var averageArr = [];
                    var ratings = [];
                    for (var i = 0; i < ratingsArr.length; i++) {
                        ratings.push(new app.models.teacher.Rating(ratingsArr[i]));
                        switch (type) {
                            case 'methodology':
                                averageArr.push(ratings[i].MethodologyValue);
                                break;
                            case 'communication':
                                averageArr.push(ratings[i].CommunicationValue);
                                break;
                            case 'teaching':
                                averageArr.push(ratings[i].TeachingValue);
                                break;
                        }
                    }
                    average = this.functionsUtil.averageNumbersArray(averageArr);
                    return average;
                };
                TeacherProfilePageController.controllerId = 'mainApp.pages.teacherProfilePage.TeacherProfilePageController';
                TeacherProfilePageController.$inject = [
                    'mainApp.models.teacher.TeacherService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$stateParams',
                    '$filter'];
                return TeacherProfilePageController;
            }());
            teacherProfilePage.TeacherProfilePageController = TeacherProfilePageController;
            angular
                .module('mainApp.pages.teacherProfilePage')
                .controller(TeacherProfilePageController.controllerId, TeacherProfilePageController);
        })(teacherProfilePage = pages.teacherProfilePage || (pages.teacherProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/teacherProfilePage/teacherProfilePage.controller.js.map

(function () {
    'use strict';
    angular
        .module('mainApp.pages.schoolProfilePage', [])
        .config(config);
    function config($stateProvider) {
        $stateProvider
            .state('page.schoolProfilePage', {
            url: '/schools/show/:id',
            views: {
                'container': {
                    templateUrl: 'app/pages/schoolProfilePage/schoolProfilePage.html',
                    controller: 'mainApp.pages.schoolProfilePage.SchoolProfilePageController',
                    controllerAs: 'vm'
                }
            },
            parent: 'page',
            data: {
                requireLogin: false
            },
            params: {
                id: null
            },
            onEnter: ['$rootScope', function ($rootScope) {
                    $rootScope.activeHeader = true;
                    $rootScope.activeFooter = true;
                }]
        });
    }
})();

//# sourceMappingURL=../../../../maps/app/pages/schoolProfilePage/schoolProfilePage.config.js.map

var app;
(function (app) {
    var pages;
    (function (pages) {
        var schoolProfilePage;
        (function (schoolProfilePage) {
            var SchoolProfilePageController = (function () {
                function SchoolProfilePageController(SchoolService, functionsUtil, $state, $stateParams, $filter) {
                    this.SchoolService = SchoolService;
                    this.functionsUtil = functionsUtil;
                    this.$state = $state;
                    this.$stateParams = $stateParams;
                    this.$filter = $filter;
                    this._init();
                }
                SchoolProfilePageController.prototype._init = function () {
                    this.data = new app.models.school.School();
                    this.loading = true;
                    this.activate();
                };
                SchoolProfilePageController.prototype.activate = function () {
                    var ENTER_MIXPANEL = 'Enter: School Profile Page';
                    var self = this;
                    this._paymentMethodsList = this._buildPaymentMethodsClassList();
                    DEBUG && console.log('schoolProfilePage controller actived');
                    mixpanel.track(ENTER_MIXPANEL);
                    this.SchoolService.getSchoolById(this.$stateParams.id).then(function (response) {
                        self.data = new app.models.school.School(response);
                        self.mapConfig = self.functionsUtil.buildMapConfig([
                            {
                                id: self.data.Location.Position.Id,
                                location: {
                                    position: {
                                        lat: parseFloat(self.data.Location.Position.Lat),
                                        lng: parseFloat(self.data.Location.Position.Lng)
                                    }
                                }
                            }
                        ], 'location-marker-map', { lat: parseFloat(self.data.Location.Position.Lat), lng: parseFloat(self.data.Location.Position.Lng) }, null);
                        self.loading = false;
                    });
                };
                SchoolProfilePageController.prototype.goToSite = function (url) {
                    var EMAIL_REGEX = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
                    if (EMAIL_REGEX.test(url)) {
                        url = 'mailto:' + url;
                        window.open(url);
                    }
                    if (url) {
                        window.open(url, '_blank');
                    }
                };
                SchoolProfilePageController.prototype.assignAmenitieIconClass = function (amenitie) {
                    var amenitiePrefixClass = 'ma-liner-icons--default--';
                    var iconClass = this.functionsUtil.assignAmenitieIconClass(amenitie);
                    return amenitiePrefixClass + iconClass;
                };
                SchoolProfilePageController.prototype.assignPaymentMethodsIconClass = function (method) {
                    var iconClass = 'ma-payment-methods-icons--medium--' + method.value;
                    var arr = this.data.PaymentMethod.Methods;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] == method.key) {
                            method.disabled = false;
                        }
                    }
                    if (method.disabled) {
                        iconClass = iconClass + ' ma-payment-methods-icons--disabled';
                    }
                    return iconClass;
                };
                SchoolProfilePageController.prototype._buildPaymentMethodsClassList = function () {
                    var options = [
                        {
                            key: '1',
                            value: 'visa',
                            name: 'Visa',
                            disabled: true
                        },
                        {
                            key: '2',
                            value: 'mastercard',
                            name: 'MasterCard',
                            disabled: true
                        },
                        {
                            key: '3',
                            value: 'american-express',
                            name: 'American Express',
                            disabled: true
                        },
                        {
                            key: '4',
                            value: 'paypal',
                            name: 'Paypal',
                            disabled: true
                        },
                        {
                            key: '5',
                            value: 'cash',
                            name: 'Cash',
                            disabled: true
                        }
                    ];
                    return options;
                };
                SchoolProfilePageController.controllerId = 'mainApp.pages.schoolProfilePage.SchoolProfilePageController';
                SchoolProfilePageController.$inject = [
                    'mainApp.models.school.SchoolService',
                    'mainApp.core.util.FunctionsUtilService',
                    '$state',
                    '$stateParams',
                    '$filter'];
                return SchoolProfilePageController;
            }());
            schoolProfilePage.SchoolProfilePageController = SchoolProfilePageController;
            angular
                .module('mainApp.pages.schoolProfilePage')
                .controller(SchoolProfilePageController.controllerId, SchoolProfilePageController);
        })(schoolProfilePage = pages.schoolProfilePage || (pages.schoolProfilePage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/pages/schoolProfilePage/schoolProfilePage.controller.js.map

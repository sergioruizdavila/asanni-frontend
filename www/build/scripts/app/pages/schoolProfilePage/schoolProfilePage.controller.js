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

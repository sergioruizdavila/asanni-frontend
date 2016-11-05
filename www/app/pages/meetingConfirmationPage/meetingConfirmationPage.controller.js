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
                return MeetingConfirmationPageController;
            }());
            MeetingConfirmationPageController.controllerId = 'mainApp.pages.meetingConfirmationPage.MeetingConfirmationPageController';
            MeetingConfirmationPageController.$inject = [
                'dataConfig',
                '$state',
                '$filter',
                '$scope',
                '$uibModal'
            ];
            meetingConfirmationPage.MeetingConfirmationPageController = MeetingConfirmationPageController;
            angular
                .module('mainApp.pages.meetingConfirmationPage')
                .controller(MeetingConfirmationPageController.controllerId, MeetingConfirmationPageController);
        })(meetingConfirmationPage = pages.meetingConfirmationPage || (pages.meetingConfirmationPage = {}));
    })(pages = app.pages || (app.pages = {}));
})(app || (app = {}));
//# sourceMappingURL=meetingConfirmationPage.controller.js.map
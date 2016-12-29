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
                    event.preventDefault();
                };
                return ModalCertificateController;
            }());
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
            angular.module('mainApp.components.modal')
                .controller(ModalCertificateController.controllerId, ModalCertificateController);
        })(modalCertificate = modal.modalCertificate || (modal.modalCertificate = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalCertificate.controller.js.map
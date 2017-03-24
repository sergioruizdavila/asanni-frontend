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

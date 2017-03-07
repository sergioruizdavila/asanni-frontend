/**
 * ModalPhotoController
 * @description - modal photo after the user signed up in Waysily
 * @constructor
 */

module components.modal.modalPhoto {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalPhotoController {
        form: IModalPhotoForm;
        validate: IModalPhotoValidate;
        activate: () => void;
    }

    interface IModalPhotoForm {
        avatar: File;
        croppedDataUrl: string;
        thumbnail: string;
    }

    interface IModalPhotoValidate {
        avatar: app.core.util.functionsUtil.IValid;
        thumbnail: app.core.util.functionsUtil.IValid;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class ModalPhotoController implements IModalPhotoController {

        static controllerId = 'mainApp.components.modal.ModalPhotoController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalPhotoForm;
        validate: IModalPhotoValidate;
        uploading: boolean;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.models.user.UserService',
            'mainApp.core.s3Upload.S3UploadService',
            '$uibModalInstance',
            'mainApp.core.util.messageUtilService',
            'Upload',
            'dataConfig',
            '$uibModal',
            '$rootScope'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private userService: app.models.user.IUserService,
            private S3UploadService: app.core.s3Upload.IS3UploadService,
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private Upload: app.core.interfaces.IUpload,
            private dataConfig: IDataConfig,
            private $uibModal: ng.ui.bootstrap.IModalService,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            // Init upload loading button
            this.uploading = false;

            // Init form
            this.form = {
                avatar: null,
                croppedDataUrl: '',
                thumbnail: ''
            };

            // Build validate object fields
            this.validate = {
                avatar: {valid: true, message: ''},
                thumbnail: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('modalPhoto controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * _resizeImage
        * @description - resize image base on defaults parameters
        * @use - this._resizeImage();
        * @function
        * @return {void}
        */
        private _resizeImage(): angular.IPromise<any> {
            //VARIABLES
            let self = this;
            //New file name
            let newName = app.core.util.functionsUtil.FunctionsUtilService.generateGuid() + '.jpeg';
            // Image Options
            let options= {
                width: 250,
                height: 250,
                quality: 1.0,
                type: 'image/jpeg',
                pattern:'.jpg',
                restoreExif: false
            };
            // Build file base on cropped data image
            let file = this.Upload.dataUrltoBlob(this.form.croppedDataUrl, newName);
            /****************************************************/

            // Resize image (change extension to jpeg, resize and quality)
            return this.Upload.resize(file, options).then(
                function(resizedFile) {

                    if(resizedFile) {
                        // Upload resized file to Amazon S3
                        return self._uploadImage(resizedFile).then(function(result) {
                            return result;
                        });
                    } else {
                        self.messageUtil.error('Hubo un problema al redimensionar la foto, intenta nuevamente por favor.');
                    }
                }
            );

        }



        /**
        * _uploadImage
        * @description - upload resize image to Amazon S3
        * @use - this._uploadImage(resizedFile);
        * @function
        * @param {File} resizedFile file object
        * @return {void}
        */
        private _uploadImage(resizedFile): angular.IPromise<any> {
            //VARIABLES
            let self = this;

            return this.S3UploadService.upload(resizedFile).then(function (result) {

                return result;

            }, function (error) {

                // Mark the error
                console.log('error', error);
                return error;

            });

        }



        /**
        * _parseData
        * @description - parse data in order to send to DB
        * @use - this._parseData();
        * @function
        * @return {void}
        */
        private _parseData(avatar): void {

            // Prepare data to send to DB
            this.$rootScope.profileData.Avatar = avatar;

        }



        /**
        * goToNext
        * @description - go to next step (save user information on DB)
        * @function
        * @return void
        */
        private _goToNext(): void {
            //VARIABLES
            let self = this;

            this.uploading = true;

            // If this.form.avatar exists, resize and upload image
            if(this.form.avatar) {

                this._resizeImage().then(function(result) {

                    if(result.Location) {

                        self._parseData(result.Location);

                        // Update existing profile
                        self.userService.updateUserProfile(self.$rootScope.profileData)
                        .then(
                            function(response) {
                                if(response.userId) {
                                    //stop loading
                                    self.uploading = false;

                                    //go to next step
                                    self._openBornModal();
                                }
                            }
                        );

                    } else {
                        self.messageUtil.error('');
                    }

                });

            // If this.form.avatar not exists, only go to next step
            } else {
                //go to next step
                this._openBornModal();
            }

        }



        /**
        * _openBornModal
        * @description - open Modal in order to ask user born info
        * @use - this._openBornModal();
        * @function
        * @return {void}
        */
        private _openBornModal(): void {
            //VARIABLES
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                size: 'sm',
                keyboard: false,
                templateUrl: this.dataConfig.modalBornTmpl,
                controller: 'mainApp.components.modal.ModalBornController as vm'
            };

            var modalInstance = this.$uibModal.open(options);

            this.$uibModalInstance.close();
        }

    }

    angular.module('mainApp.components.modal')
        .controller(ModalPhotoController.controllerId,
                    ModalPhotoController);

}

/**
 * EditProfileMediaController
 * @description - Edit User Basic info Profile Page Controller
 */

module app.pages.editProfileMedia {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IEditProfileMediaController {
        form: IEditProfileMediaForm;
        validate: IEditProfileMediaValidate;
        activate: () => void;
        goToEditProfile: () => void;
        goToEditLocation: () => void;
    }

    interface IEditProfileMediaForm {
        avatar: File;
        croppedDataUrl: string;
        thumbnail: string;
    }

    interface IEditProfileMediaValidate {
        avatar: app.core.util.functionsUtil.IValid;
        thumbnail: app.core.util.functionsUtil.IValid;
        globalValidate: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class EditProfileMediaController implements IEditProfileMediaController {

        static controllerId = 'mainApp.pages.editProfile.EditProfileMediaController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IEditProfileMediaForm;
        validate: IEditProfileMediaValidate;
        saving: boolean;
        saved: boolean;
        error: boolean;
        TIME_SHOW_MESSAGE: number;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
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

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private userService: app.models.user.IUserService,
            private S3UploadService: app.core.s3Upload.IS3UploadService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private Upload: app.core.interfaces.IUpload,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $timeout: angular.ITimeoutService,
            private $scope: angular.IScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.TIME_SHOW_MESSAGE = 6000;

            // Init saving loading
            this.saving = false;

            // Init saved message
            this.saved = false;

            // Init error message
            this.error = false;

            //Init form
            this.form = {
                avatar: null,
                croppedDataUrl: '',
                thumbnail: ''
            };

            // Build validate object fields
            this.validate = {
                avatar: {valid: true, message: ''},
                thumbnail: {valid: true, message: ''},
                globalValidate: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('EditProfileMedia controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Go to edit profile page
        * @description this method is launched when user press 'Edit Profile'
        * menu option
        */
        goToEditProfile(): void {
            // Go to next page on calls stack
            this.$state.go('page.editProfile.basicInfo');
        }


        /*
        * Go to edit location page
        * @description this method is launched when user press 'Edit Location' menu
        * option
        */
        goToEditLocation(): void {
            this.$state.go('page.userEditLocationPage');
        }



        /**
        * _validateForm
        * @description - Validate each field on form
        * @use - this._validateForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        private _validateForm(): boolean {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const DEFINED_ENUM = app.core.util.functionsUtil.Validation.Defined;
            const PHOTO_MESSAGE = this.$filter('translate')('%create.teacher.photo.validation.message.text');

            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Reset globalValidate
            this.validate.globalValidate.valid = true;
            this.validate.globalValidate.message = '';

            //Validate photo
            let avatar_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
            this.validate.avatar = this.functionsUtil.validator(this.form.avatar, avatar_rules);

            //Validate thumbnail
            let thumbnail_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
            this.validate.thumbnail = this.functionsUtil.validator(this.form.thumbnail, thumbnail_rules);

            //If avatar image is not valid
            if(!this.validate.avatar.valid) {
                //If thumbnail image is not valid
                if(!this.validate.thumbnail.valid) {
                    this.validate.globalValidate.valid = false;
                    this.validate.globalValidate.message = PHOTO_MESSAGE;
                    formValid = this.validate.globalValidate.valid;
                } else {
                    this.validate.globalValidate.valid = true;
                    this.validate.globalValidate.message = '';
                }
            }

            return formValid;
        }



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
            return this.Upload.resize(file, options).then(function(resizedFile) {

                // Upload resized file to Amazon S3
                return self._uploadImage(resizedFile).then(function(result) {
                    return result;
                });

            });

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
                DEBUG && console.error('error', error);
                return error;

            });

        }



        /**
        * _setDataModelFromForm
        * @description - get data from form's input in order to put it on $parent.teacherData
        * @use - this._getDataFromForm();
        * @function
        * @return {void}
        */
        private _setDataModelFromForm(avatar): void {

            // Send data to parent (createTeacherPage)
            this.$rootScope.profileData.Avatar = avatar;

        }



        /**
        * saveImageSection
        * @description - Update profile's avatar photo calling to save method
        * @function
        * @return void
        */
        saveImageSection(): void {
            //VARIABLES
            let self = this;
            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                //loading On
                this.saving = true;

                this._resizeImage().then(
                    function(result) {

                        if(result.Location) {
                            self._setDataModelFromForm(result.Location);
                            self.$scope.$emit('Save Profile Data');
                        } else {
                            self.error = true;
                        }

                    }
                );

            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes User Basic Info Section
        * to Parent Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */
        private _subscribeToEvents(): void {
            //VARIABLES
            let self = this;


            /**
            * Saved event
            * @parent - EditProfileController
            * @description - Parent notify that data was saved successful
            * @event
            */
            this.$scope.$on('Saved',
                function(event, args) {
                    //loading Off
                    self.saving = false;
                    self.error = false;
                    self.saved = true;

                    self.form.avatar = self.saved ? null : self.form.avatar;

                    self.$timeout(function() {
                        self.saved = false;
                    }, self.TIME_SHOW_MESSAGE);
                }
            );
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.editProfile')
        .controller(EditProfileMediaController.controllerId, EditProfileMediaController);

}

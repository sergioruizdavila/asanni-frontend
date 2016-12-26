/**
 * TeacherFinishSectionController
 * @description - Teacher Finish Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherFinishSectionController {
        form: ITeacherFinishForm;
        validate: ITeacherFinishValidate;
        activate: () => void;
    }

    export interface ITeacherFinishScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    export interface ITeacherFinishForm {
        avatar: File;
        croppedDataUrl: string;
    }

    export interface IUpload extends angular.angularFileUpload.IUploadService {
        dataUrltoBlob: (dataUrl: string, name: string) => File;
    }

    interface ITeacherFinishValidate {
        avatar: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherFinishSectionController implements ITeacherFinishSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherFinishSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherFinishForm;
        validate: ITeacherFinishValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        STEP7_STATE: string;
        FINAL_STEP_STATE: string;
        HELP_TEXT_TITLE: string;
        HELP_TEXT_DESCRIPTION: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'dataConfig',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.s3Upload.S3UploadService',
            'mainApp.core.util.messageUtilService',
            'Upload',
            '$state',
            '$filter',
            '$scope'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private S3UploadService: app.core.s3Upload.IS3UploadService,
            private messageUtil: app.core.util.messageUtil.IMessageUtilService,
            private Upload: IUpload,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ITeacherFinishScope) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.STEP7_STATE = 'page.createTeacherPage.price';
            this.FINAL_STEP_STATE = 'page.createTeacherPage.final';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.finish.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.finish.help_text.description.text');
            /*********************************/

            // Put title on parent scope
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(9, 9);

            // Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            // Init form
            this.form = {
                avatar: null,
                croppedDataUrl: ''
            };

            // Build validate object fields
            this.validate = {
                avatar: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherFinishSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * goToNext
        * @description - go to next step (create or update teacher data on DB)
        * @function
        * @return void
        */
        goToNext(): void {
            //VARIABLES
            let self = this;
            //Validate data form
            let formValid = this._validateForm();
            /****************************************************/

            if(formValid) {

                this._resizeImage().then(function(result) {

                    if(result.Location) {
                        // Save teacher model on DB
                        self._setDataModelFromForm(result.Location);
                        self.$scope.$emit('Save Data');

                        // GO TO NEXT STEP
                        self.$state.go(this.FINAL_STEP_STATE, {reload: true});
                    } else {
                        self.messageUtil.error('');
                    }

                });

            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }

        }



        /**
        * goToBack
        * @description - go to back step
        * @function
        * @return void
        */
        goToBack(): void {
            //VARIABLES
            let self = this;
            //Validate data form
            let formValid = this._validateForm();
            //If form is valid, save data model
            if(formValid) {
                this._resizeImage().then(function(result) {

                    if(result.Location) {
                        // Save teacher model on DB
                        self._setDataModelFromForm(result.Location);
                        self.$scope.$emit('Save Data');

                        // GO TO BACK STEP
                        self.$state.go(this.STEP7_STATE, {reload: true});
                    } else {
                        self.messageUtil.error('');
                    }

                });
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }
        }



        /**
        * _validateForm
        * @description - Validate each field on form
        * @use - this._validateForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        _validateForm(): boolean {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const DEFINED_ENUM = app.core.util.functionsUtil.Validation.Defined;
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate finish
            let avatar_rules = [NULL_ENUM, EMPTY_ENUM, DEFINED_ENUM];
            this.validate.avatar = this.functionsUtilService.validator(this.form.avatar, avatar_rules);
            if(!this.validate.avatar.valid) {
                formValid = this.validate.avatar.valid;
            }

            return formValid;
        }



        /**
        * changeHelpText
        * @description - change help block text (titles and descriptions) dynamically
        *  based on specific field (finish, immerison)
        * @use - this.changeHelpText('firstName');
        * @function
        * @return {void}
        */
        changeHelpText(type): void {
            //CONSTANTS
            const AVATAR_TITLE = this.$filter('translate')('%create.teacher.finish.help_text.avatar.title.text');
            const AVATAR_DESCRIPTION = this.$filter('translate')('%create.teacher.finish.help_text.avatar.description.text');
            /*****************************************************/

            switch(type) {
                case 'default':
                    this.helpText.title = this.HELP_TEXT_TITLE;
                    this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                break;

                case 'avatar':
                    this.helpText.title = AVATAR_TITLE;
                    this.helpText.description = AVATAR_DESCRIPTION;
                break;
            }

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
            let newName = this.functionsUtilService.generateGuid() + '.jpeg';
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
                console.log('error', error);
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
            this.$scope.$parent.vm.teacherData.Avatar = avatar;

        }



        /**
        * _subscribeToEvents
        * @description - this finish subscribes Teacher Location Section to Parent Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */
        private _subscribeToEvents(): void {
            //VARIABLES
            let self = this;

            /**
            * Fill Form event
            * @parent - CreateTeacherPageController
            * @description - Parent send teacher data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill Form', function(event, args: app.models.teacher.Teacher) {

                //self.form.avatar = args.Avatar;
                //TODO: Aqui cargamos la imagen en el cuadro

            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherFinishSectionController.controllerId,
                    TeacherFinishSectionController);

}
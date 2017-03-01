/**
 * EditTeacherTeachController
 * @description - Edit Teacher Teach Controller (update teacher teach)
 */

module app.pages.editTeacher {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IEditTeacherTeachController {
        form: IEditTeacherTeachForm;
        validate: IEditTeacherTeachValidate;
        activate: () => void;
    }

    export interface IEditTeacherTeachForm {
        teach: Array<app.core.interfaces.IKeyValue>;
    }

    interface IEditTeacherTeachValidate {
        teach: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class EditTeacherTeachController implements IEditTeacherTeachController {

        static controllerId = 'mainApp.pages.editTeacher.EditTeacherTeachController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IEditTeacherTeachForm;
        validate: IEditTeacherTeachValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        HELP_TEXT_TITLE: string;
        HELP_TEXT_DESCRIPTION: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'dataConfig',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.GetDataStaticJsonService',
            '$state',
            '$filter',
            '$scope',
            '$rootScope',
            '$uibModal'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: angular.IScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $uibModal: ng.ui.bootstrap.IModalService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
            /*********************************/

            //Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            //Init form
            this.form = {
                teach: []
            };

            // Build validate object fields
            this.validate = {
                teach: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            DEBUG && console.log('EditTeacherTeachController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            //FILL FORM FROM ROOTSCOPE TEACHER INFO
            if(this.$rootScope.profileData) {
                this._fillForm(this.$rootScope.profileData);
            }

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * saveTeachSection
        * @description - save teacher language to teach (update teacher data on DB)
        * @function
        * @return void
        */
        saveTeachSection(): void {
            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                this._setDataModelFromForm();
                this.$scope.$emit('Save Profile Data');
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }
        }



        /**
        * _fillForm
        * @description - Fill form with teacher data
        * @use - this._fillForm(data);
        * @function
        * @param {app.models.user.Profile} data - Profile Data
        * @return {void}
        */
        private _fillForm(data: app.models.user.Profile): void {

            // Form is already filled (Just take native because it's required has a native language)
            if(this.form.teach.length === 0) {

                let languageArray = this.getDataFromJson.getLanguagei18n();
                for (let i = 0; i < languageArray.length; i++) {

                    if(data.Languages.Teach) {
                        // Build user teach language list
                        for (let j = 0; j < data.Languages.Teach.length; j++) {

                            if(data.Languages.Teach[j] == languageArray[i].code) {
                                let obj = {key:null, value:''};
                                obj.key = parseInt(languageArray[i].code);
                                obj.value = languageArray[i].value;
                                if(this.form.teach == null) {
                                    this.form.teach = [];
                                    this.form.teach.push(obj);
                                } else {
                                    this.form.teach.push(obj);
                                }
                            }

                        }
                    }

                }

            }

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

            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate Teach Languages List
            let teach_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.teach = this.functionsUtil.validator(this.form.teach, teach_rules);
            if(!this.validate.teach.valid) {
                formValid = this.validate.teach.valid;
            }

            return formValid;
        }



        /**
        * changeHelpText
        * @description - change help block text (titles and descriptions) dynamically
        *  based on specific field (firstName, lastName, email, etc)
        * @use - this.changeHelpText('firstName');
        * @function
        * @return {void}
        */
        changeHelpText(type): void {
            //CONSTANTS
            const TEACH_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
            const TEACH_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
            /*****************************************************/

            switch(type) {
                case 'default':
                    this.helpText.title = this.HELP_TEXT_TITLE;
                    this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                break;

                case 'teach':
                    this.helpText.title = TEACH_TITLE;
                    this.helpText.description = TEACH_DESCRIPTION;
                break;
            }

        }



        /**
        * _addNewLanguages
        * @description - open Modal in order to add a New Languages on Box
        * @use - this._addNewLanguages();
        * @function
        * @return {void}
        */
        private _addNewLanguages(type, $event): void {
            let self = this;
            // modal default options
            let options: ng.ui.bootstrap.IModalSettings = {
                animation: false,
                backdrop: 'static',
                keyboard: false,
                templateUrl: this.dataConfig.modalLanguagesTmpl,
                controller: 'mainApp.components.modal.ModalLanguageController as vm',
                resolve: {
                    //one way to send data from this scope to modal
                    dataSetModal: function () {
                        return {
                            type: type,
                            list: self.form[type]
                        }
                    }
                }
            };

            var modalInstance = this.$uibModal.open(options);

            //When Modal closed, return the languages options list
            modalInstance.result.then(function (newLanguagesList) {
                self.form[type] = newLanguagesList;
            }, function () {
                DEBUG && console.info('Modal dismissed at: ' + new Date());
            });

            $event.preventDefault();
        }



        /**
        * _removeLanguage
        * @description - remove a language element of options array
        * @use - this._removeLanguage(3);
        * @function
        * @param {string} key - languages deselected by user
        * @param {string} type - type of languages list (native, learn, teach)
        * @return {void}
        */
        private _removeLanguage(key, type): void {
             let newArray = this.form[type].filter(function(el) {
                 return el.key !== key;
             });

             this.form[type] = newArray;
        }



        /**
        * _setDataModelFromForm
        * @description - get data from form's input in order to put it on $parent.teacherData
        * @use - this._getDataFromForm();
        * @function
        * @return {void}
        */
        private _setDataModelFromForm(): void {
            if(this.form.teach) {
                let teach = [];
                for (let i = 0; i < this.form.teach.length; i++) {
                    teach.push(this.form.teach[i].key);
                }
                this.$rootScope.profileData.Languages.Teach = teach;
            }
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Teacher Location Section to Parent Events
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
            * @description - Parent send markers teacher data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill User Profile Form',
                function(event, args: app.models.user.Profile) {
                    self._fillForm(args);
                }
            );

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.editTeacher')
        .controller(EditTeacherTeachController.controllerId,
                    EditTeacherTeachController);

}

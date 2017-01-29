/**
 * TeacherLanguageSectionController
 * @description - Teacher Location Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherLanguageSectionController {
        form: ITeacherLanguageForm;
        validate: ITeacherLanguageValidate;
        activate: () => void;
    }

    export interface ITeacherLanguageScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IParams extends ng.ui.IStateParamsService {
        id: string;
    }

    export interface ITeacherLanguageForm {
        native: Array<app.core.interfaces.IKeyValue>;
        learn: Array<app.core.interfaces.IKeyValue>;
        teach: Array<app.core.interfaces.IKeyValue>;
    }

    interface ITeacherLanguageValidate {
        native: app.core.util.functionsUtil.IValid;
        learn: app.core.util.functionsUtil.IValid;
        teach: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherLanguageSectionController implements ITeacherLanguageSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherLanguageSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherLanguageForm;
        validate: ITeacherLanguageValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        STEP2_STATE: string;
        STEP4_STATE: string;
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
            '$timeout',
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
            private $scope: ITeacherLanguageScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope,
            private $timeout,
            private $uibModal: ng.ui.bootstrap.IModalService) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;
            //CONSTANTS
            this.STEP2_STATE = 'page.createTeacherPage.location';
            this.STEP4_STATE = 'page.createTeacherPage.experience';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.description.text');
            /*********************************/

            // Update progress bar width
            this.$scope.$parent.vm.progressWidth = this.functionsUtil.progress(3, 9);

            //Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            //Init form
            //Is required use null here because en DB save: "[]"
            this.form = {
                native: [],
                learn: [],
                teach: []
            };

            // Build validate object fields
            this.validate = {
                native: {valid: true, message: ''},
                teach: {valid: true, message: ''},
                learn: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherLanguageSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            //FILL FORM FROM ROOTSCOPE TEACHER INFO
            if(this.$rootScope.teacherData) {
                this._fillForm(this.$rootScope.teacherData);
            }

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
            //CONSTANTS
            const CURRENT_STEP = 3;
            /*********************************/

            //Validate data form
            let formValid = this._validateForm();

            if(formValid) {
                this._setDataModelFromForm();
                this.$scope.$emit('Save Data', CURRENT_STEP);
                // GO TO NEXT STEP
                this.$state.go(this.STEP4_STATE, {reload: true});
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
            this.$state.go(this.STEP2_STATE, {reload: true});
        }



        /**
        * _fillForm
        * @description - Fill form with teacher data
        * @use - this._fillForm(data);
        * @function
        * @param {app.models.teacher.Teacher} data - Teacher Data
        * @return {void}
        */
        private _fillForm(data: app.models.teacher.Teacher): void {

            // Form is already filled (Just take native because it's required has a native language)
            if(this.form.native.length === 0) {

                let languageArray = this.getDataFromJson.getLanguagei18n();
                for (let i = 0; i < languageArray.length; i++) {

                    if(data.Languages.Native) {
                        // Build user native language list
                        for (let j = 0; j < data.Languages.Native.length; j++) {

                            if(data.Languages.Native[j] == languageArray[i].code) {
                                let obj = {key:null, value:''};
                                obj.key = parseInt(languageArray[i].code);
                                obj.value = languageArray[i].value;
                                if(this.form.native == null) {
                                    this.form.native = [];
                                    this.form.native.push(obj);
                                } else {
                                    this.form.native.push(obj);
                                }
                            }

                        }
                    }

                    if(data.Languages.Learn) {
                        // Build user learn language list
                        for (let j = 0; j < data.Languages.Learn.length; j++) {

                            if(data.Languages.Learn[j] == languageArray[i].code) {
                                let obj = {key:null, value:''};
                                obj.key = parseInt(languageArray[i].code);
                                obj.value = languageArray[i].value;
                                if(this.form.learn == null) {
                                    this.form.learn = [];
                                    this.form.learn.push(obj);
                                } else {
                                    this.form.learn.push(obj);
                                }
                            }

                        }
                    }

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

            //Validate Native Languages List
            let native_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.native = this.functionsUtil.validator(this.form.native, native_rules);
            if(!this.validate.native.valid) {
                formValid = this.validate.native.valid;
            }

            //Validate Learn Languages List
            let learn_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.learn = this.functionsUtil.validator(this.form.learn, learn_rules);
            if(!this.validate.learn.valid) {
                formValid = this.validate.learn.valid;
            }

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
            const NATIVE_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.native.title.text');
            const NATIVE_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.native.description.text');
            const LEARN_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.learn.title.text');
            const LEARN_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.learn.description.text');
            const TEACH_TITLE = this.$filter('translate')('%create.teacher.lang.help_text.teach.title.text');
            const TEACH_DESCRIPTION = this.$filter('translate')('%create.teacher.lang.help_text.teach.description.text');
            /*****************************************************/

            switch(type) {
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
                console.info('Modal dismissed at: ' + new Date());
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

            if(this.form.native) {
                let native = [];
                for (let i = 0; i < this.form.native.length; i++) {
                    native.push(this.form.native[i].key);
                }
                this.$rootScope.teacherData.Languages.Native = native;
            }

            if(this.form.learn) {
                let learn = [];
                for (let i = 0; i < this.form.learn.length; i++) {
                    learn.push(this.form.learn[i].key);
                }
                this.$rootScope.teacherData.Languages.Learn = learn;
            }

            if(this.form.teach) {
                let teach = [];
                for (let i = 0; i < this.form.teach.length; i++) {
                    teach.push(this.form.teach[i].key);
                }
                this.$rootScope.teacherData.Languages.Teach = teach;
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
            this.$scope.$on('Fill Form', function(event, args: app.models.teacher.Teacher) {

                self._fillForm(args);

            });

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherLanguageSectionController.controllerId,
                    TeacherLanguageSectionController);

}

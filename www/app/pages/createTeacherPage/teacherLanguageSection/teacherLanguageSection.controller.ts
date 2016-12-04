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
        error: ITeacherLanguageError;
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


    export interface ITeacherLanguageError {
        message: string;
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
        error: ITeacherLanguageError;
        STEP2_STATE: string;
        STEP4_STATE: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'dataConfig',
            'mainApp.core.util.FunctionsUtilService',
            'mainApp.core.util.GetDataStaticJsonService',
            '$state',
            '$scope',
            '$timeout',
            '$uibModal'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private $state: ng.ui.IStateService,
            private $scope: ITeacherLanguageScope,
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
            /*********************************/

            //Put title on parent scope
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(3, 9);

            //Init form
            //Is required use null here because en DB save: "[]"
            this.form = {
                native: null,
                learn: null,
                teach: null
            };

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherLanguageSectionController controller actived');

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
            //CONSTANTS
            const CURRENT_STEP = 3;
            /*********************************/

            this._setDataModelFromForm();

            this.$scope.$emit('Save Data', CURRENT_STEP);

            // GO TO NEXT STEP
            this.$state.go(this.STEP4_STATE, {reload: true});

        }


        /**
        * goToBack
        * @description - go to back step
        * @function
        * @return void
        */
        goToBack(): void {
            this._setDataModelFromForm();
            this.$scope.$emit('Save Data');
            this.$state.go(this.STEP2_STATE, {reload: true});
        }



        /**
        * _addNewLanguages
        * @description - open Modal in order to add a New Languages on Box
        * @use - this._addNewLanguages();
        * @function
        * @return {void}
        */
        private _addNewLanguages(type): void {
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

            event.preventDefault();
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

            if(this.form.native !== null) {
                let native = [];
                for (let i = 0; i < this.form.native.length; i++) {
                    native.push(this.form.native[i].key);
                }
                this.$scope.$parent.vm.teacherData.Languages.Native = native;
            }

            if(this.form.learn !== null){
                let learn = [];
                for (let i = 0; i < this.form.learn.length; i++) {
                    learn.push(this.form.learn[i].key);
                }
                this.$scope.$parent.vm.teacherData.Languages.Learn = learn;
            }

            if(this.form.teach !== null){
                let teach = [];
                for (let i = 0; i < this.form.teach.length; i++) {
                    teach.push(this.form.teach[i].key);
                }
                this.$scope.$parent.vm.teacherData.Languages.Teach = teach;
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

                let languageArray = self.getDataFromJson.getLanguagei18n();
                for (let i = 0; i < languageArray.length; i++) {
                    // Build user native language list
                    for (let j = 0; j < args.Languages.Native.length; j++) {

                        if(args.Languages.Native[j] == languageArray[i].code) {
                            let obj = {key:null, value:''};
                            obj.key = parseInt(languageArray[i].code);
                            obj.value = languageArray[i].value;
                            if(self.form.native == null) {
                                self.form.native = [];
                                self.form.native.push(obj);
                            } else {
                                self.form.native.push(obj);
                            }
                        }

                    }
                    // Build user learn language list
                    for (let j = 0; j < args.Languages.Learn.length; j++) {

                        if(args.Languages.Learn[j] == languageArray[i].code) {
                            let obj = {key:null, value:''};
                            obj.key = parseInt(languageArray[i].code);
                            obj.value = languageArray[i].value;
                            if(self.form.learn == null) {
                                self.form.learn = [];
                                self.form.learn.push(obj);
                            } else {
                                self.form.learn.push(obj);
                            }
                        }

                    }
                    // Build user teach language list
                    for (let j = 0; j < args.Languages.Teach.length; j++) {

                        if(args.Languages.Teach[j] == languageArray[i].code) {
                            let obj = {key:null, value:''};
                            obj.key = parseInt(languageArray[i].code);
                            obj.value = languageArray[i].value;
                            if(self.form.teach == null) {
                                self.form.teach = [];
                                self.form.teach.push(obj);
                            } else {
                                self.form.teach.push(obj);
                            }
                        }

                    }

                }

            });

        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherLanguageSectionController.controllerId,
                    TeacherLanguageSectionController);

}

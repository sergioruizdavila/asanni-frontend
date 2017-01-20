/**
 * ModalLanguagesController
 * @description - modal Contact controller definition, generic modal in order
 * to show add new meeting point form
 * @constructor
 * @param {ng.ui.bootstrap.IModalServiceInstance} $uibModalInstance - modal boostrap instance
 */

module components.modal.modalLanguages {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IModalLanguagesController {
        close: () => void;
        activate: () => void;
    }

    interface IModalLanguagesScope extends ng.IScope {

    }

    interface IModalLanguagesForm {
        options: Array<app.core.interfaces.IKeyValue>;
    }


    interface IModalLanguagesError {
        message: string;
    }

    interface IDataSet {
        type: string;
        list: Array<app.core.interfaces.IKeyValue>;
    }


    class ModalLanguagesController implements IModalLanguagesController {

        static controllerId = 'mainApp.components.modal.ModalLanguageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IModalLanguagesForm;
        error: IModalLanguagesError;
        checked: boolean;
        defaultConfig: any;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            '$uibModalInstance',
            'dataSetModal',
            '$timeout'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
            private dataSetModal: IDataSet,
            private $timeout: angular.ITimeoutService ) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;

            //assign respective title
            console.log('Title');

            //Init form
            this.form = {
                options: this.dataSetModal.list || []
            };

            // Build Languages Checked List
            this.$timeout(function(){
                self._buildLanguagesChecked();
            });


            this.error = {
                message: ''
            };

            this.activate();
        }

        //active function to handle all controller logic
        activate(): void {
            //LOG
            console.log('modalLanguages controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * addLanguages
        * @description - add new option to options languages array
        * @use - this.addLanguages(3);
        * @function
        * @param {key} option - languages selected by user
        * @return {void}
        */
        addLanguages(key): void {

            let check = document.getElementById('language-' + key);
            let checkClasses = check.classList;
            let checked = check.getAttribute('data-checked');
            let value = check.innerText;

            if(checked == 'true') {
                this._removeLanguage(key);
                checkClasses.remove('ma-label--box--check--active');
                check.setAttribute('data-checked', 'false');
            } else {
                let option = {
                    key: key,
                    value: value
                };
                this.form.options.push(option);
                checkClasses.add('ma-label--box--check--active');
                check.setAttribute('data-checked', 'true');
            }

        }



        /**
        * _removeLanguage
        * @description - remove a language element of options array
        * @use - this._removeLanguage(3);
        * @function
        * @param {string} key - languages deselected by user
        * @return {void}
        */
        private _removeLanguage(key): void {
            this.form.options = this.form.options.filter(function(el) {
                return el.key !== key;
            });
        }



        /**
        * _buildLanguagesChecked
        * @description - when open modal, build languages have already checked
        * before by the user
        * @use - this._buildLanguagesChecked();
        * @function
        * @return {void}
        */
        private _buildLanguagesChecked(): void {
            if(this.form.options.length > 0){
                for (let i = 0; i < this.form.options.length; i++) {
                    let language = this.form.options[i];
                    let check = document.getElementById('language-' + language.key);
                    let checkClasses = check.classList;
                    checkClasses.add('ma-label--box--check--active');
                    check.setAttribute('data-checked', 'true');
                }
            }
        }



        /**
        * _save
        * @description - when user click "Save" button, close the modal and
        * send the new languages options list
        * @use - this.save();
        * @function
        * @return {void}
        */
        private _save(): void {
            this.$uibModalInstance.close(this.form.options);
        }



        /**
        * close
        * @description - when user click "X" button, close the modal
        * @use - this.close();
        * @function
        * @return {void}
        */
        close(): void {
            this.$uibModalInstance.close();
        }


    }

    angular.module('mainApp.components.modal')
        .controller(ModalLanguagesController.controllerId,
                    ModalLanguagesController);

}

/**
* MaFooter
* @description - MainApp Footer Directive
* @example - <ma-footer></ma-footer>
*/

module components.footer {
    'use strict';

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IFooter extends angular.IDirective {

    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    class MaFooter implements IFooter {

        static directiveId = 'maFooter';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bindToController: Boolean = true;
        controller = FooterController.controllerId;
        controllerAs: string = 'vm';
        restrict: string = 'E';
        templateUrl: string = 'components/footer/footer.html';
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        //static $inject = ['dataConfig'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor() {
            console.log('maFooter directive constructor');
        }

        link($scope: angular.IScope, elm: Element, attr: angular.IAttributes): void {
            console.log('maFooter link function');
        }

        /*-- INSTANCE FUNCTION --*/
        static instance(): IFooter {
            return new MaFooter();
        }
    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.components.footer')
        .directive(MaFooter.directiveId, MaFooter.instance);


    /*********************************************************/
    /*                     CONTROLLER                        */
    /*********************************************************/
    /**
    * FooterController
    * @description - Footer Controller
    */

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface IFooterController {
        activate: () => void;
    }

    interface IFooterForm {
        language: app.core.interfaces.IKeyValue;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class FooterController implements IFooterController {

        static controllerId = 'mainApp.components.footer.FooterController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IFooterForm;
        assignFlag: string;
        // --------------------------------

        /*-- INJECT DEPENDENCIES --*/
        static $inject = [
            'mainApp.core.util.FunctionsUtilService'
        ];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService
        ) {
            this.init();
        }

        /*-- INITIALIZE METHOD --*/
        private init() {
            //VARIABLES
            let currentLanguageCode = this.functionsUtil.getCurrentLanguage() || 'en';
            let languageLabel = '%header.lang.options.'+ currentLanguageCode +'.text';
            //Init form
            this.form = {
                language: {
                    key: currentLanguageCode,
                    value: languageLabel
                }
            };

            //Init flag class
            this.assignFlag = 'ma-flag--default--flag-' + this.form.language.key;

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('footer controller actived');
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * changeLanguage
        * @description - open Modal in order to add a New Teacher's Experience on Box
        * @use - this._addEditExperience();
        * @function
        * @return {void}
        */

        changeLanguage(code): void {
            this.functionsUtil.changeLanguage(code);
            this.form.language.key = code;
            this.form.language.value = '%header.lang.options.' + code + '.text';
            this.assignFlag = 'ma-flag--default--flag-' + code;
        }


    }

    /*-- MODULE DEFINITION --*/
    angular.module('mainApp.components.footer')
        .controller(FooterController.controllerId, FooterController);

}

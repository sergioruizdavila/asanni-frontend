/**
 * Specifies the Interfaces throughout App
 */

module app.core.interfaces {

    /*******************************/
    /*     ROOTSCOPE INTERFACE     */
    /*******************************/
    export interface IMainAppRootScope extends angular.IRootScopeService {
        teacher_id: string;
        language_doc: angular.translate.ITranslateProvider;
        activeHeader: boolean;
        activeFooter: boolean;
    }

    /*******************************/
    /*   USER DATA AUTH INTERFACE  */
    /*******************************/
    export interface IUserDataAuth {
        username: string;
        email: string;
        password: string;
    }

    /*******************************/
    /*   DATE SPLITTED INTERFACE  */
    /*******************************/
    export interface IDateSplitted {
        day: string;
        month: string;
        year: string;
    }

    /********************************************/
    /*    DATA OBJECT OBTAINED FROM I18N JSON   */
    /********************************************/
    export interface IDataFromJsonI18n {
        value: string;
        code: string;
    }

    /********************************************/
    /*      KEY - VALUE OBJECT INTERFACE        */
    /********************************************/
    export interface IKeyValue {
        key: any;
        value: any;
    }

    /****************************************/
    /*    SELECT LIST ELEMENT INTERFACES    */
    /****************************************/
    export interface ISelectListElement {
        value: any;
    }

    /*******************************************/
    /*    HELP TEXT OF EACH STEP INTERFACES    */
    /*******************************************/
    export interface IHelpTextStep {
        title: string;
        description: string;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IStateParamsData extends ng.ui.IStateParamsService {
        type?: string;
    }

    /////////////////////////////////


    /********************************/
    /*      POPUPS INTERFACES       */
    /********************************/
    export interface IPopup {
        subtitle?: string;
        textsList?: Array<string>;
    }

}

/**
 * Specifies the Interfaces throughout App
 */

module app.core.interfaces {

    /*******************************/
    /*     ROOTSCOPE INTERFACE     */
    /*******************************/
    export interface IMainAppRootScope extends angular.IRootScopeService {
        userData: IUserData;
        profileData: app.models.user.Profile;
        teacher_id: string;
        teacherData: app.models.teacher.Teacher;
        language_doc: angular.translate.ITranslateProvider;
        activeHeader: boolean;
        activeFooter: boolean;
        activeMessageBar: boolean;
    }

    /***********************************/
    /*         USER DATA MODEL         */
    /***********************************/
    export interface IUserData {
        id: string;
        username: string;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        groups: Array<string>;
    }

    //TODO: Remover cuando ya no sea necesario
    /***********************************/
    /*   EARLY ADOPTER DATA INTERFACE  */
    /***********************************/
    export interface IEarlyAdopterData {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        comment: string;
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

    /************************************/
    /*    TOOLTIP OPTIONS INTERFACES    */
    /************************************/
    export interface ITooltipOptions extends ng.ui.bootstrap.ITooltipOptions {
        class: string;
    }

    /************************************/
    /*  SIGNUP AND LOGIN DATASET MODAL  */
    /************************************/
    export interface IDataSet {
        hasNextStep: boolean;
    }


    /////////////////////////////////


    /********************************/
    /*      POPUPS INTERFACES       */
    /********************************/
    export interface IPopup {
        subtitle?: string;
        textsList?: Array<string>;
    }


    /********************************/
    /*    BIRTHDATE VALIDATE FORM   */
    /********************************/
    export interface IBirthdateValidate {
        day: app.core.util.functionsUtil.IValid,
        month: app.core.util.functionsUtil.IValid,
        year: app.core.util.functionsUtil.IValid,
        valid: boolean,
        message: string
    }

}



/******************************************************************************/


/**
 * Nowday there is not a angular-oauth2 definition, here is a basic
 * created by cskiwi on gitHub
 * @reference https://github.com/oauthjs/angular-oauth2/issues/91
 */

declare namespace angular.oauth2 {
    /*
     * IOAuth
     */

     interface IOAuthConfig {
        baseUrl: string;
        clientId: string;
        clientSecret?: string;
        grantPath?: string;
        revokePath?: string;
    }
    interface IOAuthProvider {
        configure(params: IOAuthConfig): IOAuthConfig;
    }

    interface IData {
        username: string;
        password: string;
    }

    interface IOAuth {
        isAuthenticated(): boolean;
        getAccessToken(data: IData, options?: any): angular.IPromise<string>;
        getRefreshToken(data?: IData, options?: any): angular.IPromise<string>;
        revokeToken(data?: IData, options?: any): angular.IPromise<string>;
    }

    /*
     * IOAuthToken
     */
    interface IOAuthTokenConfig {
        name: string;
        options: IOAuthTokenOptions;
    }

    interface IOAuthTokenOptions {
        secure: boolean;
    }

    interface IOAuthTokenProvider {
        configure(params: IOAuthTokenConfig): IOAuthTokenConfig;
    }
}

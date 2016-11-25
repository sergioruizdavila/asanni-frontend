/**
 * Specifies the Interfaces throughout App
 */

module app.core.interfaces {

    /*******************************/
    /*     ROOTSCOPE INTERFACE     */
    /*******************************/
    export interface IMainAppRootScope extends angular.IRootScopeService {
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
    /*   DATE FORMATTED INTERFACE  */
    /*******************************/
    export interface IDateFormatted {
        complete: string;
        day: string;
        month: string;
        year: string;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/


    /////////////////////////////////


    /********************************/
    /*      POPUPS INTERFACES       */
    /********************************/
    export interface IPopup {
        subtitle?: string;
        textsList?: Array<string>;
    }

}

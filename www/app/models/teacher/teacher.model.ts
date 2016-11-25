/**
 * Specifies the Classes and Interfaces related to Teachers in our Model
 */

module app.models.teacher {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Teacher extends app.models.user.User {

        /*-- PROPERTIES --*/


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Teacher Model instanced');

            //init properties
            super(obj);

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/


    }

}

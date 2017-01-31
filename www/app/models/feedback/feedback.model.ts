/**
 * Specifies the Classes and Interfaces related to Feedback in our Model
 */

module app.models.feedback {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/



    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Feedback {

        /*-- PROPERTIES --*/
        private id: string;
        private uid: string;
        private nextCountry: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Feedback Model instanced');

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.nextCountry = obj.nextCountry || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply next country uid'; }
            this.uid = uid;
        }

        get NextCountry() {
            return this.nextCountry;
        }

        set NextCountry(nextCountry: string) {
            if (nextCountry === undefined) { throw 'Please supply next country'; }
            this.nextCountry = nextCountry;
        }

    }

}

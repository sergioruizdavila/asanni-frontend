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
        private nextCountry: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Student Model instanced');

            //init properties
            this.id = obj.id;
            this.nextCountry = obj.nextCountry || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
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

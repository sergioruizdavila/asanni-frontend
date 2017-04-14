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
        private nextFeature: number;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Feedback Model instanced');

            //init properties
            this.id = obj.id;
            this.nextCountry = obj.nextCountry || '';
            this.nextFeature = obj.nextFeature || 0;

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

        get NextFeature() {
            return this.nextFeature;
        }

        set NextFeature(nextFeature: number) {
            if (nextFeature === undefined) { throw 'Please supply next feature'; }
            this.nextFeature = nextFeature;
        }

    }

}

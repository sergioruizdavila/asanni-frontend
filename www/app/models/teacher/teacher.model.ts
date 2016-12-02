/**
 * Specifies the Classes and Interfaces related to Teachers in our Model
 */

module app.models.teacher {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/


    /************************************************/
    /*           TEACHER CLASS DEFINITION           */
    /************************************************/

    export class Teacher extends app.models.user.User {

        /*-- PROPERTIES --*/
        private languages: Language;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Teacher Model instanced');

            //init properties
            super(obj);
            this.languages = new Language(obj.languages);
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Languages() {
            return this.languages;
        }

        set Languages(languages: Language) {
            if (languages === undefined) { throw 'Please supply languages'; }
            this.languages = languages;
        }

    }


    /************************************************/
    /*          LANGUAGE CLASS DEFINITION           */
    /************************************************/

    export class Language {

        /*-- PROPERTIES --*/
        private id: number;
        private native: Array<string>;
        private learn: Array<string>;
        private teach: Array<string>;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Languages Model instanced');

            //init properties
            this.id = obj.id;
            this.native = obj.native || [];
            this.learn = obj.learn || [];
            this.teach = obj.teach || [];

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id'; }
            this.id = id;
        }

        get Native() {
            return this.native;
        }

        set Native(native: Array<string>) {
            if (native === undefined) { throw 'Please supply native languages'; }
            this.native = native;
        }

        get Learn() {
            return this.learn;
        }

        set Learn(learn: Array<string>) {
            if (learn === undefined) { throw 'Please supply learn languages'; }
            this.learn = learn;
        }

        get Teach() {
            return this.teach;
        }

        set Teach(teach: Array<string>) {
            if (teach === undefined) { throw 'Please supply teach languages'; }
            this.teach = teach;
        }



    }

}

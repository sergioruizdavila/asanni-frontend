/**
 * Specifies the Classes and Interfaces related to Country in our Model
 */

module app.models.country {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/



    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Country {

        /*-- PROPERTIES --*/
        private id: number;
        private nameEn: string;
        private nameEs: string;
        private aliasCountry: string;
        private code: string;
        private photo: string;
        private thumbnail: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Country Model instanced');

            //init properties
            this.id = obj.id;
            this.nameEn = obj.nameEn || '';
            this.nameEs = obj.nameEs || '';
            this.aliasCountry = obj.aliasCountry || '';
            this.code = obj.code || '';
            this.photo = obj.photo || '';
            this.thumbnail = obj.thumbnail || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        get NameEn() {
            return this.nameEn;
        }

        set NameEn(nameEn: string) {
            if (nameEn === undefined) { throw 'Please supply country EN value'; }
            this.nameEn = nameEn;
        }

        get NameEs() {
            return this.nameEs;
        }

        set NameEs(nameEs: string) {
            if (nameEs === undefined) { throw 'Please supply name ES value'; }
            this.nameEs = nameEs;
        }

        get AliasCountry() {
            return this.aliasCountry;
        }

        set AliasCountry(aliasCountry: string) {
            if (aliasCountry === undefined) { throw 'Please supply Country Alias value'; }
            this.aliasCountry = aliasCountry;
        }

        get Code() {
            return this.code;
        }

        set Code(code: string) {
            if (code === undefined) { throw 'Please supply country code value'; }
            this.code = code;
        }

        get Photo() {
            return this.photo;
        }

        set Photo(photo: string) {
            if (photo === undefined) { throw 'Please supply country photo value'; }
            this.photo = photo;
        }

        get Thumbnail() {
            return this.thumbnail;
        }

        set Thumbnail(thumbnail: string) {
            if (thumbnail === undefined) { throw 'Please supply country thumbnail value'; }
            this.thumbnail = thumbnail;
        }

    }

}

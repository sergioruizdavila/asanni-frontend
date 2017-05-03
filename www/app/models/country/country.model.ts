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
        private aliasCountry: string;
        private nameEn: string;
        private nameEs: string;
        private descriptionEn: string;
        private descriptionEs: string;
        private recommend: number;
        private code: string;
        private currencyCode: string;
        private currencyName: string;
        private capital: string;
        private zone: string;
        private photo: string;
        private thumbnail: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            DEBUG && console.log('Country Model instanced');

            //init properties
            this.id = obj.id;
            this.aliasCountry = obj.aliasCountry || '';
            this.nameEn = obj.nameEn || '';
            this.nameEs = obj.nameEs || '';
            this.descriptionEn = obj.descriptionEn || '';
            this.descriptionEs = obj.descriptionEs || '';
            this.recommend = obj.recommend || 0;
            this.code = obj.code || '';
            this.currencyCode = obj.currencyCode || '';
            this.currencyName = obj.currencyName || '';
            this.capital = obj.capital || '';
            this.zone = obj.zone || '';
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

        get DescriptionEn() {
            return this.descriptionEn;
        }

        set DescriptionEn(descriptionEn: string) {
            if (descriptionEn === undefined) { throw 'Please supply country description EN value'; }
            this.descriptionEn = descriptionEn;
        }

        get DescriptionEs() {
            return this.descriptionEs;
        }

        set DescriptionEs(descriptionEs: string) {
            if (descriptionEs === undefined) { throw 'Please supply country description ES value'; }
            this.descriptionEs = descriptionEs;
        }

        get Recommend() {
            return this.recommend;
        }

        set Recommend(recommend: number) {
            if (recommend === undefined) { throw 'Please supply country recommend value'; }
            this.recommend = recommend;
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

        get CurrencyCode() {
            return this.currencyCode;
        }

        set CurrencyCode(currencyCode: string) {
            if (currencyCode === undefined) { throw 'Please supply country currency code value'; }
            this.currencyCode = currencyCode;
        }

        get CurrencyName() {
            return this.currencyName;
        }

        set CurrencyName(currencyName: string) {
            if (currencyName === undefined) { throw 'Please supply country currency name value'; }
            this.currencyName = currencyName;
        }

        get Capital() {
            return this.capital;
        }

        set Capital(capital: string) {
            if (capital === undefined) { throw 'Please supply country capital name value'; }
            this.capital = capital;
        }

        get Zone() {
            return this.zone;
        }

        set Zone(zone: string) {
            if (zone === undefined) { throw 'Please supply country zone code value'; }
            this.zone = zone;
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

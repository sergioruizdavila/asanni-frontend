/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models.user {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/
    export interface IBirthDate {
        year: string;
        month: string;
        day: string;
    }

    export interface IBorn {
        city: string;
        state: string;
        country: string;
    }

    export interface ILocation {
        address: string;
        position: components.map.IPosition;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class User {

        /*-- PROPERTIES --*/
        private id: string;
        private avatar: string;
        private username: string;
        private email: string;
        private phone_number: string;
        private first_name: string;
        private last_name: string;
        private sex: string;
        private birth_date: IBirthDate;
        private born: IBorn;
        //private live_in: string;
        private about: string;
        private location: ILocation;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('User Model instanced');

            //init properties
            this.id = obj.id;
            this.avatar = obj.avatar;
            this.username = obj.username || '';
            this.email = obj.email || '';
            this.phone_number = obj.phone_number || '';
            this.first_name = obj.first_name || '';
            this.last_name = obj.last_name || '';
            this.sex = obj.sex || '';
            this.birth_date = obj.birth_date || '';
            this.born = obj.born || '';
            //this.live_in = obj.live_in || '';
            this.about = obj.about || '';
            this.location = obj.location || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: string) {
            if (id === undefined) { throw 'Please supply id'; }
            this.id = id;
        }

        get Avatar() {
            return this.avatar;
        }

        set Avatar(avatar: string) {
            if (avatar === undefined) { throw 'Please supply avatar'; }
            this.avatar = avatar;
        }

        get Username() {
            return this.username;
        }

        set Username(username: string) {
            if (username === undefined) { throw 'Please supply username'; }
            this.username = username;
        }

        get Email() {
            return this.email;
        }

        set Email(email: string) {
            if (email === undefined) { throw 'Please supply email'; }
            this.email = email;
        }

        get PhoneNumber() {
            return this.phone_number;
        }

        set PhoneNumber(phone_number: string) {
            if (phone_number === undefined) { throw 'Please supply phone number'; }
            this.phone_number = phone_number;
        }

        get First_name() {
            return this.first_name;
        }

        set First_name(first_name: string) {
            if (first_name === undefined) { throw 'Please supply first name'; }
            this.first_name = first_name;
        }

        get Last_name() {
            return this.last_name;
        }

        set Last_name(last_name: string) {
            if (last_name === undefined) { throw 'Please supply last name'; }
            this.last_name = last_name;
        }

        get Sex() {
            return this.sex;
        }

        set Sex(sex: string) {
            if (sex === undefined) { throw 'Please supply sex'; }
            this.sex = sex;
        }

        get Birth_date() {
            return this.birth_date;
        }

        set Birth_date(birth_date: IBirthDate) {
            if (birth_date === undefined) { throw 'Please supply sex'; }
            this.birth_date = birth_date;
        }

        get Born() {
            return this.born;
        }

        set Born(born: IBorn) {
            if (born === undefined) { throw 'Please supply born'; }
            this.born = born;
        }

        /*get Live_in() {
            return this.live_in;
        }

        set Live_in(live_in: string) {
            if (live_in === undefined) { throw 'Please supply live in'; }
            this.live_in = live_in;
        }*/

        get About() {
            return this.about;
        }

        set About(about: string) {
            if (about === undefined) { throw 'Please supply about'; }
            this.about = about;
        }

        get Location() {
            return this.location;
        }

        set Location(location: ILocation) {
            if (location === undefined) { throw 'Please supply location'; }
            this.location = location;
        }

    }

}

/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models.user {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/
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
        private phoneNumber: string;
        private firstName: string;
        private lastName: string;
        private sex: string;
        private birthDate: string;
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
            this.phoneNumber = obj.phoneNumber || '';
            this.firstName = obj.firstName || '';
            this.lastName = obj.lastName || '';
            this.sex = obj.sex || '';
            this.birthDate = obj.birthDate || '';
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
            return this.phoneNumber;
        }

        set PhoneNumber(phoneNumber: string) {
            if (phoneNumber === undefined) { throw 'Please supply phone number'; }
            this.phoneNumber = phoneNumber;
        }

        get FirstName() {
            return this.firstName;
        }

        set FirstName(firstName: string) {
            if (firstName === undefined) { throw 'Please supply first name'; }
            this.firstName = firstName;
        }

        get LastName() {
            return this.lastName;
        }

        set LastName(lastName: string) {
            if (lastName === undefined) { throw 'Please supply last name'; }
            this.lastName = lastName;
        }

        get Sex() {
            return this.sex;
        }

        set Sex(sex: string) {
            if (sex === undefined) { throw 'Please supply sex'; }
            this.sex = sex;
        }

        get BirthDate() {
            return this.birthDate;
        }

        set BirthDate(birthDate: string) {
            if (birthDate === undefined) { throw 'Please supply birth date'; }
            this.birthDate = birthDate;
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

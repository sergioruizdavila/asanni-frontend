/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models.user {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/
    export interface ILocation {
        address: string;
        position: components.map.IPosition;
        city: string;
        state: string;
        country: string;
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
        private born: string;
        private about: string;
        private countryLocation: string;
        private addressLocation: string;
        private cityLocation: string;
        private stateLocation: string;
        private zipCodeLocation: string;

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
            this.countryLocation = obj.countryLocation || '';
            this.addressLocation = obj.addressLocation || '';
            this.cityLocation = obj.cityLocation || '';
            this.stateLocation = obj.stateLocation || '';
            this.zipCodeLocation = obj.zipCodeLocation || '';

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

        set Born(born: string) {
            if (born === undefined) { throw 'Please supply born'; }
            this.born = born;
        }

        get About() {
            return this.about;
        }

        set About(about: string) {
            if (about === undefined) { throw 'Please supply about'; }
            this.about = about;
        }

        get CountryLocation() {
            return this.addressLocation;
        }

        set CountryLocation(countryLocation: string) {
            if (countryLocation === undefined) { throw 'Please supply country location'; }
            this.countryLocation = countryLocation;
        }

        get AddressLocation() {
            return this.addressLocation;
        }

        set AddressLocation(addressLocation: string) {
            if (addressLocation === undefined) { throw 'Please supply address location'; }
            this.addressLocation = addressLocation;
        }

        get CityLocation() {
            return this.cityLocation;
        }

        set CityLocation(cityLocation: string) {
            if (cityLocation === undefined) { throw 'Please supply city location'; }
            this.cityLocation = cityLocation;
        }

        get StateLocation() {
            return this.stateLocation;
        }

        set StateLocation(stateLocation: string) {
            if (stateLocation === undefined) { throw 'Please supply state location'; }
            this.stateLocation = stateLocation;
        }

        get ZipCodeLocation() {
            return this.zipCodeLocation;
        }

        set ZipCodeLocation(zipCodeLocation: string) {
            if (zipCodeLocation === undefined) { throw 'Please supply zip code location'; }
            this.zipCodeLocation = zipCodeLocation;
        }

    }

}

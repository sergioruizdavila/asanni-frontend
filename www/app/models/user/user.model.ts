/**
 * Specifies the Classes and Interfaces related to Users in our Model
 */

module app.models.user {

    /****************************************/
    /*        ENUM STATUS DEFINITION        */
    /****************************************/
    export const enum Status {
        new,
        validated,
        verified
    }

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/
    export interface ILocation {
        address: string;
        position: Position;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    }


    /****************************************/
    /*          USER CLASS DEFINITION       */
    /****************************************/

    export class User {

        /*-- PROPERTIES --*/
        private id: string;
        private uid: string;
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
        private location: Location;
        private status: string;
        private createdAt: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('User Model instanced');

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.avatar = obj.avatar;
            this.username = obj.username || '';
            this.email = obj.email || '';
            this.phoneNumber = obj.phoneNumber || '';
            this.firstName = obj.firstName || '';
            this.lastName = obj.lastName || '';
            this.sex = obj.sex || '';
            this.birthDate = obj.birthDate || '';
            this.born = obj.born || '';
            this.about = obj.about || '';
            this.location = new Location(obj.location);
            this.status = obj.status || 'NW';
            this.createdAt = obj.createdAt || '';

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

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply user uid'; }
            this.uid = uid;
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
            if (about === undefined) { throw 'Please supply location'; }
            this.about = about;
        }

        get Location() {
            return this.location;
        }

        set Location(location: Location) {
            if (location === undefined) { throw 'Please supply location'; }
            this.location = location;
        }

        get Status() {
            return this.status;
        }

        set Status(status: string) {
            if (status === undefined) { throw 'Please supply status value'; }
            this.status = status;
        }

        get CreatedAt() {
            return this.createdAt;
        }

    }



    /****************************************/
    /*       LOCATION CLASS DEFINITION      */
    /****************************************/

    export class Location {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private country: string;
        private address: string;
        private position: Position;
        private city: string;
        private state: string;
        private zipCode: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('User Model instanced');

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.country = obj.country || '';
            this.address = obj.address || '';
            this.position = new Position(obj.position);
            this.city = obj.city || '';
            this.state = obj.state || '';
            this.zipCode = obj.zipCode || '';

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

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply location uid'; }
            this.uid = uid;
        }

        get Country() {
            return this.country;
        }

        set Country(country: string) {
            if (country === undefined) { throw 'Please supply country location'; }
            this.country = country;
        }

        get Address() {
            return this.address;
        }

        set Address(address: string) {
            if (address === undefined) { throw 'Please supply address location'; }
            this.address = address;
        }

        get Position() {
            return this.position;
        }

        set Position(position: Position) {
            if (position === undefined) { throw 'Please supply address location'; }
            this.position = position;
        }

        get City() {
            return this.city;
        }

        set City(city: string) {
            if (city === undefined) { throw 'Please supply city location'; }
            this.city = city;
        }

        get State() {
            return this.state;
        }

        set State(state: string) {
            if (state === undefined) { throw 'Please supply state location'; }
            this.state = state;
        }

        get ZipCode() {
            return this.zipCode;
        }

        set ZipCode(zipCode: string) {
            if (zipCode === undefined) { throw 'Please supply zip code location'; }
            this.zipCode = zipCode;
        }

    }



    /****************************************/
    /*       POSITION CLASS DEFINITION      */
    /****************************************/

    export class Position {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private lng: string;
        private lat: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('User Model instanced');

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.lng = obj.lng || '';
            this.lat = obj.lat || '';

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

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply position uid'; }
            this.uid = uid;
        }

        get Lng() {
            return this.lng;
        }

        set Lng(lng: string) {
            if (lng === undefined) { throw 'Please supply lng position'; }
            this.lng = lng;
        }

        get Lat() {
            return this.lat;
        }

        set Lat(lat: string) {
            if (lat === undefined) { throw 'Please supply lat position'; }
            this.lat = lat;
        }

    }


}

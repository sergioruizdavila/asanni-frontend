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

    export class Profile {

        /*-- PROPERTIES --*/
        private userId: string;
        private avatar: string;
        private username: string;
        private email: string;
        private phoneNumber: string;
        private firstName: string;
        private lastName: string;
        private gender: string;
        private birthDate: string;
        private bornCountry: string;
        private bornCity: string;
        private about: string;
        private languages: Language;
        private location: Location;
        private isTeacher: boolean;
        private dateJoined: string;
        private createdAt: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            DEBUG && console.log('Profile Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.userId = obj.userId || '';
            this.avatar = obj.avatar || '';
            this.username = obj.username || '';
            this.email = obj.email || '';
            this.phoneNumber = obj.phoneNumber || '';
            this.firstName = obj.firstName || '';
            this.lastName = obj.lastName || '';
            this.gender = obj.gender || '';
            this.birthDate = obj.birthDate || null;
            this.bornCountry = obj.bornCountry || '';
            this.bornCity = obj.bornCity || '';
            this.about = obj.about || '';
            this.languages = new Language(obj.languages);
            this.location = new Location(obj.location);
            this.isTeacher = obj.isTeacher || false;
            this.dateJoined = obj.dateJoined || '';
            this.createdAt = obj.createdAt || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get UserId() {
            return this.userId;
        }

        set UserId(userId: string) {
            if (userId === undefined) { throw 'Please supply profile userId'; }
            this.userId = userId;
        }

        get Avatar() {
            return this.avatar;
        }

        set Avatar(avatar: string) {
            if (avatar === undefined) { throw 'Please supply profile avatar'; }
            this.avatar = avatar;
        }

        get Username() {
            return this.username;
        }

        get Email() {
            return this.email;
        }

        set Email(email: string) {
            if (email === undefined) { throw 'Please supply profile email'; }
            this.email = email;
        }

        get PhoneNumber() {
            return this.phoneNumber;
        }

        set PhoneNumber(phoneNumber: string) {
            if (phoneNumber === undefined) { throw 'Please supply profile phone number'; }
            this.phoneNumber = phoneNumber;
        }

        get FirstName() {
            return this.firstName;
        }

        set FirstName(firstName: string) {
            if (firstName === undefined) { throw 'Please supply profile first name'; }
            this.firstName = firstName;
        }

        get LastName() {
            return this.lastName;
        }

        set LastName(lastName: string) {
            if (lastName === undefined) { throw 'Please supply profile last name'; }
            this.lastName = lastName;
        }

        get Gender() {
            return this.gender;
        }

        set Gender(gender: string) {
            if (gender === undefined) { throw 'Please supply profile gender'; }
            this.gender = gender;
        }

        get BirthDate() {
            return this.birthDate;
        }

        set BirthDate(birthDate: string) {
            if (birthDate === undefined) { throw 'Please supply profile birth date'; }
            this.birthDate = birthDate;
        }

        get BornCountry() {
            return this.bornCountry;
        }

        set BornCountry(bornCountry: string) {
            if (bornCountry === undefined) { throw 'Please supply profile born country'; }
            this.bornCountry = bornCountry;
        }

        get BornCity() {
            return this.bornCity;
        }

        set BornCity(bornCity: string) {
            if (bornCity === undefined) { throw 'Please supply profile born city'; }
            this.bornCity = bornCity;
        }

        get Languages() {
            return this.languages;
        }

        set Languages(languages: Language) {
            if (languages === undefined) { throw 'Please supply profile languages'; }
            this.languages = languages;
        }

        get Location() {
            return this.location;
        }

        set Location(location: app.models.user.Location) {
            if (location === undefined) { throw 'Please supply profile location'; }
            this.location = location;
        }

        get About() {
            return this.about;
        }

        set About(about: string) {
            if (about === undefined) { throw 'Please supply profile location'; }
            this.about = about;
        }

        get IsTeacher() {
            return this.isTeacher;
        }

        set IsTeacher(isTeacher: boolean) {
            if (isTeacher === undefined) { throw 'Please supply profile IsTeacher value'; }
            this.isTeacher = isTeacher;
        }

        get DateJoined() {
            return this.dateJoined;
        }

        get CreatedAt() {
            return this.createdAt;
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

            if(obj === null) obj = {};

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
            DEBUG && console.log('Location Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id || '';
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
            DEBUG && console.log('Position Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id || '';
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

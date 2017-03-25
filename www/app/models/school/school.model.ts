/**
 * Specifies the Classes and Interfaces related to School in our Model
 */

module app.models.school {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class School {

        /*-- PROPERTIES --*/
        private id: number;
        private user: string;
        private photo: string;
        private name: string;
        private email: string;
        private about: string;
        private website: string;
        private phoneNumber: string;
        private facebook: string;
        private twitter: string;
        private instagram: string;
        private meetupGroup: string;
        private facebookGroup: string;
        private location: app.models.user.Location;
        private languageTeach: Array<string>;
        private immersion: Immersion;
        private languageExchange: boolean;
        private workExchange: WorkExchange;
        private volunteering: Volunteering;
        private tour: Tour;
        private atmosphere: number;
        private amenities: Amenities;
        private accommodation: Accommodation;
        private classesBegin: Array<string>;
        private price: Price;
        private discount: Discount;
        private package: Package;
        private paymentMethod: PaymentMethod;
        private bookingFee: BookingFee;
        private active: boolean;
        private createdAt: string;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            DEBUG && console.log('School Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.user = obj.user || '';
            this.photo = obj.photo || '';
            this.name = obj.name || '';
            this.email = obj.email || '';
            this.about = obj.about || '';
            this.website = obj.website || '';
            this.phoneNumber = obj.phoneNumber || '';
            this.facebook = obj.facebook || '';
            this.twitter = obj.twitter || '';
            this.instagram = obj.instagram || '';
            this.meetupGroup = obj.meetupGroup || '';
            this.facebookGroup = obj.facebookGroup || '';
            this.location = new app.models.user.Location(obj.location);
            this.languageTeach = obj.languageTeach || [];
            this.immersion = new Immersion(obj.immersion);
            this.languageExchange = obj.languageExchange || false;
            this.workExchange = new WorkExchange(obj.workExchange);
            this.volunteering = new Volunteering(obj.volunteering);
            this.tour = new Tour(obj.tour);
            this.atmosphere = obj.atmosphere || 0;
            this.amenities = new Amenities(obj.amenities);
            this.accommodation = new Accommodation(obj.accommodation);
            this.classesBegin = obj.classesBegin || [];
            this.price = new Price(obj.price);
            this.discount = new Discount(obj.discount);
            this.package = new Package(obj.package);
            this.paymentMethod = new PaymentMethod(obj.paymentMethod);
            this.bookingFee = new BookingFee(obj.bookingFee);
            this.active = obj.active || false;
            this.createdAt = obj.createdAt || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        get User() {
            return this.user;
        }

        set User(user: string) {
            if (user === undefined) { throw 'Please supply school user id manager'; }
            this.user = user;
        }

        get Photo() {
            return this.photo;
        }

        set Photo(photo: string) {
            if (photo === undefined) { throw 'Please supply school photo'; }
            this.photo = photo;
        }

        get Name() {
            return this.name;
        }

        set Name(name: string) {
            if (name === undefined) { throw 'Please supply school name'; }
            this.name = name;
        }

        get Email() {
            return this.email;
        }

        set Email(email: string) {
            if (email === undefined) { throw 'Please supply profile email'; }
            this.email = email;
        }

        get About() {
            return this.about;
        }

        set About(about: string) {
            if (about === undefined) { throw 'Please supply school about'; }
            this.about = about;
        }

        get Website() {
            return this.website;
        }

        set Website(website: string) {
            if (website === undefined) { throw 'Please supply school website'; }
            this.website = website;
        }

        get PhoneNumber() {
            return this.phoneNumber;
        }

        set PhoneNumber(phoneNumber: string) {
            if (phoneNumber === undefined) { throw 'Please supply school phoneNumber'; }
            this.phoneNumber = phoneNumber;
        }

        get Facebook() {
            return this.facebook;
        }

        set Facebook(facebook: string) {
            if (facebook === undefined) { throw 'Please supply school facebook'; }
            this.facebook = facebook;
        }

        get Twitter() {
            return this.twitter;
        }

        set Twitter(twitter: string) {
            if (twitter === undefined) { throw 'Please supply school twitter'; }
            this.twitter = twitter;
        }

        get Instagram() {
            return this.instagram;
        }

        set Instagram(instagram: string) {
            if (instagram === undefined) { throw 'Please supply school instagram'; }
            this.instagram = instagram;
        }

        get MeetupGroup() {
            return this.meetupGroup;
        }

        set MeetupGroup(meetupGroup: string) {
            if (meetupGroup === undefined) { throw 'Please supply school meetupGroup'; }
            this.meetupGroup = meetupGroup;
        }

        get FacebookGroup() {
            return this.facebookGroup;
        }

        set FacebookGroup(facebookGroup: string) {
            if (facebookGroup === undefined) { throw 'Please supply school facebookGroup'; }
            this.facebookGroup = facebookGroup;
        }

        get LanguageTeach() {
            return this.languageTeach;
        }

        set LanguageTeach(languageTeach: Array<string>) {
            if (languageTeach === undefined) { throw 'Please supply school language teach'; }
            this.languageTeach = languageTeach;
        }

        get Immersion() {
            return this.immersion;
        }

        set Immersion(immersion: Immersion) {
            if (immersion === undefined) { throw 'Please supply school immersion'; }
            this.immersion = immersion;
        }

        get LanguageExchange() {
            return this.languageExchange;
        }

        set LanguageExchange(languageExchange: boolean) {
            if (languageExchange === undefined) { throw 'Please supply school language exchange'; }
            this.languageExchange = languageExchange;
        }

        get WorkExchange() {
            return this.workExchange;
        }

        set WorkExchange(workExchange: WorkExchange) {
            if (workExchange === undefined) { throw 'Please supply school work exchange'; }
            this.workExchange = workExchange;
        }

        get Volunteering() {
            return this.volunteering;
        }

        set Volunteering(volunteering: Volunteering) {
            if (volunteering === undefined) { throw 'Please supply school volunteering'; }
            this.volunteering = volunteering;
        }

        get Tour() {
            return this.tour;
        }

        set Tour(tour: Tour) {
            if (tour === undefined) { throw 'Please supply school tour'; }
            this.tour = tour;
        }

        get Atmosphere() {
            return this.atmosphere;
        }

        set Atmosphere(atmosphere: number) {
            if (atmosphere === undefined) { throw 'Please supply school atmosphere'; }
            this.atmosphere = atmosphere;
        }

        get Amenities() {
            return this.amenities;
        }

        set Amenities(amenities: Amenities) {
            if (amenities === undefined) { throw 'Please supply school amenities'; }
            this.amenities = amenities;
        }

        get Accommodation() {
            return this.accommodation;
        }

        set Accommodation(accommodation: Accommodation) {
            if (accommodation === undefined) { throw 'Please supply school accommodation'; }
            this.accommodation = accommodation;
        }

        get ClassesBegin() {
            return this.classesBegin;
        }

        set ClassesBegin(classesBegin: Array<string>) {
            if (classesBegin === undefined) { throw 'Please supply school classes begin'; }
            this.classesBegin = classesBegin;
        }

        get Price() {
            return this.price;
        }

        set Price(price: Price) {
            if (price === undefined) { throw 'Please supply school price'; }
            this.price = price;
        }

        get Discount() {
            return this.discount;
        }

        set Discount(discount: Discount) {
            if (discount === undefined) { throw 'Please supply school discount'; }
            this.discount = discount;
        }

        get Package() {
            return this.package;
        }

        set Package(value: Package) {
            if (value === undefined) { throw 'Please supply school package'; }
            this.package = value;
        }

        get PaymentMethod() {
            return this.paymentMethod;
        }

        set PaymentMethod(paymentMethod: PaymentMethod) {
            if (paymentMethod === undefined) { throw 'Please supply school payment methods'; }
            this.paymentMethod = paymentMethod;
        }

        get BookingFee() {
            return this.bookingFee;
        }

        set BookingFee(bookingFee: BookingFee) {
            if (bookingFee === undefined) { throw 'Please supply school booking fee'; }
            this.bookingFee = bookingFee;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of school'; }
            this.active = active;
        }

        get CreatedAt() {
            return this.createdAt;
        }

    }


    /*********************************************************/
    /*           SCHOOL IMMERSION CLASS DEFINITION           */
    /*********************************************************/
    export class Immersion {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private option: Array<string>;
        private otherOption: string;
        private rating: string;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Immersion Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.option = obj.option || [];
            this.otherOption = obj.otherOption || '';
            this.rating = obj.rating || 0;
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of school'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of school'; }
            this.active = active;
        }

        get Option() {
            return this.option;
        }

        set Option(option: Array<string>) {
            if (option === undefined) { throw 'Please supply option value of school'; }
            this.option = option;
        }

        get OtherOption() {
            return this.otherOption;
        }

        set OtherOption(otherOption: string) {
            if (otherOption === undefined) { throw 'Please supply other option value of school'; }
            this.otherOption = otherOption;
        }

        get Rating() {
            return this.rating;
        }

        set Rating(rating: string) {
            if (rating === undefined) { throw 'Please supply rating immersion value of school'; }
            this.rating = rating;
        }

    }


    /*********************************************************/
    /*            SCHOOL PACKAGE CLASS DEFINITION            */
    /*********************************************************/
    export class Package {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private packageOption: PackageOption;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Package Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.packageOption = new PackageOption(obj.packageOption);
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of package school'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of package school'; }
            this.active = active;
        }

        get PackageOption() {
            return this.packageOption;
        }

        set PackageOption(packageOption: PackageOption) {
            if (packageOption === undefined) { throw 'Please supply package option value of package school'; }
            this.packageOption = packageOption;
        }

    }


    /*********************************************************/
    /*         SCHOOL PACKAGE OPTION CLASS DEFINITION        */
    /*********************************************************/
    export class PackageOption {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private name: string;
        private price: number;
        private description: string;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Package Option Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.name = obj.name || '';
            this.price = obj.price || 0;
            this.description = obj.description || '';
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of package option school'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of package option school'; }
            this.active = active;
        }

        get Name() {
            return this.name;
        }

        set Name(name: string) {
            if (name === undefined) { throw 'Please supply name value of package option school'; }
            this.name = name;
        }

        get Price() {
            return this.price;
        }

        set Price(price: number) {
            if (price === undefined) { throw 'Please supply price value of package option school'; }
            this.price = price;
        }

        get Description() {
            return this.description;
        }

        set Description(description: string) {
            if (description === undefined) { throw 'Please supply description value of package option school'; }
            this.description = description;
        }

    }


    /*********************************************************/
    /*         SCHOOL WORK EXCHANGE CLASS DEFINITION         */
    /*********************************************************/
    export class WorkExchange {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private workExchangeOption: Array<WorkExchangeOption>;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Work Exchange Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;

            if(obj != {}) {

                this.workExchangeOption = [];
                for (let key in obj.workExchangeOption) {
                    let workExchangeOptionInstance = new WorkExchangeOption(obj.workExchangeOption[key]);
                    this.addWorkExchangeOption(workExchangeOptionInstance);
                }

            } else {
                this.workExchangeOption = [];
            }
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of work exchange'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of work exchange'; }
            this.active = active;
        }

        get WorkExchangeOption() {
            return this.workExchangeOption;
        }

        addWorkExchangeOption(workExchangeOption: WorkExchangeOption): void {
            if(workExchangeOption === undefined) { throw 'Please supply work exchange option value (Add)'; }
            this.workExchangeOption.push(workExchangeOption);
        }

        editWorkExchangeOption(workExchangeOption: WorkExchangeOption): void {
            if(workExchangeOption === undefined) { throw 'Please supply work exchange Option value (Edit)'; }
            //Edit existing WorkExchangeOption
            this.workExchangeOption.forEach(function (element, index, array) {
                if (workExchangeOption.Id === element.Id) {
                    array[index] = workExchangeOption;
                }
            });
        }

    }


    export class WorkExchangeOption {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private category: number;
        private terms: string;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Work Exchange Option Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.category = obj.category || 0;
            this.terms = obj.terms || '';
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of work exchange'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of work exchange'; }
            this.active = active;
        }

        get Category() {
            return this.category;
        }

        set Category(category: number) {
            if (category === undefined) { throw 'Please supply category value of work exchange'; }
            this.category = category;
        }

        get Terms() {
            return this.terms;
        }

        set Terms(terms: string) {
            if (terms === undefined) { throw 'Please supply terms value of work exchange'; }
            this.terms = terms;
        }

    }


    /*********************************************************/
    /*          SCHOOL VOLUNTEERING CLASS DEFINITION         */
    /*********************************************************/
    export class Volunteering {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private option: Array<string>;
        private rating: number;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Volunteering Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.option = obj.option || [];
            this.rating = obj.rating || 0;
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of volunteering'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of volunteering'; }
            this.active = active;
        }

        get Option() {
            return this.option;
        }

        set Option(option: Array<string>) {
            if (option === undefined) { throw 'Please supply volunteering option value of school'; }
            this.option = option;
        }

        get Rating() {
            return this.rating;
        }

        set Rating(rating: number) {
            if (rating === undefined) { throw 'Please supply rating volunteering value of school'; }
            this.rating = rating;
        }
    }


    /*********************************************************/
    /*             SCHOOL TOURS CLASS DEFINITION             */
    /*********************************************************/
    export class Tour {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private option: Array<string>;
        private cityTour: boolean;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Tours Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.option = obj.option || [];
            this.cityTour = obj.cityTour || false;
        }

        /*********************************/
        /*           METHODS             */
        /*********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of volunteering'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of volunteering'; }
            this.active = active;
        }

        get Option() {
            return this.option;
        }

        set Option(option: Array<string>) {
            if (option === undefined) { throw 'Please supply volunteering option value of school'; }
            this.option = option;
        }

        get CityTour() {
            return this.cityTour;
        }

        set CityTour(cityTour: boolean) {
            if (cityTour === undefined) { throw 'Please supply cityTour value of school'; }
            this.cityTour = cityTour;
        }
    }


    /*********************************************************/
    /*           SCHOOL AMENITIES CLASS DEFINITION           */
    /*********************************************************/
    export class Amenities {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private option: Array<string>;
        private otherOption: string;
        private rating: number;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Amenities Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.option = obj.option || [];
            this.otherOption = obj.otherOption || '';
            this.rating = obj.rating || 0;
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of amenities'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of amenities'; }
            this.active = active;
        }

        get Option() {
            return this.option;
        }

        set Option(option: Array<string>) {
            if (option === undefined) { throw 'Please supply amenities option value of school'; }
            this.option = option;
        }

        get OtherOption() {
            return this.otherOption;
        }

        set OtherOption(otherOption: string) {
            if (otherOption === undefined) { throw 'Please supply other amenities options value of school'; }
            this.otherOption = otherOption;
        }

        get Rating() {
            return this.rating;
        }

        set Rating(rating: number) {
            if (rating === undefined) { throw 'Please supply rating amenities value of school'; }
            this.rating = rating;
        }

    }


    /*********************************************************/
    /*          SCHOOL ACCOMMODATION CLASS DEFINITION        */
    /*********************************************************/
    export class Accommodation {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private accommodationOption: Array<AccommodationOption>;
        private rating: number;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Accommodation Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.rating = obj.rating || 0;

            if(obj != {}) {

                this.accommodationOption = [];
                for (let key in obj.accommodationOption) {
                    let accommodationOptionInstance = new AccommodationOption(obj.accommodationOption[key]);
                    this.addAccommodationOption(accommodationOptionInstance);
                }

            } else {
                this.accommodationOption = [];
            }
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of Accommodation'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of Accommodation'; }
            this.active = active;
        }

        get Rating() {
            return this.rating;
        }

        set Rating(rating: number) {
            if (rating === undefined) { throw 'Please supply rating accommodation value of school'; }
            this.rating = rating;
        }

        get AccommodationOption() {
            return this.accommodationOption;
        }

        addAccommodationOption(accommodationOption: AccommodationOption): void {
            if(accommodationOption === undefined) { throw 'Please supply accommodation option value (Add)'; }
            this.accommodationOption.push(accommodationOption);
        }

        editAccommodationOption(accommodationOption: AccommodationOption): void {
            if(accommodationOption === undefined) { throw 'Please supply Accommodation Option value (Edit)'; }
            //Edit existing AccommodationOption
            this.accommodationOption.forEach(function (element, index, array) {
                if (accommodationOption.Id === element.Id) {
                    array[index] = accommodationOption;
                }
            });
        }

    }


    /*********************************************************/
    /*          SCHOOL ACCOMMODATION CLASS DEFINITION        */
    /*********************************************************/
    export class AccommodationOption {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private category: number;
        private otherAmenities: string;
        private price: number;
        private amenities: Array<string>;
        private terms: string;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Accommodation Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.category = obj.category || 0;
            this.otherAmenities = obj.otherAmenities || '';
            this.price = obj.price || 0;
            this.amenities = obj.amenities || [];
            this.terms = obj.terms || '';
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of Accommodation'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of Accommodation'; }
            this.active = active;
        }

        get Category() {
            return this.category;
        }

        set Category(category: number) {
            if (category === undefined) { throw 'Please supply category value of Accommodation'; }
            this.category = category;
        }

        get OtherAmenities() {
            return this.otherAmenities;
        }

        set OtherAmenities(otherAmenities: string) {
            if (otherAmenities === undefined) { throw 'Please supply other amenities value of Accommodation'; }
            this.otherAmenities = otherAmenities;
        }

        get Price() {
            return this.price;
        }

        set Price(price: number) {
            if (price === undefined) { throw 'Please supply price value of Accommodation'; }
            this.price = price;
        }

        get Amenities() {
            return this.amenities;
        }

        set Amenities(amenities: Array<string>) {
            if (amenities === undefined) { throw 'Please supply amenities option value of Accommodation'; }
            this.amenities = amenities;
        }

        get Terms() {
            return this.terms;
        }

        set Terms(terms: string) {
            if (terms === undefined) { throw 'Please supply terms value of Accommodation'; }
            this.terms = terms;
        }

    }


    /*********************************************************/
    /*              SCHOOL PRICE CLASS DEFINITION            */
    /*********************************************************/
    export class Price {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private privateClass: PrivateClass;
        private groupClass: GroupClass;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('School Price Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.privateClass = new PrivateClass(obj.privateClass);
            this.groupClass = new GroupClass(obj.groupClass);
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of School Price'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of School Price'; }
            this.active = active;
        }

        get PrivateClass() {
            return this.privateClass;
        }

        set PrivateClass(privateClass: PrivateClass) {
            if (privateClass === undefined) { throw 'Please supply privateClass value of School Price'; }
            this.privateClass = privateClass;
        }

        get GroupClass() {
            return this.groupClass;
        }

        set GroupClass(groupClass: GroupClass) {
            if (groupClass === undefined) { throw 'Please supply groupClass value of School Price'; }
            this.groupClass = groupClass;
        }

    }


    /*********************************************************/
    /*              SCHOOL PRIVATE CLASS DEFINITION          */
    /*********************************************************/
    export class PrivateClass {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private generalType: ClassType;
        private intensiveType: ClassType;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('School Private classes Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.generalType = new ClassType(obj.generalType);
            this.intensiveType = new ClassType(obj.intensiveType);
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of School Private classes'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of School Private classes'; }
            this.active = active;
        }

        get GeneralType() {
            return this.generalType;
        }

        set GeneralType(generalType: ClassType) {
            if (generalType === undefined) { throw 'Please supply general type value of School Private classes'; }
            this.generalType = generalType;
        }

        get IntensiveType() {
            return this.intensiveType;
        }

        set IntensiveType(intensiveType: ClassType) {
            if (intensiveType === undefined) { throw 'Please supply intensive type value of School Private classes'; }
            this.intensiveType = intensiveType;
        }

    }


    /*********************************************************/
    /*              SCHOOL GROUP CLASS DEFINITION            */
    /*********************************************************/
    export class GroupClass {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private generalType: GroupType;
        private intensiveType: GroupType;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('School Group classes Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.generalType = new GroupType(obj.generalType);
            this.intensiveType = new GroupType(obj.intensiveType);
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of School Group classes'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of School Group classes'; }
            this.active = active;
        }

        get GeneralType() {
            return this.generalType;
        }

        set GeneralType(generalType: GroupType) {
            if (generalType === undefined) { throw 'Please supply general type value of School Group classes'; }
            this.generalType = generalType;
        }

        get IntensiveType() {
            return this.intensiveType;
        }

        set IntensiveType(intensiveType: GroupType) {
            if (intensiveType === undefined) { throw 'Please supply intensive type value of School Group classes'; }
            this.intensiveType = intensiveType;
        }

    }


    /*********************************************************/
    /*               SCHOOL CLASS TYPE DEFINITION            */
    /*********************************************************/
    export class ClassType {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private value: number;
        private hour: number;
        private terms: string;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('School classes Type Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.value = obj.value || 0;
            this.hour = obj.hour || 0;
            this.terms = obj.terms || '';
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of School classes type'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of School classes type'; }
            this.active = active;
        }

        get Value() {
            return this.value;
        }

        set Value(value: number) {
            if (value === undefined) { throw 'Please supply price value of School classes type'; }
            this.value = value;
        }

        get Hour() {
            return this.hour;
        }

        set Hour(hour: number) {
            if (hour === undefined) { throw 'Please supply hour value of School classes type'; }
            this.hour = hour;
        }

        get Terms() {
            return this.terms;
        }

        set Terms(terms: string) {
            if (terms === undefined) { throw 'Please supply terms value of School classes type'; }
            this.terms = terms;
        }

    }


    /*********************************************************/
    /*          SCHOOL GROUP CLASS TYPE DEFINITION           */
    /*********************************************************/
    export class GroupType extends ClassType {

        /*-- PROPERTIES --*/
        private student: Array<number>;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('School group classes Type Model instanced');

            if(obj === null) obj = {};

            //init properties
            super(obj);
            this.student = obj.student || [];
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Student() {
            return this.student;
        }

        set Student(student: Array<number>) {
            if (student === undefined) { throw 'Please supply student value of School group classes type'; }
            this.student = student;
        }

    }


    /*********************************************************/
    /*            SCHOOL DISCOUNT CLASS DEFINITION           */
    /*********************************************************/
    export class Discount {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private option: Array<string>;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('School Discount Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.option = obj.option || [];
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of School discount'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of School discount'; }
            this.active = active;
        }

        get Option() {
            return this.option;
        }

        set Option(option: Array<string>) {
            if (option === undefined) { throw 'Please supply option value of School discount'; }
            this.option = option;
        }

    }


    /*********************************************************/
    /*         SCHOOL PAYMENT METHODS CLASS DEFINITION       */
    /*********************************************************/
    export class PaymentMethod {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private methods: Array<string>;
        private other: Array<string>;


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('School Payment Methods Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.methods = obj.methods || [];
            this.other = obj.other || [];
        }


        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of School payment methods'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of School payment methods'; }
            this.active = active;
        }

        get Methods() {
            return this.methods;
        }

        set Methods(methods: Array<string>) {
            if (methods === undefined) { throw 'Please supply methods value of School payment methods'; }
            this.methods = methods;
        }

        get Other() {
            return this.other;
        }

        set Other(other: Array<string>) {
            if (other === undefined) { throw 'Please supply other value of School payment methods'; }
            this.other = other;
        }
    }


    /*********************************************************/
    /*          SCHOOL BOOKING FEE CLASS DEFINITION          */
    /*********************************************************/
    export class BookingFee {

        /*-- PROPERTIES --*/
        private id: number;
        private active: boolean;
        private price: number;
        private terms: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('School Booking Fee Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.active = obj.active || false;
            this.price = obj.price || 0;
            this.terms = obj.terms || '';
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply id value of School booking fee'; }
            this.id = id;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of School booking fee'; }
            this.active = active;
        }

        get Price() {
            return this.price;
        }

        set Price(price: number) {
            if (price === undefined) { throw 'Please supply price value of School booking fee'; }
            this.price = price;
        }

    }

}

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

    export class Teacher {

        /*-- PROPERTIES --*/
        private id: string;
        private profile: app.models.user.Profile;
        private type: string;
        private teacherSince: string;
        private experiences: Array<Experience>;
        private educations: Array<Education>;
        private certificates: Array<Certificate>;
        private methodology: string;
        private immersion: Immersion;
        private price: Price;
        private ratings: Array<Rating>;
        private status: string;
        private recommended: number;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Teacher Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id || '';
            this.profile = new app.models.user.Profile(obj.profile);
            this.type = obj.type || '';
            this.teacherSince = obj.teacherSince || '';
            this.methodology = obj.methodology || '';
            this.immersion = new Immersion(obj.immersion);
            this.status = obj.status || 'NW';
            this.price = new Price(obj.price);

            if(obj != {}) {

                this.experiences = [];
                for (let key in obj.experiences) {
                    let experienceInstance = new Experience(obj.experiences[key]);
                    this.addExperience(experienceInstance);
                }

                this.educations = [];
                for (let key in obj.educations) {
                    let educationInstance = new Education(obj.educations[key]);
                    this.addEducation(educationInstance);
                }

                this.certificates = [];
                for (let key in obj.certificates) {
                    let certificateInstance = new Certificate(obj.certificates[key]);
                    this.addCertificate(certificateInstance);
                }

                this.ratings = [];
                for (let key in obj.ratings) {
                    let ratingInstance = new Rating(obj.ratings[key]);
                    this.addRating(ratingInstance);
                }

            } else {
                this.experiences = [];
                this.educations = [];
                this.certificates = [];
                this.ratings = [];
            }

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: string) {
            if (id === undefined) { throw 'Please supply id of teacher'; }
            this.id = id;
        }

        get Profile() {
            return this.profile;
        }

        set Profile(profile: app.models.user.Profile) {
            if (profile === undefined) { throw 'Please supply teacher profile data'; }
            this.profile = profile;
        }

        get Type() {
            return this.type;
        }

        set Type(type: string) {
            if (type === undefined) { throw 'Please supply type of teacher'; }
            this.type = type;
        }

        get TeacherSince() {
            return this.teacherSince;
        }

        set TeacherSince(teacherSince: string) {
            if (teacherSince === undefined) { throw 'Please supply teacher since'; }
            this.teacherSince = teacherSince;
        }

        get Experiences() {
            return this.experiences;
        }

        addExperience(experience: Experience): void {
            if(experience === undefined) { throw 'Please supply experience value (Add)'; }
            this.experiences.push(experience);
        }

        editExperience(experience: Experience): void {
            if(experience === undefined) { throw 'Please supply experience value (Edit)'; }
            //Edit existing Experience
            this.experiences.forEach(function (element, index, array) {
                if (experience.Id === element.Id) {
                    array[index] = experience;
                }
            });
        }

        get Educations() {
            return this.educations;
        }

        addEducation(education: Education): void {
            if(education === undefined) { throw 'Please supply education value (Add)'; }
            this.educations.push(education);
        }

        editEducation(education: Education): void {
            if(education === undefined) { throw 'Please supply education value (Edit)'; }
            //Edit existing Education
            this.educations.forEach(function (element, index, array) {
                if (education.Id === element.Id) {
                    array[index] = education;
                }
            });
        }

        get Certificates() {
            return this.certificates;
        }

        addCertificate(certificate: Certificate): void {
            if(certificate === undefined) { throw 'Please supply certificate value (Add)'; }
            this.certificates.push(certificate);
        }

        editCertificate(certificate: Certificate): void {
            if(certificate === undefined) { throw 'Please supply certificate value (Edit)'; }
            //Edit existing Certificate
            this.certificates.forEach(function (element, index, array) {
                if (certificate.Id === element.Id) {
                    array[index] = certificate;
                }
            });
        }

        get Methodology() {
            return this.methodology;
        }

        set Methodology(methodology: string) {
            if (methodology === undefined) { throw 'Please supply methodology'; }
            this.methodology = methodology;
        }

        get Immersion() {
            return this.immersion;
        }

        set Immersion(immersion: Immersion) {
            if (immersion === undefined) { throw 'Please supply immersion'; }
            this.immersion = immersion;
        }

        get Price() {
            return this.price;
        }

        set Price(price: Price) {
            if (price === undefined) { throw 'Please supply price'; }
            this.price = price;
        }

        get Ratings() {
            return this.ratings;
        }

        addRating(rating: Rating): void {
            if(rating === undefined) { throw 'Please supply rating value (Add)'; }
            this.ratings.push(rating);
        }

        editRating(rating: Rating): void {
            if(rating === undefined) { throw 'Please supply rating value (Edit)'; }
            //Edit existing Rating
            this.ratings.forEach(function (element, index, array) {
                if (rating.Id === element.Id) {
                    array[index] = rating;
                }
            });
        }

        get Status() {
            return this.status;
        }

        set Status(status: string) {
            if (status === undefined) { throw 'Please supply profile status value'; }
            this.status = status;
        }

        get Recommended() {
            return this.recommended;
        }

        set Recommended(recommended: number) {
            if (recommended === undefined) { throw 'Please supply recommended early id'; }
            this.recommended = recommended;
        }

    }


    /************************************************/
    /*          EXPERIENCE CLASS DEFINITION         */
    /************************************************/

    export class Experience {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private position: string;
        private company: string;
        private country: string;
        private city: string;
        private dateStart: string;
        private dateFinish: string;
        private description: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Experience Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.position = obj.position || '';
            this.company = obj.company || '';
            this.country = obj.country || '';
            this.city = obj.city || '';
            this.dateStart = obj.dateStart || '';
            this.dateFinish = obj.dateFinish || '';
            this.description = obj.description || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply experience id'; }
            this.id = id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply experience uid'; }
            this.uid = uid;
        }

        get Position() {
            return this.position;
        }

        set Position(position: string) {
            if (position === undefined) { throw 'Please supply position on company'; }
            this.position = position;
        }

        get Company() {
            return this.company;
        }

        set Company(company: string) {
            if (company === undefined) { throw 'Please supply company experience'; }
            this.company = company;
        }

        get Country() {
            return this.country;
        }

        set Country(country: string) {
            if (country === undefined) { throw 'Please supply country experience'; }
            this.country = country;
        }

        get City() {
            return this.city;
        }

        set City(city: string) {
            if (city === undefined) { throw 'Please supply city experience'; }
            this.city = city;
        }

        get DateStart() {
            return this.dateStart;
        }

        set DateStart(dateStart: string) {
            if (dateStart === undefined) { throw 'Please supply dateStart experience'; }
            this.dateStart = dateStart;
        }

        get DateFinish() {
            return this.dateFinish;
        }

        set DateFinish(dateFinish: string) {
            if (dateFinish === undefined) { throw 'Please supply dateFinish experience'; }
            this.dateFinish = dateFinish;
        }

        get Description() {
            return this.description;
        }

        set Description(description: string) {
            if (description === undefined) { throw 'Please supply description experience'; }
            this.description = description;
        }


    }



    /************************************************/
    /*           EDUCATION CLASS DEFINITION         */
    /************************************************/

    export class Education {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private school: string;
        private degree: string;
        private fieldStudy: string;
        private dateStart: string;
        private dateFinish: string;
        private description: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Education Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.school = obj.school || '';
            this.degree = obj.degree || '';
            this.fieldStudy = obj.fieldStudy || '';
            this.dateStart = obj.dateStart || '';
            this.dateFinish = obj.dateFinish || '';
            this.description = obj.description || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply experience id'; }
            this.id = id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply position uid'; }
            this.uid = uid;
        }

        get School() {
            return this.school;
        }

        set School(school: string) {
            if (school === undefined) { throw 'Please supply school value (teacher education)'; }
            this.school = school;
        }

        get Degree() {
            return this.degree;
        }

        set Degree(degree: string) {
            if (degree === undefined) { throw 'Please supply degree value (teacher education)'; }
            this.degree = degree;
        }

        get FieldStudy() {
            return this.fieldStudy;
        }

        set FieldStudy(fieldStudy: string) {
            if (fieldStudy === undefined) { throw 'Please supply field of study value (teacher education)'; }
            this.fieldStudy = fieldStudy;
        }

        get DateStart() {
            return this.dateStart;
        }

        set DateStart(dateStart: string) {
            if (dateStart === undefined) { throw 'Please supply dateStart experience'; }
            this.dateStart = dateStart;
        }

        get DateFinish() {
            return this.dateFinish;
        }

        set DateFinish(dateFinish: string) {
            if (dateFinish === undefined) { throw 'Please supply dateFinish experience'; }
            this.dateFinish = dateFinish;
        }

        get Description() {
            return this.description;
        }

        set Description(description: string) {
            if (description === undefined) { throw 'Please supply description experience'; }
            this.description = description;
        }


    }



    /************************************************/
    /*          CERTIFICATE CLASS DEFINITION        */
    /************************************************/

    export class Certificate {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private name: string;
        private institution: string;
        private dateReceived: string;
        private description: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Certificate Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.name = obj.name || '';
            this.institution = obj.institution || '';
            this.dateReceived = obj.dateReceived || '';
            this.description = obj.description || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply experience id'; }
            this.id = id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply position uid'; }
            this.uid = uid;
        }

        get Name() {
            return this.name;
        }

        set Name(name: string) {
            if (name === undefined) { throw 'Please supply name of certificate'; }
            this.name = name;
        }

        get Institution() {
            return this.institution;
        }

        set Institution(institution: string) {
            if (institution === undefined) { throw 'Please supply institution of certificate'; }
            this.institution = institution;
        }

        get DateReceived() {
            return this.dateReceived;
        }

        set DateReceived(dateReceived: string) {
            if (dateReceived === undefined) { throw 'Please supply dateReceived of certificate'; }
            this.dateReceived = dateReceived;
        }

        get Description() {
            return this.description;
        }

        set Description(description: string) {
            if (description === undefined) { throw 'Please supply description of certificate'; }
            this.description = description;
        }


    }



    /************************************************/
    /*          IMMERSION CLASS DEFINITION          */
    /************************************************/

    export class Immersion {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private active: boolean;
        private category: Array<string>;
        private otherCategory: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Certificate Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.active = obj.active || false;
            this.otherCategory = obj.otherCategory || '';
            this.category = obj.category || [];

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply experience id'; }
            this.id = id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply experience uid'; }
            this.uid = uid;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of immersion'; }
            this.active = active;
        }

        get Category() {
            return this.category;
        }

        set Category(category: Array<string>) {
            if (category === undefined) { throw 'Please supply category of immersion'; }
            this.category = category;
        }

        get OtherCategory() {
            return this.otherCategory;
        }

        set OtherCategory(otherCategory: string) {
            if (otherCategory === undefined) { throw 'Please supply other immersion category'; }
            this.otherCategory = otherCategory;
        }

    }



    /************************************************/
    /*      TYPE OF IMMERSION CLASS DEFINITION      */
    /************************************************/

    export class TypeOfImmersion {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private category: Array<string>;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('TypeOfImmersion Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.category = obj.category || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply type of immersion id'; }
            this.id = id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply type of immersion uid'; }
            this.uid = uid;
        }

        get Category() {
            return this.category;
        }

        set Category(category: Array<string>) {
            if (category === undefined) { throw 'Please supply category of immersion'; }
            this.category = category;
        }

    }



    /************************************************/
    /*            PRICE CLASS DEFINITION            */
    /************************************************/

    export class Price {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private privateClass: TypeOfPrice;
        private groupClass: TypeOfPrice;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Price of Teacher Class Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.privateClass = new TypeOfPrice(obj.privateClass);
            this.groupClass = new TypeOfPrice(obj.groupClass);

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply experience id'; }
            this.id = id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply experience uid'; }
            this.uid = uid;
        }

        get PrivateClass() {
            return this.privateClass;
        }

        set PrivateClass(privateClass: TypeOfPrice) {
            if (privateClass === undefined) { throw 'Please supply privateClass'; }
            this.privateClass = privateClass;
        }

        get GroupClass() {
            return this.groupClass;
        }

        set GroupClass(groupClass: TypeOfPrice) {
            if (groupClass === undefined) { throw 'Please supply groupClass'; }
            this.groupClass = groupClass;
        }

    }



    /************************************************/
    /*         TYPE OF PRICE CLASS DEFINITION       */
    /************************************************/

    export class TypeOfPrice {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private active: boolean;
        private hourPrice: number;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('TypeOfPrice Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.active = obj.active || false;
            this.hourPrice = obj.hourPrice || 0;

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply experience id'; }
            this.id = id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply experience uid'; }
            this.uid = uid;
        }

        get Active() {
            return this.active;
        }

        set Active(active: boolean) {
            if (active === undefined) { throw 'Please supply active value of price'; }
            this.active = active;
        }

        get HourPrice() {
            return this.hourPrice;
        }

        set HourPrice(hourPrice: number) {
            if (hourPrice === undefined) { throw 'Please supply hour price value'; }
            this.hourPrice = hourPrice;
        }
    }



    /************************************************/
    /*            RATING CLASS DEFINITION           */
    /************************************************/

    export class Rating {

        /*-- PROPERTIES --*/
        private id: number;
        private uid: string;
        private author: app.models.user.Profile;
        private methodologyValue: number;
        private teachingValue: number;
        private communicationValue: number;
        private review: string;
        private createdAt: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Rating Model instanced');

            if(obj === null) obj = {};

            //init properties
            this.id = obj.id;
            this.uid = obj.uid || app.core.util.functionsUtil.FunctionsUtilService.generateGuid();
            this.author = new app.models.user.Profile(obj.author);
            this.methodologyValue = obj.methodologyValue || 0;
            this.teachingValue = obj.teachingValue || 0;
            this.communicationValue = obj.communicationValue || 0;
            this.review = obj.review || '';
            this.createdAt = obj.createdAt || '';
        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        set Id(id: number) {
            if (id === undefined) { throw 'Please supply rating id'; }
            this.id = id;
        }

        get Uid() {
            return this.uid;
        }

        set Uid(uid: string) {
            if (uid === undefined) { throw 'Please supply rating uid'; }
            this.uid = uid;
        }

        get Author() {
            return this.author;
        }

        set Author(author: app.models.user.Profile) {
            if (author === undefined) { throw 'Please supply author'; }
            this.author = author;
        }

        get MethodologyValue() {
            return this.methodologyValue;
        }

        set MethodologyValue(methodologyValue: number) {
            if (methodologyValue === undefined) { throw 'Please supply methodology value'; }
            this.methodologyValue = methodologyValue;
        }

        get TeachingValue() {
            return this.teachingValue;
        }

        set TeachingValue(teachingValue: number) {
            if (teachingValue === undefined) { throw 'Please supply teaching value'; }
            this.teachingValue = teachingValue;
        }

        get CommunicationValue() {
            return this.communicationValue;
        }

        set CommunicationValue(communicationValue: number) {
            if (communicationValue === undefined) { throw 'Please supply communication value'; }
            this.communicationValue = communicationValue;
        }

        get Review() {
            return this.review;
        }

        set Review(review: string) {
            if (review === undefined) { throw 'Please supply review value'; }
            this.review = review;
        }

        get CreatedAt() {
            return this.createdAt;
        }

    }

}

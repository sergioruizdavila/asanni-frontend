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
        private type: string;
        private teacherSince: string;
        private experiences: Array<Experience>;
        private educations: Array<Education>;
        private certificates: Array<Certificate>;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Teacher Model instanced');

            //init properties
            super(obj);
            this.languages = new Language(obj.languages);
            this.type = obj.type || '';
            this.teacherSince = obj.teacherSince || '';

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

            } else {
                this.experiences = [];
                this.educations = [];
                this.certificates = [];
            }

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

            //Is required use null here because en DB save: "[]"
            if(typeof obj.native === 'string') {
                this.native = JSON.parse(obj.native);
            } else {
                this.native = obj.native || null;
            }

            if(typeof obj.learn === 'string') {
                this.learn = JSON.parse(obj.learn);
            } else {
                this.learn = obj.learn || null;
            }

            if(typeof obj.teach === 'string') {
                this.teach = JSON.parse(obj.teach);
            } else {
                this.teach = obj.teach || null;
            }

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



    /************************************************/
    /*          EXPERIENCE CLASS DEFINITION         */
    /************************************************/

    export class Experience {

        /*-- PROPERTIES --*/
        private id: number;
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

            //init properties
            this.id = obj.id;
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

            //init properties
            this.id = obj.id;
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

            //init properties
            this.id = obj.id;
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

}

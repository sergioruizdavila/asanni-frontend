/**
 * Specifies the Classes and Interfaces related to Students in our Model
 */

module app.models.student {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/



    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Student extends app.models.user.User {

        /*-- PROPERTIES --*/
        private school: string;
        private occupation: string;
        private fluent_in: Array<string>;
        private learning: Array<string>;
        private interests: Array<string>;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Student Model instanced');

            //init properties
            super(obj);
            this.school = obj.school || '';
            this.occupation = obj.occupation || '';
            this.fluent_in = obj.fluent_in || '';
            this.learning = obj.learning || '';
            this.interests = obj.interests || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get School() {
            return this.school;
        }

        set School(school: string) {
            if (school === undefined) { throw 'Please supply school'; }
            this.school = school;
        }

        get Occupation() {
            return this.occupation;
        }

        set Occupation(occupation: string) {
            if (occupation === undefined) { throw 'Please supply occupation'; }
            this.occupation = occupation;
        }

        get Fluent_in() {
            return this.fluent_in;
        }

        addFluentIn(language: string): void {
            if(language === undefined) { throw 'Please supply fluent in language element (Add)'; }
            this.fluent_in.push(language);
        }

        editFluentIn(language: string): void {
            if(language === undefined) { throw 'Please supply fluent in language element (Edit)'; }
            //Edit existing Fluent in Language
            this.fluent_in.forEach(function (element, index, array) {
                if (language === element) {
                    array[index] = language;
                }
            });
        }

        get Learning() {
            return this.learning;
        }

        addLearning(language: string): void {
            if(language === undefined) { throw 'Please supply learning language element (Add)'; }
            this.fluent_in.push(language);
        }

        editLearning(language: string): void {
            if(language === undefined) { throw 'Please supply learning language element (Edit)'; }
            //Edit existing Learning Language
            this.learning.forEach(function (element, index, array) {
                if (language === element) {
                    array[index] = language;
                }
            });
        }

        get Interests() {
            return this.interests;
        }

        addInterest(interest: string): void {
            if(interest === undefined) { throw 'Please supply interest element (Add)'; }
            this.interests.push(interest);
        }

        editInterest(interest: string): void {
            if(interest === undefined) { throw 'Please supply interest element (Edit)'; }
            //Edit existing Interest
            this.interests.forEach(function (element, index, array) {
                if (interest === element) {
                    array[index] = interest;
                }
            });
        }

    }

}

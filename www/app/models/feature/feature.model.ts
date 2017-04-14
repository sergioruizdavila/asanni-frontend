/**
 * Specifies the Classes and Interfaces related to Feature in our Model
 */

module app.models.feature {

    /****************************************/
    /*         INTERFACES DEFINITION        */
    /****************************************/



    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/

    export class Feature {

        /*-- PROPERTIES --*/
        private id: string;
        private featureEn: string;
        private featureEs: string;
        private descriptionEn: string;
        private descriptionEs: string;

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(obj: any = {}) {
            //LOG
            console.log('Feature Model instanced');

            //init properties
            this.id = obj.id;
            this.featureEn = obj.featureEn || '';
            this.featureEs = obj.featureEs || '';
            this.descriptionEn = obj.descriptionEn || '';
            this.descriptionEs = obj.descriptionEs || '';

        }

        /**********************************/
        /*             METHODS            */
        /**********************************/

        get Id() {
            return this.id;
        }

        get FeatureEn() {
            return this.featureEn;
        }

        set FeatureEn(featureEn: string) {
            if (featureEn === undefined) { throw 'Please supply feature en value'; }
            this.featureEn = featureEn;
        }

        get FeatureEs() {
            return this.featureEs;
        }

        set FeatureEs(featureEs: string) {
            if (featureEs === undefined) { throw 'Please supply feature es value'; }
            this.featureEs = featureEs;
        }

        get DescriptionEn() {
            return this.descriptionEn;
        }

        set DescriptionEn(descriptionEn: string) {
            if (descriptionEn === undefined) { throw 'Please supply description en value'; }
            this.descriptionEn = descriptionEn;
        }

        get DescriptionEs() {
            return this.descriptionEs;
        }

        set DescriptionEs(descriptionEs: string) {
            if (descriptionEs === undefined) { throw 'Please supply description es value'; }
            this.descriptionEs = descriptionEs;
        }

    }

}

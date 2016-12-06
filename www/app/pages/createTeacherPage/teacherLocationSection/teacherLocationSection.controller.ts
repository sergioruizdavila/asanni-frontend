/**
 * TeacherLocationSectionController
 * @description - Teacher Location Section Controller (create teacher)
 */

module app.pages.createTeacherPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ITeacherLocationSectionController {
        form: ITeacherLocationForm;
        validate: ITeacherLocationValidate;
        activate: () => void;
    }

    export interface ITeacherLocationScope extends angular.IScope {
        $parent: IParentScope;
    }

    export interface IParentScope extends angular.IScope {
        vm: ICreateTeacherPageController;
    }

    /********************************/
    /*    STATEPARAMS INTERFACES    */
    /********************************/
    export interface IParams extends ng.ui.IStateParamsService {
        id: string;
    }

    export interface ITeacherLocationForm {
        countryLocation: string;
        addressLocation: string;
        cityLocation: string;
        stateLocation: string;
        zipCodeLocation: string;
        positionLocation: app.models.user.Position;
    }

    interface ITeacherLocationValidate {
        countryLocation: app.core.util.functionsUtil.IValid;
        addressLocation: app.core.util.functionsUtil.IValid;
        cityLocation: app.core.util.functionsUtil.IValid;
        stateLocation: app.core.util.functionsUtil.IValid;
        zipCodeLocation: app.core.util.functionsUtil.IValid;
        positionLocation: app.core.util.functionsUtil.IValid;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class TeacherLocationSectionController implements ITeacherLocationSectionController {

        static controllerId = 'mainApp.pages.createTeacherPage.TeacherLocationSectionController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: ITeacherLocationForm;
        validate: ITeacherLocationValidate;
        helpText: app.core.interfaces.IHelpTextStep;
        geocoder: google.maps.Geocoder;
        mapConfig: components.map.IMapConfig;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        STEP1_STATE: string;
        STEP3_STATE: string;
        HELP_TEXT_TITLE: string;
        HELP_TEXT_DESCRIPTION: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$filter',
            '$scope',
            '$timeout'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: ITeacherLocationScope,
            private $timeout) {
                this._init();
        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //VARIABLES
            let self = this;
            //CONSTANTS
            this.STEP1_STATE = 'page.createTeacherPage.basicInfo';
            this.STEP3_STATE = 'page.createTeacherPage.language';
            this.HELP_TEXT_TITLE = this.$filter('translate')('%create.teacher.location.help_text.title.text');
            this.HELP_TEXT_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.description.text');
            /*********************************/

            //Put title on parent scope
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(2, 9);

            //Put Help Text Default
            this.helpText = {
                title: this.HELP_TEXT_TITLE,
                description: this.HELP_TEXT_DESCRIPTION
            };

            // Country Select List Structure
            this.countryObject = {code: '', value: ''};

            //Init form
            this.form = {
                countryLocation: '',
                cityLocation: '',
                stateLocation: '',
                addressLocation: '',
                zipCodeLocation: '',
                positionLocation: new app.models.user.Position()
            };

            //Build Countries select lists
            this.listCountries = this.getDataFromJson.getCountryi18n();

            // Init Map
            this.mapConfig = self.functionsUtilService.buildMapConfig(
                null, 'drag-maker-map', null
            );

            // Build validate object fields
            this.validate = {
                countryLocation: {valid: true, message: ''},
                cityLocation: {valid: true, message: ''},
                stateLocation: {valid: true, message: ''},
                addressLocation: {valid: true, message: ''},
                zipCodeLocation: {valid: true, message: ''},
                positionLocation: {valid: true, message: ''}
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //LOG
            console.log('TeacherLocationSectionController controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * goToNext
        * @description - go to next step (create or update teacher data on DB)
        * @function
        * @return void
        */
        goToNext(): void {
            //CONSTANTS
            const CURRENT_STEP = 2;
            /*********************************/

            //Validate data form
            let formValid = this._validateForm();

            if(formValid){
                this._setDataModelFromForm();
                this.$scope.$emit('Save Data', CURRENT_STEP);
                // GO TO NEXT STEP
                this.$state.go(this.STEP3_STATE, {reload: true});
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }

        }



        /**
        * goToBack
        * @description - go to back step
        * @function
        * @return void
        */
        goToBack(): void {
            //Validate data form
            let formValid = this._validateForm();
            //If form is valid, save data model
            if(formValid) {
                this._setDataModelFromForm();
                this.$scope.$emit('Save Data');
                //Anyway go to back step, not stop process
                this.$state.go(this.STEP1_STATE, {reload: true});
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }
        }



        /**
        * _validateForm
        * @description - Validate each field on form
        * @use - this._validateForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        _validateForm(): boolean {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const NUMBER_ENUM = app.core.util.functionsUtil.Validation.Number;
            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate Country field
            let country_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.countryLocation = this.functionsUtilService.validator(this.countryObject.code, country_rules);
            if(!this.validate.countryLocation.valid) {
                formValid = this.validate.countryLocation.valid;
            }

            //Validate City field
            let city_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.cityLocation = this.functionsUtilService.validator(this.form.cityLocation, city_rules);
            if(!this.validate.cityLocation.valid) {
                formValid = this.validate.cityLocation.valid;
            }

            //Validate State field
            let state_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.stateLocation = this.functionsUtilService.validator(this.form.stateLocation, state_rules);
            if(!this.validate.stateLocation.valid) {
                formValid = this.validate.stateLocation.valid;
            }

            //Validate Address field
            let address_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.addressLocation = this.functionsUtilService.validator(this.form.addressLocation, address_rules);
            if(!this.validate.addressLocation.valid) {
                formValid = this.validate.addressLocation.valid;
            }

            //Validate Zip Code field
            //TODO por ahora no es importante validar el Zip Code, pero si el
            // usuario no escribe nada, me sale el error como si fuera requerido,
            // y este campo no es requerido, solucionar eso.
            /*let zipCode_rules = [NUMBER_ENUM];
            this.validate.zipCodeLocation = this.functionsUtilService.validator(this.form.zipCodeLocation, zipCode_rules);
            if(!this.validate.zipCodeLocation.valid) {
                formValid = this.validate.zipCodeLocation.valid;
            }*/

            //Validate Position field (lng)
            let position_rules = [NULL_ENUM, EMPTY_ENUM];
            let latValidate= this.functionsUtilService.validator(this.form.positionLocation.Lat, position_rules);
            let lngValidate = this.functionsUtilService.validator(this.form.positionLocation.Lng, position_rules);
            if(!latValidate.valid || !lngValidate.valid) {
                if(!latValidate.valid) {
                    this.validate.positionLocation = latValidate;
                    formValid = this.validate.positionLocation.valid;
                } else if(!lngValidate.valid) {
                    this.validate.positionLocation = lngValidate;
                    formValid = this.validate.positionLocation.valid;
                }
            }

            return formValid;
        }



        /**
        * changeHelpText
        * @description - change help block text (titles and descriptions) dynamically
        *  based on specific field (firstName, lastName, email, etc)
        * @use - this.changeHelpText('firstName');
        * @function
        * @return {void}
        */
        changeHelpText(type): void {
            //CONSTANTS
            const COUNTRY_TITLE = this.$filter('translate')('%create.teacher.location.help_text.cntry.title.text');
            const COUNTRY_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.cntry.description.text');
            const CITY_TITLE = this.$filter('translate')('%create.teacher.location.help_text.city.title.text');
            const CITY_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.city.description.text');
            const STATE_TITLE = this.$filter('translate')('%create.teacher.location.help_text.state.title.text');
            const STATE_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.state.description.text');
            const ADDRESS_TITLE = this.$filter('translate')('%create.teacher.location.help_text.address.title.text');
            const ADDRESS_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.address.description.text');
            const ZIP_CODE_TITLE = this.$filter('translate')('%create.teacher.location.help_text.zip_code.title.text');
            const ZIP_CODE_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.zip_code.description.text');
            const POSITION_TITLE = this.$filter('translate')('%create.teacher.location.help_text.position.title.text');
            const POSITION_DESCRIPTION = this.$filter('translate')('%create.teacher.location.help_text.position.description.text');
            /*****************************************************/

            switch(type) {
                case 'default':
                    this.helpText.title = this.HELP_TEXT_TITLE;
                    this.helpText.description = this.HELP_TEXT_DESCRIPTION;
                break;

                case 'country':
                    this.helpText.title = COUNTRY_TITLE;
                    this.helpText.description = COUNTRY_DESCRIPTION;
                break;

                case 'city':
                    this.helpText.title = CITY_TITLE;
                    this.helpText.description = CITY_DESCRIPTION;
                break;

                case 'state':
                    this.helpText.title = STATE_TITLE;
                    this.helpText.description = STATE_DESCRIPTION;
                break;

                case 'address':
                    this.helpText.title = ADDRESS_TITLE;
                    this.helpText.description = ADDRESS_DESCRIPTION;
                break;

                case 'zipCode':
                    this.helpText.title = ZIP_CODE_TITLE;
                    this.helpText.description = ZIP_CODE_DESCRIPTION;
                break;

                case 'position':
                    this.helpText.title = POSITION_TITLE;
                    this.helpText.description = POSITION_DESCRIPTION;
                break;
            }

        }



        /**
        * changeMapPosition
        * @description -
        * @use - this.changeMapPosition();
        * @function
        * @param {string} - change map position
        * @return {void}
        */
        changeMapPosition(): void {
            //VARIABLES
            let self = this;
            let countryCode = this.countryObject.code;
            /*********************************/

            this.form.countryLocation = countryCode;

            let location = {
                country: this.form.countryLocation,
                city: this.form.cityLocation,
                address: this.form.addressLocation
            };
            /************************************/

            this.$timeout(function(){
                self.$scope.$broadcast('CodeAddress', location);
            });

        }


        /**
        * _setDataModelFromForm
        * @description - get data from form's input in order to put it on $parent.teacherData
        * @use - this._getDataFromForm();
        * @function
        * @return {void}
        */
        private _setDataModelFromForm(): void {
            //VARIABLES
            let countryCode = this.countryObject.code;
            /*********************************/

            this.form.countryLocation = countryCode;
            // Send data to parent (createTeacherPage)
            this.$scope.$parent.vm.teacherData.Location.Country = this.form.countryLocation;
            this.$scope.$parent.vm.teacherData.Location.Address = this.form.addressLocation;
            this.$scope.$parent.vm.teacherData.Location.City = this.form.cityLocation;
            this.$scope.$parent.vm.teacherData.Location.State = this.form.stateLocation;
            this.$scope.$parent.vm.teacherData.Location.ZipCode = this.form.zipCodeLocation;
            this.$scope.$parent.vm.teacherData.Location.Position = this.form.positionLocation;
            //get position on Map
            this.changeMapPosition();
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Teacher Location Section to Parent Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */

        private _subscribeToEvents(): void {
            //VARIABLES
            let self = this;

            /**
            * Fill Form event
            * @parent - CreateTeacherPageController
            * @description - Parent send markers teacher data in order to
            * Child fill the form's field
            * @event
            */
            this.$scope.$on('Fill Form', function(event, args: app.models.teacher.Teacher) {
                self.form.addressLocation = args.Location.Address;
                self.form.cityLocation = args.Location.City;
                self.form.stateLocation = args.Location.State;
                self.form.zipCodeLocation = args.Location.ZipCode;
                //Charge Country on select List
                self.countryObject.code = args.Location.Country;
                //Current Map Position
                self.form.positionLocation = new app.models.user.Position(args.Location.Position);

                self.mapConfig = self.functionsUtilService.buildMapConfig(
                    [
                        {
                            id: self.form.positionLocation.Id,
                            location: {
                                position: {
                                    lat: parseFloat(self.form.positionLocation.Lat),
                                    lng: parseFloat(self.form.positionLocation.Lng)
                                }
                            }
                        }
                    ],
                    'drag-maker-map',
                    {lat: parseFloat(self.form.positionLocation.Lat), lng: parseFloat(self.form.positionLocation.Lng)}
                );

                /*
                * Send event to child (MapController) in order to It draws
                * each Marker on the Map
                */
                self.$scope.$broadcast('BuildMarkers', self.mapConfig);

            });

            /**
            * Return Position
            * @child - MapController
            * @description - Parent (TeacherLocationSectionController) receive
                             Child's event (MapController) with new position on
                             map (lng, lat)
            * @event
            */
            this.$scope.$on('Position', function(event, args) {
                self.form.positionLocation.Lng = args.lng;
                self.form.positionLocation.Lat = args.lat;
                //self.$scope.$parent.vm.teacherData.Location.Position = args;
            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherLocationSectionController.controllerId,
                    TeacherLocationSectionController);

}

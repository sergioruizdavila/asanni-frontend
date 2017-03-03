/**
 * UserEditLocationPageController
 * @description - User Edit Location Page Controller
 */

module app.pages.userEditLocationPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IUserEditLocationPageController {
        form: IUserEditLocationForm;
        validate: IUserEditLocationValidate;
        activate: () => void;
        goToEditMedia: () => void;
        goToEditProfile: () => void;
    }

    export interface IUserEditLocationForm {
        countryLocation: string;
        addressLocation: string;
        cityLocation: string;
        stateLocation: string;
        zipCodeLocation: string;
        positionLocation: app.models.user.Position;
    }

    interface IUserEditLocationValidate {
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
    export class UserEditLocationPageController implements IUserEditLocationPageController {

        static controllerId = 'mainApp.pages.userEditLocationPage.UserEditLocationPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        form: IUserEditLocationForm;
        validate: IUserEditLocationValidate;
        saving: boolean;
        saved: boolean;
        error: boolean;
        isTeacher: boolean;
        geocoder: google.maps.Geocoder;
        mapConfig: components.map.IMapConfig;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        TIME_SHOW_MESSAGE: number;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'dataConfig',
            'mainApp.models.user.UserService',
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$filter',
            '$timeout',
            '$scope',
            '$rootScope'
        ];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private dataConfig: IDataConfig,
            private userService: app.models.user.IUserService,
            private getDataFromJson: app.core.util.getDataStaticJson.IGetDataStaticJsonService,
            private functionsUtil: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $timeout: angular.ITimeoutService,
            private $scope: angular.IScope,
            private $rootScope: app.core.interfaces.IMainAppRootScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {
            //CONSTANTS
            this.TIME_SHOW_MESSAGE = 6000;

            //Validate if user is teacher
            //TODO: Esto deberia unificarse, no esta bien que tenga que ponerlo
            // en cada sección del editar perfil
            if(this.$rootScope.profileData) {
                this.isTeacher = this.$rootScope.profileData.IsTeacher;
            }

            // Init saving loading
            this.saving = false;

            // Init saved message
            this.saved = false;

            // Init error message
            this.error = false;

            //Init form
            this.form = {
                countryLocation: '',
                cityLocation: '',
                stateLocation: '',
                addressLocation: '',
                zipCodeLocation: '',
                positionLocation: new app.models.user.Position()
            };

            // Country Select List Structure
            this.countryObject = {code: '', value: ''};

            // Build Countries select lists
            this.listCountries = this.getDataFromJson.getCountryi18n();

            // Init Map
            this.mapConfig = this.functionsUtil.buildMapConfig(
                null, 'drag-maker-map', null, null
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
            DEBUG && console.log('UserEditLocationPage controller actived');

            //Charge user profile data
            this.fillFormWithLocationData();

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /*
        * Go to edit media page
        * @description this method is launched when user press 'Edit Photo' menu
        * option
        */
        goToEditMedia(): void {
            // Go to next page on calls stack
            this.$state.go('page.userEditMediaPage');
        }


        /*
        * Go to edit profile page
        * @description this method is launched when user press 'Edit Profile' menu
        * option
        */
        goToEditProfile(): void {
            this.$state.go('page.userEditProfilePage');
        }



        /**
        * fillFormWithLocationData
        * @description - get user profile data from DB, and fill each field on form.
        * @function
        * @return void
        */
        fillFormWithLocationData(): void {
            // VARIABLES
            let self = this;
            let userId = this.$rootScope.userData.id;

            //TODO: Analizar si este llamado es necesario, ya que cada vez que refresco
            // en el run llamo a esta funcion y traigo la información del usuario
            // asi que es bobada hacerlo 2 veces.
            if(userId) {
                // GET USER PROFILE DATA
                this.userService.getUserProfileById(userId)
                .then(
                    function(response) {

                        if(response.userId) {
                            self.$rootScope.profileData = new app.models.user.Profile(response);
                            self._fillForm(self.$rootScope.profileData);
                        }

                    }
                );
            }
        }



        /**
        * _fillForm
        * @description - Fill form with user location data
        * @use - this._fillForm(data);
        * @function
        * @param {app.models.user.Profile} data - Profile Data
        * @return {void}
        */
        private _fillForm(data: app.models.user.Profile): void {
            this.form.addressLocation = data.Location.Address;
            this.form.cityLocation = data.Location.City;
            this.form.stateLocation = data.Location.State;
            this.form.zipCodeLocation = data.Location.ZipCode;
            //Charge Country on select List
            this.countryObject.code = data.Location.Country;
            //Current Map Position
            this.form.positionLocation = new app.models.user.Position(data.Location.Position);

            this.mapConfig = this.functionsUtil.buildMapConfig(
                [
                    {
                        id: this.form.positionLocation.Id,
                        location: {
                            position: {
                                lat: parseFloat(this.form.positionLocation.Lat),
                                lng: parseFloat(this.form.positionLocation.Lng)
                            }
                        }
                    }
                ],
                'drag-maker-map',
                {lat: parseFloat(this.form.positionLocation.Lat), lng: parseFloat(this.form.positionLocation.Lng)},
                null
            );

            /*
            * Send event to child (MapController) in order to It draws
            * each Marker on the Map
            */
            this.$scope.$broadcast('BuildMarkers', this.mapConfig);
        }



        /**
        * _validateLocationForm
        * @description - Validate each field on location's form
        * @use - this._validateLocationForm();
        * @function
        * @return {boolean} formValid - return If the complete form is valid or not.
        */
        private _validateLocationForm(): boolean {
            //CONSTANTS
            const NULL_ENUM = app.core.util.functionsUtil.Validation.Null;
            const EMPTY_ENUM = app.core.util.functionsUtil.Validation.Empty;
            const NUMBER_ENUM = app.core.util.functionsUtil.Validation.Number;

            /***************************************************/
            //VARIABLES
            let formValid = true;

            //Validate Country field
            let country_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.countryLocation = this.functionsUtil.validator(this.countryObject.code, country_rules);
            if(!this.validate.countryLocation.valid) {
                formValid = this.validate.countryLocation.valid;
            }

            //Validate City field
            let city_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.cityLocation = this.functionsUtil.validator(this.form.cityLocation, city_rules);
            if(!this.validate.cityLocation.valid) {
                formValid = this.validate.cityLocation.valid;
            }

            //Validate State field
            let state_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.stateLocation = this.functionsUtil.validator(this.form.stateLocation, state_rules);
            if(!this.validate.stateLocation.valid) {
                formValid = this.validate.stateLocation.valid;
            }

            //Validate Address field
            let address_rules = [NULL_ENUM, EMPTY_ENUM];
            this.validate.addressLocation = this.functionsUtil.validator(this.form.addressLocation, address_rules);
            if(!this.validate.addressLocation.valid) {
                formValid = this.validate.addressLocation.valid;
            }

            //Validate Position on Map
            let position_rules = [NULL_ENUM, EMPTY_ENUM];
            let latValidate= this.functionsUtil.validator(this.form.positionLocation.Lat, position_rules);
            let lngValidate = this.functionsUtil.validator(this.form.positionLocation.Lng, position_rules);
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
        * _setLocationFromForm
        * @description - get data from form's input in order to put it on $parent.teacherData
        * @use - this._setLocationFromForm();
        * @function
        * @return {void}
        */
        private _setLocationFromForm(): void {
            //VARIABLES
            let countryCode = this.countryObject.code;
            /*********************************/

            this.form.countryLocation = countryCode;
            // Send data to parent (createTeacherPage)
            this.$rootScope.profileData.Location.Country = this.form.countryLocation;
            this.$rootScope.profileData.Location.Address = this.form.addressLocation;
            this.$rootScope.profileData.Location.City = this.form.cityLocation;
            this.$rootScope.profileData.Location.State = this.form.stateLocation;
            this.$rootScope.profileData.Location.ZipCode = this.form.zipCodeLocation;
            this.$rootScope.profileData.Location.Position = this.form.positionLocation;
            //FIXME: Si lo dejo, cuando le doy guardar, se me vuelve a poner el
            // marker en la posicion anterior. Asi que no se si esta linea sea
            // necesaria.
            //get position on Map
            //this.changeMapPosition();
        }



        /**
        * saveBasicInfoSection
        * @description - Update profile's basic data calling to save method
        * @function
        * @return void
        */
        saveLocationSection(): void {
            //VARIABLES
            let self = this;
            //Validate data form
            let formValid = this._validateLocationForm();

            if(formValid) {
                //loading On
                this.saving = true;

                this._setLocationFromForm();
                this.save().then(
                    function(saved) {
                        //loading Off
                        self.saving = false;
                        self.saved = saved;
                        self.error = !saved;

                        self.$timeout(function() {
                            self.saved = false;
                        }, self.TIME_SHOW_MESSAGE);
                    }
                );
            } else {
                //Go top pages
                window.scrollTo(0, 0);
            }
        }



        /**
        * save
        * @description - Update location's languages data on DB
        * @function
        * @return {angular.IPromise<boolean>} saved - return if saved or not data
        */
        save(): angular.IPromise<boolean> {
            //VARIABLES
            let self = this;

            // Save profile's updated data
            return this.userService.updateUserProfile(this.$rootScope.profileData)
            .then(
                function(response) {
                    let saved = false;
                    if(response.userId) {
                        //Fill Form
                        self.$rootScope.profileData = new app.models.user.Profile(response);
                        saved = true;
                    }
                    return saved;
                },
                function(error) {
                    DEBUG && console.error(error);
                    return false;
                }
            );
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
            * Return Position
            * @child - MapController
            * @description - Parent (UserEditLocationPageController) receive
                             Child's event (MapController) with new position on
                             map (lng, lat)
            * @event
            */
            this.$scope.$on('Position', function(event, args) {
                self.form.positionLocation.Lng = args.lng;
                self.form.positionLocation.Lat = args.lat;
            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.userEditLocationPage')
        .controller(UserEditLocationPageController.controllerId, UserEditLocationPageController);

}

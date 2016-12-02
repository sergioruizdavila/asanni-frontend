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
        error: ITeacherLocationError;
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
    }


    export interface ITeacherLocationError {
        message: string;
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
        error: ITeacherLocationError;
        geocoder: google.maps.Geocoder;
        mapConfig: components.map.IMapConfig;
        listCountries: Array<app.core.interfaces.IDataFromJsonI18n>;
        countryObject: app.core.interfaces.IDataFromJsonI18n;
        STEP1_STATE: string;
        STEP2_STATE: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.core.util.GetDataStaticJsonService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
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
            this.STEP2_STATE = 'page.createTeacherPage.location';
            /*********************************/

            //Put title on parent scope
            this.$scope.$parent.vm.titleSection = 'Step2: Where are you located?';
            this.$scope.$parent.vm.progressWidth = this.functionsUtilService.progress(2, 9);

            // Country Select List Structure
            this.countryObject = {code: '', value: ''};

            //Init form
            this.form = {
                countryLocation: '',
                cityLocation: '',
                stateLocation: '',
                addressLocation: '',
                zipCodeLocation: ''
            };

            //Build Countries select lists
            this.listCountries = this.getDataFromJson.getCountryi18n();

            //Init map config
            this.mapConfig = this.functionsUtilService.buildMapConfig(
                [{id:1, location: {position: {lat: 6.175434, lng: -75.583329}}}], //TODO: Cambiar esta guachada
                'drag-maker-map',
                {lat: 6.175434, lng: -75.583329}
            );

            let location = {
                country: 'Colombia',
                city: 'Envigado',
                address: 'Carrera 31 No 41Sur - 64'
            };

            this.$timeout(function(){
                self.$scope.$broadcast('CodeAddress', location);
            });

            this.error = {
                message: ''
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

            this.$scope.$emit('Save Data', CURRENT_STEP);

            // GO TO NEXT STEP
            this.$state.go(this.STEP2_STATE, {reload: true});

        }


        /**
        * goToBack
        * @description - go to back step
        * @function
        * @return void
        */
        goToBack(): void {
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
            
            this.$scope.$emit('Save Data');
            this.$state.go(this.STEP1_STATE, {reload: true});
        }


        /**
        * changeMapPosition
        * @description -
        * @use - this._subscribeToEvents();
        * @function
        * @param {string} - teacher's address info
        * @return {void}
        */
        changeMapPosition(): void {
            let location = {
                country: this.form.countryLocation,
                city: this.form.cityLocation,
                address: this.form.addressLocation
            };

            this.$scope.$broadcast('CodeAddress', location);
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
                self.$scope.$parent.vm.teacherData.Location.Position = args;
            });
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.createTeacherPage')
        .controller(TeacherLocationSectionController.controllerId,
                    TeacherLocationSectionController);

}

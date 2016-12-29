/**
 * SearchPageController
 * @description - Search Page Controller
 */

module app.pages.searchPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    interface ISearchPageController {
        error: ISearchPageError;
        activate: () => void;
    }

    interface ISearchPageError {
        message: string;
    }

    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class SearchPageController implements ISearchPageController {

        static controllerId = 'mainApp.pages.searchPage.SearchPageController';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        error: ISearchPageError;
        mapConfig: components.map.IMapConfig;
        data: Array<app.models.student.Student>;
        _hoverDetail: Array<boolean>;
        type: string;
        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        public static $inject = [
            'mainApp.models.student.StudentService',
            'mainApp.models.teacher.TeacherService',
            'mainApp.models.school.SchoolService',
            'mainApp.core.util.FunctionsUtilService',
            '$state',
            '$filter',
            '$scope',
            '$rootScope'];

        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(
            private StudentService: app.models.student.IStudentService,
            private TeacherService: app.models.teacher.ITeacherService,
            private SchoolService: app.models.school.ISchoolService,
            private FunctionsUtilService: app.core.util.functionsUtil.IFunctionsUtilService,
            private $state: ng.ui.IStateService,
            private $filter: angular.IFilterService,
            private $scope: angular.IScope,
            private $rootScope: angular.IRootScopeService) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init users list
            this.data = [];

            //Type of results (student, teacher, school)
            this.type = null;

            //Init hoverDetail array
            this._hoverDetail = [];

            this.error = {
                message: ''
            };

            this.activate();
        }

        /*-- ACTIVATE METHOD --*/
        activate(): void {
            //VARIABLES
            let self = this;
            //LOG
            console.log('searchPage controller actived');

            //SUBSCRIBE TO EVENTS
            this._subscribeToEvents();

            //Get All Students of this zone (Default results)
            this.StudentService.getAllStudents().then(
                function(response: Array<app.models.student.Student>) {
                    self.type = 'student';
                    self.mapConfig = self.FunctionsUtilService.buildMapConfig(
                        response,
                        'search-map',
                        {lat: 6.175434,lng: -75.583329}
                    );
                    self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                }
            );

        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        /**
        * _getResultTemplate
        * @description - this method return specific template based on type
        * result (students, teachers, schools, etc)
        * @use - this._getResultTemplate('student');
        * @function
        * @params {string} type - type of results list (students, teachers, schools, etc)
        * @return {string} result template path
        */

        private _getResultTemplate(type: string): string {
            //CONSTANTS
            const STUDENT_TYPE = 'student';
            const TEACHER_TYPE = 'teacher';
            const SCHOOL_TYPE = 'school';
            /*********************************/

            switch (type) {
                case STUDENT_TYPE:
                return 'app/pages/searchPage/studentResult/studentResult.html';
                case TEACHER_TYPE:
                return 'app/pages/searchPage/teacherResult/teacherResult.html';
                case SCHOOL_TYPE:
                return 'app/pages/searchPage/schoolResult/schoolResult.html';
            }
        }



        /**
        * _assignNativeClass
        * @description - this method return if teacher is native or not
        * result (students, teachers, schools, etc)
        * @use - this._assignNativeClass(languages);
        * @function
        * @param {native Array, learn Array and teach Array} languages
        * teacher languages (native, teach and learn)
        * @return {boolean} isNative
        */

        private _assignNativeClass(languages): boolean {
            let native = languages.native;
            let teach = languages.teach;
            let isNative = false;

            for (let i = 0; i < native.length; i++) {
                for (let j = 0; j < teach.length; j++) {
                    if(teach[j] === native[i]) {
                        isNative = true;
                    }
                }
            }

            return isNative;
        }



        /**
        * _hoverEvent
        * @description - this method is launched  when user launchs
        * mouseover/mouseleave event on result container
        * @use - this._hoverEvent('10', true);
        * @function
        * @param {string} id - container result id
        * @param {boolean} status - mouseover = true / mouseleave = false
        */

        private _hoverEvent(id: string, status: boolean): void {
            //VARIABLES
            let args = {id: id, status: status};
            this._hoverDetail[id] = status;
            /*
            * Send event to child (MapController) in order to It changes icon in
            * specific Marker on the Map
            */
            this.$rootScope.$broadcast('ChangeMarker', args);
        }



        /**
        * _subscribeToEvents
        * @description - this method subscribes Search Page to Child's Events
        * @use - this._subscribeToEvents();
        * @function
        * @return {void}
        */

        private _subscribeToEvents(): void {
            // VARIABLES
            let self = this;

            /**
            * Students event
            * @child - MapController
            * @description - Parent (SearchPageController) receive Child's
                             event (MapController) in order to get
                             students list from server
            * @event
            */
            this.$scope.$on('Students', function(event, args) {
                //Get All Users of this zone
                self.StudentService.getAllStudents().then(
                    function(response: Array<app.models.student.Student>) {

                        self.type = 'student';
                        self.mapConfig = self.FunctionsUtilService.buildMapConfig(
                            response,
                            'search-map',
                            {lat: 6.175434,lng: -75.583329}
                        );

                        /*
                        * Send event to child (MapController) in order to It draws
                        * each Marker on the Map
                        */
                        self.$scope.$broadcast('BuildMarkers', self.mapConfig);

                        self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                    }
                );
            });


            /**
            * Teachers event
            * @child - MapController
            * @description - Parent (SearchPageController) receive Child's
                             event (MapController) in order to get
                             teachers list from server
            * @event
            */
            this.$scope.$on('Teachers', function(event, args) {
                //Get All Teachers of this zone
                self.TeacherService.getAllTeachers().then(
                    function(response: app.models.teacher.ITeacherQueryObject) {

                        self.type = 'teacher';
                        self.mapConfig = self.FunctionsUtilService.buildMapConfig(
                            response.results,
                            'search-map',
                            null
                        );

                        /*
                        * Send event to child (MapController) in order to It draws
                        * each Marker on the Map
                        */
                        self.$scope.$broadcast('BuildMarkers', self.mapConfig);

                        self.data = self.FunctionsUtilService.splitToColumns(response.results, 2);
                    }
                );
            });


            /**
            * Schools event
            * @child - MapController
            * @description - Parent (SearchPageController) receive Child's
                             event (MapController) in order to get
                             schools list from server
            * @event
            */
            this.$scope.$on('Schools', function(event, args) {
                //Get All Schools of this zone
                self.SchoolService.getAllSchools().then(
                    function(response: Array<app.models.school.School>) {

                        self.type = 'school';
                        self.mapConfig = self.FunctionsUtilService.buildMapConfig(
                            response,
                            'search-map',
                            {lat: 6.175434,lng: -75.583329}
                        );

                        /*
                        * Send event to child (MapController) in order to It draws
                        * each Marker on the Map
                        */
                        self.$scope.$broadcast('BuildMarkers', self.mapConfig);

                        self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                    }
                );
            });



            /**
            * SelectContainer event
            * @child - MapController
            * @description - Parent (SearchPageController) receive Child's
                             event (MapController) in order to selected
                             specific result container
            * @event
            */
            this.$scope.$on('SelectContainer', function(event, args) {
                //VARIABLES
                let containerId = '#container-' + args;
                let containerClasses = document.querySelector(containerId).classList;
                containerClasses.add('search-result__teacher__block--selected');
                document.querySelector(containerId).scrollIntoView({ behavior: 'smooth' });
            });
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.searchPage')
        .controller(SearchPageController.controllerId, SearchPageController);

}

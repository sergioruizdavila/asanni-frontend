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
            '$scope'];

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
            private $scope: angular.IScope) {

            this._init();

        }

        /*-- INITIALIZE METHOD --*/
        private _init() {

            //Init users list
            this.data = [];

            //Type of results (student, teacher, school)
            this.type = null;

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
                    self.mapConfig = self.FunctionsUtilService.buildMarkersOnMap(
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
                        self.mapConfig = self.FunctionsUtilService.buildMarkersOnMap(
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
                    function(response: Array<app.models.teacher.Teacher>) {

                        self.type = 'teacher';
                        self.mapConfig = self.FunctionsUtilService.buildMarkersOnMap(
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
                        self.mapConfig = self.FunctionsUtilService.buildMarkersOnMap(
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
        }


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.searchPage')
        .controller(SearchPageController.controllerId, SearchPageController);

}

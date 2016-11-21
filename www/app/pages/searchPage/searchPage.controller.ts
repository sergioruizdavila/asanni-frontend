/**
 * SearchPageController
 * @description - Search Page Controller
 */

module app.pages.searchPage {

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface ISearchPageController {
        error: ISearchPageError;
        activate: () => void;
    }

    export interface ISearchPageError {
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

            //Get All Users of this zone
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

            //Get All Teachers of this zone
            /*this.TeacherService.getAllTeachers().then(
                function(response: Array<app.models.teacher.Teacher>) {
                    self.type = 'teacher';
                    self.mapConfig = self.FunctionsUtilService.buildMarkersOnMap(
                        response,
                        'search-map',
                        {lat: 6.175434,lng: -75.583329}
                    );
                    self.data = self.FunctionsUtilService.splitToColumns(response, 2);
                }
            );*/
        }

        /**********************************/
        /*            METHODS             */
        /**********************************/

        private _buildMarkers(userData): components.map.IMapConfig {
            //VARIABLES
            let mapConfig: components.map.IMapConfig = {
                type: 'search-map',
                data: {
                    position: {
                        lat: 6.175434,
                        lng: -75.583329
                    },
                    markers: []
                }
            };

            for (let i = 0; i < userData.length; i++) {
                mapConfig.data.markers.push({
                    id: userData[i].id,
                    position: userData[i].location.position
                });
            }

            return mapConfig;
        }


        getResultTemplate(type): string {
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


    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.pages.searchPage')
        .controller(SearchPageController.controllerId, SearchPageController);

}

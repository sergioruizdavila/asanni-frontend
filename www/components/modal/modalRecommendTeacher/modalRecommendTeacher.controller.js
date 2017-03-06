var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalRecommendTeacher;
        (function (modalRecommendTeacher) {
            var ModalRecommendTeacherController = (function () {
                function ModalRecommendTeacherController($uibModalInstance, dataSetModal, localStorage, StudentService, $state, dataConfig, $timeout, $filter, $rootScope) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.localStorage = localStorage;
                    this.StudentService = StudentService;
                    this.$state = $state;
                    this.dataConfig = dataConfig;
                    this.$timeout = $timeout;
                    this.$filter = $filter;
                    this.$rootScope = $rootScope;
                    this._init();
                }
                ModalRecommendTeacherController.prototype._init = function () {
                    var self = this;
                    this.activate();
                };
                ModalRecommendTeacherController.prototype.activate = function () {
                    var self = this;
                    console.log('modalRecommendTeacher controller actived');
                    this.StudentService.getRatingByEarlyid(this.dataSetModal.earlyId).then(function (response) {
                        if (response.id) {
                            self.rating = new app.models.teacher.Rating(response);
                        }
                    });
                };
                ModalRecommendTeacherController.prototype._join = function () {
                    var CREATE_TEACHER = 'page.createTeacherPage.start';
                    var CLICK_MIXPANEL = 'Click: Join as a Teacher from recommendation modal';
                    mixpanel.track(CLICK_MIXPANEL);
                    this.localStorage.setItem(this.dataConfig.earlyIdLocalStorage, this.dataSetModal.earlyId);
                    this.$uibModalInstance.close();
                    this.$state.go(CREATE_TEACHER, { reload: true });
                };
                ModalRecommendTeacherController.prototype.close = function () {
                    var CLICK_MIXPANEL = 'Click on Close recommend teacher modal button';
                    mixpanel.track(CLICK_MIXPANEL);
                    this.localStorage.setItem(this.dataConfig.earlyIdLocalStorage, this.dataSetModal.earlyId);
                    this.$rootScope.activeMessageBar = true;
                    this.$uibModalInstance.close();
                };
                return ModalRecommendTeacherController;
            }());
            ModalRecommendTeacherController.controllerId = 'mainApp.components.modal.ModalRecommendTeacherController';
            ModalRecommendTeacherController.$inject = [
                '$uibModalInstance',
                'dataSetModal',
                'mainApp.localStorageService',
                'mainApp.models.student.StudentService',
                '$state',
                'dataConfig',
                '$timeout',
                '$filter',
                '$rootScope'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalRecommendTeacherController.controllerId, ModalRecommendTeacherController);
        })(modalRecommendTeacher = modal.modalRecommendTeacher || (modal.modalRecommendTeacher = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalRecommendTeacher.controller.js.map
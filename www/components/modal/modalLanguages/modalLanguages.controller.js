var components;
(function (components) {
    var modal;
    (function (modal) {
        var modalLanguages;
        (function (modalLanguages) {
            var ModalLanguagesController = (function () {
                function ModalLanguagesController($uibModalInstance, dataSetModal, $timeout) {
                    this.$uibModalInstance = $uibModalInstance;
                    this.dataSetModal = dataSetModal;
                    this.$timeout = $timeout;
                    this._init();
                }
                ModalLanguagesController.prototype._init = function () {
                    var self = this;
                    console.log('Title');
                    this.form = {
                        options: this.dataSetModal.list || []
                    };
                    this.$timeout(function () {
                        self._buildLanguagesChecked();
                    });
                    this.error = {
                        message: ''
                    };
                    this.activate();
                };
                ModalLanguagesController.prototype.activate = function () {
                    console.log('modalLanguages controller actived');
                };
                ModalLanguagesController.prototype.addLanguages = function (key) {
                    var check = document.getElementById('language-' + key);
                    var checkClasses = check.classList;
                    var checked = check.getAttribute('data-checked');
                    var value = check.innerText;
                    if (checked == 'true') {
                        this._removeLanguage(key);
                        checkClasses.remove('ma-label--box--check--active');
                        check.setAttribute('data-checked', 'false');
                    }
                    else {
                        var option = {
                            key: key,
                            value: value
                        };
                        this.form.options.push(option);
                        checkClasses.add('ma-label--box--check--active');
                        check.setAttribute('data-checked', 'true');
                    }
                };
                ModalLanguagesController.prototype._removeLanguage = function (key) {
                    this.form.options = this.form.options.filter(function (el) {
                        return el.key !== key;
                    });
                };
                ModalLanguagesController.prototype._buildLanguagesChecked = function () {
                    if (this.form.options.length > 0) {
                        for (var i = 0; i < this.form.options.length; i++) {
                            var language = this.form.options[i];
                            var check = document.getElementById('language-' + language.key);
                            var checkClasses = check.classList;
                            checkClasses.add('ma-label--box--check--active');
                            check.setAttribute('data-checked', 'true');
                        }
                    }
                };
                ModalLanguagesController.prototype._save = function () {
                    this.$uibModalInstance.close(this.form.options);
                };
                ModalLanguagesController.prototype.close = function () {
                    this.$uibModalInstance.close();
                    event.preventDefault();
                };
                return ModalLanguagesController;
            }());
            ModalLanguagesController.controllerId = 'mainApp.components.modal.ModalLanguageController';
            ModalLanguagesController.$inject = [
                '$uibModalInstance',
                'dataSetModal',
                '$timeout'
            ];
            angular.module('mainApp.components.modal')
                .controller(ModalLanguagesController.controllerId, ModalLanguagesController);
        })(modalLanguages = modal.modalLanguages || (modal.modalLanguages = {}));
    })(modal = components.modal || (components.modal = {}));
})(components || (components = {}));
//# sourceMappingURL=modalLanguages.controller.js.map
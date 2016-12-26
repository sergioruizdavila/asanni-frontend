var app;
(function (app) {
    var core;
    (function (core) {
        var s3Upload;
        (function (s3Upload) {
            'use strict';
            var S3UploadService = (function () {
                function S3UploadService($q) {
                    this.$q = $q;
                    console.log('S3Upload service instanced');
                    this.REGION = 'us-east-1';
                    this.ACCESS_KEY_ID = 'AKIAIHKBYIUQD4KBIRLQ';
                    this.SECRET_ACCESS_KEY = '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';
                    this.BUCKET = 'waysily-img';
                    AWS.config.region = this.REGION;
                    AWS.config.update({
                        accessKeyId: this.ACCESS_KEY_ID,
                        secretAccessKey: this.SECRET_ACCESS_KEY
                    });
                    this.bucket = new AWS.S3({
                        params: { Bucket: this.BUCKET, maxRetries: 10 },
                        httpOptions: { timeout: 360000 }
                    });
                }
                S3UploadService.prototype.upload = function (file) {
                    var deferred = this.$q.defer();
                    var params = {
                        Bucket: this.BUCKET,
                        Key: file.name,
                        ContentType: file.type,
                        Body: file
                    };
                    var options = {
                        partSize: 10 * 1024 * 1024,
                        queueSize: 1,
                        ACL: 'bucket-owner-full-control'
                    };
                    var uploader = this.bucket.upload(params, options, function (err, data) {
                        if (err) {
                            deferred.reject(err);
                        }
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                };
                return S3UploadService;
            }());
            S3UploadService.serviceId = 'mainApp.core.s3Upload.S3UploadService';
            S3UploadService.$inject = ['$q'];
            s3Upload.S3UploadService = S3UploadService;
            angular
                .module('mainApp.core.s3Upload', [])
                .service(S3UploadService.serviceId, S3UploadService);
        })(s3Upload = core.s3Upload || (core.s3Upload = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
//# sourceMappingURL=s3Upload.service.js.map
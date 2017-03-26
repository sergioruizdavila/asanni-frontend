var app;
(function (app) {
    var core;
    (function (core) {
        var s3Upload;
        (function (s3Upload) {
            'use strict';
            var S3UploadService = (function () {
                function S3UploadService($q, dataConfig) {
                    this.$q = $q;
                    this.dataConfig = dataConfig;
                    console.log('S3Upload service instanced');
                    this.REGION = this.dataConfig.regionS3;
                    this.ACCESS_KEY_ID = this.dataConfig.accessKeyIdS3;
                    this.SECRET_ACCESS_KEY = this.dataConfig.secretAccessKeyS3;
                    this.BUCKET = this.dataConfig.bucketS3;
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
                S3UploadService.serviceId = 'mainApp.core.s3Upload.S3UploadService';
                S3UploadService.$inject = ['$q', 'dataConfig'];
                return S3UploadService;
            }());
            s3Upload.S3UploadService = S3UploadService;
            angular
                .module('mainApp.core.s3Upload', [])
                .service(S3UploadService.serviceId, S3UploadService);
        })(s3Upload = core.s3Upload || (core.s3Upload = {}));
    })(core = app.core || (app.core = {}));
})(app || (app = {}));

//# sourceMappingURL=../../../../maps/app/core/s3Upload/s3Upload.service.js.map

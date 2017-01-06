/**
 * S3Upload Service
 * @description - Services related on upload files on Amazon AWS S3.
 * @constructor
 */

module app.core.s3Upload {

    'use strict';

    declare const AWS: any;

    /**********************************/
    /*           INTERFACES           */
    /**********************************/
    export interface IS3UploadService {
        upload: (file: File) => angular.IPromise<any>;
    }


    /****************************************/
    /*           CLASS DEFINITION           */
    /****************************************/
    export class S3UploadService implements IS3UploadService {

        static serviceId = 'mainApp.core.s3Upload.S3UploadService';

        /**********************************/
        /*           PROPERTIES           */
        /**********************************/
        bucket: any;
        REGION: string;
        ACCESS_KEY_ID: string;
        SECRET_ACCESS_KEY: string;
        BUCKET: string;

        // --------------------------------


        /*-- INJECT DEPENDENCIES --*/
        static $inject = ['$q', 'dataConfig'];


        /**********************************/
        /*           CONSTRUCTOR          */
        /**********************************/
        constructor(private $q: ng.IQService, private dataConfig: IDataConfig) {
            //LOG
            console.log('S3Upload service instanced');
            //CONSTANTS
            this.REGION = this.dataConfig.regionS3;
            this.ACCESS_KEY_ID = this.dataConfig.accessKeyIdS3;
            this.SECRET_ACCESS_KEY = this.dataConfig.secretAccessKeyS3;
            this.BUCKET = this.dataConfig.bucketS3;
            /*********************************/

            // Init AWS S3
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

        /**********************************/
        /*            METHODS             */
        /**********************************/


        /**
        * upload
        * @description - upload file on Amazon AWS S3
        * @use - this.S3UploadService.upload(file);
        * @function
        * @param {File} file file object
        * @return {angular.IPromise<any>} promise
        */

        upload(file): angular.IPromise<any> {
            //VARIABLES
            var deferred = this.$q.defer();
            var params = {
                Bucket: this.BUCKET,
                Key: file.name,
                ContentType: file.type,
                Body: file
            };
            var options = {
                // Part Size of 10mb
                partSize: 10 * 1024 * 1024,
                queueSize: 1,
                // Give the owner of the bucket full control
                ACL: 'bucket-owner-full-control'
            };
            /*********************************************/

            // Upload file to Amazon S3 Service
            var uploader = this.bucket.upload(params, options, function (err, data) {
                if (err) {
                    deferred.reject(err);
                }
                deferred.resolve(data);
            });

            // Notify Upload process in order to show a loading bar or loading gif
            /*uploader.on('httpUploadProgress', function (event) {
                deferred.notify(event);
            });*/

            return deferred.promise;
        }

    }

    /*-- MODULE DEFINITION --*/
    angular
        .module('mainApp.core.s3Upload', [])
        .service(S3UploadService.serviceId, S3UploadService);

}

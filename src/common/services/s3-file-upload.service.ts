import { Logger,Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from 'aws-sdk';

@Injectable()
export class FileUploadService {
    constructor( private configService: ConfigService){}

    async upload(file) {
        const { originalname } = file;
        const bucketS3 = this.configService.get('AWS_BUCKET_NAME');
        return await this.uploadS3(file.buffer, bucketS3, originalname);
    }

    async uploadS3(file, bucket, name) {
        const s3 = new S3({
            accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
          });
        const params = {
            Bucket: bucket,
            Key: 'hooray/'+String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
            if (err) {
                Logger.error(err);
                reject(err.message);
            }
            resolve(data);
            });
        });
    }

}
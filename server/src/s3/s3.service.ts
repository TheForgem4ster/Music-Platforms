import { Injectable, Logger } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
    DeleteObjectCommandInput,
    DeleteObjectCommandOutput,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { ConfigService } from '@nestjs/config';
import * as uuid from 'uuid'
import * as url from 'url';


@Injectable()
export class S3Service {

    private logger = new Logger(S3Service.name);
    private region: string;
    private s3: S3Client;

    constructor(private configService: ConfigService) {
        this.region = this.configService.get<string>('REGION');
        const accessKeyId = this.configService.get<string>('ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get<string>('SECRET_ACCESS_KEY');
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }

        });
    }

    async uploadFile(file: Express.Multer.File, key: string) {
        const bucket = this.configService.get<string>('BUCKET');
        const fileExtension = file.originalname.split('.').pop();

        const fileName = `media/${key}/${file.fieldname}/` + uuid.v4() + '.' + fileExtension;

        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: fileName,
            ContentType: file.mimetype,
        }

        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            );
            if (response.$metadata.httpStatusCode === 200) {
                const apiUrlAws = this.configService.get<string>('API_URL_AWS');
                return `${apiUrlAws}${fileName}`;
            }
            throw new Error('Image not saved in s3!');
        } catch (err) {
            this.logger.error('Cannot save file to s3,', err);
            throw err;
        }
    }
    async deleteFile(_key: string) {

        const parsedUrl = url.parse(_key);
        const input: DeleteObjectCommandInput = {
            Bucket: this.configService.get<string>('BUCKET'),
            Key: (parsedUrl.path).substring(1),

        }

        try {
            const response: DeleteObjectCommandOutput = await this.s3.send(
                new DeleteObjectCommand(input),
            );
           

        } catch (err) {
            this.logger.error('Cannot delete file to s3,', err);
            throw err;
        }
    }
}


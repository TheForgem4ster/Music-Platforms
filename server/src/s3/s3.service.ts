import {Injectable,Logger } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { ConfigService } from '@nestjs/config';


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

        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
        }
        
        try {
            const response: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            );
            if (response.$metadata.httpStatusCode === 200) {
                const apiUrlAws = this.configService.get<string>('API_URL_AWS');
                return `${apiUrlAws}${key}`;
            }
            throw new Error('Image not saved in s3!');
        } catch (err) {
            this.logger.error('Cannot save file to s3,', err);
            throw err;
        }
    }

}

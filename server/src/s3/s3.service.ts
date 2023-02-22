import {Injectable,Logger } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    PutObjectCommandInput,
    PutObjectCommandOutput,
} from "@aws-sdk/client-s3";




@Injectable()
export class S3Service {
    private logger = new Logger(S3Service.name);
    private region: string;
    private s3: S3Client;

    constructor() {
        this.region =  'eu-central-1';
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                accessKeyId: "AKIA4O2WS4RNSD2DSJKH",
                secretAccessKey: "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"
              }

        });
    }
    async uploadFile(file: Express.Multer.File, key: string) {
        const bucket ='musicplatform';
        
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
               
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            }
            throw new Error('Image not saved in s3!');
        } catch (err) {
            this.logger.error('Cannot save file to s3,', err);
            throw err;
        }
    }

}

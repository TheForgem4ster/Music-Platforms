import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { S3Service } from "../s3/s3.service";
import sharp from 'sharp';

export enum FileType {
    AUDIO = 'audio',
    IMAGE = 'image'
}

@Injectable()
export class FileService {
    async createFile(type: FileType, file): Promise<string> {
        try {
            const NodeID3 = require('node-id3')
            const fileExtension = file.originalname.split('.').pop();
            const fileName = uuid.v4() + '.' + fileExtension;
            const filePath = path.resolve(__dirname, '..', 'static', type);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            let processedBuffer = file.buffer;

            if (type === FileType.IMAGE) {
                processedBuffer = await this.resizeImage(file.buffer, 200, 200);
            }
            console.log("processedBuffer", processedBuffer)
            const success =  NodeID3.removeTagsFromBuffer(processedBuffer)
            console.log("success", success)
            fs.writeFileSync(path.resolve(filePath, fileName), success);
            return type + '/' + fileName;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async resizeImage(buffer: Buffer, width: number, height: number): Promise<Buffer> {
        const sharp = require('sharp');
        return sharp(buffer)
            .resize(width, height)
            .toBuffer();
    }

    removeFile(filePath: string) {
        fs.unlink("dist/static/" + filePath, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(`${filePath} was deleted`);
        });
    }
}
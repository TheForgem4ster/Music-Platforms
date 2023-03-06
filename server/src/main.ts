import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);
        app.enableCors()

        const config = new DocumentBuilder().setTitle("musicPlatform").setDescription("full API")
            .setVersion("1.0").addTag("API").build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup("api", app, document);

        await app.listen(PORT, () => console.log(`server start on PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start()
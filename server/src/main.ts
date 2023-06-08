import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Music Platform')
      .setDescription('Documentation REST API to Music Platform')
      .setVersion('1.0.0')
      .addTag('REST API Music Platform')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    //app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`server start on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

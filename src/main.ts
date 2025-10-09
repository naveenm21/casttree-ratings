import "./instrument";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser";
import "dotenv/config";
import helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.SERVER_PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      preflightContinue: false,
      optionsSuccessStatus: 200,
      origin: JSON.parse(process.env.CORS_ALLOWED_ORIGIN),
      credentials: true,
      allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
      methods: process.env.CORS_ALLOWED_METHODS,
    },
  });
  const config = new DocumentBuilder()
    .setTitle('Ratings microservice')
    .setDescription('rating microservice API documentation')
    .setVersion('1.0')
    .addTag('Ratings').addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('casttree-ratings/api', app, document);
  app.use(helmet());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.setGlobalPrefix(process.env.API_PREFIX);
  await app.listen(port);
  console.log(`${new Date()}====>App started in port ${port}<====`);

}
bootstrap();

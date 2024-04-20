/* nestjs */
import { NestFactory, Reflector } from "@nestjs/core";
import { ValidationPipe, ClassSerializerInterceptor } from "@nestjs/common";

/* modules */
import { AppModule } from "./app.module";

/* external dependencies */
import helmet from "helmet";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
////////////////////////////////////////////////////////////////////////////////

/* bootstrap project */
(async function () {
  /* instantiate new project */
  const app = await NestFactory.create(AppModule, { cors: true });

  /* set global prefix */
  app.setGlobalPrefix("api/v1");

  /* generic middleware */
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());

  /* global validation pipe to handle incoming data validation */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV === "prod",
    })
  );

  /* global built-in intercepting middleware used to serialize outgoing data */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  /* start server listener */
  if (!process.env.PORT) {
    console.error("PORT is not set. Exiting...");
    process.exit(1);
  }
  await app.listen(process.env.PORT);

  /* log server start */
  console.log(`Application is running on: ${await app.getUrl()}`);
})();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { i18nValidationExceptionFactory } from './utils/i18n-validation.factory';
/*import { I18nValidationExceptionFilter } from './filters/i18n-exception.filter';*/
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // new I18nValidationPipe(),
    new ValidationPipe({
      whitelist: true, // remove fields that are not interceptors the dto
      forbidNonWhitelisted: false, // throw error if the field is not interceptors the dto
      transform: true, // transform the value to the type of the dto
      transformOptions: {
        enableImplicitConversion: true, // convert the value to the type of the dto
      },
      //exceptionFactory: i18nValidationExceptionFactory,
    }),
  );

/*  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: true,
    }),
  );*/

  //app.useGlobalPipes(new I18nValidationPipe());
  await app.listen(3300);
  //app.useGlobalFilters(new I18nValidationExceptionFilter());
  //app.useGlobalFilters(new I18nValidationExceptionFilter());
}

bootstrap();

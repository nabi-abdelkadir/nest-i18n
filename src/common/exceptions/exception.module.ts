import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { I18nValidationExceptionFilter } from 'src/common/exceptions/filters/bad-request-exception/bad-request-exception-filter';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../../generated/i18n.generated';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useFactory: (i18nService: I18nService<I18nTranslations>) => {
        return new I18nValidationExceptionFilter(i18nService);
      },
      inject: [I18nService],
    },
  ],
})
export class ExceptionModule {}

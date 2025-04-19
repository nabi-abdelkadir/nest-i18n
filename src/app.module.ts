import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcceptLanguageResolver, I18nModule as I18nModule2, QueryResolver } from 'nestjs-i18n';
import { I18nModule } from './i18n/i18n.module';
import * as path from 'path';
import { ContextIdFactory } from '@nestjs/core';
import { AggregateByLocalContextIdStrategy } from './core/aggregate-by-local-strategy';

ContextIdFactory.apply(new AggregateByLocalContextIdStrategy())

@Module({
  imports: [
    I18nModule2.forRoot({
      fallbackLanguage: 'en',
      formatter: (template: string, ...args: any[]) => template,
      loaderOptions: {
        path: path.resolve(__dirname, '..', 'i18n'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale'] },
        AcceptLanguageResolver,
      ],
      typesOutputPath: path.join(__dirname, '../src/generated/i18n.generated.ts'),
    }),
    I18nModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

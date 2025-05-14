import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { I18nModule } from './startup/i18n/i18n.module';
import { ExceptionModule } from './common/exceptions/exception.module';

@Module({
  imports: [I18nModule, ClientsModule, ExceptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

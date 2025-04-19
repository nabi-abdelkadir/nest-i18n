import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  greet(@I18n() i18n: I18nContext) {
    return i18n.t('common.greeting', {
      args: { name: 'John' },
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

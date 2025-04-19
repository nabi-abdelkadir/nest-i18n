import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { I18nService } from './i18n/i18n.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly in18nService: I18nService,
  ) {}

  /* @Get()
   greet(@I18n() i18n: I18nContext) {
     return i18n.t('common.greeting', {
       args: { name: 'John' },
     });
   }*/

  @Get()
  getHello(): string {
    return this.in18nService.translate('hello' ,{name : 'nabi'});
  }
}

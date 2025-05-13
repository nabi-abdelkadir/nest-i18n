import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from '../generated/i18n.generated';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  greet(@I18n() i18n: I18nContext<I18nTranslations>) {
    return i18n.t('common.greeting', {
      args: { name: 'Nabi' },
    });
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '../generated/i18n.generated';

@Injectable()
export class ClientsService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  create(createClientDto: CreateClientDto) {
    return createClientDto
  }

  findAll() {
    return `This action returns all clients`;
  }

   greetUser(name: string, lang = 'en') {
    return this.i18n.translate('common.greeting', {
      //lang,
      args: { name },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}

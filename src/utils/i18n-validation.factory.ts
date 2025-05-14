import { I18nValidationException } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';

export function i18nValidationExceptionFactory(errors: ValidationError[]) {
  //console.log('errors', errors);
  return new I18nValidationException(errors);
}

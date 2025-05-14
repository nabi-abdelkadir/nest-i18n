import { ValidationPipe, ValidationError } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ValidationError as ClassValidatorError } from 'class-validator';

export class I18nValidationPipe extends ValidationPipe {
  constructor(private readonly i18nService: I18nService) {
    super({
      transform: true,
      whitelist: true,
      // Override the exceptionFactory to translate validation messages
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.log('validationErrors', validationErrors);
        console.log('this.formatErrors', this.formatErrors(validationErrors));
        return this.formatErrors(validationErrors);
      },
    });
  }

  private formatErrors(errors: ValidationError[]) {
    const formattedErrors = this.formatErrorsRecursively(errors);

    return {
      statusCode: 400,
      message: 'Validation failed!!',
      errors: formattedErrors,
    };
  }

  private formatErrorsRecursively(errors: ValidationError[], parentPath = ''): any[] {
    const formattedErrors = [];

    for (const error of errors) {
      const property = parentPath ? `${parentPath}.${error.property}` : error.property;

      if (error.constraints) {
        const constraintEntries = Object.entries(error.constraints);

        for (const [constraintKey, message] of constraintEntries) {
          // Map validation constraint to i18n key
          const i18nKey = `validation.${constraintKey.toUpperCase()}`;

          const translatedMessage = this.i18nService.t(i18nKey, {
            args: {
              property,
              ...this.getConstraintParams(error, constraintKey),
            },
          });

          formattedErrors.push({
            property,
            constraint: constraintKey,
            message: translatedMessage,
          });
        }
      }

      if (error.children && error.children.length > 0) {
        formattedErrors.push(...this.formatErrorsRecursively(error.children, property));
      }
    }

    return formattedErrors;
  }

  private getConstraintParams(error: ValidationError, constraintKey: string): Record<string, any> {
    // Extract validation parameters from the validation metadata
    // This helps get values like min, max, etc. to use in translation
    const params: Record<string, any> = {};

    switch (constraintKey) {
      case 'min':
      case 'max':
      case 'minLength':
      case 'maxLength':
        // For numeric constraints, add the constraint value
        const constraintValue =
          error.target &&
          Reflect.getMetadata(`class-validator:${constraintKey}`, error.target.constructor, error.property);
        if (constraintValue !== undefined) {
          params.value = constraintValue;
        }
        break;
    }

    return params;
  }
}

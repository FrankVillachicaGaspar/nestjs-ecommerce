import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function NoSpaces(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'noSpaces',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, _validationArguments?: ValidationArguments) {
          return !/\s/.test(value);
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `the ${validationArguments.property} should not contain spaces.`;
        },
      },
    });
  };
}

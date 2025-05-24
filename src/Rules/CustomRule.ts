import ValidationRule from './ValidationRule';

export default class CustomRule extends ValidationRule {
  public constructor(protected handler: (attribute: string, value: any, fail: (message: string) => void) => void) {
    super();
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    this.handler(attribute, value, fail);
  }
}

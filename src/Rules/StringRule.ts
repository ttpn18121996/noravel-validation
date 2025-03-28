import ValidationRule from './ValidationRule';

export default class StringRule extends ValidationRule {
  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, `The ${attribute} field must be a string.`);
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (typeof value !== 'string') {
      fail(this.getMessage(attribute));
    }
  }
}

import ValidationRule from './ValidationRule';

export default class NumericRule extends ValidationRule {
  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, `The ${attribute} field must be a number.`);
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (typeof value !== 'number' && !(!isNaN(value) && !isNaN(parseFloat(value)))) {
      fail(this.getMessage(attribute));
    }
  }
}

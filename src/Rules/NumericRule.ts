import { ValidationRule } from '../Contracts/ValidationRule';

export default class NumericRule implements ValidationRule {
  protected message?: string;

  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  public getMessage(attribute: string): string {
    return this.message ? this.message.replace(':attribute', attribute) : `The ${attribute} field must be a number.`;
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (typeof value !== 'number' && !(!isNaN(value) && !isNaN(parseFloat(value)))) {
      fail(this.getMessage(attribute));
    }
  }
}

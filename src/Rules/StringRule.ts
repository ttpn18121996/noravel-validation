import { ValidationRule } from '../Contracts/ValidationRule';

export default class StringRule implements ValidationRule {
  protected message?: string;

  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  public getMessage(attribute: string): string {
    attribute = attribute.replace('_', ' ');

    return this.message ? this.message.replace(':attribute', attribute) : `The ${attribute} field must be a string.`;
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (typeof value !== 'string') {
      fail(this.getMessage(attribute));
    }
  }
}

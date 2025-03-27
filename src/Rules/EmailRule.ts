import { ValidationRule } from '../Contracts/ValidationRule';

export default class EmailRule implements ValidationRule {
  protected message?: string;

  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  public getMessage(attribute: string): string {
    attribute = attribute.replace('_', ' ');

    return this.message
      ? this.message.replace(':attribute', attribute)
      : `The ${attribute} field must be a valid email address.`;
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (typeof value !== 'string' || !value.match(/^[a-zA-Z0-9\._\-\+]+@[a-zA-Z0-9\._\-]+\.[a-zA-Z0-9\._\-]+$/i)) {
      fail(this.getMessage(attribute));
    }
  }
}

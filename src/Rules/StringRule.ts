import { ValidationRule } from '../Contracts/ValidationRule';

export default class StringRule implements ValidationRule {
  protected message?: string;

  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  public getMessage(attribute: string): string {
    return this.message ? this.message : `The ${attribute} field must be a string.`;
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (typeof value !== 'string') {
      fail(this.getMessage(attribute));
    }
  }
}

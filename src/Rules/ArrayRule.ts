import { ValidationRule } from '../Contracts/ValidationRule';

export default class ArrayRule implements ValidationRule {
  protected message?: string;

  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  public getMessage(attribute: string): string {
    return this.message ? this.message.replace(':attribute', attribute) : `The ${attribute} must be an array.`;
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (!Array.isArray(value)) {
      fail(this.getMessage(attribute));
    }
  }
}

import { ValidationRule } from '../Contracts/ValidationRule';

export default class RegexRule implements ValidationRule {
  protected message?: string;

  public constructor(
    protected pattern: RegExp,
  ) {}

  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  public getMessage(attribute: string): string {
    return this.message ? this.message : `The ${attribute} field format is invalid.`;
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    value = String(value);

    if (!this.pattern.test(value)) {
      fail(this.getMessage(attribute));
    }
  }
}

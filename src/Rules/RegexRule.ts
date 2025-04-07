import ValidationRule from './ValidationRule';

export default class RegexRule extends ValidationRule {
  public constructor(protected pattern: RegExp) {
    super();
  }

  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, `The ${attribute} field format is invalid.`);
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    value = String(value);

    if (!this.pattern.test(value)) {
      fail(this.getMessage(attribute));
    }
  }
}

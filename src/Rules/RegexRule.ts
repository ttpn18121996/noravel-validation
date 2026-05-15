import ValidationRule from './ValidationRule';

export default class RegexRule extends ValidationRule {
  public constructor(protected pattern: RegExp) {
    super();
  }

  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, `The ${attribute} field format is invalid.`);
  }

  public async validate(attribute: string, value: any, fail: (message: string) => void): Promise<void> {
    value = String(value);

    if (!this.pattern.test(value)) {
      fail(this.getMessage(attribute));
    }
  }
}

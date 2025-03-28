import ValidationRule from './ValidationRule';

export default class ArrayRule extends ValidationRule {
  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, 'The :attribute must be an array.');
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (!Array.isArray(value)) {
      fail(this.getMessage(attribute));
    }
  }
}

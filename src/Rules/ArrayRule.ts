import ValidationRule from './ValidationRule';

export default class ArrayRule extends ValidationRule {
  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, 'The :attribute field must be an array.');
  }

  public async validate(attribute: string, value: any, fail: (message: string) => void): Promise<void> {
    if (!Array.isArray(value)) {
      fail(this.getMessage(attribute));
    }
  }
}

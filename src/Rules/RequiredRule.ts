import ValidationRule from './ValidationRule';
import { _str } from '@noravel/supporter';

export default class RequiredRule extends ValidationRule {
  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, 'The :attribute field is required.');
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (value === null || value === undefined) {
      fail(this.getMessage(attribute));
    } else if (typeof value === 'string') {
      if (value.trim().length === 0) {
        fail(this.getMessage(attribute));
      }
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        fail(this.getMessage(attribute));
      }
    }
  }
}

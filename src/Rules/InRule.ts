import { _col, getArray } from '@noravel/supporter';
import ValidationRule from './ValidationRule';

export default class StringRule extends ValidationRule {
  private values: unknown[];

  public constructor(values: unknown[]) {
    super();
    this.values = getArray(values);
  }

  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, 'The :attribute field must be a valid value.');
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (this.values.length > 0) {
      if (typeof this.values[0] === 'string') {
        if (typeof value !== 'string' || !(this.values as string[]).includes(value)) {
          fail(this.getMessage(attribute));
        }
      } else if (typeof this.values[0] === 'number') {
        if (typeof value !== 'number' || !(this.values as number[]).includes(value)) {
          fail(this.getMessage(attribute));
        }
      }
    }
  }
}

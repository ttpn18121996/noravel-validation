import dayjs from 'dayjs';
import ValidationRule from './ValidationRule';

export default class DateRule extends ValidationRule {
  public constructor(protected format: string = 'YYYY-MM-DD') {
    super();
  }

  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, `The ${attribute} field must be a valid date.`);
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (!dayjs(value, this.format, true).isValid()) {
      fail(this.getMessage(attribute));
    }
  }
}

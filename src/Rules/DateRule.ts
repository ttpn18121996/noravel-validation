import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ValidationRule from './ValidationRule';

dayjs.extend(customParseFormat);

export default class DateRule extends ValidationRule {
  public constructor(protected format: string = 'YYYY-MM-DD') {
    super();
  }

  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, `The ${attribute} field must be a valid date.`);
  }

  public async validate(attribute: string, value: any, fail: (message: string) => void): Promise<void> {
    if (!dayjs(value, this.format, true).isValid()) {
      fail(this.getMessage(attribute));
    }
  }
}

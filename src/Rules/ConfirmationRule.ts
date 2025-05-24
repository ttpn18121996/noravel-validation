import { _obj } from '@noravel/supporter';
import ValidationRule from './ValidationRule';

export default class ConfirmationRule extends ValidationRule {
  public constructor(protected confirmWith?: string) {
    super();
  }

  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, `The ${attribute} field confirmation does not match.`);
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (!this.confirmWith) {
      this.confirmWith = `${attribute}_confirmation`;
    }

    const confirmationValue = _obj.get(this.data, this.confirmWith);

    if (value !== confirmationValue) {
      fail(this.getMessage(attribute));
    }
  }
}

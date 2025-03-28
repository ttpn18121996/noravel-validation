import ValidationRule from './ValidationRule';

export default class EmailRule extends ValidationRule {
  public getMessage(attribute: string): string {
    return this.formatMessage(attribute, 'The :attribute field must be a valid email address.');
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (typeof value !== 'string' || !value.match(/^[a-zA-Z0-9\._\-\+]+@[a-zA-Z0-9\._\-]+\.[a-zA-Z0-9\._\-]+$/i)) {
      fail(this.getMessage(attribute));
    }
  }
}

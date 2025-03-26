import { ValidationRule } from '../Contracts/ValidationRule';

export default class StringRule implements ValidationRule {
  protected message?: string;

  public constructor(private values: string[] | number[]) {}

  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  public getMessage(attribute: string): string {
    return this.message ? this.message : `The selected ${attribute} is invalid.`;
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (!Array.isArray(this.values)) {
      return;
    }

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

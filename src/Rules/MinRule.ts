import { FieldType } from '../Contracts/Validatable';
import { ValidationRule } from '../Contracts/ValidationRule';

export default class MinRule implements ValidationRule {
  protected message?: string;

  public constructor(
    protected value: number,
    protected type: FieldType = 'string',
  ) {}

  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  public getMessage(attribute: string): string {
    if (this.message) return this.message;

    let message = `The ${attribute} field must be at least`;

    switch (this.type) {
      case 'array':
        message += ` ${this.value} items.`;
        break;
      case 'number':
        message += ` ${this.value}.`;
        break;
      case 'string':
        message += ` ${this.value} characters.`;
        break;
      default:
        message += ` ${this.value}.`;
        break;
    }

    return message;
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (this.type === 'string' || this.type === 'array') {
      if (typeof value === 'string' || Array.isArray(value)) {
        if (value.length < this.value) {
          fail(this.getMessage(attribute));
        }
      }
    } else if (this.type === 'number') {
      if (value < this.value) {
        fail(this.getMessage(attribute));
      }
    } else {
      fail(this.getMessage(attribute));
    }
  }
}

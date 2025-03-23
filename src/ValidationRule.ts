import { FieldType, Validatable } from './Validatable';

export default class ValidationRule {
  private rules: Record<string, Validatable>;

  private type: FieldType;

  public constructor(private name?: string) {
    this.rules = {};
    this.type = 'string';
  }

  /**
   * Add an email validation rule.
   *
   * @param {string} message
   * @returns {this}
   */
  public email(message?: string): this {
    this.rules.email = {
      value: true,
      message: message ?? `The :attribute field must be a valid email address.`,
      type: this.type,
    };

    return this;
  }

  /**
   * Add an in validation rule.
   *
   * @param {string[] | number[]} values
   * @param {string} message
   * @returns {this}
   */
  public in(values: string[] | number[], message?: string): this {
    this.rules.in = {
      value: values,
      message: message ?? `The selected :attribute is invalid.`,
      type: this.type,
    };

    return this;
  }

  /**
   * Add a max validation rule.
   *
   * @param {number} max
   * @param {string} message
   * @returns {this}
   */
  public max(max: number, message?: string): this {
    message = message ?? `The :attribute field must not have more than`;

    switch (this.type) {
      case 'array':
        message += ` ${max} items.`;
        break;
      case 'number':
        message += ` ${max}.`;
        break;
      case 'string':
        message += ` ${max} characters.`;
        break;
      default:
        message += ` ${max}.`;
        break;
    }

    this.rules.max = {
      value: max,
      message,
      type: this.type,
    };

    return this;
  }

  /**
   * Add a min validation rule.
   *
   * @param {number} min
   * @param {string} message
   * @returns {this}
   */
  public min(min: number, message?: string): this {
    message = message ?? `The :attribute field must be at least`;

    switch (this.type) {
      case 'array':
        message += ` ${min} items.`;
        break;
      case 'number':
        message += ` ${min}.`;
        break;
      case 'string':
        message += ` ${min} characters.`;
        break;
      default:
        message += ` ${min}.`;
        break;
    }

    this.rules.min = {
      value: min,
      message,
      type: this.type,
    };

    return this;
  }

  /**
   * Add a nullable validation rule.
   *
   * @returns {this}
   */
  public nullable(): this {
    if (this.rules?.required) {
      delete this.rules.required;
    }

    this.rules.nullable = {
      value: true,
      message: '',
    };

    return this;
  }

  public numeric(message?: string): this {
    this.type = 'number';

    this.rules.numeric = {
      value: true,
      message: message ?? `The :attribute field must be a number`,
      type: this.type,
    };

    return this;
  }

  /**
   * Add a regex validation rule.
   *
   * @param {RegExp} pattern
   * @param {string} message
   * @returns {this}
   */
  public regex(pattern: RegExp, message?: string): this {
    this.rules.regex = {
      value: pattern,
      message: message ?? `The :attribute field format is invalid.`,
      type: this.type,
    };

    return this;
  }

  /**
   * Add a required validation rule.
   *
   * @param {string} message
   * @returns {this}
   */
  public required(message?: string): this {
    this.rules.required = {
      value: true,
      message: message ?? `The :attribute field is required`,
    };

    return this;
  }

  /**
   * Add a string validation rule.
   *
   * @param {string} message
   * @returns {this}
   */
  public string(message?: string): this {
    this.type = 'string';

    this.rules.string = {
      value: true,
      message: message ?? `The :attribute field must be a string`,
      type: this.type,
    };

    return this;
  }

  /**
   * Serialize the validation rules.
   *
   * @returns {Record<string, Validatable>}
   */
  public serialize(): Record<string, Validatable> {
    return this.rules;
  }

  /**
   * Get the name of the validation rule.
   *
   * @returns {string}
   */
  public getName(): string {
    return this.name ?? '';
  }

  /**
   * Set the name of the validation rule.
   *
   * @param {string} name
   * @returns {this}
   */
  public setName(name: string): this {
    this.name = name;

    return this;
  }

  /**
   * Format the validation message.
   *
   * @param {string} message
   * @returns {string}
   */
  public formatMessage(message: string): string {
    return message.replace(':attribute', this.name ?? '');
  }
}

import { FieldType } from './Contracts/Validatable';
import MinRule from './Rules/MinRule';
import { ValidationRule } from './Contracts/ValidationRule';
import MaxRule from './Rules/MaxRule';
import RequiredRule from './Rules/RequiredRule';
import EmailRule from './Rules/EmailRule';
import NumericRule from './Rules/NumericRule';
import RegexRule from './Rules/RegexRule';
import StringRule from './Rules/StringRule';
import InRule from './Rules/InRule';
import CustomRule from './Rules/CustomRule';
import ArrayRule from './Rules/ArrayRule';

export default class RuleRegistration {
  private rules: Record<string, ValidationRule>;

  private type: FieldType;

  public constructor(private name?: string) {
    this.rules = {};
    this.type = 'string';
  }

  /**
   * Add a nullable validation rule.
   *
   * @returns {this}
   */
  public array(message?: string): this {
    this.type = 'array';

    const arrayRule = new ArrayRule();
    arrayRule.setMessage(message);

    this.rules.array = arrayRule;

    return this;
  }

  /**
   * Add an email validation rule.
   *
   * @param {string} message
   * @returns {this}
   */
  public email(message?: string): this {
    const emailRule = new EmailRule();
    emailRule.setMessage(message);

    this.rules.email = emailRule;

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
    const inRule = new InRule(values);
    inRule.setMessage(message);

    this.rules.in = inRule;

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
    const maxRule = new MaxRule(max, this.type);
    maxRule.setMessage(message);

    this.rules.max = maxRule;

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
    const minRule = new MinRule(min, this.type);
    minRule.setMessage(message);

    this.rules.min = minRule;

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

    this.rules.nullable = new CustomRule((attribute: string, value: any, fail: (message: string) => void) => {});

    return this;
  }

  public numeric(message?: string): this {
    this.type = 'number';

    const numericRule = new NumericRule();
    numericRule.setMessage(message);

    this.rules.numeric = numericRule;

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
    const regexRule = new RegexRule(pattern);
    regexRule.setMessage(message);

    this.rules.regex = regexRule;

    return this;
  }

  /**
   * Add a required validation rule.
   *
   * @param {string} message
   * @returns {this}
   */
  public required(message?: string): this {
    const requiredRule = new RequiredRule();
    requiredRule.setMessage(message);

    this.rules.required = requiredRule;

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

    const stringRule = new StringRule();
    stringRule.setMessage(message);

    this.rules.string = stringRule;

    return this;
  }

  /**
   * Serialize the validation rules.
   *
   * @returns {Record<string, ValidationRule>}
   */
  public serialize(): Record<string, ValidationRule> {
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

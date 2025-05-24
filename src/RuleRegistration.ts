import { FieldType } from './Contracts/Validatable';
import { ValidationRule } from './Contracts/ValidationRule';
import ArrayRule from './Rules/ArrayRule';
import ConfirmationRule from './Rules/ConfirmationRule';
import CustomRule from './Rules/CustomRule';
import DateRule from './Rules/DateRule';
import EmailRule from './Rules/EmailRule';
import FileRule from './Rules/FileRule';
import InRule from './Rules/InRule';
import MaxRule from './Rules/MaxRule';
import MinRule from './Rules/MinRule';
import NumericRule from './Rules/NumericRule';
import RegexRule from './Rules/RegexRule';
import RequiredRule from './Rules/RequiredRule';
import StringRule from './Rules/StringRule';

export default class RuleRegistration {
  private rules: Record<string, ValidationRule>;

  private type: FieldType;

  public constructor() {
    this.rules = {};
    this.type = 'string';
  }

  /**
   * Add a validation rule.
   *
   * @param {string} key
   * @param {ValidationRule} rule
   * @returns {this}
   */
  public addRule(key: string, rule: ValidationRule): this {
    this.rules[key] = rule;

    return this;
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
   * Add a confirmed validation rule.
   *
   * @param {string} confirmWith
   * @param {string} message
   * @returns {this}
   */
  public confirmed(confirmWith?: string, message?: string): this {
    const confirmedRule = new ConfirmationRule(confirmWith);
    confirmedRule.setMessage(message);

    this.rules.confirmed = confirmedRule;

    return this;
  }

  /**
   * Add a date validation rule.
   *
   * @param {string} format
   * @param {string} message
   * @returns {this}
   */
  public date(format: string = 'YYYY-MM-DD', message?: string): this {
    this.type = 'date';
    const dateRule = new DateRule(format);
    dateRule.setMessage(message);

    this.rules.date = dateRule;

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
   * Add a file validation rule.
   *
   * @param {string} message
   * @returns {this}
   */
  public file(message?: string): this {
    const fileRule = new FileRule();
    fileRule.setMessage(message);

    this.rules.file = fileRule;

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
   * Add a mimes validation rule.
   *
   * @param {string} mimes
   * @param {string} message
   * @returns {this}
   */
  public mimes(mimes: string, message?: string): this {
    const fileRule = new FileRule(mimes, 'mimes');
    fileRule.setMessage(message);

    this.rules.mimes = fileRule;

    return this;
  }

  /**
   * Add a mimetypes validation rule.
   *
   * @param {string} mimetypes
   * @param {string} message
   * @returns {this}
   */
  public mimetypes(mimetypes: string, message?: string): this {
    const fileRule = new FileRule(mimetypes, 'mimetypes');
    fileRule.setMessage(message);

    this.rules.mimetypes = fileRule;

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

    this.rules.nullable = new CustomRule(() => {});

    return this;
  }

  /**
   * Add a numeric validation rule.
   *
   * @param {string} message
   * @returns {this}
   */
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
}

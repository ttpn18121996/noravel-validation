import RuleRegistration from './RuleRegistration';
import CustomRule from './Rules/CustomRule';
import { ValidationRule } from './Contracts/ValidationRule';
import { _col, _obj } from '@noravel/supporter';
import ValidationException from './ValidationException';
import Rule from './Rules/ValidationRule';

export default class Validator {
  protected messages?: Record<string, string[]>;
  public data: Record<string, any>;
  public validData: Record<string, any>;

  public constructor(public rules: Record<string, RuleRegistration | CustomRule>) {
    this.data = {};
    this.validData = {};
  }

  /**
   * Validate the given data.
   *
   * @returns {this}
   */
  public validate(): Record<string, any> | undefined {
    if (this.fails()) {
      throw new ValidationException(this.getMessage());
    }

    return this.validated();
  }

  /**
   * Get the validated data.
   *
   * @returns {Record<string, any>}
   */
  public validated(): Record<string, any> {
    if (!this.messages) {
      this.passes();
    }

    return this.getValidatedData();
  }

  /**
   * Determine if the validation passed.
   *
   * @returns {boolean}
   */
  public passes(): boolean {
    this.messages = {};

    Object.keys(this.rules).forEach((attribute: string) => {
      const validationRule: RuleRegistration | CustomRule = this.rules[attribute];

      if (validationRule instanceof RuleRegistration) {
        const rules = validationRule.serialize();
        for (const rule in rules) {
          if (this.isNullIfMarkedAsNullable(rules, attribute)) {
            continue;
          }

          if (this.isValidationRule(rules[rule])) {
            const validationRule = rules[rule] as ValidationRule;

            validationRule.validate(attribute, this.data[attribute], (message: string) => {
              this.pushMessage(attribute, message);
            });
          }
        }
      } else if (this.isValidationRule(validationRule)) {
        (validationRule as ValidationRule).validate(attribute, this.data[attribute], (message: string) => {
          this.pushMessage(attribute, message);
        });
      }
    });

    return Object.keys(this.messages).length === 0;
  }

  /**
   * Determine if the given rule is a validation rule.
   *
   * @param {any} rule
   * @returns {boolean}
   */
  protected isValidationRule(rule: any): boolean {
    return rule instanceof Rule || 'validate' in rule;
  }

  /**
   * Determine if the validation rule is nullable.
   *
   * @param {Record<string, ValidationRule>} rules
   * @param {string} attribute
   * @returns {boolean}
   */
  protected isNullIfMarkedAsNullable(rules: Record<string, ValidationRule>, attribute: string): boolean {
    return (
      'nullable' in rules &&
      (this.data[attribute] === null ||
        this.data[attribute] === undefined ||
        (typeof this.data[attribute] === 'string' && this.data[attribute].trim().length === 0) ||
        (Array.isArray(this.data[attribute]) && this.data[attribute].length === 0))
    );
  }

  /**
   * Determine if the validation failed.
   *
   * @returns {boolean}
   */
  public fails(): boolean {
    return !this.passes();
  }

  /**
   * Get the valid attributes.
   *
   * @returns {string[]}
   */
  public valid(): string[] {
    if (!this.messages) {
      this.passes();
    }

    const validateKey = Object.keys(this.rules);
    const messageKey = Object.keys(this.messages ?? {});

    return _col<string>(validateKey).diff(messageKey).all() as string[];
  }

  /**
   * Get the invalid attributes.
   *
   * @returns {string[]}
   */
  public invalid(): string[] {
    if (!this.messages) {
      this.passes();
    }

    return Object.keys(this.messages ?? {});
  }

  /**
   * Set the data to validate.
   *
   * @param {Record<string, any>} data
   * @returns {this}
   */
  public setData(data: Record<string, any>): this {
    this.data = data;

    return this;
  }

  /**
   * Get the data to validate.
   *
   * @returns {Record<string, any>}
   */
  public getData(): Record<string, any> {
    return this.data;
  }

  /**
   * Get the validated data.
   *
   * @returns {Record<string, any>}
   */
  public getValidatedData(): Record<string, any> {
    this.validData = _obj.only(this.data, this.valid());

    return this.validData;
  }

  /**
   * Add a validation message.
   *
   * @param {string} attribute
   * @param {string} messages
   * @returns {void}
   */
  public pushMessage(attribute: string, message: string): void {
    if (!this.messages) {
      this.messages = {};
    }

    if (!this.messages[attribute]) {
      this.messages[attribute] = [];
    }

    this.messages[attribute].push(message);
  }

  /**
   * Get the validation messages.
   *
   * @returns {Record<string, string[]>}
   */
  public getMessages(): Record<string, string[]> {
    return this.messages ?? {};
  }

  /**
   * An alias of getMessages.
   *
   * @returns {Record<string, string[]>}
   */
  public errors(): Record<string, string[]> {
    return this.getMessages();
  }

  /**
   * Get the first validation message.
   *
   * @returns {string}
   */
  public getMessage(): string {
    for (const attribute in this.messages) {
      return this.messages[attribute][0];
    }

    return '';
  }
}

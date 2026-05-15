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
  public async validate(): Promise<Record<string, any> | undefined> {
    if (await this.fails()) {
      throw new ValidationException(this.getMessage());
    }

    return await this.validated();
  }

  /**
   * Get the validated data.
   *
   * @returns {Record<string, any>}
   */
  public async validated(): Promise<Record<string, any>> {
    if (!this.messages) {
      await this.passes();
    }

    return await this.getValidatedData();
  }

  /**
   * Determine if the validation passed.
   *
   * @returns {boolean}
   */
  public async passes(): Promise<boolean> {
    this.messages = {};

    for (const attribute of Object.keys(this.rules)) {
      const validationRule: RuleRegistration | CustomRule = this.rules[attribute];

      if (validationRule instanceof RuleRegistration) {
        const rules = validationRule.serialize();
        for (const rule in rules) {
          if (this.isNullIfMarkedAsNullable(rules, attribute)) {
            continue;
          }

          if (this.isValidationRule(rules[rule])) {
            const validationRule = rules[rule] as ValidationRule;
            validationRule.setData(this.data);

            await validationRule.validate(attribute, this.data[attribute], (message: string) => {
              this.pushMessage(attribute, message);
            });
          }
        }
      } else if (this.isValidationRule(validationRule)) {
        await (validationRule as ValidationRule)
          .setData(this.data)
          .validate(attribute, this.data[attribute], (message: string) => {
            this.pushMessage(attribute, message);
          });
      }
    }

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
  public async fails(): Promise<boolean> {
    return !(await this.passes());
  }

  /**
   * Get the valid attributes.
   *
   * @returns {string[]}
   */
  public async valid(): Promise<string[]> {
    if (!this.messages) {
      await this.passes();
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
  public async invalid(): Promise<string[]> {
    if (!this.messages) {
      await this.passes();
    }

    return Object.keys(this.messages ?? {});
  }

  /**
   * Set the data to validate.
   *
   * @param {Record<string, any>} data
   * @returns {this}
   */
  public setData(data: Record<string, any> | FormData): this {
    this.data = this.getObjectableItems(data);

    return this;
  }

  /**
   * Get the objectable items from the data.
   *
   * @param {Record<string, any> | FormData | URLSearchParams} data
   * @returns {Record<string, any>}
   */
  private getObjectableItems(data: Record<string, any> | FormData | URLSearchParams): Record<string, any> {
    const result: Record<string, any> = {};

    if (data instanceof FormData || data instanceof URLSearchParams) {
      for (const [key, value] of data.entries()) {
        if (result.hasOwnProperty(key)) {
          if (Array.isArray(result[key])) {
            result[key].push(value);
          } else {
            result[key] = [result[key], value];
          }
        } else {
          result[key] = value;
        }
      }
    } else if (typeof data === 'object' && data !== null) {
      return data;
    }

    return result;
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
  public async getValidatedData(): Promise<Record<string, any>> {
    this.validData = _obj.only(this.data, await this.valid());

    return this.validData;
  }

  /**
   * Add a validation message.
   *
   * @param {string} attribute
   * @param {string} message
   * @returns {void}
   */
  protected pushMessage(attribute: string, message: string): void {
    if (!this.messages?.[attribute]) {
      (this.messages as Record<string, string[]>)[attribute] = [];
    }

    (this.messages as Record<string, string[]>)[attribute].push(message);
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

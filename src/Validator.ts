import { Validatable } from './Validatable';
import ValidateAttribute, { ValidateAttributeMethod } from './ValidateAttribute';
import ValidationRule from './ValidationRule';
import CustomRule from './CustomRule';

export default class Validator {
  protected messages: Record<string, string[]>;
  public data: Record<string, any>;

  public constructor(public rules: Record<string, ValidationRule | CustomRule>) {
    this.messages = {};
    this.data = {};
  }

  /**
   * Validate the given data.
   *
   * @param {Record<string, any>} data
   * @returns {this}
   */
  public validate(data?: Record<string, any>): this {
    this.messages = {};

    if (data) {
      this.setData(data);
    }

    Object.keys(this.rules).forEach((attribute: string) => {
      const validationRule: ValidationRule | CustomRule = this.rules[attribute];

      if (validationRule instanceof ValidationRule) {
        validationRule.setName(attribute);

        const rules = validationRule.serialize();
        for (const rule in rules) {
          if (this.isNullIfMarkedAsNullable(rules, attribute)) {
            continue;
          }

          const validateMethod = ValidateAttribute[rule as keyof typeof ValidateAttribute] as ValidateAttributeMethod;

          if (
            typeof validateMethod === 'function' &&
            !validateMethod(attribute, this.data[attribute], rules[rule]?.value, rules[rule]?.type)
          ) {
            this.pushMessage(attribute, validationRule.formatMessage(rules[rule].message));
          }
        }
      } else if (validationRule instanceof CustomRule) {
        const validated = validationRule.validate(attribute, this.data[attribute]);

        if (validated.fails()) {
          this.pushMessage(attribute, validated.getMessage());
        }
      }
    });

    return this;
  }

  /**
   * Determine if the validation rule is nullable.
   *
   * @param {Record<string, Validatable>} rules
   * @param {string} attribute
   * @returns {boolean}
   */
  protected isNullIfMarkedAsNullable(rules: Record<string, Validatable>, attribute: string): boolean {
    return 'nullable' in rules && !ValidateAttribute.required(attribute, this.data[attribute]);
  }

  /**
   * Determine if the validation passed.
   *
   * @returns {boolean}
   */
  public passes(): boolean {
    return Object.keys(this.messages).length === 0;
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
   * Add a validation message.
   *
   * @param {string} attribute
   * @param {string} messages
   * @returns {void}
   */
  public pushMessage(attribute: string, message: string): void {
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
    return this.messages;
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

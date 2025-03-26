import { Validatable } from './Contracts/Validatable';
import ValidateAttribute, { ValidateAttributeMethod } from './ValidateAttribute';
import RuleRegistration from './RuleRegistration';
import CustomRule from './CustomRule';
import { ValidationRule } from './Contracts/ValidationRule';

export default class Validator {
  protected messages: Record<string, string[]>;
  public data: Record<string, any>;
  public validData: Record<string, any>;

  public constructor(public rules: Record<string, RuleRegistration | CustomRule>) {
    this.messages = {};
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
      return undefined;
    }

    return this.validated();
  }

  public validated() {
    this.passes();

    return this.validData;
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
        validationRule.setName(attribute);

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

            continue;
          }

          const validateMethod = ValidateAttribute[rule as keyof typeof ValidateAttribute] as ValidateAttributeMethod;

          const validatable = rules[rule] as Validatable;

          if (
            typeof validateMethod === 'function' &&
            !validateMethod(attribute, this.data[attribute], validatable.value, validatable.type)
          ) {
            this.pushMessage(attribute, validationRule.formatMessage(validatable.message));
          } else {
            this.validData[attribute] = this.data[attribute];
          }
        }
      } else if (validationRule instanceof CustomRule) {
        const validated = validationRule.validate(attribute, this.data[attribute]);

        if (validated.fails()) {
          this.pushMessage(attribute, validated.getMessage());
        } else {
          this.validData[attribute] = this.data[attribute];
        }
      } else if (this.isValidationRule(validationRule)) {
        (validationRule as ValidationRule).validate(attribute, this.data[attribute], (message: string) => {
          this.pushMessage(attribute, message);
        });
      }
    });

    return Object.keys(this.messages).length === 0;
  }

  protected isValidationRule(rule: any): boolean {
    return 'validate' in rule;
  }

  /**
   * Determine if the validation rule is nullable.
   *
   * @param {Record<string, Validatable | ValidationRule>} rules
   * @param {string} attribute
   * @returns {boolean}
   */
  protected isNullIfMarkedAsNullable(rules: Record<string, Validatable | ValidationRule>, attribute: string): boolean {
    return 'nullable' in rules && !ValidateAttribute.required(attribute, this.data[attribute]);
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

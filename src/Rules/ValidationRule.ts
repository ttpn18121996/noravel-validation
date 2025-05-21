import { ValidationRule } from '../Contracts/ValidationRule';

export default abstract class Rule implements ValidationRule {
  protected message?: string;
  protected data: Record<string, any> = {};

  /**
   * Set the validation message.
   *
   * @param {string} message
   * @returns {this}
   */
  public setMessage(message?: string): this {
    this.message = message;

    return this;
  }

  /**
   * Set the data under validation.
   *
   * @param {Record<string, any>} data
   * @returns {this}
   */
  public setData(data: Record<string, any>): this {
    this.data = data;

    return this;
  }

  /**
   * Format the validation message.
   *
   * @param {string} message
   * @returns {string}
   */
  public formatMessage(attribute: string, defaultMessage: string = ''): string {
    return (this.message ?? defaultMessage).replace(':attribute', attribute.replace('_', ' '));
  }

  abstract validate(attribute: string, value: any, fail: (message: string) => void): void;
}

export default abstract class Rule {
  protected message?: string;

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

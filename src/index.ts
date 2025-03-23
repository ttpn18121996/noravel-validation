import ValidationRule from './ValidationRule';
import Validator from './Validator';

class ValidationFactory {
  /**
   * Create a new validator instance.
   *
   * @param {function} callback
   * @returns {Validator}
   */
  static make(callback: (rule: (name?: string) => ValidationRule) => Record<string, ValidationRule>): Validator {
    return new Validator(callback(() => new ValidationRule()));
  }
}

export { ValidationFactory };

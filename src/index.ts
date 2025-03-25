import ValidationRule from './ValidationRule';
import Validator from './Validator';
import CustomRule from './CustomRule';

class ValidationFactory {
  /**
   * Create a new validator instance.
   *
   * @param {function} callback
   * @returns {Validator}
   */
  static make(
    callback: (rule: (name?: string) => ValidationRule) => Record<string, ValidationRule | CustomRule>,
  ): Validator {
    return new Validator(callback(() => new ValidationRule()));
  }

  /**
   * Create a new custom rule instance.
   *
   * @param {function} passes
   * @returns {CustomRule}
   */
  static makeRule(
    passes: (attribute: string, value: any, fail: (message: string) => void) => void,
  ): CustomRule {
    return new CustomRule(passes);
  }
}

export { ValidationFactory };

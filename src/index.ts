import CustomRule from './Rules/CustomRule';
import RuleRegistration from './RuleRegistration';
import Validator from './Validator';

class ValidationFactory {
  /**
   * Create a new validator instance.
   *
   * @param {function} callback
   * @returns {Validator}
   */
  static make(
    callback: (rule: (name?: string) => RuleRegistration) => Record<string, RuleRegistration | CustomRule>,
    data: Record<string, any> = {},
  ): Validator {
    const validator = new Validator(callback(() => new RuleRegistration()));
    validator.setData(data);

    return validator;
  }

  /**
   * Create a new custom rule instance.
   *
   * @param {function} passes
   * @returns {CustomRule}
   */
  static makeRule(passes: (attribute: string, value: any, fail: (message: string) => void) => void): CustomRule {
    return new CustomRule(passes);
  }
}

export { CustomRule, RuleRegistration, ValidationFactory, Validator };

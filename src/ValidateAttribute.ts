export default class ValidateAttribute {
  /**
   * "Indicate" validation should pass if value is null.
   *
   * @param {string} name
   * @param {any} value
   * @returns {boolean}
   */
  public static nullable(name: string, value: any): boolean {
    return true;
  }

  /**
   * Validate that a required attribute exists.
   *
   * @param {string} name
   * @param {any} value
   * @returns {boolean}
   */
  public static required(name: string, value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    } else if (typeof value === 'string') {
      return value.trim().length > 0;
    } else if (Array.isArray(value)) {
      return value.length > 0;
    }

    return true;
  }
}

type ValidateAttributeMethod = (name: string, value: any, ...args: any[]) => boolean;

export { ValidateAttributeMethod };

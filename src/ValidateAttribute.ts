export default class ValidateAttribute {
  /**
   * Validate that an attribute is a valid e-mail address.
   *
   * @param {string} name
   * @param {any} value
   * @returns {boolean}
   */
  public static email(name: string, value: any): boolean {
    if (typeof value !== 'string' || !value.match(/^[a-zA-Z0-9\._\-\+]+@[a-zA-Z0-9\._\-]+\.[a-zA-Z0-9\._\-]+$/i)) {
      return false;
    }

    return true;
  }

  /**
   * Validate an attribute is contained within a list of values.
   *
   * @param {string} name
   * @param {any} value
   * @param {string[] | number[]} values
   * @returns {boolean}
   */
  public static in(name: string, value: any, values: string[] | number[]): boolean {
    if (!Array.isArray(values)) {
      return false;
    }

    // Check if values is string[] or number[] and validate accordingly
    if (values.length > 0) {
      if (typeof values[0] === 'string') {
        return typeof value === 'string' && (values as string[]).includes(value);
      } else if (typeof values[0] === 'number') {
        return typeof value === 'number' && (values as number[]).includes(value);
      }
    }

    return false;
  }

  /**
   * Validate the size of an attribute is less than or equal to a maximum value.
   *
   * @param {string} name
   * @param {any} value
   * @param {number} max
   * @param {string} type
   * @returns {boolean}
   */
  public static max(name: string, value: any, max: number, type: string): boolean {
    if (type === 'string' || Array.isArray(value)) {
      return value.length <= max;
    } else if (type === 'number') {
      return value <= max;
    }

    return true;
  }

  /**
   * Validate the size of an attribute is greater than or equal to a minimum value.
   *
   * @param {string} name
   * @param {any} value
   * @param {number} min
   * @param {string} type
   * @returns {boolean}
   */
  public static min(name: string, value: any, min: number, type: string): boolean {
    if (type === 'string' || Array.isArray(value)) {
      return value.length >= min;
    } else if (type === 'number') {
      return value >= min;
    }

    return false;
  }

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
   * Validate that an attribute is numeric.
   *
   * @param {string} name
   * @param {any} value
   * @returns {boolean}
   */
  public static numeric(name: string, value: any): boolean {
    if (typeof value !== 'number') {
      return false;
    }

    return true;
  }

  /**
   * Validate that an attribute passes a regular expression check.
   *
   * @param {string} name
   * @param {any} value
   * @param {RegExp} pattern
   * @returns {boolean}
   */
  public static regex(name: string, value: any, pattern: RegExp): boolean {
    value = String(value);

    if (!pattern.test(value)) {
      return false;
    }

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

  /**
   * Validate that an attribute is a string.
   *
   * @param {string} name
   * @param {any} value
   * @returns {boolean}
   */
  public static string(name: string, value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    return true;
  }
}

type ValidateAttributeMethod = (name: string, value: any, ...args: any[]) => boolean;

export { ValidateAttributeMethod };

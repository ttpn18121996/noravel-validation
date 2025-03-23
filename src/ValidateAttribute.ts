export default class ValidateAttribute {
  public static email(name: string, value: any): boolean {
    if (typeof value !== 'string' || !value.match(/^[a-zA-Z0-9\._\-\+]+@[a-zA-Z0-9\._\-]+\.[a-zA-Z0-9\._\-]+$/i)) {
      return false;
    }

    return true;
  }

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

  public static nullable(name: string, value: any): boolean {
    return true;
  }

  public static numeric(name: string, value: any): boolean {
    if (typeof value !== 'number') {
      return false;
    }

    return true;
  }

  public static min(name: string, value: any, min: number, type: string): boolean {
    if (type === 'string' || Array.isArray(value)) {
      return value.length >= min;
    } else if (type === 'number') {
      return value >= min;
    }

    return false;
  }

  public static max(name: string, value: any, max: number, type: string): boolean {
    if (type === 'string' || Array.isArray(value)) {
      return value.length <= max;
    } else if (type === 'number') {
      return value <= max;
    }

    return true;
  }

  public static regex(name: string, value: any, pattern: RegExp): boolean {
    value = String(value);

    if (!pattern.test(value)) {
      return false;
    }

    return true;
  }

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

  public static string(name: string, value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    return true;
  }
}

type ValidateAttributeMethod = (name: string, value: any, ...args: any[]) => boolean;

export { ValidateAttributeMethod };

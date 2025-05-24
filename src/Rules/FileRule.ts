import ValidationRule from './ValidationRule';

export default class FileRule extends ValidationRule {
  public constructor(protected mimes: string = '*', protected type: 'mimes' | 'mimetypes' = 'mimes') {
    super();
  }

  public getMessage(attribute: string): string {
    if (this.mimes !== '*') {
      const values = this.mimes.split(',');

      return this.formatMessage(attribute, 'The :attribute field must be a file of type: :values.').replace(
        ':values',
        values.join(', ')
      );
    }

    return this.formatMessage(attribute, 'The :attribute field must be a file.');
  }

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    if (!(value instanceof File)) {
      fail(this.getMessage(attribute));
    }

    if (this.type === 'mimes' && this.mimes !== '*') {
      const validExtensions = this.mimes.split(',');
      const extension = value.name.toLowerCase();

      if (!validExtensions.includes(extension)) {
        fail(this.getMessage(attribute));
      }
    }

    if (this.type === 'mimetypes' && this.mimes !== '*' && !value.type.includes(this.mimes)) {
      fail(this.getMessage(attribute));
    }
  }
}

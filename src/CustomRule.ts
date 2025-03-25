export default class CustomRule {
  protected message?: string;

  public constructor(
    protected passes: (attribute: string, value: any, fail: (message: string) => void) => void,
  ) {}

  public validate(attribute: string, value: any): this {
    this.message = undefined;

    this.passes(attribute, value, this.setMessage.bind(this));

    return this;
  }

  public fails(): boolean {
    return this.message !== undefined;
  }

  public getMessage(): string {
    return this.message ?? '';
  }

  public setMessage(message: string): this {
    this.message = message;

    return this;
  }
}

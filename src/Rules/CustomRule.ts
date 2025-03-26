export default class CustomRule {
  public constructor(protected handler: (attribute: string, value: any, fail: (message: string) => void) => void) {}

  public validate(attribute: string, value: any, fail: (message: string) => void): void {
    this.handler(attribute, value, fail);
  }
}

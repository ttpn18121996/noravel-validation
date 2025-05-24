export interface ValidationRule {
  validate(attribute: string, value: any, fail: (message: string) => void): void;
  setData(data: Record<string, any>): this;
}

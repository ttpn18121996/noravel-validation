export interface ValidationRule {
  validate(attribute: string, value: any, fail: (message: string) => void): Promise<void>;
  setData(data: Record<string, any>): this;
}

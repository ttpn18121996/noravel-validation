export interface Validatable {
  value: any;
  message: string;
  type?: FieldType;
}

export type FieldType = 'string' | 'number' | 'array';

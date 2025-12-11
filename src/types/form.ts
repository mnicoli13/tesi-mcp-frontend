// ============= FORM VALIDATION =============

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

// types/esse3/common.ts
export interface ValueWrapper<T = string> {
  value: T;
}

export interface Stato {
  value: string; // "S", "F", etc.
}

export interface ModValCod {
  value: string; // "V", "G", etc.
}

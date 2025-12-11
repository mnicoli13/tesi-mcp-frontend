// ============= AUTH =============

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  refreshToken?: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

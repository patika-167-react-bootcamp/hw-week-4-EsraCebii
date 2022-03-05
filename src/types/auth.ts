export interface LoginRequest {
  username: string;
  password: string;
}
export interface User {
  id: number;
  username: string;
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  passwordConfirm: string;
}

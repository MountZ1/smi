export interface LoginValues {
  username: string;
  password: string;
}

export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export function validateLogin({ username, password }: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  if (!username.trim()) {
    errors.username = "Username wajib diisi.";
  }

  if (!password) {
    errors.password = "Password wajib diisi.";
  } else if (password.length < 6) {
    errors.password = "Password minimal 6 karakter.";
  }

  return errors;
}

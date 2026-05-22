// AUTH FORM TYPES

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  country: string;
  role: string;
  profileImage: FileList;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

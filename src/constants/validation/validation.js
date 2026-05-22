// PATTERNS
const EMAIL_PATTERN = {
  value: /^\S+@\S+\.\S+$/i,
  message: "Invalid email address",
};

const PHONE_PATTERN = {
  value: /^[+]?[\d\s\-().]{7,15}$/,
  message: "Invalid phone number",
};

// REUSABLE RULES

/** Email field — required + pattern */
export const emailValidation = {
  required: "Email is required",
  pattern: EMAIL_PATTERN,
};

/** Password field — required + min 6 chars */
export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
};

/** New password field (Change/Reset password pages) */
export const newPasswordValidation = {
  required: "New password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters",
  },
};

/** Current (old) password field */
export const oldPasswordValidation = {
  required: "Current password is required",
};
/**
 * Confirm password field — needs the watched password value.
 * @param {string} passwordValue - The current value of the password field to compare against.
 */
export const confirmPasswordValidation = (passwordValue) => ({
  required: "Please confirm your password",
  validate: (val) => val === passwordValue || "Passwords do not match",
});

/** Username field */
export const userNameValidation = {
  required: "Username is required",
  minLength: {
    value: 3,
    message: "Username must be at least 3 characters",
  },
};

/** Phone number field */
export const phoneValidation = {
  required: "Phone number is required",
  pattern: PHONE_PATTERN,
};

/** Country field */
export const countryValidation = {
  required: "Country is required",
};

/** OTP / seed field */
export const otpValidation = {
  required: "OTP code is required",
};

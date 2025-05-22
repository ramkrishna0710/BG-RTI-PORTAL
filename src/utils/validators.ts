
export const isNameValid = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isMobileNumberValid = (mobileNumber: string): boolean => {
  const mobileNumberRegex = /^[6-9]\d{9}$/;
  return mobileNumberRegex.test(mobileNumber);
};

export const isPasswordStrong = (password: string): boolean => {
  return password.length >= 6;
};

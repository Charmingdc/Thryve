export const validateSignupInput = (userName, password, email) => {
  if (userName.length < 4) return 'Your username must not be less than 4 characters';
  if (!email) return "Input a valid email address";
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Invalid email format";
  }
  if (password.length < 6) return 'Your password strength is weak';
  return null; // No validation errors
};

export const validateLogInInput = (username, password) => {
  if (!username) return "invalid username input";
  if (username.length < 4) return "Username must not be less than 4 characters";
  if (password.length < 6) return "Password strength is weak";
  return null;
}

export const validateSignupInput = (email, password, userName) => {
  if (!email) {
    return "Input a valid email address";
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Invalid email format";
  }
  if (password.length < 6) {
    return "Your password is not strong enough";
  }
  if (userName.length < 4) {
    return "Your username must be more than 4 characters";
  }
  return null; // No validation errors
};
export const validateLogInInput = (username, password) => {
  if (!username) return "invalid email";
  if (username.length < 4) return "Invalid username";
  if (password.length < 6) return "Invalid password";
  return null;
}

export const validateSignupInput = (email, password, userName, userSnap) => {
  if (userSnap.exists()) {
    return "Username already exists";
  }
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

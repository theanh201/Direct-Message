const ValidatePassword = (password) => {
  if (password.length < 8) {
    return false;
  }
  return true;
};
const emailValid = (email) => {
  // Email validation regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const notNullValid = (value) => {
  if (!value) {
    return false;
  }
  return true;
};
export default { ValidatePassword, notNullValid, emailValid };

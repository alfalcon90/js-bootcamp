module.exports = {
  getError(errors, prop) {
    // prop === 'email' || 'password' || 'passwordConfirmation'
    try {
      return errors.mapped()[prop].msg; // errors.mapped() returns an object
    } catch (err) {
      return '';
    }
  },
};

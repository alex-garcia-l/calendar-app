const { User } = require('../../models');

export const existEmail = async (email = '') => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error(`The email already exists`);
  }

  return user;
};

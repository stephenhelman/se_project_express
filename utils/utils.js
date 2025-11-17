const filterUserPassword = (userObject) => {
  const newUserObject = {};
  const keys = Object.keys(userObject).filter((key) => key !== "password");

  keys.forEach((key) => {
    newUserObject[key] = userObject[key];
  });

  return newUserObject;
};

module.exports = { filterUserPassword };

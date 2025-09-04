const addUserToRequest = (req, res, next) => {
  req.user = {
    _id: "68ab9c6e4c4145949ba823ea", // paste the _id of the test user created in the previous step
  };
  next();
};

module.exports = { addUserToRequest };

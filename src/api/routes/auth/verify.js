const verifyUser = (req, res, next) => {
  const accessToken = req.headers.authorization;
  console.log(accessToken);
  res.send('hi');
  next();
};
module.exports = { verifyUser };

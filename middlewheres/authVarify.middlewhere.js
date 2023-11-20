
const jwt = require("jsonwebtoken");


const authVerify = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    req.user = { userId: decoded.userId };
    return next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ errorMessage: "Unauthorised access, please add the token",error })
  }
}

module.exports = { authVerify };
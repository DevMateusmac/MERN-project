const jwt = require('jsonwebtoken')
const HttpError = require("../models/http-error");

function checkAuth(req, res, next) {
  if(req.method === 'OPTIONS'){
    return next();
  }
  try {                                                                             //  [0]   [1]
    const token = req.headers.authorization.split(" ")[1]; // toke => Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    req.userData = {userId: decodedToken.userId};
    next();

  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
}

module.exports = { checkAuth };

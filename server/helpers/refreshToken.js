const jwt = require("jsonwebtoken")

const generateRefreshToken =(data)=>{
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRETE, {expiresIn: "7d"});

}

module.exports ={ generateRefreshToken };
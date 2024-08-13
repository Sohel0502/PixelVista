const jwt = require("jsonwebtoken")

const generateAccessToken =(data)=>{
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRETE, {expiresIn: "15m"});

}

module.exports ={ generateAccessToken };
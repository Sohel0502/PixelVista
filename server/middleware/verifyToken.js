const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) =>{
  const authHeader =req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if(!token){
    return res.status(401).json({success:false, message: unauthorized});
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE,(err,User) =>{
      if(err)
        return res.ststus(403).json({success:false, message:"Forbidden"});

      req.id = User.id;
      req.author = User.author;
      req.accountType= User.accountType;
      next();
      
    } )
    
  } catch (error) {
    return res.status(500).json({success:false, message: "Internal Serval Error"})

    
  }
  
}
module.exports = { verifyToken };
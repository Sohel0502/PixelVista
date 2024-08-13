const user = require("../models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../helpers/accessToken");
const { generateRefreshToken } = require("../helpers/refreshToken");


const signup = async (req, res)=>{
  const { username, email, password, accountType } = req.body;
  try {
    let User = await user.findOne({username: username});
    if(User) {
      return res.status(400).json({ success:false, message:"Username Already Exit "})
    }
    const securePassword = await bcrypt.hash(password, 10);

    User = new user({
      username,
      email,
      password: securePassword,
      accountType
    });
    await User.save();
    return res.status(201).json({ success:true, message:"User Created Successfully "})

    
  } catch (error) {
    return res.status(500).json({ success:false, message:"Internal Server Error"})
    
  }

};

const login = async (req, res)=>{
  const {email, password} = req.body;
  try {
    let User = await user.findOne({email});
    if(!User){
      return res.status(400).json({sucess:false, message: "Please Signup"})
    }
    const comparePassword = await bcrypt.compare(password, User.password);
    if(!comparePassword) return res.status(400).json({sucess: false , message: "Invaid credentials"});

    const data ={
      id: User._id,
      accountType: User.accountType,
      author: User.username
    }
    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);
    return res.status( 200)
    .json({sucess:true, 
           message:"Login Sucessful",
           accessToken,
           refreshToken,
           role:User.accountType,
           author: User.username
         })
    
  } catch (error) {
    return res.status(500).json({sucess:false, message: error.message});
  }

};

const refresh = async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ success: false, message: "Please login" });

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ success: false, message: err.message });

      const accessToken = generateAccessToken({
        id: user.id,
        accountType: user.accountType,
        author: user.author,
      });
      const refreshToken = generateRefreshToken({
        id: user.id,
        accountType: user.accountType,
        author: user.author,
      });

      return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        accessToken,
        refreshToken,
        role: user.accountType,
        author: user.author,
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const switchProfile = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  try {
    const User = await user.findByIdAndUpdate(authorId, {
      accountType: authorAccountType === "buyer" ? "seller" : "buyer",
    });
    if (!User)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const data = {
      id: User._id,
      accountType: User.accountType,
      author: User.username,
    };

    const accessToken = generateAccessToken(data);
    const refreshToken = generateRefreshToken(data);

    return res.status(200).json({
      success: true,
      message: `Switched to ${User.accountType}`,
      accessToken,
      refreshToken,
      role: User.accountType,
      author: User.username,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = {login, signup, refresh, switchProfile }
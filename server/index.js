const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express()
const port = process.env.PORT ;

const {readdirSync} = require("fs");
const { route } = require('./routes/authRoutes');
const { connectDb } = require('./connections');
const cors = require("cors")
//const authRoute = require('./routes/authRoutes');
 
connectDb();
app.use(express.json()) 
app.use(cors({
  origin: process.env.CLIENT_URL ,
  credentials: true,
}));

app.get('/', (req, res)=>{
  res.send("server is running..")
})

///app.use('/api', authRoute );

readdirSync("./routes").map((route)=>{
  app.use("/api", require(`./routes/${route}`))
})
app.listen(port,()=>{
  console.log(`Server running in port ${port}`)
})
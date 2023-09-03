const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app=express();
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, PORT } = require('./config/config');
const session=require('express-session')
const {createClient}=require('redis');
const { default: RedisStore } = require('connect-redis');
let redisClient=createClient({url:'redis://redis:6379'})
redisClient.connect().catch((error)=>{console.log("this is redis error",error)});
const mongoURL=`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({}));
const postRouter=require('./routes/postRoutes');
const authRouter=require('./routes/authRoutes');
const connectWithRetry=()=>{
  mongoose.connect(mongoURL)
  .then(()=>console.log("successfully connected to DB"))
  .catch((e)=>{
    console.log(e)
    setTimeout(connectWithRetry,5000)
  });
}
connectWithRetry();

app.enable('trust proxy');
app.use(session({
  store: new RedisStore({client:redisClient}),
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie:{
    secure: false,
    httpOnly: true,
    maxAge:60000
  }
}))
app.get('/api/v1',(req,res)=>{
  res.send('This is demo server');
});

app.use('/api/v1/posts',postRouter);
app.use('/api/v1/users',authRouter);

app.listen(PORT,()=>{
  console.log(`server is started ${PORT}`);
})
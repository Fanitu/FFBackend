require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const verifyJwt = require('./middleware/verifyJwt');
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 27500;
const allowedOrigins = ['http://localhost:5173', 'http://example.com'];

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) { 
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

app.use('/register',require('./register/registerRoute'));
app.use('/login',require('./login/loginRoute'));
app.use(verifyJwt);
app.use('/user',require("./USERS/UserRoute/userRoute"));
app.use('/order',require("./Order/route/orderRoute"));
app.use('/food',require("./food/route/foodroute"));

 
mongoose.connect( DB_URL).then(()=>{
   console.log('Connected to DB succesfully')
}).catch((error)=>{
    console.error('coonection error',error);
    process.exit(1)
});

app.listen(PORT, ()=>{
    console.log(`Server runs on PORT ${PORT}`)
})
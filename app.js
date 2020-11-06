const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require("express-fileupload")

//routes
const Routes = require('./routes/recipe');

//config
dotenv.config({ path: './config.env' });

//connected to database
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false 
  })
  .then(()=>{
    console.log(`MongoDB Connected`);
  })
  .catch((err)=>{
   console.log(err)    
  })
 
};
connectDB();

//middleware
app.use(cors());
//body-parser
app.use(bodyParser.json())
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api', Routes);
app.use('/uploads', express.static('uploads'));




const port = 4000;
//listning of server
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
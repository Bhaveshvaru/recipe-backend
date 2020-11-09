
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const recipeSchema = new mongoose.Schema(
  {
      // recipeId:{
      //   type:ObjectId,
      // },
    recipename: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      
    },
    cuisinetype:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
    }, 
    recipetype:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description:{
        type:String,
        required:true,
    },
    calories:{
        type:Number,
        required:true,
        trim:true
    },
    recipedate:{
    type: Date,
    required: true,
    },
    ingredient:{
        type:String,
        required:true,
        trim:true
    },
    preparationtime:{
        type:String,
        required:true
    } ,
   photo: 
    { 
       type:String
    } 
  }

);
module.exports = mongoose.model('RecipeData', recipeSchema); 
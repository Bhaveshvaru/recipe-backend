const Recipedata = require('../model/Recipemodel');
const fs =require("fs");
const path = require('path');
const shortid = require('shortid');

//create Controller
exports.createRecipe = (req, res,next) => {
  const {
    recipename,
    cuisinetype,
    recipetype,
    description,
    calories,
    recipedate,
    ingredient,
    preparationtime,
  } = req.body;
  const file = req.files.photo
  if(!req.files)
  {
      res.status(400).json({msg:"File was not found"});
      return;
  }
  // Create custom filename
  //console.log("files",file)

  let shortId=shortid.generate()
  file.name = `photo_${shortId}_${file.name}`;

  file.mv(`uploads/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return res.status(500).json({err:"problem with image"})
    }
  let photo=file.name;//.file
 

  const recipedata = new Recipedata({
    recipename,
    cuisinetype,
    recipetype,
    description,
    calories,
    recipedate,
    ingredient,
    preparationtime,
    photo
  });
 
  recipedata.save((error, data) => {
    if (error) return res.status(400).json({ error });
    if (data) {
      res.status(201).json({ msg:"recipe added successfully!",data,
    });  
    }
  });
})
}


//get Controller
exports.getAllrecipies = (req, res,next) => {
  //Adding pagination part
  page=req.query.page;
  limit=req.query.limit;

  const startIndex=(page-1) * limit;
  const endIndex= page * limit;

    Recipedata.find()
      .exec((err, recipe) => {
        if (err) {
          return res.status(400).json({
            error: "No recipies Found"
          });
        }
        const result = recipe.slice(startIndex,endIndex)
       // res.json(result);
        return res.status(200).json(result)
      });
  };

  //search controller by name
  exports.getRecipeByName=(req,res,next)=>{
    const searchField = req.query.recipename;
    Recipedata.find({recipename:{$regex:searchField,$options:'$i'}})
    .then(data=>{
      return res.status(200).json(data)
    })
    .catch(err=>{
      return res.status(400).json({error:err})
    })
  }

  //delete controller
exports.deleteRecipie =(req,res,next)=>{
  let id =req.params.id
  Recipedata.findByIdAndDelete(id)
  .exec((err,data)=>{
    if (err) {
        return res.status(400).json({
          error: "Failed to delete "
        });
      }
      res.json({
        message: "Recipe Deleted..",
        data
      });
  })

}

//update Controller
exports.updateRecipies=(req,res,next)=>{
    let id= req.params.id
    const {
      recipename,
      cuisinetype,
      recipetype,
      description,
      calories,
      recipedate,
      ingredient,
      preparationtime,
    } = req.body;
    const file = req.files.photo
    if(!req.files)
    {
        res.status(400).json({msg:"File was not found"});
        return;
    }
    // Create custom filename
    //console.log("files",file)
  
    let shortId=shortid.generate()
    file.name = `photo_${shortId}_${file.name}`;
  
    file.mv(`uploads/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return res.status(500).json({err:"problem with image"})
      }
    
   
  })  
  let photo=file.name;//.file
   
  
  let recipedata = new Recipedata({
    recipename,
    cuisinetype,
    recipetype,
    description,
    calories,
    recipedate,
    ingredient,
    preparationtime,
    photo
  });
  console.log("recipe",recipedata)
      Recipedata.findByIdAndUpdate(id,{recipedata}
        ,{new:true})
        .then((data)=>{
          return res.status(200).json({data,msg:"updation successfull."})
        })
        .catch((err=>{
          return res.status(400).json({err,msg:err.message})
        }))
}




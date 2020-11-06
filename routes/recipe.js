const express = require('express');
const router = express.Router();

const { createRecipe,getAllrecipies,getRecipeByName,deleteRecipie,updateRecipies } = require('../controllers/recipe');
const multer = require('multer');
 const shortid = require('shortid');
const path = require('path');
const fs = require("fs")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({ storage })

router.post(
    "/recipe/create",
   // upload.single('photo'),
    createRecipe
  );

  router.get("/recipe/get",getAllrecipies);
  router.get("/recipe/getName",getRecipeByName);
  router.delete("/recipe/delete/:id",deleteRecipie);
  router.put("/recipe/update/:id",updateRecipies);

module.exports = router;
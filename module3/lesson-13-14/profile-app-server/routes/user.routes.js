const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/jwt.middleware.js");
const fileUploader = require("../config/cloudinary.config");

const User = require("../models/User.model");

router.get("/users", isAuthenticated, (req, res, next) => {
 // Use the User model to find the specific user by id
 console.log(req.payload)
 res.json({ user: req.payload });
});

router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
     console.log("req.file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

router.put('/users', isAuthenticated, (req, res, next) => {
    const { image } = req.body;

    User.findByIdAndUpdate(req.payload._id, { image }, { new: true })
        .then((updatedUser) => {
            res.json({ user: updatedUser });
        })
        .catch((err) => {
            res.json(err);
        });
})

module.exports = router;

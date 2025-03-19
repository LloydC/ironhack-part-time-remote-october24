const express = require("express");
const router = express.Router();
const {isAuthenticated} = require("../middleware/jwt.middleware.js");
router.get("/users", isAuthenticated, (req, res, next) => {
 // Use the User model to find the specific user by id
 console.log(req.payload)
 res.json({ user: req.payload });
});

module.exports = router;

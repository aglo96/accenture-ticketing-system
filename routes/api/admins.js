const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load Admin model
const Admin = require("../../models/Admin");

// @route POST api/admins/register
// @desc Register admin
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Admin.findOne({ email: req.body.email }).then(admin => {
      if (admin) {
        return res.status(400).json({ email: "Email already exists" });
      } 
  const newAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => res.json(admin))
              .catch(err => console.log(err));
          });
        });
      })
    });

// @route POST api/admins/login
// @desc Login admin and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find admin by email
    Admin.findOne({ email }).then(admin => {
      // Check if admin exists
      if (!admin) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, admin.password).then(isMatch => {
        if (isMatch) {
          // Admin matched
          // Create JWT Payload
          const payload = {
            type: "admin",
            email: admin.email,
            id: admin.id,
            name: admin.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  router.get("/:id", function(req,res) {
    const id = req.params.id;
        Admin.findOne({_id: id})
        .exec( function(err, ticket) {
          if (!ticket) {
              return res.status(404).send(); //todo not found
          }
          res.json(ticket); 
      })
  })

  module.exports = router;
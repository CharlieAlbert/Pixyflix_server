const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
      });
      user
        .save()
        .then((user) => {
          res.json({
            message: "User Added Successfully",
          });
        })
        .catch((error) => {
          res.json({
            message: "An Error Occured",
          });
        });
    }
  });
};

const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ $or: [{ username: email }, { email: email }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ username: user.email }, "Zp9VBwO9VSaWj9sB", {
              expiresIn: "1h",
            });
            res.json({
              message: "Login Successful",
              token,
            });
          } else {
            res.json({
              message: "Password does not much",
            });
          }
        });
      } else {
        res.json({
          message: "No user found",
        });
      }
    }
  );
};

module.exports = { register, login };

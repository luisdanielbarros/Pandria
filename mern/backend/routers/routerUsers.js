var express = require('express')
var router = express.Router()
const User = require('../models/user.model');
const fetch = require ('isomorphic-fetch');

//Generate Cookie
const genCookie = Length =>  {
  let toReturn = ``;
  let Chars = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  for (var i = Length; i > 0; --i) toReturn += Chars[Math.floor(Math.random() * Chars.length)];
  return toReturn;
}

//Validate Human
async function validateHuman(ReCAPTCHAToken) {
  const siteKey = '6LfmV7sZAAAAAMj7hsaUeagJ3UAoy2WizcE3Wzm1-Bgwtyqp';
  const secretKey = '6LfmV7sZAAAAAATZSQMwTRqUD8hsJdoz-Bgwtyqp';
  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${siteKey}`,
    {
      method: 'POST'
    }
  );
  const data = await response.json();
  return data.success;
}
//Errors
const operationSuccess = {
  FAILURE: 0,
  SUCCESS: 1,
  ERROR: 3  
}
const wrapMessage = (opSucc, Msg) => ({ success: opSucc, message: Msg });
//Login
const userLogin = wrapMessage(operationSuccess.SUCCESS, 'User logged in.');
const userNotLogin = wrapMessage(operationSuccess.ERROR, 'Could not log in user.');
//Insert
const userRegister = wrapMessage(operationSuccess.SUCCESS, 'User registered.');
const userNotRegister = wrapMessage(operationSuccess.ERROR, 'Could not register user.');
//Update
const userUpdate = wrapMessage(operationSuccess.SUCCESS, 'User updated.');
const userNotUpdate = wrapMessage(operationSuccess.ERROR, 'Could not update user.');
//Captcha
const incorrectCaptcha = wrapMessage(operationSuccess.FAILURE, 'Incorrect captcha.');
//Password
const incorrectPassword = wrapMessage(operationSuccess.FAILURE, 'Incorrect password.');
const passwordMistmatch = wrapMessage(operationSuccess.FAILURE, 'Password mismatch.');
//Not Found
const userNotFound = wrapMessage(operationSuccess.FAILURE, 'Username and/or password are incorrect.');

//Login
router.route('/login').get(async (req, res) => {
  const isHuman = await validateHuman(req.query.recaptcha);
  if (isHuman) {
    res.json(incorrectCaptcha);
    return;
  }
  User.find({username: req.query.username, password: req.query.password }, (err, users) => {
      if (err) {
        res.status(400);
        res.json(userNotLogin);
      }
      else if (users.length != 1) {
        res.json(userNotFound);
      }
      else {
        users = users[0];
        users.cookie = genCookie(128);
        users.expirationDate = new Date();
        users.save();
        users.loggedIn = true;
        users.id = users._id;
        res.json({operation: userLogin, data: users});
      }
  });
});

//Cookie Login
router.route('/cookie-login').get(async (req, res) => {
  User.find({username: req.query.username, cookie: req.query.loginHash }, (err, users) => {
      if (err) {
        res.status(400);
        res.json(userNotLogin);
      }
      else if (users.length != 1) {
        res.json(userNotFound);
      }
      else {
        users = users[0];
        users.loggedIn = true;
        users.id = users._id;
        res.json({operation: userLogin, data: users});
      }
  });
});

//Registration
router.route('/register').post(async (req, res) => {
  const isHuman = await validateHuman(req.query.recaptcha);
  if (isHuman) {
    res.json(incorrectCaptcha);
    return;
  }
  let user = new User(req.query);
  user.save()
  .then(user => res.json(userUpdate))
  .catch(err => {
    res.status(400);
    res.json(userNotRegister);
  });
});

//Update Profile
router.route('/update/:id').post(async (req, res) => {
  const isHuman = await validateHuman(req.query.recaptcha);
  if (isHuman) {
    res.json(incorrectCaptcha);
    return;
  }
  User.findOne({_id: req.params.id }, (err, user) => {
    if (!user) res.status(404).send('User could not be found.');
    else {
      if (req.query.hasOwnProperty('name')) user.name = req.query.name;
      if (req.query.hasOwnProperty('gender')) user.gender = req.query.gender;
      if (req.query.hasOwnProperty('birth')) user.birth = req.query.birth;
      user.save()
      .then(user => res.json(userUpdate))
      .catch(err => {
        res.status(400);
        res.json(userNotUpdate);
      });
    }
  });
});

//Update Username
router.route('/update-username').get(async (req, res) => {
  const isHuman = await validateHuman(req.query.recaptcha);
  if (isHuman) {
    res.json(incorrectCaptcha);
    return;
  }
  User.findOne({_id: req.query.id, password: req.query.password }, (err, user) => {
    if (!user) res.json(incorrectPassword);
    else {
      if (req.query.hasOwnProperty('username')) user.username = req.query.username;
      user.save()
      .then(user => res.json(userUpdate))
      .catch(err => {
        res.status(400);
        res.json(userNotUpdate);
      });
    }
  });
});

//Update Password
router.route('/update-password').get(async (req, res) => {
  const isHuman = await validateHuman(req.query.recaptcha);
  if (isHuman) {
    res.json(incorrectCaptcha);
    return;
  }
  User.findOne({_id: req.query.id, password: req.query.password }, (err, user) => {
    if (!user) res.json(incorrectPassword);
    else {
      if (req.query.hasOwnProperty('newPassword')) user.password = req.query.newPassword;
      user.save()
      .then(user => res.json(userUpdate))
      .catch(err => {
          res.status(400);
          res.json(userNotUpdate);
      });
    }
  });
});

module.exports = router
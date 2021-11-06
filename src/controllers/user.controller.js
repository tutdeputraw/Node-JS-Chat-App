const User = require('../database/mysql').user;
const Op = require("sequelize").Op;
var uid = require('rand-token').uid;

exports.signUp = (req, res) => {
  User.count({
    where: {
      [Op.and]: [{
        username: req.body.username
      }, {
        email: req.body.email
      }],
    }
  }).then(result => {
    if (result == 0) {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }).then(result => {
        res.status(201).json({
          message: 'User created successfully!',
        });
      });
    } else {
      res.status(400).json({
        message: 'User already exist'
      });
    }
  });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      [Op.and]: [{
        email: req.body.email
      }, {
        password: req.body.password
      }],
    }
  }).then(result => {
    if (result != null) {
      const token = uid(32);
      res.status(200).json({
        message: 'Login Success',
        data: {
          id: result.id,
          token: token
        }
      });
      User.update({
        token: token
      }, {
        where: {
          id: result.id
        }
      });
    } else {
      res.status(404).json({
        message: 'Login Failed'
      });
    }
  });
};

exports.signOut = (req, res) => {
  User.update({
    token: null
  }, {
    where: {
      id: req.body.id
    }
  }).then(result => {
    if (result == 1) {
      res.status(404).json({
        message: 'Sign out success!',
      });
    } else {
      res.status(404).json({
        message: 'Sign out failed!',
      });
    }
  });
};
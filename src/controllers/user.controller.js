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
        email: req.params.email
      }, {
        password: req.params.password
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
      id: req.params.id
    }
  }).then(result => {
    if (result == 1) {
      res.status(200).json({
        message: 'Sign out success!',
      });
    } else {
      res.status(404).json({
        message: 'Sign out failed!',
      });
    }
  });
};

exports.search = async (req, res) => {
  const keyword = req.query.search;
  if (keyword == '') {
    res.json([]);
  } else {
    const findKeyword = await User.findAll({
      attributes: ['id', 'username']
    }, {
      where: {
        [Op.and]: [{
          username: {
            [Op.like]: '%' + req.query.search + '%'
          },
          [Op.not]: [{
            id: [req.query.id]
          }]
        }],
      }
    });

    res.json(
      findKeyword
    );
  }
};

exports.getFriends = async (req, res) => {
  const friends = await User.findOne({
    // attributes: ['friendId'],
    where: {
      id: {
        [Op.eq]: req.query.id
      }
    },
    include: ['friends']
  });

  res.status(200).json(friends);
};

exports.getUserInfo = async (req, res) => {
  const userInfo = await User.findOne({
    attributes: ['username'],
    where: {
      id: {
        [Op.eq]: req.query.id
      }
    }
  });

  res.status(200).json(userInfo);
};
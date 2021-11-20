const Friend = require('../database/mysql').friend;
const User = require('../database/mysql').user;
const Op = require("sequelize").Op;
var uid = require('rand-token').uid;

exports.addFriend = async (req, res) => {
  const [friendA, createdA] = await Friend.findOrCreate({
    where: {
      [Op.and]: [{
        userId: req.body.userId
      }, {
        friendId: req.body.friendId
      }],
    },
    defaults: {
      userId: req.body.userId,
      friendId: req.body.friendId,
    }
  });

  const [friendB, createdB] = await Friend.findOrCreate({
    where: {
      [Op.and]: [{
        userId: req.body.friendId
      }, {
        friendId: req.body.userId
      }],
    },
    defaults: {
      userId: req.body.friendId,
      friendId: req.body.userId,
    }
  });

  if (createdA && createdB) {
    res.status(201).json({
      data: "created"
    });
  } else {
    res.status(200).json({
      data: "not created"
    });
  }
};

exports.getFriends = async (req, res) => {
  const friends = await Friend.findAll({
    attributes: [
      ['friendId', 'userId']
    ],
    where: {
      friendId: {
        [Op.eq]: req.query.id
      }
    },
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'username'],
    },
  });

  res.status(200).json(friends);
};
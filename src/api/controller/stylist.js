const Apparel = require('../../models/apparel');
const Closet = require('../../models/closet');
const User = require('../../models/user');
const {
  successResponseWithData,
  ErrorResponse
} = require('../helpers/apiResponse');

/**
 * @description Fetches user Id and name from DB
 */
const getUsers = (req, res, next) => {
  Promise.resolve(
    User.findAll({
      where: { isActive: true, role: 'user' },
      attributes: ['id', 'name', 'gender']
    })
  )
    .then((data) => {
      successResponseWithData(res, 'Success', data);
      next();
    })
    .catch((error) => {
      console.log(error);
      ErrorResponse(res, 'Failed');
      next();
    });
};

/**
 * @description Fetches apparels for making combination of specific user using user_id returned from getUsers
 */
const getApparels = (req, res, next) => {
  const UserId = req.body.data.user_id;
  Promise.resolve(
    Apparel.findAll({
      where: { user_id: UserId, isActive: true }
    })
  )
    .then((dt) => {
      console.log(dt);
      successResponseWithData(res, 'Success', dt);
      next();
    })
    .catch((error) => {
      console.log(error);
      ErrorResponse(res, 'Failed');
      next();
    });
};

/**
 * @description Saves One Combination per request of apparels for specific user
 */
const saveCombination = (req, res, next) => {
  const { data } = req.body;
  // const UserId = 3;
  const combination = {
    isLiked: data.isLiked,
    isActive: data.isActive,
    apparel1: data.apparel_1,
    apparel2: data.apparel_2,
    user_id: data.userId
  };
  Promise.resolve(Closet.create(combination))
    .then((dt) => {
      console.log(dt);
      successResponseWithData(res, 'Success', dt);
      next();
    })
    .catch((error) => {
      console.log(error);
      ErrorResponse(res, 'Failed');
      next();
    });
};

module.exports = { getUsers, getApparels, saveCombination };

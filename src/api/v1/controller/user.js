const Answer = require("../../../models/answer");
const Apparel = require("../../../models/apparel");
const ApparelType = require("../../../models/apparelType");
const Option = require("../../../models/option");
const Question = require("../../../models/question");
const {
  successResponse,
  successResponseWithData,
  ErrorResponse,
} = require("../../helpers/apiResponse");

/**
 *
 * @description Functions returns all questions and its options from db to api request(question collection same for all the users)
 */
const getQuestions = (req, res, next) => {
  Promise.resolve(
    Question.findAll({
      where: { isActive: true },
      attributes: ["id", "question"],
      include: [
        {
          model: Option,
          attributes: ["id", "option", "image"],
        },
      ],
    })
  )
    .then((data) => {
      successResponseWithData(res, "Success", data);
      next();
    })
    .catch((error) => {
      ErrorResponse(res, "failed");
      next();
    });
};

/**
 * @description This function saves user's answers in Database
 */
const saveAnswers = (req, res, next) => {
  const ansData = req.body.data;
  const user_id = 3;
  const answers = ansData.map((data) => {
    return {
      value: data.value ? data.value : null,
      option_id: data.option_id ? data.option_id : null,
      question_id: data.question_id,
      user_id: user_id,
    };
  });
  Answer.bulkCreate(answers)
    .then((data) => {
      successResponse(res, "Success");
      next();
    })
    .catch((error) => {
      console.log(error);
      ErrorResponse(res, "failed");
      next();
    });
};
const uploadApparel = (req, res, next) => {
  const user_id = 3;
  const apparelData = req.body.data.map((data) => {
    return {
      apparel_link: data.apparel_link,
      isActive: data.isActive,
      apparel_type_id: data.apparel_type_id,
      user_id: user_id,
    };
  });
  Promise.resolve(Apparel.bulkCreate(apparelData))
    .then((data) => {
      successResponseWithData(res, "success", data);
      next();
    })
    .catch((error) => {
      console.log(error);
      ErrorResponse(res, "failed");
      next();
    });
};
/**
 * @description This function gets apparel types from database for use in uploading apparels payload
 */
const getApparelTypes = (req, res, next) => {
  Promise.resolve(
    ApparelType.findAll({
      where: { isActive: true },
    })
  )
    .then((data) => {
      console.log(data);
      successResponseWithData(res, "success", data);
      next();
    })
    .catch((error) => {
      console.log(error);
      ErrorResponse(res, "failed");
      next();
    });
};

/**
 * @description Gets combination of specific user
 */
const getCloset = (req, res, next) => {};

module.exports = {
  getQuestions,
  saveAnswers,
  uploadApparel,
  getCloset,
  getApparelTypes,
};

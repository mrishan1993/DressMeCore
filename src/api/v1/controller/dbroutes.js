const Option = require("../../../models/option");
const Question = require("../../../models/question");

const addQuestion = (req, res, next) => {
  const reqdata = req.body.data;
  const questionData = reqdata.map((data) => {
    return {
      question: data.value,
      isActive: 1,
    };
  });
  Promise.resolve(Question.bulkCreate(questionData))
    .then((data) => {
      const optionData = [];
      data.forEach((dt) => {
        reqdata.forEach((qdt) => {
          if (dt.dataValues.question == qdt.value) {
            qdt.option.forEach((opt) => {
              optionData.push({
                option: opt,
                isActive: true,
                question_id: dt.dataValues.id,
              });
            });
          }
        });
      });
      console.log(optionData);
      return Promise.resolve(Option.bulkCreate(optionData));
    })
    .then((d) => {
      console.log(d);
      res.send("Questions and options uploaded");
      next();
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = { addQuestion };

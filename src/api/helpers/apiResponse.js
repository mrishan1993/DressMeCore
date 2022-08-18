const successResponse = (res, msg) => {
  const data = {
    message: msg
  };
  return res.status(200).json(data);
};

const successResponseWithData = (res, msg, data) => {
  const resData = {
    message: msg,
    data
  };
  return res.status(200).json(resData);
};

const ModificationResponseWithData = (res, msg, data) => {
  const resData = {
    message: msg,
    nModified: data
  };
  return res.status(200).json(resData);
};

const successResponseWithToken = (res, resData) =>
  res.status(200).json(resData);

const ErrorResponse = (res, msg) => {
  const data = {
    message: msg
  };
  return res.status(500).json(data);
};

const notFoundResponse = (res, msg) => {
  const data = {
    message: msg
  };
  return res.status(404).json(data);
};

const validationErrorWithData = (res, msg, data) => {
  const resData = {
    message: msg,
    data
  };
  return res.status(400).json(resData);
};

const unauthorizedResponse = (res, msg) => {
  const data = {
    message: msg
  };
  return res.status(401).json(data);
};

module.exports = {
  successResponse,
  successResponseWithData,
  successResponseWithToken,
  ModificationResponseWithData,
  ErrorResponse,
  notFoundResponse,
  validationErrorWithData,
  unauthorizedResponse
};

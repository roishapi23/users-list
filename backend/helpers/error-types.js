
const ErrorType = {
  EXTERNAL_API_ERROR: { httpCode: 404, message: "Requested data not found" },
  UNAUTHORIZED: { httpCode: 401, message: "Not Authorized" },
};

module.exports = ErrorType;

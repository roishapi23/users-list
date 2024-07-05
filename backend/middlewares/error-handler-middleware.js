const errorHandler = (error, request, response, next) => {
  console.log("server error is", JSON.stringify(error));
  if (error) {
      if (error.status == 401) { 
          response.status(error.status)
          response.json({
              error: error.message
          })
      }
      else{
          response.status(404)
          response.json({
              error: error.errorType
          })
      }
  }
};

module.exports = errorHandler;

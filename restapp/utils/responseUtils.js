var ResponseUtils = module.exports;

ResponseUtils.print = function (file_name, function_name) {
  let error_message = "Error occured at " + file_name + " in " + function_name + " : ";
  let log_message = "Logging for " + file_name + " in " + function_name + " : ";
  let exception_message = "Exception occured at " + file_name + " in " + function_name + " : ";

  this.error = function (message) {
    console.error(error_message);
    let error_object = {};
    error_object.type = "ERROR";
    error_object.error_message = message;
    error_object.file_name = file_name;
    error_object.function_name = function_name;
    console.error(error_object);
  };

  this.log = function (message) {
    console.log(log_message);
    let log_object = {};
    log_object.type = "LOGGING";
    log_object.log_message = message;
    log_object.file_name = file_name;
    log_object.function_name = function_name;
    console.log(log_object);
  };

  this.exception = function (message) {
    console.log(exception_message);
    let exception_object = {};
    exception_object.type = "EXCEPTION";
    exception_object.log_message = message;
    exception_object.file_name = file_name;
    exception_object.function_name = function_name;
    console.log(exception_object);
  }

};

ResponseUtils.response = function (api_response) {
  let error_object = {};
  error_object.status_code = 400;
  error_object.status = "ERR";
  error_object.type = "ERROR";

  let success_object = {};
  success_object.status_code = 200;
  success_object.status = "SUCCESS";
  success_object.type = "SUCCESS";

  this.error = function (message, status, status_code) {

    error_object.message = message;
    error_object.status = status;
    error_object.status_code = status_code ? status_code : error_object.status_code;

    api_response.status(200).send(error_object);
  };


  this.success = function (message, data, status) {
    success_object.message = message;
    success_object.status = status ? status : success_object.status;
    data || data == 0 ? success_object.data = data : "no data";

    api_response.status(200).send(success_object);
  };

  this.errorData = function (message, status, status_code) {

    error_object.message = message;
    error_object.status = status;
    error_object.status_code = status_code ? status_code : error_object.status_code;

    return error_object;

  };


  this.successData = function (message, data, status) {
    success_object.message = message;
    success_object.status = status ? status : success_object.status;
    data || date == 0 ? success_object.data = data : "no data";

    return success_object;
  };

};

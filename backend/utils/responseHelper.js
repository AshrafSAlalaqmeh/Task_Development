const sendResponse = (res, status, statusType, message) => {
    res.status(status).send({
      status: statusType,
      message: message,
    });
  };
  
  module.exports = {
    sendResponse,
  };
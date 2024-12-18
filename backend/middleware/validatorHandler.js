const validatorHandler = (req, res, next, schema, property) => {
    const { error } = schema.validate(req[property]);
  
    if (error) {
      res.status(400).json({
        status: false,
        message: error.details[0].message.replace("/[^a-zA-Z0-9 ]/g", ""),
      });
      return;
    }
    next();
  };
  
  module.exports = validatorHandler;
  
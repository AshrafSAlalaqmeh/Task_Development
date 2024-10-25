const Joi = require("joi");
const validatorHandler = require("../../middleware/validatorHandler");
const { sendResponse } = require("../../utils/responseHelper");

const createNewProduct = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().optional().allow(null, "").messages({
      "string.base": "The name must be string.",
    }),
    price: Joi.number().integer().min(1).optional().allow(null, "").messages({
      "number.base": "The price must be number.",
      "number.min": "The price must be greater than or equal to 1.",
    }),
    category: Joi.string().trim().optional().allow(null, "").messages({
      "string.base": "The name must be string.",
    }),
    description: Joi.string()
      .trim()
      .min(3)
      .optional()
      .allow(null, "")
      .messages({
        "string.min": "description must have at least 3 characters.",
        "string.base": "The description must be string.",
      }),
    availability_status: Joi.string()
      .trim()
      .optional()
      .allow(null, "")
      .valid("active", "unactive")
      .messages({
        "any.only":
          "The availability status must be either 'active' or 'unactive'.",
        "string.base": "The description must be string.",
      }),
  });

  validatorHandler(req, res, next, schema, "body");
};

const updateProduct = (req, res, next) => {
  const schema = Joi.object({
    product_id: Joi.number().integer().min(1).required().messages({
      "any.required": "The production ID is required.",
      "number.min": "The production ID must be greater than or equal to 1.",
    }),
    name: Joi.string().trim().optional().allow(null, "").messages({
      "string.base": "The name must be string.",
    }),
    price: Joi.number().integer().min(1).optional().allow(null, "").messages({
      "number.base": "The price must be number.",
      "number.min": "The price must be greater than or equal to 1.",
    }),
    category: Joi.string().trim().optional().allow(null, "").messages({
      "string.base": "The category must be string.",
    }),
    description: Joi.string()
      .trim()
      .min(3)
      .optional()
      .allow(null, "")
      .messages({
        "string.min": "description must have at least 3 characters.",
        "string.base": "The description must be string.",
      }),
    availability_status: Joi.string()
      .trim()
      .optional()
      .allow(null, "")
      .valid("active", "unactive")
      .messages({
        "any.only":
          "The availability status must be either 'active' or 'unactive'.",
        "string.base": "The availability status must be string.",
      }),
  });

  req.params.product_id = req.params.product_id || null;
  const { error, value } = schema.validate(
    {
      ...req.body,
      product_id: req.params.product_id,
    },
    { abortEarly: false }
  ); // Validate all fields and not just stop on first error

  if (error) {
    return sendResponse(
      res,
      400,
      false,
      error.details[0].message.replace(/"/g, "")
    );
  }

  req.validatedData = value;

  next();
};

const deleteProduct = (req, res, next) => {
  const schema = Joi.object({
    product_id: Joi.number().integer().min(1).required().messages({
      "any.required": "The production ID is required.",
      "number.min": "The production ID must be greater than or equal to 1.",
    }),
  });

  validatorHandler(req, res, next, schema, "params");
};

module.exports = {
  createNewProduct,
  updateProduct,
  deleteProduct,
};

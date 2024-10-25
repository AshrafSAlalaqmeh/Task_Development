const Production = require("./production.model");
const { sendResponse } = require("../../utils/responseHelper");

exports.createNewProduct = async (req, res) => {
  Production.createNewProduct(req.body, (err, result) => {
    if (err) {
      return sendResponse(res, 403, false, err);
    } else {
      return sendResponse(res, 201, true, result);
    }
  });
};

exports.updateProduct = async (req, res) => {
  const production_id = req.params.production_id;

  const result = await Production.isExistProduct(production_id);
  if (!result?.length) {
    return sendResponse(res, 404, false, "The product does not exist");
  }

  let obj = {
    production_id: production_id,
    body: req.body,
  };
  await Production.updateProduct(obj, (err, result) => {
    if (err) {
      return sendResponse(res, 403, false, err);
    }

    return sendResponse(res, 200, true, result);
  });
};

exports.getProduct = async (req, res) => {
  await Production.getProduct(req, async (err, data) => {
    if (err) {
      return sendResponse(res, 403, false, err);
    } else {
      return sendResponse(res, 200, true, data);
    }
  });
};

exports.deleteProduct = async (req, res) => {
  const production_id = req.params.production_id;

  const result = await Production.isExistProduct(production_id);
  if (!result?.length) {
    return sendResponse(res, 404, false, "The product does not exist");
  }

  await Production.deleteProduct(production_id, async (err, data) => {
    if (err) {
      return sendResponse(res, 403, false, err);
    } else {
      return sendResponse(res, 200, true, "Successfully Deleted");
    }
  });
};
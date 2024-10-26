const { pool } = require("../../config/database/databaseConfig");

const {
  createNewProduct: createNewProductQuery,
  updateProduct: updateProductQuery,
  isExistProduct: isExistProductQuery,
  getProduct: getProductQuery,
  getProductCount: getProductCountQuery,
  deleteProduct: deleteProductQuery,
} = require("./production.query");

class Production {
  static async createNewProduct(newProduct, cb) {
    try {
      const result = await pool.query(createNewProductQuery, [
        newProduct.name,
        newProduct.price,
        newProduct.category,
        newProduct.description,
        newProduct.availability_status,
      ]);
      cb(null, {
        product_id: result[0].insertId,
        name: newProduct.name,
        price: newProduct.price,
        category: newProduct.category,
        description: newProduct.description,
        availability_status: newProduct.availability_status,
      });
      return;
    } catch (error) {
      cb(error, null);
      return;
    }
  }

  static async updateProduct(newData, cb) {
    let data = newData.body;
    try {
      await pool.query(updateProductQuery, [
        data.name,
        data.price,
        data.category,
        data.description,
        data.availability_status,
        newData.product_id,
      ]);
      cb(null, {
        product_id: newData.product_id,
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        availability_status: data.availability_status,
      });
      return;
    } catch (error) {
      cb(error, null);
      return;
    }
  }

  static async isExistProduct(data) {
    try {
      const [result] = await pool.query(isExistProductQuery, data);
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getProduct(getData, cb) {
    try {
      let data = getData.query;
      let query = getProductQuery;
      let CountQuery = getProductCountQuery;

      const filters = {
        product_id: "product_id",
        price: "price",
        category: "category",
        availability_status: "availability_status",
      };

      let filterQuery = "";

      // Dynamically build query conditions
      for (const [key, field] of Object.entries(filters)) {
        if (data[key]) {
          filterQuery += ` AND ${field} = '${data[key]}'`;
        }
      }
      let finalQuery;
      let finalCountQuery;

      finalQuery = `${query} ${filterQuery} GROUP BY product_id`;
      finalCountQuery = `${CountQuery}`;

      // Execute the queries
      const [result] = await pool.query(finalQuery + ";" + finalCountQuery);

      cb(null, {
        items_list: result[0].reverse(),
        total_items: result[1][0].total_count,
      });
    } catch (error) {
      cb(error, null);
    }
  }

  static async deleteProduct(data, cb) {
    try {
      const result = await pool.query(deleteProductQuery, data);
      cb(null, result);
      return;
    } catch (error) {
      cb(error, null);
      return;
    }
  }
}

module.exports = Production;

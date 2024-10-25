const createNewProduct = `
  INSERT INTO products
    (
    name, 
    price, 
    category, 
    description, 
    availability_status
    )
  VALUES
    (?, ?, ?, ?, ?)
`;

const updateProduct = `
  UPDATE products
  SET
    name= ?, 
    price= ?, 
    category= ?, 
    description= ?, 
    availability_status= ?
  WHERE
    product_id = ?
`;

const isExistProduct = `
  SELECT
    product_id
  FROM
    products
  WHERE
    product_id = ?
`;

const getProduct = `
  SELECT
    product_id,
    name,
    price,
    category,
    description,
    availability_status
  FROM
    products
  WHERE
    1
`;

const getProductCount = `
  SELECT
    COUNT(DISTINCT product_id) AS total_count
  FROM
   products 
  WHERE
    1
`;

const deleteProduct = `
  DELETE 
  FROM 
    products 
  WHERE 
   product_id= ?;
`;

module.exports = {
  createNewProduct,
  updateProduct,
  isExistProduct,
  getProduct,
  getProductCount,
  deleteProduct,
};

const createNewProduct = `
  INSERT INTO production
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
  UPDATE production
  SET
    name= ?, 
    price= ?, 
    category= ?, 
    description= ?, 
    availability_status= ?
  WHERE
    production_id = ?
`;

const isExistProduct = `
  SELECT
    production_id
  FROM
    production
  WHERE
    production_id = ?
`;

const getProduct = `
  SELECT
    production_id,
    name,
    price,
    category,
    description,
    availability_status
  FROM
    production
  WHERE
    1
`;

const getProductCount = `
  SELECT
    COUNT(DISTINCT production_id) AS total_count
  FROM
   production 
  WHERE
    1
`;

const deleteProduct = `
  DELETE 
  FROM 
    production 
  WHERE 
   production_id= ?;
`;

module.exports = {
  createNewProduct,
  updateProduct,
  isExistProduct,
  getProduct,
  getProductCount,
  deleteProduct,
};

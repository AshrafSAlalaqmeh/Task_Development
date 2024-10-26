import service from "./service";
import { toast } from "react-toastify";

export const createProduct = async (product) => {
  try {
    const response = await service.post("/production/addingProduct", product);

    if (response.data.status) {
      return response.data;
    } 
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const updateProduct = async (editedProduct) => {
  const paramsID = editedProduct.product_id;

  try {
    const response = await service.put(`production/${paramsID}`, {
      name: editedProduct.name,
      price: editedProduct.price,
      category: editedProduct.category,
      availability_status: editedProduct.availability_status,
    });
    if (response.data.status) {
      return response.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await service.delete(`production/${productId}`);
    if (response.data.status) {
      return response.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const getProduct = async ({
  product_id,
  price,
  category,
  availability_status,
}) => {
  try {
    let URL = `/production?`;

    if (product_id) {
      URL += `&product_id=${product_id}`;
    }
    if (price) {
      URL += `&price=${price}`;
    }
    if (category) {
      URL += `&category=${category}`;
    }
    if (availability_status) {
      URL += `&availability_status=${availability_status}`;
    }

    const response = await service.get(URL);

    if (response.data.status) {
      return response.data;
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

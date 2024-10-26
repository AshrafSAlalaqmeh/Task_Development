import React, { Fragment, useEffect, useState } from "react";
import { getProduct, deleteProduct } from "../../services/products";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  MenuItem,
  Select,
  Divider,
  FormControl,
  InputLabel,
  TextField,
  FormGroup,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

import ModalWrapper from "../../components/ModalWrapper";
import DeleteModal from "../../components/deleteModal";

import "../../styles/styles.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [filter, setFilter] = useState();
  const [productId, setproductId] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [availabilityStatus, setSvailabilityStatus] = useState();
  const [input, setInput] = useState();
  const [snackbar, setSnackbar] = useState();
  const [countItems, setCountItems] = useState();

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const filters = ["category", "price", "availability"];

  useEffect(() => {
    fetchData();
    return () => null;
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const data = await getProduct({
      product_id: productId,
      price,
      category,
      availability_status: availabilityStatus,
    });

    setProducts(data?.message?.items_list);
    setCountItems(data?.message?.total_items)
  };
  

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addProduct = () => {
    setSelectedRow(null);
    handleToggle();
  };

  const handleClick = async (item) => {
    const response = await getProduct({ product_id: item.product_id });

    setSelectedRow(response?.message?.items_list[0]);
    handleToggle();
  };

  const updateProduct = (editProduct) => {
    const _products = [...products];
    const _newProducts = _products.filter(
      (item) => item.product_id !== editProduct.product_id
    );
    _newProducts.unshift({ ...editProduct });
    setProducts(_newProducts);
  };

  const handleDeleteProduct = async () => {
    const response = await deleteProduct(deleteId);

    if (response && response.status) {
      const data = [...products];
      const _data = data.filter((item) => item.product_id !== deleteId);
      setProducts(_data);
      setSnackbarOpen(true);
      setSnackbar("The product has been successfully deleted");
    }
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const handleFilter = async (e) => {
    e.preventDefault();

    let response;
    if (filter === "price") {
      response = await getProduct({ price: input });
    } else if (filter === "category") {
      response = await getProduct({ category: input });
    } else if (filter === "availability") {
      response = await getProduct({ availability_status: input });
    } else {
      fetchData();
    }
    setProducts(response?.message?.items_list);
  };
  return (
    <Box flex={1} p={4}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackbarOpen}
        onClose={handleClose}
        autoHideDuration={5000}
        message={snackbar}
        key={"top" + "center"}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        mb={4}
      >
        <h3>Task development</h3>

        <Button
          variant="contained"
          color="primary"
          onClick={addProduct}
          className="mb-3 mt-3 align-self-center"
        >
          Add Product
        </Button>
      </Box>

      <Box mb={3}>
        <form onSubmit={handleFilter} className="d-flex align-items-center">
          <Box pr={4}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                className="select-width"
                label="Filter"
                labelId="demo-simple-select-label"
                variant="outlined"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >

                {filters.map((item, index) => (
                  <MenuItem key={`product-status-${index}`} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <TextField
                variant="outlined"
                placeholder="Enter to filter"
                onChange={(e) => setInput(e.target.value)}
              />
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Apply Filter
          </Button>
        </form>
      <Box m={2} >Total items:<span className="custom-text"> {countItems} Items</span></Box>

      </Box>

      <Divider
        orientation="horizontal"
        flexItem
        className="mb-3"
        style={{ fontSize: "1.5rem" }}
      >
        Products
      </Divider>
      {products?.length === 0 ? (
          <div>no result</div>
        ) : (
            products?.map((item) => (
                <Card
                key={item.product_id}
                style={{
                    width: "100%",
                    flexGrow: 1,
                    marginBottom: 30,
                }}
                >
            <CardContent>
              <Typography variant="h5" component="div" mb={3}>
                {item.name}
              </Typography>
              <Box flex={1} mb={3}>
                <Typography mb={1} variant="body2">
                  Category: {item.category}
                </Typography>
                <Typography mb={1} variant="body2">
                  Description: {item.description}
                </Typography>
                <Typography mb={1} variant="body2">
                  Price: {item.price}
                </Typography>
                <Typography mb={1} variant="body2">
                  Availability: {item.availability_status}
                </Typography>
              </Box>
              <Box
                display="flex"
                flex={1}
                width="100%"
                justifyContent={"space-between"}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(item)}
                >
                  Update Product
                </Button>

                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    setDeleteModal(true);

                    setDeleteId(item.product_id);
                  }}
                >
                  Delete Product
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
      {isOpen && (
        <ModalWrapper
          isOpen={isOpen}
          toggle={handleToggle}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbar={setSnackbar}
          products={products}
          setProducts={setProducts}
          selectedRow={selectedRow}
          updateListingData={updateProduct}
        />
      )}

      {deleteModal && (
        <DeleteModal
          isOpen={deleteModal}
          toggle={() => setDeleteModal(false)}
          onDelete={handleDeleteProduct}
        />
      )}
    </Box>
  );
};

export default Product;

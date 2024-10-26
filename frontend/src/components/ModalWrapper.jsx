import React, { useState } from "react";
import { createProduct, updateProduct } from "../services/products";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ModalWrapper = ({
  isOpen,
  toggle,
  setSnackbarOpen,
  setSnackbar,
  products,
  setProducts,
  selectedRow,
  updateListingData,
}) => {
  
  const [name, setName] = useState(selectedRow?.name || "");
  const [price, setPrice] = useState(selectedRow?.price || "");
  const [category, setCategory] = useState(selectedRow?.category || "");
  const [description, setDescription] = useState(
    selectedRow?.description || ""
  );
  const [availabilityStatus, setAvailabilityStatus] = useState(
    selectedRow?.availability_status || ""
  );
  const [validationErrors, setValidationErrors] = useState({});

  const statusArray = ["active", "inactive"];

  const validationSchema = Yup.object().shape({
    price: Yup.number().required(),
  });
  const handleUpdateProduct = async () => {
    
    try {
      const editedProduct = {
        product_id: selectedRow?.product_id,
        name,
        price,
        category,
        description,
        availability_status: availabilityStatus,
      };

      const response = await updateProduct(editedProduct);

      if (response && response.status) {
        updateListingData(editedProduct);
        setSnackbarOpen(true)
        setSnackbar("The product has been successfully updated")
        toggle();
      } else {
        toast.error("error edit");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  const handleAddProduct = async () => {
    try {
      await validationSchema.validate({ price: price }, { abortEarly: false });

      const product = {
        name: name,
        price: price,
        category: category,
        description: description,
        availability_status: availabilityStatus,
      };

      const response = await createProduct(product);
      if (response && response.status) {
        
        
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setAvailabilityStatus("");
        
        product.product_id = response.message.build_id;
        
        const _products = [...products];
        _products.unshift(product);
        setProducts(_products);
        
        setSnackbarOpen(true)
        setSnackbar("The product has been successfully added")
          toggle();
        
      } else {
        toast.error("Error adding");
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });

        setValidationErrors(errors);
      }
    }
  };
  const handleAction = selectedRow ? handleUpdateProduct : handleAddProduct;
  const buttonLabel = selectedRow ? "Edit Product" : "Add Product";


  return (
    <Dialog open={isOpen} onClose={toggle} fullWidth>
      <DialogTitle>{buttonLabel}</DialogTitle>

      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1">{"Name of product"}</Typography>
            <TextField
              variant="outlined"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1">{"Price of product"}</Typography>
            <TextField
              variant="outlined"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <FormHelperText>{validationErrors.price}</FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1">{"Category of product"}</Typography>
            <TextField
              variant="outlined"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1">
              {"Description of product"}
            </Typography>
            <TextField
              variant="outlined"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1">
              {"Availability Status of product"}
            </Typography>
            <Select
              variant="outlined"
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
            >
              {statusArray.map((item, index) => (
                <MenuItem key={`product-status-${index}`} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>{!status && validationErrors.status}</FormHelperText> */}
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleAction}>
          {buttonLabel}
        </Button>
        <Button variant="contained" color="secondary" onClick={toggle}>
          {"Cancel"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWrapper;

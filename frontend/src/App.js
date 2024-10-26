import React from 'react'
import { Routes, Route } from "react-router-dom";
import Product from "./pages/products";
import {ToastContainer, toast } from "react-toastify";
import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: '#f44336',
      },
      red: {
        main: red[500]
      }
    },
  });

const App = () => {
  return (
    <div className="App">
      <ToastContainer/>
    <Routes>
      <Route path="/" element={<Product/>} />

    </Routes>
  </div>
  )
}

export default App
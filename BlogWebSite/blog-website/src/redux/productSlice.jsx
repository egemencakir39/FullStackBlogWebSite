import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    const response = await axios.post(API_URL, productData);
    console.log(response.data);
    return response.data;
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axios.get(API_URL);
    console.log(response.data);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await axios.delete(`${API_URL}/${productId}`);
    return productId;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }) => {
    const response = await axios.patch(`${API_URL}/${id}`, updatedData);
    return response.data;
  }
);
export const getProductsById = createAsyncThunk(
  "products/getProductsById",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //post product
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //get products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
          state.loading = false;
  state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update product
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //get product by id
        .addCase(getProductsById.pending, (state) => {
        state.status = "loading";
        })
        .addCase(getProductsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        })
        .addCase(getProductsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        })
  },
});

export default productSlice.reducer;

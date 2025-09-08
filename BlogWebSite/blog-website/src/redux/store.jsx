import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/productSlice";


export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
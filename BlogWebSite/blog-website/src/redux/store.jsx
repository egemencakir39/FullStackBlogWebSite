import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/productSlice";
import commentReducer from "@/redux/commentSlice";


export const store = configureStore({
  reducer: {
    products: productReducer,
    comments: commentReducer,
  },
});
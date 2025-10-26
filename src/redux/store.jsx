import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/redux/productSlice";
import commentReducer from "@/redux/commentSlice";
import adminReducer from "@/redux/adminSlice"


export const store = configureStore({
  reducer: {
    products: productReducer,
    comments: commentReducer,
    admin: adminReducer,
  },
});
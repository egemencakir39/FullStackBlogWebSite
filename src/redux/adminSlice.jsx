import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginAdmin = createAsyncThunk(
  "login/loginAdmin",
  async (loginData) => {
    const res = await axios.post(`${API_URL}/admin/login`, loginData, {
      withCredentials: true,
    });
    return res.data;
  }
);

export const logoutAdmin = createAsyncThunk("logout/logoutAdmin", async () => {
  await axios.post(`${API_URL}/admin/logout`);
  return null;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      builder.addCase(logoutAdmin.fulfilled,(state,action)=>{
        state.admin = null;
      })
  },
});

export default adminSlice.reducer;
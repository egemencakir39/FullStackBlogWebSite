import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ id, commentData }) => {
    const response = await axios.post(`${API_URL}/${id}/comments`, commentData);
    return response.data;
  }
);

export const getCommentsByPostId = createAsyncThunk(
  "comments/getCommentsByPostId",
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}/comments`);
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //post comment
      .addCase(createComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //get comments by post id
      .addCase(getCommentsByPostId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentSlice.reducer;

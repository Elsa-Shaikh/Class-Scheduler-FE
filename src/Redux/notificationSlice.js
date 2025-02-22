import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Utils/api";
import { toast } from "react-toastify";

export const markRead = createAsyncThunk(
  "noti/markRead",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/notifications/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNotifications = createAsyncThunk(
  "noti/getNotifications",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/notifications/get/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markRead.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message || "Notification mark Read!");
      })
      .addCase(markRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Failed to failed to mark read!");
      });
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;

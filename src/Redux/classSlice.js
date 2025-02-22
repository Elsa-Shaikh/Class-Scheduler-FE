import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Utils/api";
import { toast } from "react-toastify";

export const addClass = createAsyncThunk(
  "class/addClass",
  async (classData, { rejectWithValue }) => {
    try {
      const response = await api.post("/classes/create", classData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editClass = createAsyncThunk(
  "class/editClass",
  async ({ id, classData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/classes/edit/${id}`, classData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getClasses = createAsyncThunk(
  "class/getClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/classes/read");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteClass = createAsyncThunk(
  "class/deleteClass",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/classes/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  classes: [],
  loading: false,
  error: null,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message || "Class added successfully!");
      })
      .addCase(addClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Failed to add class!");
      });
    builder
      .addCase(editClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(editClass.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message || "Class updated successfully!");
      })
      .addCase(editClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Failed to update class!");
      });
    builder
      .addCase(getClasses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload.data;
      })
      .addCase(getClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message || "Class deleted successfully!");
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Failed to delete class!");
      });
  },
});

export default classSlice.reducer;

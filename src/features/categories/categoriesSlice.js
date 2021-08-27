import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Create, Delete, GetAll } from "./categoriesAPI";

const initialState = {
  addstatus: "",
  categories: [],
};

// CREATE CATEGORY  action
export const createcategory = createAsyncThunk(
  "categories/create",
  async (data) => {
    const response = await Create(data);
    return response.data;
  }
);

// get allcategories
export const getcategories = createAsyncThunk("categories/find", async () => {
  const response = await GetAll();
  return response.data;
});

// delete category by id
export const deletecategory = createAsyncThunk("categories/delete/id", async (id) => {
  const response = await Delete(id);
  return response.data;
});

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [createcategory.pending]: (state, action) => {
      state.addstatus = "loading";
    },
    [createcategory.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.addstatus = "success";
    },
    [createcategory.rejected]: (state, action) => {
      state.addstatus = "failure";
    },

    // get all
    [getcategories.pending]: (state, action) => {},
    [getcategories.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.categories = action.payload.data;
    },
    [getcategories.rejected]: (state, action) => {},

    // delet category
    [deletecategory.pending]: (state, action) => {
      state.addstatus = "loading";
    },
    [deletecategory.fulfilled]: (state, action) => {
      console.log(action.payload);
            state.addstatus = "success";

    },
    [deletecategory.rejected]: (state, action) => {},

  },
});

export const {} = categoriesSlice.actions;

//selector
export const selectaddstatus = (state) => state.categories.addstatus;
export const selectcategories = (state) => state.categories.categories;

export default categoriesSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Create, GetAll } from "./productAPi";

const initialState = {
  addstatus: "",
  products: [],
  filtredproducts: [],
};

// CREATE product  action
export const createproduct = createAsyncThunk(
  "products/create",
  async (data) => {
    const response = await Create(data);
    return response.data;
  }
);

// get all  products  action
export const getproducts = createAsyncThunk("products/getall", async () => {
  const response = await GetAll();
  return response.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filtercategory: (state, action) => {
      if (action.payload.id === "all") {
        state.filtredproducts = state.products;
      } else {
        let arr = [...state.products];

        let data = arr.filter((p) => p.category._id === action.payload.id);

        state.filtredproducts = data;
      }
    },
  },
  extraReducers: {
    [createproduct.pending]: (state, action) => {
      state.addstatus = "loading";
    },
    [createproduct.fulfilled]: (state, action) => {
      console.log(action.payload);

      if (!action.payload) {
        state.addstatus = "failure";
      } else if (action.payload.data) {
        state.addstatus = "success";
      }
    },
    [createproduct.rejected]: (state, action) => {
      state.addstatus = "failure";
    },

    // get all prodds
    [getproducts.pending]: (state, action) => {},
    [getproducts.fulfilled]: (state, action) => {
      console.log(action.payload);

      state.products = action.payload.data;
      state.filtredproducts = action.payload.data;
    },
    [getproducts.rejected]: (state, action) => {
      /*  state.addstatus = "failure"; */
    },
  },
});

export const { filtercategory } = productsSlice.actions;

//selector
export const selectaddstatus = (state) => state.products.addstatus;
export const selectproducts = (state) => state.products.filtredproducts;

export default productsSlice.reducer;

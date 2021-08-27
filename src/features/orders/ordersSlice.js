import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Create, GetAll, Update, GetClientOrders } from "./ordersAPI";

const initialState = {
  createstatus: "",
  orders: [],
  updatesatus: "",
  clientorders : []
};

// CREATE order redux  action
export const createorder = createAsyncThunk("orders/create", async (data) => {
  const response = await Create(data);
  return response.data;
});

// get all orders action
export const getorders = createAsyncThunk("orders/findall", async () => {
  const response = await GetAll();
  return response.data;
});

// update orders action
export const updateorder = createAsyncThunk(
  "orders/update/id",
  async (data) => {
    const response = await Update(data);
    return response.data;
  }
);

// get client orders action
export const getclientorders = createAsyncThunk(
  "orders/client",
  async () => {
    const response = await GetClientOrders();
    return response.data;
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [createorder.pending]: (state, action) => {
      state.createstatus = "loading";
    },
    [createorder.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.createstatus = "success";
    },
    [createorder.rejected]: (state, action) => {
      state.createstatus = "failure";
    },
    //get orders
    [getorders.pending]: (state, action) => {},
    [getorders.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.orders = action.payload.data;
    },
    [getorders.rejected]: (state, action) => {},
    // update order
    [updateorder.pending]: (state, action) => {
      state.updatesatus = "loading";
    },
    [updateorder.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.updatesatus = "success";
    },
    [updateorder.rejected]: (state, action) => {
      state.updatesatus = "failure";
    },
    // update order
    [getclientorders.pending]: (state, action) => {
      
    },
    [getclientorders.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.clientorders = action.payload.data
    },
    [getclientorders.rejected]: (state, action) => {
      
    },
  },
});

export const {} = ordersSlice.actions;

//selector
export const selectaddstatus = (state) => state.orders.createstatus;
export const selectorders = (state) => state.orders.orders;
export const selectupadtestatus = (state) => state.orders.updatesatus;
export const selectclientorders = (state) => state.orders.clientorders;

export default ordersSlice.reducer;

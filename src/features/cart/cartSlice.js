import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addproducttocart: (state, action) => {
      state.cart.push(action.payload.prod);
      state.total += action.payload.prod.price;
    },

    deletproductfromcart: (state, action) => {
      let arr = [...state.cart];
      let pos;
      for (let i = 0; i < state.cart.length; i++) {
        const element = state.cart[i];
        if (element._id === action.payload.idp) {
          state.total -= element.price;
          pos = i;
        }
      }
      arr.splice(pos, 1);
      state.cart = arr;
    },

    resetcart: (state, action) => {
      state.cart = []
      state.total = 0
    },
  },
  extraReducers: {},
});

export const { addproducttocart, deletproductfromcart, resetcart } = cartSlice.actions;

//selector
export const selectcart = (state) => state.cart.cart;
export const selectTotal = (state) => state.cart.total;

export default cartSlice.reducer;
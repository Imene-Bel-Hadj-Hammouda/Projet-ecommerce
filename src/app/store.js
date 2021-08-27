import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import clientsReducer from "../features/clients/clientsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import productsReducer from "../features/products/productsSlice";
import ordersReducer from "../features/orders/ordersSlice";
import cartReducer from "../features/cart/cartSlice";
import omit from "lodash/omit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import createTransform from "redux-persist/es/createTransform";

const reducers = combineReducers({
  users: usersReducer,
  clients: clientsReducer,
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

let usersBalcklist = createTransform((inboundstate, key) => {
  if (key === "users") {
    return omit(inboundstate, ["isauth"]);
  } else {
    return inboundstate;
  }
});

let orderaddBalcklist = createTransform((inboundstate, key) => {
  if (key === "orders") {
    return omit(inboundstate, ["createstatus"]);
  } else {
    return inboundstate;
  }
});

const persistConfig = {
  key: "root",
  storage,
  trasnforms: [usersBalcklist, orderaddBalcklist],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
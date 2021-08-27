import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Register, Login } from "./clientsAPI";

const initialState = {
  registration: {
    registerstatus: "",
    error: "",
  },
};

// redux register client  action
export const registerclient = createAsyncThunk(
  "clients/register",
  async (data) => {
    const response = await Register(data);
    return response;
  }
);



export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers: {
    [registerclient.pending]: (state, action) => {
      state.authstatus = "loading";
    },
    [registerclient.fulfilled]: (state, action) => {
      console.log(action.payload.response);

      if (action.payload.status === 200) {
        state.registration.registerstatus = "success";
      } else {
        const { data } = action.payload.response;
        state.registration.registerstatus = "failure";
        state.registration.error = data.message;
      }
    },
    [registerclient.rejected]: (state, action) => {
      state.authstatus = "faiFlure";
    },

    
  },
});

export const {} = clientsSlice.actions;

//selector
export const selectregistration = (state) => state.clients.registration;


export default clientsSlice.reducer;

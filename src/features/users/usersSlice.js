import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUsers, DeleteUser, UploadAvatar, GetMe,Login } from "./usersApi";

const initialState = {
  users: [],
  deletestatus: "",
  authentication: {
    authstatus: "",
    error: "",
  },
  isauth: false,
  user: null,
};

//login client
export const login = createAsyncThunk("user/login", async (data) => {
  const response = await Login(data);
  console.log(response);
  return response;
});

// get allusers action
export const getusers = createAsyncThunk("users/find", async () => {
  const response = await GetUsers();
  return response;
});

// delete user by id
export const deleteuser = createAsyncThunk("users/delete/id", async (id) => {
  const response = await DeleteUser(id);
  return response.data;
});

// upload avatar
export const uploadavatar = createAsyncThunk(
  "users/upladavatar",
  async (data) => {
    const response = await UploadAvatar(data);
    return response.data;
  }
);

// get me
export const getme = createAsyncThunk("users/me", async (data) => {
  const response = await GetMe(data);
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout : (state ,action)=> {
      state.isauth = false
      state.user = null
      localStorage.clear()
    }
  },
  extraReducers: {
    // login user
    [login.pending]: (state, action) => {
      state.authentication.authstatus = "loading";
    },
    [login.fulfilled]: (state, action) => {
      console.log(action.payload);

      if (action.payload.status === 200) {
        state.authentication.authstatus = "success";
        state.isauth = true;
        state.user = action.payload.data.user
        localStorage.setItem("token", action.payload.data.token);
      } else {
        state.isauth = false;
        state.authentication.authstatus = "failure";
        state.authentication.error = action.payload.response.data.message;
      }
    },
    [login.rejected]: (state, action) => {
      console.log(action);
      state.authentication.authstatus = "failure";
    },
    //get users
    [getusers.pending]: (state, action) => {},
    [getusers.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.users = action.payload.data.data;
    },
    [getusers.rejected]: (state, action) => {},
    // delete user
    [deleteuser.pending]: (state, action) => {
      state.deletestatus = "loading";
    },
    [deleteuser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.deletestatus = "success";
    },
    [deleteuser.rejected]: (state, action) => {
      state.deletestatus = "failure";
    },
    // upload avatar
    [uploadavatar.pending]: (state, action) => {},
    [uploadavatar.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.data
    },
    [uploadavatar.rejected]: (state, action) => {},
    // get me
    [getme.pending]: (state, action) => {},
    [getme.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.data;
    },
    [getme.rejected]: (state, action) => {},
  },
});

export const {logout} = usersSlice.actions;

export const selectusers = (state) => state.users.users;
export const selectdeletestatus = (state) => state.users.deletestatus;
export const selectauthentication = (state) => state.users.authentication;
export const selectisauth = (state) => state.users.isauth;
export const selectuser = (state) => state.users.user;

export default usersSlice.reducer;

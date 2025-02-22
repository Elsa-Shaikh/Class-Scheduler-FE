import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
// import classReducer from "./classSlice.js";
// import notificationReducer from "./notificationSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // class: classReducer,
    // notifications:notificationReducer
  },
});

export default store;

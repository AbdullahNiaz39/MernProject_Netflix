import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import netflixReducer from "../features/netflixSlice/index";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    netflix: netflixReducer,
  },
});

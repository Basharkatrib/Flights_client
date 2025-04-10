import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import langReducer from "./langSlice";
import authReducer from "./authSlice";
import flightSelectedReducer from "./flightSelectedSlice";
import spinnerReducer from "./spinnerSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["lang" , "auth" , "flightselect"], 
};

const rootReducer = combineReducers({
  lang: langReducer, 
  auth: authReducer,
  flightselect: flightSelectedReducer,
  spinner: spinnerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});


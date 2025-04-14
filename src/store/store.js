import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import langReducer from "./langSlice";
import authReducer from "./authSlice";
import flightSelectedReducer from "./flightSelectedSlice";
import spinnerReducer from "./spinnerSlice";
import newIdReducer from './newIdSlice';
import screenWidthReducer from "./screenWidthSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["lang" , "auth" , "flightselect" , "newId"], 
};

const rootReducer = combineReducers({
  lang: langReducer, 
  auth: authReducer,
  flightselect: flightSelectedReducer,
  newId : newIdReducer,
  spinner: spinnerReducer,
  screenWidth: screenWidthReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});


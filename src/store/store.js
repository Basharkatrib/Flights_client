import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import langReducer from "./langSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["lang"], 
};

const rootReducer = combineReducers({
  lang: langReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// export const persistor = persistStore(store);

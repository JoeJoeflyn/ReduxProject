import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import bookInforReducer from "../features/bookInforSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "bookInfo",
  storage,
};

const persistedReducer = persistReducer(persistConfig, bookInforReducer);

export const store = configureStore({
  reducer: {
    bookinfor: persistedReducer,
  },
  middleware: (applyMiddleware) =>
    applyMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

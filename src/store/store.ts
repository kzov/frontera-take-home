import createSagaMiddleware from "redux-saga";
import userAddReducer from "./slices/user-add";
import rootSaga from "./root-saga";
import sessionReducer from "./slices/session";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import userInfoReducer from "./slices/user-details";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  userAdd: userAddReducer,
  session: sessionReducer,
  userInfo: userInfoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["session"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(sagaMiddleware),
});
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

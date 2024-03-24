import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
  } from "@reduxjs/toolkit";
  import {persistStore, persistReducer} from "redux-persist";
  import storage from "redux-persist/lib/storage";

  import darkModeReducer from "./DarkMode/darkModeSlice";
  
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "cart", "darkmode"],
  };
  
  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
    //   auth: authReducer,
    //   cart: cartReducer,
      darkmode: darkModeReducer,
    })
  );
  
  export const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  export type AppDispatch = typeof store.dispatch;
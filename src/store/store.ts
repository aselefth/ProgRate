import { configureStore } from "@reduxjs/toolkit";
import InterfaceSlice from "./Slices/InterfaceSlice";
import authSlice from "./Slices/authSlice";
import { apiSlice } from "./Api/apiSlice";

const store = configureStore({
    reducer: {
        InterfaceSlice,
        authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

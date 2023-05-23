import { configureStore } from "@reduxjs/toolkit";
import InterfaceSlice from "./Slices/InterfaceSlice";
import authSlice from "./Slices/authSlice";
import { apiSlice } from "./Api/apiSlice";
import connectionSlice from "./Slices/connectionSlice";

const store = configureStore({
    reducer: {
        InterfaceSlice,
        authSlice,
        connectionSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

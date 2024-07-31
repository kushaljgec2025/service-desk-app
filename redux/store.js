import { configureStore } from "@reduxjs/toolkit";
import { Authreducer } from "./authslice"; // Import the reducer from authSlice

// Create the store
export const store = configureStore({
    reducer: {
        auth: Authreducer
    },
});

export default store;

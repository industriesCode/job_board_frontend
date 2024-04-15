import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        // Reducers go here
    },
    // Set the initial state of the store to null
    preloadedState: {}
});

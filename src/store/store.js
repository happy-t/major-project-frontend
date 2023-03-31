import { configureStore } from "@reduxjs/toolkit";
import classSlice from "./slice/classSlice";
import studentSlice from "./slice/studentSlice";

const store = configureStore({
    reducer: {
        classSlice: classSlice.reducer,
        studentSlice: studentSlice.reducer,
    }
}
);

export default store;
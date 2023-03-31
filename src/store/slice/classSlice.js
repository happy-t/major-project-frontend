import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../api/api';

export const getClasses = createAsyncThunk('getClasses', async () => {
    const { data } = await axios.get("/get_class");
    return data.data;
})

export const addClass = createAsyncThunk('addClass', async (apiData) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/add_class", apiData, config);
    console.log(data);
    return data.data;
})

const classSlice = createSlice({
    name: "class",

    initialState: {
        isloading: false,
        classes: []
    },

    extraReducers: (builder) => {
        builder.addCase(getClasses.fulfilled, (state, action) => {
            state.classes = action.payload;
            state.isloading = false;
        })
        builder.addCase(getClasses.pending, (state, action) => {
            state.isloading = true;
        })


        builder.addCase(addClass.pending, (state, action) => {
            state.isloading = true;
        })
        builder.addCase(addClass.fulfilled, (state, action) => {
            state.classes.push(action.payload);
        })

    }
});


export default classSlice;
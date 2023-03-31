import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../api/api';

export const getStudents = createAsyncThunk('getStudents', async (classId) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/get_students", { classId }, config);
    return data.data;
})
export const addStudent = createAsyncThunk('getStudent', async (studentData) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/add_student", studentData, config);
    return data.data;
})

export const takeAttendance = createAsyncThunk('takeAttendance', async (allData) => {
    const config = { headers: { "Content-Type": "application/json" } };
     await axios.post("/attendance", allData, config);
})



const studentSlice = createSlice({
    name: "students",

    initialState: {
        isloading: false,
        students: []
    },

    extraReducers: (builder) => {
        builder.addCase(getStudents.fulfilled, (state, action) => {
            state.students = action.payload;
            state.isloading = false;
        })

        builder.addCase(getStudents.pending, (state, action) => {
            state.isloading = true;
        })

        builder.addCase(addStudent.fulfilled, (state, action) => {
            state.students.push(action.payload);
        })

    }
});


export default studentSlice;
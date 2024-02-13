import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {EmployeeService} from "./EmployeeService";

export const getAllEmployees = createAsyncThunk("employees/get",
  async(thunkAPI)=>{
    try{
         return await EmployeeService.getEmployees();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
  }
)

export const createEmployee = createAsyncThunk(

  "employee-createEmployee",
  async(employeeData,thunkAPI)=>{
    try {
        return await EmployeeService.createEmployee(employeeData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
  }  
)


const initialState = {
    employees : [],
    isError: false,
    isLoading:false,
    isSuccess : false,
    message:"",
};

export const EmployeeSlice = createSlice({
    name : "employees",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder

        .addCase(getAllEmployees.pending,(state) =>{
            state.isLoading = true;
         })
         .addCase(getAllEmployees.fulfilled,(state,action) =>{
            state.isLoading = false;
            state.isSuccess=true;
            state.isError = false;
             state.employees = action.payload;
         })
         .addCase(getAllEmployees.rejected,(state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
         })

         .addCase(createEmployee.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdEmployee = action.payload;
           
          })
          .addCase(createEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
           
          })
        
    }
})

export default EmployeeSlice.reducer;

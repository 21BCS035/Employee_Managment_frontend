import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
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

export const getEmployee = createAsyncThunk(
  "employee/get-employee",
  async (id, thunkAPI) => {
    try {
      return await EmployeeService.getEmployee(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update-employee",
  async (data, thunkAPI) => {
    try {
      return await EmployeeService.updateEmployee(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAEmployee = createAsyncThunk(
  "employee/delete-employee",
  async (id, thunkAPI) => {
    try {
      return await EmployeeService.deleteEmployee(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");


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
          .addCase(getEmployee.pending,(state)=>
     {
        state.isLoading= true;
     })
     .addCase(getEmployee.fulfilled,(state,action)=>{
        state.isLoading= false;
        state.isSuccess= true;
        state.isError=false;
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.email = action.payload.email;
     })
     .addCase(getEmployee.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
    })
     
    .addCase(updateEmployee.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
    })
    .addCase(updateEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deleteAEmployee.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteAEmployee.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.deletedEmployee = action.payload;
    })
    .addCase(deleteAEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })

    .addCase(resetState, () => initialState);
        
    }
})

export default EmployeeSlice.reducer;

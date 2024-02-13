import React from 'react'
import { getAllEmployees } from '../services/EmployeeSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"

const EmployeesList = () => {
     
    const dispatch = useDispatch();
    const navigate = useNavigate();

     const employeeState = useSelector((state)=>state.employee.employees);

   useEffect(()=>{
      dispatch(getAllEmployees());
   },[])

   function handleAddEmployee(){
      navigate('/add-Employee');
   }
   
  return (
    <div className="container mt-4">
      
      <h2 className="text-center mb-4">List of Employees</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email ID</th>
          </tr>
        </thead>
        <tbody>
          {employeeState &&
            employeeState.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstname}</td>
                <td>{employee.lastname}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button type="button" className="btn btn-success" onClick={handleAddEmployee}>Add Employee</button>
    </div>
  )
}

export default EmployeesList

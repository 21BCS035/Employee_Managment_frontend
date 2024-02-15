import React,{useEffect,useState} from 'react'
import { getAllEmployees,deleteAEmployee } from '../services/EmployeeSlice';
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
import CustomModel from './CustomModel';
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "First Name",
    dataIndex: "firstname",
  },
  {
    title: "Last Name",
    dataIndex: "lastname",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const EmployeesList = () => {

  const [open, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEmployeeId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
     
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function refreshPage() {
      window.location.reload(false);
    }

    useEffect(()=>{
      dispatch(getAllEmployees());
   },[])

   function handleAddEmployee(){
      navigate('/add-Employee');
    
   }

     const employeeState = useSelector((state)=>state.employee.employees);

     const data1 = [];
  for (let i = 0; i < employeeState.length; i++) {
      data1.push({
        key: employeeState[i].id,
        firstname: employeeState[i].firstname,
        lastname: employeeState[i].lastname,
        email : employeeState[i].email,

        action: (
          <>
            <Link to={`/edit-employee/${employeeState[i].id}`} className=" fs-3 text-danger">
            <button type="button" className="btn btn-success" >Update</button>
            </Link>
            <button
            className="ms-3 fs-3 text-danger bg-transparent border-0" 
            onClick={() => showModal(employeeState[i].id)}
          >
            <AiFillDelete />
          </button>
          </>
        ),
    
      });
    
  }

  const deleteEmployee = (e) => {
    dispatch(deleteAEmployee(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllEmployees());
      refreshPage();
    }, 100);
  };

   
  return (
    <div className="container mt-4">
      
      <h2 className="text-center mb-4">List of Employees</h2>
      <div>
        <Table columns={columns} dataSource={data1}
        />
      </div>
     
        
        <CustomModel
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEmployee(employeeId);
        }}
        title="Are you sure you want to delete this blog?"
      />

      <button type="button" className="btn btn-success mb-2" onClick={handleAddEmployee}>Add Employee</button>
    </div>
  )
}

export default EmployeesList

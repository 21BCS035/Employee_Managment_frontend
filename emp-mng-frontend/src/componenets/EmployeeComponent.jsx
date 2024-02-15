import React, { useEffect } from 'react'
import CustomInput from './CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch} from "react-redux";
import { createEmployee,getEmployee,resetState,updateEmployee } from '../services/EmployeeSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';



const AddEmployeeSchema = yup.object({
    firstname: yup.string().required('First name is required').required("First Name address is required"),
    lastname: yup.string().required('last name is required').required("Last Name address is required"),
    email: yup.string().email('Email should be valid').required("Email address is required"),
    
  });

const EmployeeComponent = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getEmployeeId = location.pathname.split("/")[2];

  const employeeState = useSelector((state)=>state.employee);
  
  const {isLoading,isSuccess,isError,firstname,lastname,email} = employeeState;

  useEffect(()=>{
    if(getEmployeeId !== undefined){
      dispatch(getEmployee(getEmployeeId));
    }
    else{
      dispatch(resetState());
    }
  },[getEmployeeId])

  function refreshPage() {
    window.location.reload(false);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: firstname || '',
      lastname: lastname || '',
      email: email || '',
    },
    validationSchema:AddEmployeeSchema,
    onSubmit: values => {

      if(getEmployeeId !== undefined){
        const data = {id:getEmployeeId,employeeData:values};
        dispatch(updateEmployee(data));
        navigate('/employees');
        setTimeout(() => {
          refreshPage();
        }, 500);
      
      }

      else{
        dispatch(createEmployee(values));
        navigate('/employees');

        setTimeout(() => {
          refreshPage();
        }, 500);
       
      } 
    },
  });

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='card col-md-6 mt-5 p-4'>
          <h2 className='text-centre mb-4'>{getEmployeeId !== undefined ? "Edit" : "Add"} Employee</h2>
          <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
            <div className='mb-3'>
                <CustomInput type="text" name="firstname" placeholder="First Name" 
                value={formik.values.firstname}
                onChange={formik.handleChange('firstname')}
                onBlur={formik.handleBlur('firstname')}
                className={`form-control ${formik.touched.firstname && formik.errors.firstname ? 'is-invalid' : ''}`}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                </div>
                <div className='mb-3'>
                <CustomInput type="text" name="lastname" placeholder="Last Name"
                value={formik.values.lastname}
                onChange={formik.handleChange('lastname')}
                onBlur={formik.handleBlur('lastname')}
                className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''}`}
                />
                 <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                </div>
                <div className='mb-3'>
                <CustomInput type="email" name="email" placeholder="Email" 
                value={formik.values.email}
                onChange={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                </div>
                <div>
                <div className="mt-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" >Submit</button>
         </div>
                </div>
              </form>
        </div>
      </div>
    </div>

  )
}

export default EmployeeComponent

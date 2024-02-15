import axios from "axios";

const base_url = "http://localhost:8080/api/employees";

const getEmployees = async () => {
  try {
    const response = await axios.get(`${base_url}/getAllEmployees`);
    return response.data;
  } catch (error) {
    
    console.error("Error fetching employees:", error);
    throw error; 
  }
};

const createEmployee = async(employee)=>{
  try{

  const response = await axios.post(`${base_url}`,employee);
  
  return response.data;

  }catch(error){
    console.error("Error fetching employees:", error);
    throw error; 
  }
}

const getEmployee = async(id)=>{
  try{
       
    console.log(id);
    const response = await axios.get(`${base_url}/${id}`);
    console.log(response);
    return response.data;

  }catch(error){
    console.error("Error fetching employees:", error);
    throw error; 
  }
}

const updateEmployee = async (employee) => {
  const response = await axios.put(
    `${base_url}/updateEmployee/${employee.id}`,
    {
      firstname: employee.employeeData.firstname,
      lastname: employee.employeeData.lastname,
      email: employee.employeeData.email,
      
    }
    
  );
  return response.data;
}

const deleteEmployee = async (id) => {
  const response = await axios.delete(`${base_url}/deleteEmployee/${id}`);

  return response.data;
};

export const EmployeeService = {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee
};

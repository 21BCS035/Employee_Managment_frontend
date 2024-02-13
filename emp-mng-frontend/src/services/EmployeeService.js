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

export const EmployeeService = {
  getEmployees,
  createEmployee,
};

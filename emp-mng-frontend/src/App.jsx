// import './App.css'
// import EmployeesList from './componenets/EmployeesList'
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import Layout from './Layout/Layout';

// function App() {

//   return (
//     <>
//     <BrowserRouter>
//     <Routes>
//       <Route path = '/' element = {<Layout/>}>
//       <Route index element = {<EmployeesList/>}/>
//       </Route>
//     </Routes>
//     </BrowserRouter>
//     </>
//   )
// }

// export default App

import './App.css';
import EmployeesList from './componenets/EmployeesList'
import Header from './componenets/Header';
import Footer from './componenets/Footer';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import EmployeeComponent from './componenets/EmployeeComponent';


function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element = {<EmployeesList/>}/>
      <Route path='/employees' element = {<EmployeesList/>}/>
      <Route path='/add-employee' element = {<EmployeeComponent/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;


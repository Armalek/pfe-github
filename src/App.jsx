
import './pages/Users.css';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboards';
import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Projets from './pages/Projets';
import Login from './pages/Login/Login';
import Entreprise from './pages/Entreprise';
//import './pages/Login/Login.css';





function App() {
   const [sidebarToggle, setSidebarToggle] = useState(false)
  return (
    <BrowserRouter>
    <div className='d-flex'>
   <div className='flex'>
     <Sidebar sidebarToggle={sidebarToggle}/>
     <Dashboard 
     sidebarToggle={sidebarToggle}
     setSidebarToggle={setSidebarToggle}/>
   </div>
   <div className="flex-grow overflow-auto bg-gray-100 p-6">
     <Routes>
      <Route path="/" element={<Projets />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/projets" element={<Projets />}></Route>
      <Route path="/entreprise" element={<Entreprise />}></Route>
      
      
     </Routes>
    
   </div>
   </div>
 
   </BrowserRouter>
  );
};

export default App;




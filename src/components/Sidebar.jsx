import React from 'react'
import { FaBriefcase, FaBuilding, FaChartArea, FaChartLine, FaCog, FaHome, FaPoll, FaProjectDiagram, FaRegEnvelope, FaRegFileAlt, FaRProject, FaSignInAlt, FaTasks, FaUser, FaUserFriends, FaUserTie } from 'react-icons/fa';
import { FaColonSign } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
//import { HiAdjustments } from "react-icons/hi";



const Sidebar = ({sidebarToggle}) => {
  return (
    <div className={`${sidebarToggle? " hidden " : " block "}<div className="w-60 min-h-screen bg-blue-800 fixed h-full px-4 py-2  `}>
      <div className='my-2 mb-4'>
       <h1 className='text-2x text-white font-bold'>ALGERIE TELECOM</h1>
       </div>
       <hr />
       <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-green-600 py-2'>
          <Link to="" className='px-3'>
            <FaChartLine className='inline-block w-6 h-6 mr-2 -mt-2'/>
            Dashboard
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-green-600 py-2'>
          <a href="" className='px-3'>
            <FaBuilding className='inline-block w-6 h-6 mr-2 -mt-2'/>
            Entreprises
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-green-600 py-2'>
          <Link to="/projets" className='px-3'>
            <FaProjectDiagram className='inline-block w-6 h-6 mr-2 -mt-2'/>
            Projets
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-green-600 py-2'>
          <Link to="Users" className='px-3'>
            <FaUserFriends className='inline-block w-6 h-6 mr-2 -mt-2'/>
            Users
          </Link>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-green-600 py-2'>
          <a href="" className='px-3'>
            <FaUserTie className='inline-block w-6 h-6 mr-2 -mt-2'/>
            Profile
          </a>
        </li>

        <li className='mb-2 rounded hover:shadow hover:bg-green-600 py-2'>
          <Link to="/login" className='px-3'>
            <FaSignInAlt className='inline-block w-6 h-6 mr-2 -mt-2'/>
            Log in 
          </Link>
        </li>

       </ul>


      </div>

  );
};

export default Sidebar;
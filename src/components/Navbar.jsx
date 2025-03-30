import React from 'react'
import { FaBars, FaSearch, FaUser,  FaUserCircle } from 'react-icons/fa';


const Navbar = ({sidebarToggle, setSidebarToggle}) => {
  return (
    <nav className=' px-4 py-3 flex justify-between w-50'>
       <div className='flex items-center text-xl'>
        <FaBars className='text-blue-900  me-4 ml-1 cursor-pointer'
         onClick={() => setSidebarToggle(!sidebarToggle)}/>
       </div>
        <div className='w-28 h-12 flex'>
      <img 
        src="https://www.algerietelecom.dz/assets/front/img/logo.svg"
      ></img>
      </div>
       <div className='flex items-center gap-x-5'>
        

          <div className='text-white'>
            <button className='text-white group'>
              <FaUser  className="text-blue-900 bg-white w-6 h-8 mt-1  p-1"  />
              <div className='z-10 hidden absolute rounded-lg shadow w-24 group-focus:block  right-0 bg-white'>
                <ul className='py-2 text-sm bg-green-600  text-white border-lg rounded-lg w-24'>
                  <li><a href="" className='font-semibold '>Profile</a></li>
                  <li><a href="" className='font-semibold'>Log Out</a></li>
                </ul>
              </div>
            </button>
          </div>
       </div>
    </nav>
  );
};

export default Navbar;
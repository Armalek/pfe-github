import React from 'react'
import { FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';

const Navbar = ({sidebarToggle, setSidebarToggle}) => {
  return (
    <nav className=' px-4 py-3 flex justify-between w-50'>
       <div className='flex items-center text-xl'>
        <FaBars className='text- me-4 ml-1 cursor-pointer'
         onClick={() => setSidebarToggle(!sidebarToggle)}/>
       </div>
        <div className='w-20 flex'>
      <img 
        src="https://www.algerietelecom.dz/assets/front/img/logo.svg"
      ></img>
      </div>
       <div className='flex items-center gap-x-5'>
        

          <div className='text-white'>
            <button className='text-white group'>
              <FaUserCircle className="text-gray-500 bg-white w-6 h-6 mt-1 rounded-full p-1"  />
              <div className='z-10 hidden absolute rounded-lg shadow w-32 group-focus:block  right-0 bg-white'>
                <ul className='py-2 text-sm bg-green-600  text-white border-lg'>
                  <li><a href="">Profile</a></li>
                  <li><a href="">Log Out</a></li>
                </ul>
              </div>
            </button>
          </div>
       </div>
    </nav>
  );
};

export default Navbar;
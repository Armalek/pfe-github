import React from 'react';
import { Mail, MapPin, Link as LinkIcon,  Calendar, Phone } from 'lucide-react';
import { FaPlusSquare, FaUserEdit } from "react-icons/fa";
import { BsPersonRolodex } from "react-icons/bs";

function ProfilePage() {
  return (
    <div className="
    flex-row w-full max-w-4xl mx-auto 
    bg-white rounded-lg border shadow-sm
    min-h-screen">
      {/* Header/Cover Image */}
      <div 
        className="h-48 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2000&h=400')`
        }}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-end sm:space-x-5 relative">
          <div className="relative -mt-16">
            <img
              className="h-32 w-32 rounded-full ring-4 ring-white bg-white"
              src="./images/icon3.jpg"
              alt="Profile"
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className=" md:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">Chadi Zineb</h1>
              <p className="text-gray-500">Administrator</p>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
             
              <button className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FaUserEdit style={{ marginRight:'7px', marginTop:'2px'}}/> Modifier 
              </button>
            </div>
          </div>
        </div>

        <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">Jean Dupont</h1>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600">
               .....!
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">User Role</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                  <BsPersonRolodex  style={{width:'20px', height:'20px',marginTop:'4px'}}/>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900"> Administrateur</h3>
                    
                
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Blida,Algeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Cahdizineb@email.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">0543462512</span>
                </div>
                
                
              </div>
            </div>

            
                
        </div>
      </div>
      </div>
      </div>
  );
}

export default ProfilePage;
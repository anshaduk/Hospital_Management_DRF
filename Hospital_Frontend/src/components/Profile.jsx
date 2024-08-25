import React, { useState,useContext,useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import { useNavigate } from 'react-router';
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [department, setDepartment] = useState('');

  const {user, authTokens, GetDoctor, doc, setDoc,LogOut} = useContext(AuthContext)
  let [userDetail, setUserDetail] = useState([])
  const navigate = useNavigate()

  useEffect(() => {

    if (user.is_admin) {
        navigate('/admin')
        
    }else{
        UserViews();
    }
  }, [user,navigate]);

  const editDoctor = async (e) =>{
    try{
      e.preventDefault();
      const formData = new FormData();
      formData.append('username', e.target.username.value);
      formData.append('email', e.target.email.value);
      formData.append('first_name', e.target.first_name.value);
      formData.append('last_name', e.target.last_name.value);
      formData.append('department', e.target.department.value);

      let response = await axios.patch('http://127.0.0.1:8000/api/doctorgetedit/', formData, {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
        }
      });
      if (response.status === 200) {
        setDoc(response.data);
        console.log(response.data,'srdsdtsdtrcd');
        
        alert('Profile updated Successfully')
        navigate('/user/userhome')
    }
    }catch(error){
      console.log(error);
    }
  }

  let editUser = async (e)=>{
  try{
    e.preventDefault();
    const formData = new FormData()
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('first_name', e.target.first_name.value);
    formData.append('last_name', e.target.last_name.value);

    const response = await axios.patch(`http://127.0.0.1:8000/api/user/`, formData, {
      headers: {
          'Authorization': `Bearer ${authTokens.access}`
      }
    });
    if (response.status == 200){
      setUserDetail(response.data)
      alert("Profile edited successfully..")
      navigate('/user/userhome')
      
    }
  }catch(error){
    alert(error)
  }
 };

 const UserViews = async (e) =>{
  if (user?.is_doctor){
    GetDoctor()
  }else{
    try{
      const response = await axios.get(`http://127.0.0.1:8000/api/user/`,  {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
      });
    
    if(response.status === 200){
      const userData = response.data
      if(!userData.is_doctor){
        setUserDetail(userData)
      }
    }
  }catch(error){
    alert(error)
  }
}
 };
  

  return (
    <>
      <nav className="bg-backgroundColor text-white py-4 px-5 lg:px-32 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">WellnessVista</h1>
        <div className="flex space-x-6">
          <Link to="/user/userhome" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/user/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <button onClick={LogOut} className="hover:text-gray-300">
            Logout
          </button>
        </div>
      </nav>
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="mt-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Profile
          </h1>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <form className="space-y-6" onSubmit={user.is_doctor?editDoctor:editUser}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
            {user?.is_doctor ? (
                        doc.is_verified ? null : (
                            <h2 className="text-lg font-bold text-red-500 mb-4 text-center">
                                You are not verified , please wait for admin to verify you  
                            </h2>
                        )
              ) : null}
              {/* First Name Field */}
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="First Name"
                  defaultValue={user.is_doctor ? doc.doctor.first_name : userDetail.first_name}
                  
                />
              </div>

              {/* Last Name Field */}
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Last Name"
                  defaultValue={user.is_doctor ? doc.doctor.last_name : userDetail.last_name}
                 
                />
                {console.log(doc.doctor.last_name,'last name')}
                
              </div>

              {/* Username Field */}
              <div className="sm:col-span-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Username"
                  defaultValue={user.is_doctor ? doc.doctor.username : userDetail.username}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="name@company.com"
                  defaultValue={user.is_doctor ? doc.doctor.email : userDetail.email}
                  required
                />
              </div>

              {/* Department Field */}
              {user?.is_doctor && (
                
              <div className="sm:col-span-2">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Department"
                  defaultValue={doc.department}
                />
              </div>
              )}
              
            </div>

            {/* Update Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </>
  );

};

export default Profile;
